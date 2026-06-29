FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY dist ./dist
COPY prisma ./prisma

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]