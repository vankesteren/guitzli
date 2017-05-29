$(function(){
  
  // This is the main logic of the program
  
  const cp = require('child_process');
  const os = require('os');
  const tmp = require('temp');
  const fs = require('fs');
  const path = require('path');
  const url = require('url');
  const pstree = require('ps-tree');
  const { dialog } = require('electron').remote;
  const { ipcRenderer} = require('electron');
  const imgDim = require('image-size');

  // message main
  ipcRenderer.send("init");
  
  // variables
  tmp.track();
  var filePath;
  var tempName;
  
  // functions
  window.readBase64 = function(filePath) {
    var bitmap = fs.readFileSync(filePath);
    return new Buffer(bitmap).toString('base64');
  }
  
  window.getFileSize = function(path) {
      var stats = fs.statSync(path);
      var bytes = stats.size;
      if (bytes > 1000000000.0) {
        return Math.round(bytes / 10000000.0) / 100 + " GB"
      } else if (bytes > 1000000.0) {
        return Math.round(bytes / 10000.0) / 100 + " MB"
      } else if (bytes > 1000.0){
        return Math.round(bytes / 10.0) / 100 + " KB"
      } else {
        return Math.round(bytes * 100) / 100 + " bytes"
      }
  }
  
  window.msToTime = function(duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours.toString() : hours.toString();
    minutes = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();
    seconds = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();

    return hours + ":" + minutes + ":" + seconds;
  }
  
  if (os.platform() === "win32") {
    window.killPID = function(PID) { 
      cp.exec("Taskkill /PID " + PID + " /F", (error, stdout, stderr) => {
        console.log("error:" + stderr);
        console.log(stdout);
      });
    }
  } else {
    window.killPID = function(PID) { 
      cp.exec("kill -9 " + PID, (error, stdout, stderr) => {
        console.log("error:" + stderr);
        console.log(stdout);
      });
    }
  }
  
    
  // connections with interface
  $('#openBtn').click(function(){
    filePath = dialog.showOpenDialog({ filters: [
      { name: 'Image File', extensions: ['jpg', 'png'] }
    ]});
    if (typeof filePath == "undefined") { return; }
    
    hideMenu();
    showInput();
    startInputLoad();
    var inputPath = filePath.toString();
    var inputExt = path.extname(inputPath).replace(".","")
    var dim = imgDim(inputPath);
    var memneed = Math.round(300 * dim.width * dim.height / 1000000 );
    console.log(inputPath);
    setTimeout(function() {
      $('#inputImg').attr("src", "data: "+inputExt+";base64, "+readBase64(inputPath));
      $('#fileName').html(path.basename(inputPath   ))
      $('#inputSize').html(getFileSize(inputPath));
      $('#fileDim').html(dim.width + " x " + dim.height)
      $('#ramNeeded').html("~ " + memneed + " MB ram needed") // according to google
      $('#convertBtn').attr("disabled", false);
      stopInputLoad();
      showInputInfo();
    }, 10)
    
    
  });

  $('#convertBtn').click(function() {
    if ($('#convertBtn').attr('disabled') == "disabled") {
      console.log('convertBtn disabled!')
    } else {
      $('#convertBtn').attr('disabled', true); 
      hideMenu();
      showOutput();
      startOutputLoad();
      setTimeout(function() {
        var pids = [];
        var inputImg = filePath; //$('#inputImg').attr("src");
        var arch = os.arch();
        var platform = os.platform();
        tempName = tmp.path({suffix: '.jpg'});
        var mem = os.freemem() / 1000000;
        var memtot = os.totalmem() / 1000000;
        //var quality = $('#qualitySlider').val();      
        var quality = 84;
        if (platform === "win32" && arch === "x64"){
          var cmd = path.join(__dirname, "\\bin\\guetzli_windows_x86-64.exe").replace('app.asar', 'app.asar.unpacked');
        } else if (platform === "win32" && (arch === "x32" || arch === "x86")) {
          var cmd = path.join(__dirname, "\\bin\\guetzli_windows_x86.exe").replace('app.asar', 'app.asar.unpacked');
        } else if (platform === "darwin" && arch === "x64") {
          var cmd = path.join(__dirname, "/bin/guetzli_darwin_x86-64").replace('app.asar', 'app.asar.unpacked');
        } else if (platform === "linux" && arch === "x64"){
          var cmd = path.join(__dirname, "/bin/guetzli_linux_x86-64").replace('app.asar', 'app.asar.unpacked');
        } else {
          console.error();
        }
    
        
        var command = cmd + " --quality " + quality + " --memlimit " + memtot + " " + inputImg + " " + tempName
        console.log(command)
        console.log("Converting...")
        
        // allow the process to be stopped
        $('#stopBtn').attr('disabled', false);
        var start = window.performance.now();
        window.guetzli = cp.exec(command, (error, stdout, stderr) => {
          // remove pids from global
          console.log("remove pids", pids);
          pstree(window.guetzli.pid, function(err, proc){
            proc.map(function (p) {
              ipcRenderer.send("remove-pid", p.PID);
            });
            pids = [];
          });
          
          
          if (error) {
            
            console.error(`${error}`);
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            $('#outputLoading').removeClass("is-active")
            $('#convertBtn').attr("disabled", false);
            $('#stopBtn').attr('disabled', true);
            //dialog.showMessageBox({ message: `Guetzli error: ${error}`,
            //                        buttons: ["OK"] });
            hideOutput();
            return;
          }
          
          var ct = msToTime(start - window.performance.now());
          
          var printCt = "Elapsed: " + ct;
          console.log('Conversion complete, file in: ' + tempName)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          var outputPath = tempName.toString();
          console.log(outputPath);
          $('#outputImg').attr("src", "data: jpg;base64, " + readBase64(outputPath));
          $('#outputSize').html(getFileSize(outputPath));
          $("#convTime").html(printCt);
          $('#saveBtn').attr("disabled",false);
          $('#outputLoading').removeClass("is-active")
          $('#convertBtn').attr("disabled", false);
          $('#stopBtn').attr('disabled', true);
          stopOutputLoad();
          showOutputInfo();
          showOutput();
        }, 10);
        
        // Register started processes
        pstree(window.guetzli.pid, function(err, proc){
          proc.map(function (p) {
            console.log("Adding " + p.PID);
            pids.push(p.PID); // to variable here
          });
          ipcRenderer.send("add-pid", pids); // to main process
        });

      });
    };
  });
  
  $('#stopBtn').click(function(){
    if ($('#stopBtn').attr('disabled') == "disabled") {
      console.log('stopBtn disabled!');
    } else {
      pstree(window.guetzli.pid, function(err, proc){
        proc.map(function (p) {
          console.log("killing " + p.PID);
          killPID(p.PID);
          ipcRenderer.send("remove-pid", p.PID);
        });
      });
      console.log("Process stopped.");
      window.guitzli = null;
      $('#stopBtn').attr('disabled', true);
      hideOutput();
    }
  });

  $('#saveBtn').click(function(){
    if ($('#saveBtn').attr('disabled') == "disabled") {
      console.log('saveBtn disabled!')
    } else { 
      var filePath = tempName;
      dialog.showSaveDialog({ filters: [  
          { name: 'JPEG Image', extensions: ['jpg'] }
        ]}, function (fileName) {
        if (fileName === undefined) return;
        // Copy from temp to indicated location.
        fs.createReadStream(filePath).pipe(fs.createWriteStream(fileName));
      });
    };
  });
  

});
