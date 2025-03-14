import { app, BrowserWindow } from 'electron';

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import commandLineArgs from 'command-line-args';
import { ipcMain } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log('Starting...');

const optionDefinitions = [
    { name : 'url', alias : 'u', type : String, defaultOption : true, defaultValue: 'https://longdogechallenge.com/' },
    { name : 'scrollpercent', alias : 's', type: Number, defaultValue: 0.25 }, // How much to scroll each interval, as a percentage of the viewport height
    { name : 'scrollinterval', alias : 'i', type: Number, defaultValue: 2000 }, // How often to scroll, in milliseconds
    { name : 'reloadinterval', alias : 'r', type: Number, defaultValue: 5 }, // How often to reload the page, in minutes
    { name : 'zoom', alias : 'z', type: Number, defaultValue: 1.0 }, // Zoom level
    { name : 'hideCss', alias : 'h', type: String, defaultValue: '' }, // CSS selector to hide, example: '.eu-cookie-panel, #skin_BoxV_1, #skin_Container_4'
];
const options = commandLineArgs(optionDefinitions);

ipcMain.handle('get-options', () => {
    return options;
});

let mainWindow;

// console.log('Startup: ', options);

function createWindow() {
    mainWindow = new BrowserWindow({
        // width: 800,
        // height: 600,
        fullscreen: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    mainWindow.loadURL(options.url);

    // mainWindow.webContents.setZoomFactor(5.0);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
