FROM node:20-alpine as builder
WORKDIR /app
ADD *.json ./
RUN npm install
ADD . .
RUN npm run compile


FROM node:20-alpine as production
WORKDIR /app
ADD *.json ./
ADD .env ./
RUN npm install --omit=dev
COPY --from=builder /app/build .
CMD ["node", "./src/index.js"]

