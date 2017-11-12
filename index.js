const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
      });
      addWindow.loadURL(`file://${__dirname}/add.html`)
      addWindow.on('closed', () => addWindow = null);

}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();

});

//Each object in menuTemplate refers to each menu dropdown - file edit etc
//OSX gotcha. first menu item will display as apps name
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click(){createAddWindow();} 
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//Checks to see if OSX to add empty object so file menu displays as "file"
if (process.platform === 'darwin'){
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu : [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }   
            }
        ]
    })
}
//Production, development, test, or staging env