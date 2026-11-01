FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY *.ts ./
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json ./
ENV PORT=8888
EXPOSE 8888
CMD ["node", "dist/index.js"]