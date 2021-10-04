cnsPlugins.css = {

    extend: 'for',
    authors: ['Enzo Aicardi'],
    links: {portfolio: 'https://enzo.aicardi.pro'},
    version: '1.0.0',

    // réception des arguments
    function: function(arg){
    
        // fonction css
        function css(f, tg){

            var t = tg.current;
            var k = 0;
            var id = tg.id;
            var smooth = false;
        
            function set(kt){
        
                try{
        
                k = kt ? k + kt : 0;
                if(k < arg.length){
        
                    var max = 0;
                    var next = 0;
                    var pau = 0;
                    t.style.transition = smooth ? t.style.transition : '';
        
                    var obj = arg[k];
                    for(var p in obj){
        
                        var v = typeof obj[p] === 'object' ? obj[p] : f.throw({p: p, d: arg, m: m.se});
        
                        switch (p){
        
                            case 'pause':
                                pau = typeof v[0] === 'number' && v[0] >= 0 ? v[0] : f.throw({p: p, d: arg, m: m.nn});
                                break;
        
                            case 'next':
                                next = typeof v[0] === 'number' && v[0] >= 0 ? v[0] : f.throw({p: p, d: arg, m: m.nn});
                                break;
        
                            case 'smooth':
                                smooth = typeof v[0] === 'boolean' ? v[0] : f.throw({p: p, d: arg, m: m.nb});
                                break;
        
                            case 'class':
                                if(typeof v[1] === 'string'){
                                    if(v[0] === 'add'){ t.classList.add(v[1]); }
                                    else if(v[0] === 'remove'){ t.classList.remove(v[1]); }
                                }else{ f.throw({p: p, d: arg, m: m.ns}); }
                                break;
        
                            default:
                                var du = v[0] || 0;
                                var de = v[3] || 0;
        
                                var add = p + ' ' + du + 'ms ' + (v[2] || 'linear') + ' ' + de + 'ms';
                                var find = false;
        
                                if(smooth){
                                    var array = t.style.transition.split(/s(, |;|$)/);
                                    var reg = new RegExp(p);
        
                                    for(var w=0; w<array.length; w++){
                                        if(reg.test(array[w])){
                                            find = true;
                                            t.style.transition = t.style.transition.replace(array[w]+'s', add);
                                            w = array.length;
                                        }
                                    }
                                }
                                
                                if(find === false){
                                    t.style.transition += (!t.style.transition ? '' : ', ') + add;
                                }
        
                                t.style[p] = v[1];
        
                                var cu = du + de;
                                max = cu > max ? cu : max;
                                break;
        
                        }
        
                    }
        
                    // next property-set
                    setTimeout(function(){
        
                        // last element
                        if(k === arg.length-1){
        
                            f.next(f);
        
                        }else{ set(1); }
        
                    }, (next || max) + pau);
        
                }
        
                }catch(e){
                    // on evite les doublons d'erreur
                    if(id === 0){
                        f.log(e);
                    }
                }
                
            }
        
            set();
        
        }

        // on retourne css comme fonction de for
        return [css];

    }

};