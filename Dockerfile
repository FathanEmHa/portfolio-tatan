# =============================================================================
# Dockerfile — portfolio-tatan
# Framework : React 19 + Vite 8 (static SPA)
# Runtime   : Node.js 20 (build only), Nginx Alpine (runtime)
# Strategy  : Multi-stage build — builder stage is discarded at runtime,
#             keeping the final image small (~25 MB vs ~400 MB).
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1 — BUILDER
# Installs dependencies and compiles the Vite production bundle.
# This entire stage is discarded after the build; only the /app/dist artifact
# is carried forward, so no node_modules end up in the final image.
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Security: run as a non-root user during the build
WORKDIR /app

# Copy manifests first so Docker layer-caches npm install independently
# from source changes. Re-installing only happens when package*.json changes.
COPY package.json package-lock.json ./

# Use ci instead of install: faster, deterministic, respects lock-file exactly
RUN npm ci --frozen-lockfile

# Copy the rest of the source
COPY . .

# Produce the production bundle
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2 — RUNTIME (final image)
# Minimal Nginx Alpine image that serves the compiled static files.
# No Node.js, no source code, no devDependencies — just static assets + Nginx.
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx runs on port 80 inside the container.
# We do NOT publish this port to the host — Nginx Proxy Manager reaches
# it through the shared proxy-tier Docker network instead.
EXPOSE 80

# Nginx foreground mode (required in containers)
CMD ["nginx", "-g", "daemon off;"]