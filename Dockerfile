# ---- build stage ----
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # ---- runtime stage ----
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    COPY package*.json ./
    RUN npm ci --omit=dev  --ignore-scripts

    
    COPY --from=builder /app/dist ./dist
    
    # If you use migrations/seed scripts that need other files, copy them too:
    # COPY --from=builder /app/prisma ./prisma
    # COPY --from=builder /app/src ./src  (usually not needed for prod)
    
    EXPOSE 3000
    CMD ["node", "dist/main.js"]
    