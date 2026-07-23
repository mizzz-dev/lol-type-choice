const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "lol-type-choice",
      cwd: path.resolve(__dirname, ".."),
      script: ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000"
      }
    }
  ]
};
