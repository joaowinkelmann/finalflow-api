#!/usr/bin/bash

# Export the path to bun
export PATH="$HOME/.bun/bin:$PATH"

# Source NVM and bun environments
export NVM_DIR="$HOME/.config/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Stop the api-kurt PM2 instance
pm2 stop api-kurt

# Save the changes
pm2 save
