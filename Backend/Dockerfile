# Utiliza una imagen base más ligera
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios a la imagen
COPY package*.json ./
COPY server.js .
COPY sequelize.js .
COPY swagger.js .
COPY .env .

# Instala las dependencias
RUN npm install --only=production

# Expone el puerto en el que se ejecutará el servidor backend
EXPOSE 1000

# Comando para iniciar el servidor backend
CMD ["node", "server.js"]
