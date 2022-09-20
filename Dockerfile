FROM node:16.17 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run prod

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/com.tweetapp/ /usr/share/nginx/html