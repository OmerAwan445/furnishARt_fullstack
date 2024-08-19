#   for backend
FROM node:20.15.0-alpine

    WORKDIR /app/backend
    #Copy package.json (creates a cacheable layer)
    COPY package.json .
    # Install dependencies (cached if package.json hasn't changed)     
    RUN npm install && npm install prisma -g
    COPY . .
    EXPOSE 3001
  #  new migrate and start app script
# CMD [ "npm", "run", "start:migrate:prod" ]

CMD [ "npm", "run", "start:prod" ]

# Check if in a dev environment; otherwise, start the app normally
# CMD [ "sh", "-c", "if [ \"$DEV\" = \"true\" ]; then tail -f /dev/null; else npm run start:migrate:prod; fi" ]