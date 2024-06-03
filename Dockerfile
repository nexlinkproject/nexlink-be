FROM node:20 as dependencies

WORKDIR /app

COPY package.json .

COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]