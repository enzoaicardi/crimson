
var nav = document.querySelector('body > nav');
var main = document.querySelector('body > main');

function getURL(url){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        main.innerHTML = marked(xhr.responseText);
        document.title = 'CrimsonDoc | '+url;
        var code = document.querySelectorAll('main pre code');
        for(var i=0; i<code.length; i++){
            hljs.highlightBlock(code[i]);
        }
    };

    var cs = document.querySelector('nav > section#'+url);
    if(cs){cs.style.height = 'auto';}

    xhr.open('GET', 'pages/'+url+'.doc.md', true);
    xhr.send();
}

if(window.location.search){
    getURL(window.location.search.replace('?page=',''));
}
else{
    getURL('librairies');
}