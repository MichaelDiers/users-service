FROM node:lts-alpine as setup
WORKDIR /app
COPY . .
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/main"]
