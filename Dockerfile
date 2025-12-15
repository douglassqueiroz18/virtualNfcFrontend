# ===== build =====
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== runtime =====
FROM nginx:alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build do frontend
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
