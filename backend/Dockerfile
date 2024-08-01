#   for backend
FROM node:20.15.0-alpine

    WORKDIR /app/backend
    # COPY package.json .
    COPY . .
    RUN npm install
    EXPOSE 3001
    RUN npm install prisma -g
    # RUN cd src/prisma && npx prisma db push
  # 👇 new migrate and start app script
CMD [ "npm", "run", "start:migrate:prod" ]