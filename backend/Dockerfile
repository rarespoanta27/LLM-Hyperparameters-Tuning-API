# 1. Folosim imaginea oficială Python
FROM python:3.10-slim

# 2. Setează directorul de lucru în container
WORKDIR /app

# 3. Copiază fișierele backend în container
COPY ./backend /app

# 4. Instalează dependințele din `requirements.txt`
RUN pip install --no-cache-dir -r requirements.txt

# 5. Expune portul pe care rulează FastAPI (de obicei 8000)
EXPOSE 8000

# 6. Comanda pentru a porni aplicația FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
