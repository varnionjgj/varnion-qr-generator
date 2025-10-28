# Varnion QR Code Generator

A production-ready web application for creating customizable QR codes with advanced styling options, real-time preview, and multiple export formats.

## Features

### QR Code Types (7 types)
- **URL** - Website links
- **Text** - Up to 500 characters
- **Email** - With subject and body
- **Phone** - International format support
- **SMS** - With pre-filled message
- **WiFi** - Network configuration (SSID, password, encryption)
- **vCard** - Complete contact information

### Customization Options
- **Colors**: Solid colors or linear gradients (horizontal/vertical/diagonal)
- **Shapes**: 4 dot styles, 3 corner square styles, 2 corner dot styles
- **Logo**: Upload custom logo or use default Varnion logo (size 10-30%, padding option)
- **Error Correction**: 4 levels (Low, Medium, Quartile, High)

### Export Options
- **Formats**: PNG, JPG (with quality control), SVG (vector), PDF (A4)
- **Sizes**: 1024px, 2048px, 4096px for raster formats
- **Real-time Preview**: 300ms debounced updates with all customizations

## Tech Stack

- **Framework**: Next.js 16 (React 19) with App Router
- **Language**: JavaScript (ES6+) - No TypeScript for faster development
- **Styling**: Tailwind CSS 4 with Varnion brand colors
- **QR Generation**: qr-code-styling
- **Form Handling**: React Hook Form + Zod validation
- **Export**: jspdf, file-saver
- **Color Picker**: react-colorful

## Getting Started

### Prerequisites

- Node.js 18+ LTS
- npm or yarn

### Installation

```bash
# Install dependencies (already done)
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
varnion-qr-generator/
├── app/
│   ├── page.js          # Main QR generator page
│   ├── layout.js        # Root layout with header/footer
│   ├── globals.css      # Global styles with Tailwind
│   └── api/             # API routes (to be added)
├── components/          # React components (to be added)
├── lib/                 # Utility functions (to be added)
├── public/
│   └── assets/          # Static assets
│       └── default-logo.jpg  # Varnion default logo (✓ added)
├── PRD.md               # Product Requirements Document
├── CLAUDE.md            # AI assistant context guide
└── package.json         # Dependencies and scripts
```

## Brand Colors

The application uses Varnion brand colors:

- **Primary**: #2A3D82 (Navy blue)
  - Hover: #3A4D92
  - Active: #1A2D72
- **Secondary Light**: #F0F2F8
- **Border**: #D0D5E8

These are configured in `tailwind.config.js` and can be used as:
- `bg-primary`, `text-primary`
- `bg-primary-hover`, `bg-primary-active`
- `bg-secondary-light`, `border-secondary-border`

## Production Deployment with PM2

### Prerequisites

- Ubuntu 20.04+ or Debian 11+ VPS
- Node.js 18+ LTS installed
- Nginx installed and configured
- Domain name pointed to your VPS (optional)

### Step 1: Prepare the Application

```bash
# Clone or upload your application to the VPS
cd /var/www/varnion-qr-generator

# Install dependencies
npm install

# Build for production
npm run build
```

### Step 2: Install PM2

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Create PM2 Ecosystem File

Create a file named `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'varnion-qr-generator',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/varnion-qr-generator',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### Step 4: Start Application with PM2

```bash
# Create logs directory
mkdir -p logs

# Start application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs varnion-qr-generator

# Monitor application
pm2 monit
```

### Step 5: Configure PM2 Startup

```bash
# Generate startup script
pm2 startup

# This will output a command to run as root
# Copy and execute that command

# Save current PM2 process list
pm2 save
```

### Step 6: Configure Nginx

Create Nginx configuration file: `/etc/nginx/sites-available/varnion-qr`

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/varnion-qr /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 7: Setup SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure Nginx for HTTPS
```

### PM2 Common Commands

```bash
# View all processes
pm2 list

# Stop application
pm2 stop varnion-qr-generator

# Restart application
pm2 restart varnion-qr-generator

# Reload application (zero-downtime)
pm2 reload varnion-qr-generator

# Delete from PM2
pm2 delete varnion-qr-generator

# View logs
pm2 logs varnion-qr-generator --lines 100

# Clear logs
pm2 flush

# Monitor CPU/Memory
pm2 monit

# Save current process list
pm2 save

# Resurrect saved processes
pm2 resurrect
```

### Updating the Application

```bash
# Stop the application
pm2 stop varnion-qr-generator

# Pull latest changes
git pull origin main

# Install dependencies (if package.json changed)
npm install

# Build for production
npm run build

# Restart with zero downtime
pm2 reload varnion-qr-generator
```

### Monitoring & Maintenance

```bash
# Check application logs
pm2 logs varnion-qr-generator

# Monitor resource usage
pm2 monit

# Check application status
pm2 status

# View detailed info
pm2 info varnion-qr-generator
```

### Troubleshooting

**Application won't start:**
```bash
# Check logs
pm2 logs varnion-qr-generator --err

# Check if port 3000 is available
sudo lsof -i :3000

# Restart PM2
pm2 restart varnion-qr-generator
```

**High memory usage:**
```bash
# Check current memory usage
pm2 monit

# Adjust max_memory_restart in ecosystem.config.js
# Then reload
pm2 reload varnion-qr-generator
```

**Application crashes:**
```bash
# View error logs
pm2 logs varnion-qr-generator --err --lines 50

# Check if auto-restart is working
pm2 status
```

## Documentation

- **PRD.md**: Comprehensive product requirements
- **CLAUDE.md**: Technical context for AI assistants
- **README.md**: This file

## License

ISC License - Varnion © 2025
