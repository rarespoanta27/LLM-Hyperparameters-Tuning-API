
FROM node:18 AS backend

WORKDIR /app/backend


COPY ./backend /app/backend


RUN npm install

EXPOSE 8000

# Set up the base image for the frontend
FROM node:18 AS frontend

# Set the working directory for frontend
WORKDIR /app/frontend

# Copy frontend code
COPY ./frontend /app/frontend

# Install dependencies for frontend
RUN npm install

# Build the frontend
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend build to Nginx
COPY --from=frontend /app/frontend/build /usr/share/nginx/html

# Copy the backend build (or ensure it runs with Node.js in the same container)
COPY --from=backend /app/backend /app/backend

# Expose the port for Nginx
EXPOSE 80

# Command to run Nginx and backend in parallel (using a supervisor)
CMD ["nginx", "-g", "daemon off;"] && npm start --prefix /app/backend
