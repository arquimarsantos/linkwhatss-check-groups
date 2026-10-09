import cron from 'node-cron';
import { runChecker } from './check-groups.js';

let isCheckerRunning = false;

async function executeChecker() {
    if (isCheckerRunning || isScraperRunning) {
        return;
    }
    
    isCheckerRunning = true;
    
    try {
        console.log('Iniciando checagem de links...');
        await runChecker();
    } catch (e) {
        console.error(e);
    } finally {
        isCheckerRunning = false;
    }
}

executeChecker();

cron.schedule('0 0 * * *', executeChecker);

console.log('Cron iniciado');
