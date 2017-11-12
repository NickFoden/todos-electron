const electron = require('electron');

const {app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`)

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

//Each object in menuTemplate refers to each menu dropdown - file edit etc
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit'
            }
        ]
    }
];