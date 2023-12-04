FROM node:20-alpine3.17 AS builder

WORKDIR /app
COPY ./ /app/
RUN npm install

RUN npm run build:development

FROM nginx:stable-alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
