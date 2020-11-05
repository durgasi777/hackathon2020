FROM node:latest as build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

####Stage 1, Build Nginx backend
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
