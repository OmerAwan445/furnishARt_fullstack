#   for backend
FROM node:20.15.0-alpine

    WORKDIR /app/asset-backend
    RUN npm install prisma nodemon -g
    #Copy package.json (creates a cacheable layer)
    COPY package.json .
    # Install dependencies (cached if package.json hasn't changed)     
    RUN npm install 
    COPY . .
    EXPOSE 3002

CMD [ "npm", "run", "dev" ]