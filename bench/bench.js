
cnsPlugins.donne = {
    extend: 'exec',
    function: function(params, s) {
        s.setStorage(['définit']);
        return [function(f){f.next();}];
    }
}

cnsPlugins.recois = {
    extend: 'exec',
    function: function(params, s) {
        console.log(s.getStorage('donne'));
        return [function(f){f.next();}];
    }
}

cns([
    '$', ['body'],
    'donne', [],
    'recois', [],
    'recois', []
]);

cns([
    '$', ['body'],
    'pause', [1000],
    'recois', []
]);