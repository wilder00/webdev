const wordReserved = ["for", "while", "do", "if", "else", "switch","break", "case","default","try","catch", "throw","finally","return", "null", "continue", "new", "import", "export"]

const jsReserved = ["undefined", "const", "let", "var", "function", "in", "instanceof", "this", "typeof","of", "async", "await"]

const simbolReserved = ["=", "*","+","-","/","<", ">","(",")","{","}","[","]"]



const codeTag = document.querySelector('.code-language')
let codeText = codeTag.textContent;
console.log("contenido: ",codeText);

/**
 * 
 * @param {String} codeText 
 * @param {String} reserved 
 * @param {String} cssClass 
 * @return {String} 
 */
const addTag = function(codeText, reserved, cssClass){
  let regex = new RegExp(reserved,'g')
  const tag = `<span class="${cssClass}">${reserved}</span>`
  let codeTextReplaced = codeText.replace(regex, tag)  
  return codeTextReplaced
}

const addTagForString = function(codeText, cssClass){
  const exp = /([\'\"].*?[\'\"])/
  let regex = new RegExp(exp,'g')
  const tagForReplace = `<span class="${cssClass}">$1</span>`
  let codeTextReplaced = codeText.replace(regex,tagForReplace)
  console.log(codeTextReplaced);
  return codeTextReplaced
}

for (const wordRes of wordReserved) {
  codeText = addTag(codeText,wordRes,"reserved")
}

for (const jsword of jsReserved) {
  codeText = addTag(codeText,jsword,"otro")
}
console.log(codeText);
/* codeText = addTagForString(codeText, "string") */

codeTag.innerHTML = codeText;

/* ESlint */
/* const editor=document.getElementById('editable');
editor.addEventListener('keydown',function(event) {
  
  if (event.code==='Enter'){
    var c = document.createElement('code');
    editor.appendChild(c);
    c.focus();
  }
}); */