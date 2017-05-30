const electron = require('electron'); // http://electron.atom.io/docs/api
const path = require('path');         // https://nodejs.org/api/path.html
const url = require('url');           // https://nodejs.org/api/url.html
const os = require('os');
const cp = require('child_process');
const {ipcMain} = require('electron');
const pstree = require('ps-tree');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window;

global.procs = [];

if (os.platform() === "win32") {

    global.killPID = function(PID) {
      try { // haha lazy solution
        cp.execSync("Taskkill /PID " + PID + " /F", (error, stdout, stderr) => {
          if (error) console.log("error:" + stderr);
        });
      }
      catch(err) {
        console.log("Taskkill error")
      }
    }


} else {

    global.killPID = function(PID) {
      try {
        cp.execSync("kill -9 " + PID, (error, stdout, stderr) => {
          if (error) console.log("error:" + stderr);
        });
      }
      catch(err) {
        console.log("Taskkill error")
      }
    }


}

ipcMain.on("init", function() { console.log("IPC connection initialised.") })

ipcMain.on("add-pid", function(event, pids){
  console.log("Process started: " + pids)
  pids.forEach(function(p){global.procs.push(p)});
  console.log(global.procs);
})

ipcMain.on("remove-pid", function(event, pid){
  console.log("Process stopped: " + pid)
  var index = global.procs.indexOf(pid);
  global.procs.splice(index, 1);
})

// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new electron.BrowserWindow({
    // Set the initial width to 800px
    width: 1100,
    // Set the initial height to 600px
    height: 600,

    // Don't show the window until it ready, this prevents any white flickering
    show: false
  });

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:'
  }));

  // Open the DevTools.
  // window.webContents.openDevTools();

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.show();
  });

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
});

// Quit when all windows are closed.
electron.app.on('window-all-closed', () => {
  if (global.procs.length == 0){
    console.log("No procs to kill. Quitting.")
    electron.app.quit();
  } else {
    global.procs.forEach(function(pid) {
      console.log("Killing " + pid);
      global.killPID(pid);
    });
    electron.app.quit();
  }
});

electron.app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
