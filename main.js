const electron =require("electron");


const app=electron.app;
const browserWindow=electron.BrowserWindow;

function createWindow(){
 const mainWindow=new browserWindow({
     width:800,
     height:600,

 })

 mainWindow.loadFile("whiteBoard.html").then(function(){
     mainWindow.webContents.openDevTools();
     mainWindow.maximize();
 })
  
}

app.whenReady().then(function(){
  createWindow();
});
