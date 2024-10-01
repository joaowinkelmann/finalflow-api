#!/usr/bin/bash

# Export the path to bun
export PATH="$HOME/.bun/bin:$PATH"

# Source NVM and bun environments
export NVM_DIR="$HOME/.config/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /var/www/html/api-nest-kurt/
nvm install --lts
nvm use --lts
echo "Script running using Node $(node -v)"

# Atualiza o Bun e as dependências do projeto antes de fazer o build
bun upgrade
bun install
bun update

# Migra as alterações do banco de dados
bunx prisma generate
bunx prisma migrate dev

# Fazer o build do projeto
bun run build

# Trusting scripts
# @link https://bun.sh/blog/bun-v1.0.31
bun pm untrusted
bun pm trust --all

# Check if the application is already running
if pm2 show api-kurt &> /dev/null; then
  echo "Restarting api-kurt application..."
  pm2 restart api-kurt
else
  # Start your Node.js application using PM2
  echo "Starting api-kurt application..."
  pm2 start bun --name "api-kurt" -- run start --restart-delay 5000
fi

pm2 save
pm2 startup
