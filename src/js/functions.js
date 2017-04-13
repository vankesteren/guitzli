$(function(){
  const cp = require('child_process');
  const os = require('os');
  const tmp = require('temp');
  const fs = require('fs');
  const path = require('path');
  const { dialog } = require('electron').remote;

  tmp.track()

  // connections with interface logic
  $('#openBtn').click(function(){
    var filePath = dialog.showOpenDialog({ filters: [
      { name: 'Image File', extensions: ['jpg', 'png'] }
    ]});
    console.log(filePath);
    if (typeof filePath == "undefined") { return; }
    $('#inputImg').attr("src", filePath);
    $('#convertBtn').attr("disabled", false);
  });

  $('#convertBtn').click(function() {
    if ($('#convertBtn').attr('disabled') == "disabled") {
      console.log('convertBtn disabled!')
    } else {
      $('#convertBtn').attr('disabled', true); 
      var inputImg = $('#inputImg').attr('src');
      var arch = os.arch();
      var platform = os.platform();
      var tempName = tmp.path({suffix: '.jpg'});
      var mem = os.freemem() / 1000000;
      var memtot = os.totalmem() / 1000000;
      var quality = $('#qualitySlider').val()
      $('#gly').attr('class',"glyphicon glyphicon-refresh gly-spin")
      
      if (platform === "win32" && arch === "x64"){
        var cmd = path.join(__dirname, "\\bin\\guetzli_windows_x86-64.exe");
      } else if (platform === "win32" && (arch === "x32" || arch === "x86")) {
        var cmd = path.join(__dirname, "\\bin\\guetzli_windows_x86.exe");
      } else if (platform === "darwin" && arch === "x64") {
        var cmd = path.join(__dirname, "\\bin\\guetzli_darwin_x86-64");
      } else if (platform === "linux" && arch === "x64"){
        var cmd = path.join(__dirname, "\\bin\\guetzli_linux_x86-64");
      }
      
      var command = cmd + " --quality " + quality + " --memlimit " + memtot + " " + inputImg + " " + tempName
      console.log(command)
      console.log("Converting...")
      
      window.guetzli = cp.exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
          $('#gly').attr("class","glyphicon glyphicon-forward")
          $('#convertBtn').attr("disabled", false);
          dialog.showMessageBox({ message: `Guetzli error: ${error}`,
                                  buttons: ["OK"] });
          return;
        }
        console.log('Conversion complete, file in: ' + tempName)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log(tempName);
        $('#outputImg').attr("src", tempName);
        $('#saveBtn').attr("disabled",false);
        $('#gly').attr("class","glyphicon glyphicon-forward")
        $('#convertBtn').attr("disabled", false);
      });
    };
  });

  $('#saveBtn').click(function(){
    if ($('#saveBtn').attr('disabled') == "disabled") {
      console.log('saveBtn disabled!')
    } else { 
      var filePath = $('#outputImg').attr("src")
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
