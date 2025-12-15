# ===== build =====
FROM node:22-alpine AS build
WORKDIR /app

# Recebe o build-arg
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== runtime =====
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/virtualNfcFrontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
