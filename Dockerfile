# ===== build =====
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== runtime =====
FROM nginx:alpine

ENV BACKEND_URL=http://dev_backend_1:8080/api/

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/virtualNfcFrontend/browser/ /usr/share/nginx/html/

CMD envsubst '$BACKEND_URL' \
    < /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'

EXPOSE 80
