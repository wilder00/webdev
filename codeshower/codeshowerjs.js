const editor=document.getElementById('editable');
editor.addEventListener('keydown',function(event) {
  
  if (event.code==='Enter'){
    var c = document.createElement('code');
    editor.appendChild(c);
    c.focus();
  }
});