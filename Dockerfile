# TAHAP 1: DAPUR (Builder)
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json dulu biar Docker bisa nge-cache dependency
COPY package*.json ./
RUN npm install

# Copy sisa kodingan dan jalankan proses build
COPY . .
RUN npm run build

# TAHAP 2: ETALASE (Production Server)
FROM nginx:alpine

# Copy hasil masakan dari Tahap 1 ke folder default Nginx
# CATATAN: Kalau lu pake Vite, foldernya 'dist'. Kalau pake Create React App, ganti jadi 'build'.
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opsional tapi disarankan) Copy konfigurasi routing Nginx buat React
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]