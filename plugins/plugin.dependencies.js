cnsPlugins.findDependencies = function(name){
    var pl = cnsPlugins[name].dependencies || null, ms = '';
    for(dep in pl){ ms+= '\n  '+(cnsPlugins[dep]?'+ ':'- ')+dep+'@'+pl[dep][0]+' '+pl[dep][1]; }
    console.warn(name+': '+ms);
};

cnsPlugins.getDependencies = function(name){
    var pl = cnsPlugins[name].dependencies || null, plBlock = document.body || null;
    var ms = '';
    if(pl && plBlock){for(dep in pl){ 
        if(pl[dep][1]){
            var script = document.createElement('script'), version = pl[dep][0] || 'all';
            script.dataset.plugin = dep;
            script.dataset.version = version;
            script.src = pl[dep][1];
            plBlock.appendChild(script);
            ms+='\n+ '+dep+'@'+version+' from '+pl[dep][1];
        }else{
            ms+="\n- can't find "+dep+"'s link";
        }
    }
    console.log(name+': '+ms);}
};