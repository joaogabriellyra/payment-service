FROM node:16.14

WORKDIR /node-app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3001

CMD ["npm", "run", "dev"]