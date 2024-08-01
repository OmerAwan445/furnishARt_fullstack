#   for Frontend
FROM node:20.15.0-alpine

    WORKDIR /app/frontend
    COPY . .
    # COPY package.json .
    RUN npm install
    EXPOSE 3000

CMD [ "npm", "run", "dev" ]