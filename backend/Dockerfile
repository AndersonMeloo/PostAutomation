FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY dist ./dist
COPY prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod"]