FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production && \
    npm install

COPY . .

RUN npm run build

# Stage 2: Create the final image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main.js"]