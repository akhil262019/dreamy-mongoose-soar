# scalix-managed: true
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN vite build
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY public ./public
COPY index.html .
ENV PORT 8080
EXPOSE 8080
CMD ["sh", "-c", "http-server -p $PORT -c-1 --cors --proxy http://localhost:8080/api?/ @/$PORT/"]
