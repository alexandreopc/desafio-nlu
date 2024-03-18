FROM node

WORKDIR /app

COPY package*.json ./

RUN npm instal --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]