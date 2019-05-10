FROM node:10.15-alpine
RUN mkdir app
WORKDIR ./app
COPY ./package.json ./package-lock.json ./
RUN npm i
COPY . ./
ENTRYPOINT ["npm", "run", "prod"]
EXPOSE 3000