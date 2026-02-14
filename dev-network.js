// dev-network.js
const { spawn } = require('child_process');
const os = require('os');

// Find local IPv4 address
const nets = os.networkInterfaces();
let localIp = 'localhost';
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      localIp = net.address;
    }
  }
}

// Print friendly message
console.log(`Your app is running at http://${localIp}:3000`);

// Start Next.js dev server
const child = spawn('npx', ['next', 'dev', '-H', '0.0.0.0', '-p', '3000'], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code));
