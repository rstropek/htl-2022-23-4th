FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine
COPY --from=builder /app/dist/character-builder/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
