import { RouteInitEnvironment, RouteRequest } from '../shared/env';
import { readFileSync } from 'fs';
import path = require('path');

export type RequestQuery = null;
export type RequestBody = null;
export type ResponseBody = { 
    version: string; 
    time: number;
    process: number;
};
export type Request = RouteRequest<any, ResponseBody, RequestBody, RequestQuery>;

export const addRoute = (env: RouteInitEnvironment) => {

    // Read server version from package.json
    const filePath = path.resolve(__dirname, '../../package.json');
    const json = readFileSync(filePath, 'utf-8');
    const packageInfo = JSON.parse(json);

    // Add info endpoint
    env.app.get(`/info/${env.db.name}`, (req: Request, res) => {

        const info = {
            version: packageInfo.version, // Loaded from package.json
            time: Date.now(), 
            process: process.pid
        };
        if (req.user && req.user.uid === 'admin') {
            const os = require('os');
            const numberToByteSize = number => {
                return Math.round((number / 1024 / 1024) * 100) / 100 + 'MB';
            }
            const sPerMinute = 60;
            const sPerHour = sPerMinute * 60;
            const sPerDay = sPerHour * 24;
            const numberToTime = number => {
                const days = Math.floor(number / sPerDay);
                number -= sPerDay * days;
                const hours = Math.floor(number / sPerHour);
                number -= hours * sPerHour;
                const minutes = Math.floor(number / sPerMinute);
                number -= minutes * sPerMinute;
                const seconds = Math.floor(number);
                return `${days}d${hours}h${minutes}m${seconds}s`;
            };
            const mem = process.memoryUsage();
            const adminInfo = {
                dbname: env.db.name,
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                host: os.hostname(),
                uptime: numberToTime(os.uptime()),
                load: os.loadavg(),
                mem: {
                    total: numberToByteSize(os.totalmem()),
                    free: numberToByteSize(os.freemem()),
                    process: {
                        arrayBuffers: numberToByteSize(mem.arrayBuffers),
                        external: numberToByteSize(mem.external),
                        heapTotal: numberToByteSize(mem.heapTotal),
                        heapUsed: numberToByteSize(mem.heapUsed),
                        residentSet: numberToByteSize(mem.rss)
                    }
                },
                cpus: os.cpus(),
                network: os.networkInterfaces()
            }
            Object.assign(info, adminInfo);
        }
        // for (let i = 0; i < 1000000000; i++) {
        //     let j = Math.pow(i, 2);
        // }
        res.send(info);
    });
};

export default addRoute;