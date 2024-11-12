from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from torch.utils.data import DataLoader, Dataset, TensorDataset
import torch.nn as nn
import torch.optim as optim
from typing import List
from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
users_collection = db["users"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class HyperParams(BaseModel):
    model_identifier: str
    learning_rate: float
    batch_size: int
    epochs: int
    loss_function: str
    optimizer_name: str
    random_search: bool
    num_trials: int = 5
    input_texts: List[str]
    target_texts: List[str]

def create_user(name, email, password):
    if users_collection.find_one({"email": email}):
        return {"error": "This email already exists!"}

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode('utf-8')
    }
    users_collection.insert_one(user)
    return {"message": "Account created succesfully!"}

def verify_user(email, password):
    user = users_collection.find_one({"email": email})
    if not user:
        return None
    if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return user
    return None

@app.post("/signup/")
def signup(user: UserCreate):
    response = create_user(user.name, user.email, user.password)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return {"message": response["message"], "email": user.email}

@app.post("/login/")
def login(user: UserLogin):
    verified_user = verify_user(user.email, user.password)
    if not verified_user:
        raise HTTPException(status_code=400, detail="Invalid credetianls!")
    return {"message": "Login succesfull!", "user": verified_user["email"]}

class TextDataset(Dataset):
    def __init__(self, tokenizer, inputs, targets):
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        self.inputs = tokenizer(inputs, padding=True, truncation=True, return_tensors="pt")["input_ids"]
        self.targets = tokenizer(targets, padding=True, truncation=True, return_tensors="pt")["input_ids"]

    def __len__(self):
        return len(self.inputs)

    def __getitem__(self, idx):
        return self.inputs[idx], self.targets[idx]

def train_model(model, dataloader, learning_rate, epochs, loss_function, optimizer_name, device):
    try:
        if loss_function == "CrossEntropy":
            criterion = nn.CrossEntropyLoss()
        elif loss_function == "MSE":
            criterion = nn.MSELoss()
        elif loss_function == "L1":
            criterion = nn.L1Loss()
        elif loss_function == "BCE":
            criterion = nn.BCELoss()
        elif loss_function == "BCEWithLogits":
            criterion = nn.BCEWithLogitsLoss()
        elif loss_function == "Huber":
            criterion = nn.SmoothL1Loss()
        else:
            raise ValueError(f"Unsuported loss function: {loss_function}")

        if optimizer_name == "AdamW":
            optimizer = optim.AdamW(model.parameters(), lr=learning_rate)
        elif optimizer_name == "SGD":
            optimizer = optim.SGD(model.parameters(), lr=learning_rate)
        elif optimizer_name == "RMSProp":
            optimizer = optim.RMSprop(model.parameters(), lr=learning_rate)
        elif optimizer_name == "LBFGS":
            optimizer = optim.LBFGS(model.parameters(), lr=learning_rate)
        elif optimizer_name == "Adamax":
            optimizer = optim.Adamax(model.parameters(), lr=learning_rate)
        elif optimizer_name == "Adagrad":
            optimizer = optim.Adagrad(model.parameters(), lr=learning_rate)
        else:
            raise ValueError(f"Unsuported optimizator: {optimizer_name}")

        model.to(device)
        history = []

        for epoch in range(epochs):
            model.train()
            total_loss = 0

            for batch in dataloader:
                input_ids, target_ids = batch
                input_ids = input_ids.to(device)
                target_ids = target_ids.to(device)

                if optimizer_name == "LBFGS":
                    def closure():
                        optimizer.zero_grad()
                        outputs = model(input_ids=input_ids, labels=target_ids)
                        loss = outputs.loss
                        loss.backward()
                        return loss
                    optimizer.step(closure)
                else:
                    outputs = model(input_ids=input_ids, labels=target_ids)
                    loss = outputs.loss

                    optimizer.zero_grad()
                    loss.backward()
                    optimizer.step()

                total_loss += loss.item()

            avg_loss = total_loss / len(dataloader)
            history.append(avg_loss)
            print(f"Epoca {epoch + 1}/{epochs}, Pierdere: {avg_loss}")

        return {"loss": avg_loss, "loss_history": history}
    except Exception as e:
        print(f"Erorr: {e}")
        return {"error": str(e)}

@app.post("/tune/")
async def tune_model(params: HyperParams):
    try:
        print(f"The model is loading: {params.model_identifier}")
        tokenizer = AutoTokenizer.from_pretrained(params.model_identifier)
        model = AutoModelForCausalLM.from_pretrained(params.model_identifier)

        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        print("Se creează datasetul și dataloaderul")
        dataset = TextDataset(tokenizer, params.input_texts, params.target_texts)

        input_ids = dataset.inputs
        target_ids = dataset.targets

        max_length = max(input_ids.size(1), target_ids.size(1))
        if input_ids.size(1) != target_ids.size(1):
            input_ids = torch.nn.functional.pad(input_ids, (0, max_length - input_ids.size(1)), value=tokenizer.pad_token_id)
            target_ids = torch.nn.functional.pad(target_ids, (0, max_length - target_ids.size(1)), value=tokenizer.pad_token_id)

        dataset = TensorDataset(input_ids, target_ids)
        dataloader = DataLoader(dataset, batch_size=params.batch_size, shuffle=True)

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Se folosește dispozitivul: {device}")
        print(f"CUDA disponibil: {torch.cuda.is_available()}")

        results = train_model(
            model=model,
            dataloader=dataloader,
            learning_rate=params.learning_rate,
            epochs=params.epochs,
            loss_function=params.loss_function,
            optimizer_name=params.optimizer_name,
            device=device
        )

        return {
            "result": "The tuning is done!",
            "loss": results["loss"],
            "loss_history": results["loss_history"],
            "best_params": {
                "learning_rate": params.learning_rate,
                "batch_size": params.batch_size,
                "optimizer_name": params.optimizer_name
            },
            "epochs_completed": params.epochs
        }

    except Exception as e:
        print(f"A apărut o eroare în timpul tuning-ului modelului: {e}")
        return {"error": str(e)}
