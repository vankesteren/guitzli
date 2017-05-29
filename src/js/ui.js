$(function(){
  
  // This is where ui functionality lives.
  
  // Variables
  var licenseLink = "https://opensource.org/licenses/MIT";
  var aboutLink = "https://github.com/vankesteren/guitzli";
    
  // Connections
  $("#toggleInput").click(function(){toggleInput()});
  $("#toggleOutput").click(function(){toggleOutput()});
  $("#license").click(function(){openUrl(licenseLink)});
  $("#about").click(function(){openUrl(aboutLink)});
  
  // Local UI-only functions
  function toggleInput() {
    if ($("#toggleInput").children().html() == "keyboard_arrow_down"){
      $("#toggleInput").children().html("keyboard_arrow_up");
      $("#inputImg").parent().show();
    } else {
      $("#toggleInput").children().html("keyboard_arrow_down");
      $("#inputImg").parent().hide();
    }
  }
  
  function toggleOutput() {
    if ($("#toggleOutput").children().html() == "keyboard_arrow_down"){
      $("#toggleOutput").children().html("keyboard_arrow_up");
      $("#outputImg").parent().show();
    } else {
      $("#toggleOutput").children().html("keyboard_arrow_down");
      $("#outputImg").parent().hide();
    }
  }
  
  function openUrl(url) {
    require('electron').shell.openExternal(url)
  }
  
  // Global functions
  window.hideMenu = function() {
    $(".demo-drawer").removeClass("is-visible");
    $(".mdl-layout__obfuscator").removeClass("is-visible");
  }
  
  window.showInput = function() {
    $("#inputImg").parent().show();
    $("#toggleInput").show();
    if ($("#toggleInput").children().html() == "keyboard_arrow_down"){
      $("#toggleInput").children().html("keyboard_arrow_up");
    }
  }
  
  window.showOutput = function() {
    $("#outputImg").parent().show();
    $("#toggleOutput").show();
    if ($("#toggleOutput").children().html() == "keyboard_arrow_down"){
      $("#toggleOutput").children().html("keyboard_arrow_up");
    }
  }
  
  window.hideOutput = function() {
    $("#outputImg").parent().hide();
    if ($("#toggleOutput").children().html() == "keyboard_arrow_up"){
      $("#toggleOutput").children().html("keyboard_arrow_down");
    }
    $("#toggleOutput").hide();
  }
  
  window.startInputLoad = function() {
    $("#inputLoading").addClass("is-active");
  }
  
  window.stopInputLoad = function() {
    $("#inputLoading").removeClass("is-active");
  }
  
  window.startOutputLoad = function() {
    $("#outputLoading").addClass("is-active");
  }
  
  window.stopOutputLoad = function() {
    $("#outputLoading").removeClass("is-active");
  }
  
  window.showInputInfo = function() {
    $("#inputInfo").show();
  }
  
  window.showOutputInfo = function() {
    $("#outputInfo").show();
  }
});
