convertClicked = function(){
  if ($('#convertBtn').attr('disabled') == "disabled") {
    console.log('convertBtn disabled!')
  } else {
    $('#convertBtn').attr('disabled', true); 
    convertImg();
  };
};

saveClicked = function(){
  if ($('#saveBtn').attr('disabled') == "disabled") {
    console.log('saveBtn disabled!')
  } else { 
    saveOutputImg();
  };
};
