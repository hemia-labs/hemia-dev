// PM2: arranca el server standalone de Next (build autocontenido, sin node_modules externos).
// Se ejecuta desde la raíz del deploy (VPS_APP_DIR); server.js está en apps/web/.
// ponytail: instances=1; subir a cluster solo si el tráfico lo pide
module.exports = {
  apps: [
    {
      name: "hemia-dev-web",
      script: "apps/web/server.js",
      env: { NODE_ENV: "production", PORT: 6001, HOSTNAME: "127.0.0.1" },
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
