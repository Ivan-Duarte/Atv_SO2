# Use a imagem base oficial do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install --quiet --no-optional --no-fund

# Copie todo o código do projeto, incluindo tsconfig.json
COPY . .

# Compile o projeto TypeScript
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]






