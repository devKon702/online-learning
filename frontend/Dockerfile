# Fetching the latest node image on alpine linux
FROM node:latest

# Setting up the work directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json .

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 5500

# Starting our application
CMD ["npm","run", "dev"]