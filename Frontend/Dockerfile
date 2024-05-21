# Utiliza una imagen base con Node.js
FROM node:latest as builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del frontend
COPY . .

# Compila la aplicación
RUN npm run build

# Configura el servidor web para servir los archivos estáticos
FROM nginx:latest
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
