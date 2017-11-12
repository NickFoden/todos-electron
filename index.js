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
//OSX gotcha. first menu item will display as apps name
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo'
            },
            {
                label: 'Quit',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Command+Q';
                    } else {
                        return 'Ctrl+Q'
                    }
                })(),
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//Checks to see if OSX to add empty object so file menu displays as file
if (process.platform === 'darwin'){
    menuTemplate.unshift({});
}