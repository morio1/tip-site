FROM node:20-slim

# better-sqlite3 needs build tools to compile its native binding
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

# Persisted SQLite file lives here — mount a volume at /app/data to keep data
# across container restarts/redeploys.
RUN mkdir -p /app/data
VOLUME ["/app/data"]

ENV PORT=3000
EXPOSE 3000

# Seed only runs if the DB is empty; safe on first boot, harmless after.
CMD ["sh", "-c", "node server/seed.js --if-empty 2>/dev/null; node server/server.js"]
