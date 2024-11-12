# 1. Folosim imaginea oficială Node.js pentru a construi aplicația React
FROM node:18 AS build

# 2. Setează directorul de lucru în container
WORKDIR /app

# 3. Copiază fișierele frontend în container
COPY ./frontend /app

# 4. Instalează dependențele și construiește aplicația React
RUN npm install && npm run build

# 5. Folosim o imagine NGINX pentru a servi aplicația React
FROM nginx:alpine

# 6. Copiem fișierele construite în NGINX
COPY --from=build /app/build /usr/share/nginx/html

# 7. Expunem portul 80 pentru NGINX
EXPOSE 80

# 8. Comanda pentru a porni NGINX
CMD ["nginx", "-g", "daemon off;"]
