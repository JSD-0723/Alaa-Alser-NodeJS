import http from 'http'
import fs from 'fs'
import 'dotenv/config'


const PORT = process.env.PORT || 3000;

const LOG_FILE = 'requests.txt';

const server = http.createServer((req, res) => {
    const { url } = req;

    if (url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleString();
    const logMessage = `${formattedDate} - ${url} \n`;

    try {
        fs.appendFileSync(LOG_FILE, logMessage);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Request made successfully');
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error', error);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
