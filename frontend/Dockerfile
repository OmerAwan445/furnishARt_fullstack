#   for Frontend
FROM node:20.15.0-alpine

    WORKDIR /app/frontend
    #Copy package.json (creates a cacheable layer)
    COPY package.json .
    # Install dependencies (cached if package.json hasn't changed)     
    RUN npm install 
    COPY . .
    EXPOSE 3000

CMD [ "npm", "run", "build" ]