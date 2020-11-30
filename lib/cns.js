/* CrimsonSand
    author: Enzo Aicardi,
    website: enzoaicardi.com,
    creation_date: 16/11/2020,
    license: GNU GPLv3
*/

var cnsPlugins = {};
var m = {
    ns: '(need) [string]',
    nn: '(need) [number]',
    nb: '(need) [true|false]',
    nf: '(need) [function()]',
    na: '(need) [[...]]',
    no: '(need) [{...}]',
    ne: '(need) [Element]',

    de: 'does not exist',
    se: '(syntax error) the method must be a string and the argument an array',
    es: 'empty selector [$]',

    pm: 'plugin is missing'
};

function cns(a){

    // NodeLists
    var origin = [];
    var el = [];

    // global access
    var i = 0;
    var l = 0;
    var cnsDebug = false;
    var argument = [];

    // default
    var itv = 0;
    var itvObj = [];
    var wait = false;
    var repeat = 0;

    // plugins
    var storage = {};

    // explore array
    q();
    function q(it, ext, extArg){

        try {
        // if "it !== 0" ... else "i = 0" for "repeat, [..., 0] to restart the entire queue"
        i = it === 'extend' ? i : it && it !== 0 ? i + it : 0;

        if(i < a.length){

            // for extended plugin argument = a[i+1] to preserve the original array in case of repeating queue
            // it's the same for method who preserve the original a[i] for good error name in method
            argument = extArg || a[i+1];
            
            var method = ext || a[i];
            var arg = argument;

            if(typeof method === 'string' && typeof arg === 'object'){

                if(cnsDebug && !ext){
                    // i === 2 car a[0] et a[1] => 'debug', [true]
                    if(i === 2){ console.log('cns() %cqueue launched', 'color:#EBD37C;'); }
                    console.log('exec: %c'+a[i], 'color:#EBD37C;');
                }
                
                // methods
                switch (method){

                    case '$':
                        origin = [].slice.call(typeof arg[0] === 'string' ? document.querySelectorAll(arg[0]) :
                            arg[0] instanceof NodeList || Array.isArray(arg[0]) ? arg[0] : 
                            arg[0] instanceof Element ? [arg[0]] : 
                            arg[0] === window || document ? [arg[0]] : CrimsonThrow({p: a[i], m: m.ns + ' or ' + m.ne}));
                        el = origin.slice();
                        q(2);
                        break;

                    case '$cut':
                        cut(arg);
                        break;

                    case '$order':
                        order(arg[0], arg[1] || 'normal');
                        break;

                    case '$duplicate':
                        if(typeof arg[0] === 'number' && arg[0] >= 0){
                            var array = el.slice();
                            for(var w=0; w<num; w++){ el = el.concat(array); }
                            q(2);
                        }else{ CrimsonThrow({p: '$duplicate', m: m.nn}); }
                        break;

                    case 'interval':
                        var duration = typeof arg[0] === 'number' && arg[0] >= 0 ? arg[0] : CrimsonThrow({p: a[i], m: m.nn});
                        itv = duration || 0;
                        itvObj = arg;
                        q(2);
                        break;

                    case 'wait':
                        wait = typeof arg[0] === 'boolean' ? arg[0] : CrimsonThrow({p: a[i], m: m.nb});
                        q(2);
                        break;

                    case 'pause':
                        setTimeout(function() { q(2); }, typeof arg[0] === 'number' ? arg[0] : CrimsonThrow({p: a[i], m: m.nn}));
                        break;

                    case 'repeat':
                        var mul = typeof arg[1] === 'number' ? arg[1] : typeof arg[1] === 'string' ? arg[1] === 'restart' ? 0 : CrimsonThrow({p: a[i], m: 'only restart is accepted as string'}) : 1;
                        if(arg[0] === 'infinite'){ q(mul*(-2)); }
                        else if(typeof arg[0] === 'number' && repeat < arg[0]){ repeat++; q(mul*(-2)); }
                        else{ repeat = 0; q(2); }
                        break;

                    case 'debug':
                        cnsDebug = typeof arg[0] === 'boolean' ? arg[0] : false;
                        q(2);
                        break;

                    case 'exec':
                        if(typeof arg[0] === 'function'){
                            arg[0]({next: next_exec, throw: CrimsonThrow, log: CrimsonLog}, {all: el});
                        }else{ CrimsonThrow({p: a[i], m: m.nf}); }
                        break;

                    case 'for':
                        if(typeof arg[0] === 'function'){
                            each(arg[0]);
                        }else{ CrimsonThrow({p: a[i], m: m.nf}); }
                        break;

                    default:
                        var p = cnsPlugins[method];
                        if(arg && typeof p === 'object'
                        && typeof p.extend === 'string'
                        && typeof p.function === 'function'){ 
                            var s = {
                                getStorage: function(name){return storage[name];},
                                setStorage: function(value){storage[method] = value;return value;}
                            }
                            q('extend', p.extend, p.function(arg, s));
                        }
                        else if(ext){ CrimsonThrow({p: ext, m: m.pm, d: cnsPlugins[a[i]].dependencies || null, dep: true}); }
                        else{ CrimsonThrow({p: a[i], m: m.de}); }
                        break;

                }

            }

            else{
                CrimsonThrow({p: a[i], m: m.se});
            }

        } else if(cnsDebug && repeat === 0){
            console.log('cns() %cqueue finished', 'color:#EBD37C;');
        }

        }catch(e){
            CrimsonLog(e);
        }

    }

    // NodeList re-order
    function order(arg, mode){

        var list = origin.slice();
        if(list.length < 1){ CrimsonLog({p: '$order', m: m.es, t: 'warn'}); }

        switch (arg){
            case 'normal':
                el = list;
                break;
            case 'invert':
                el = list.reverse();
                break;
            case 'center':
                var array = [];
                for(var w=0; w<list.length; w++){
                    array.push(w%2 === 0 ? w/2 : list.length-((w+1)/2));
                }
                reOrder(array);
                break;
            case 'random':
                var array = [];
                var index = [];
                for(var w=0; w<list.length; w++){index.push(w);}
                for(var w=0; w<list.length; w++){
                    var num = Math.round(Math.random() * (index.length-1));
                    array.push(list[index[num]]);
                    index.splice(num, 1);
                }
                el = array;
                break;
            
            default:
                if(Array.isArray(arg)){ reOrder(arg); }
                else{CrimsonThrow({p: '$order', m: 'bad argument'});}
                break;
        }

        if(mode && mode === 'reverse'){
            el = el.reverse();
        }

        function reOrder(y){
            var array = [];
            for(var w=0; w<y.length; w++){
                var num = typeof y[w] === 'number' ? y[w] : typeof y[w][0] === 'number' ? (percentOfOrigin(y[w][0])-1) : 'none';
                if(list[num]){ array.push(list[num]); }
            }
            el = array;
        }

        q(2);

    }

    // NodeList cut
    function cut(arg){

        // [int, [percent]]
        var st = typeof arg[0] === 'number' ? arg[0] : Array.isArray(arg[0]) && typeof arg[0][0] === 'number' ? percentOfOrigin(arg[0][0]) : 0;
        var en = typeof arg[1] === 'number' ? arg[1] : Array.isArray(arg[1]) && typeof arg[1][0] === 'number' ? percentOfOrigin(arg[1][0]) : 0;

        var se = (origin.length - en);
            el = origin.slice(st, se);
            origin = origin.slice(st, se);
        
        q(2);

    }

    function percentOfOrigin(num){
        return Math.round(((origin.length * num)/100));
    }


    function interval(num){

        if(itvObj.length > 2){
            function intervalPos(){
                var total = 0;
                for(var w=0; w<itvObj.length; w+=2){
                    total += typeof itvObj[w+1] === 'number' ? itvObj[w+1] : 1;
                    if(num < total){
                        itv = itvObj[w];
                        w = itvObj.length;
                    }
                }
                if(num >= total){
                    num -= (total*(Math.floor(num/total)));
                    intervalPos();
                }
            }
            intervalPos();
        }
    }

    // next in exec
    function next_exec(pos){
        q((typeof pos === 'number' ? pos : 1) * 2);
    }

    // next in for
    function next_for(obj, pos){
        if(wait === true && obj.id < el.length-1){
            each(obj.this, 1);
        }
        else if(obj.id === el.length-1){
            q((typeof pos === 'number' ? pos : 1) * 2);
        }
    }

    // loop to for method
    function each(f, lt){

        l = lt && lt !== 0 ? l + lt : 0;
        interval(l);

        if(l < el.length){
            if(wait === true){
                f({next: next_for, this: f, id: l, throw: CrimsonThrow, log: CrimsonLog}, {current: el[l], all: el, id: l});
            }else{
                f({next: next_for, this: f, id: l, throw: CrimsonThrow, log: CrimsonLog}, {current: el[l], all: el, id: l});
                if(l < el.length-1){
                    if(itv > 0){
                        setTimeout(function(){ each(f, 1); }, itv);
                    }else{ each(f, 1); }
                }
            }
        }else{
            l=0;
        }

    }

    function CrimsonThrow(errorObj){ 
        throw errorObj;
    }

    // Errors log style
    function CrimsonLog(error){

        var p = error.p || a[i] || 'unknown';
        var m = error.m || error.message;
        var t = error.t || 'fatal';

        if(t === 'warn'){ console.warn(p + ': ' + m); }
        else{ console.error(p + ': ' + m); }

        // debugger
        if(cnsDebug){

            var data = error.d || argument;
            var hasFunc = false;
            var str = '"' + a[i] + '", ' + JSON.stringify(data, function(key, val){
                if(typeof val === 'function'){ if(hasFunc === false){ hasFunc = true; return val.toString(); } }
                else{ return val; }
            }, '\t');

            var sp = str.replace('"'+p+'"', '%c"'+p+'"%c');
            if(hasFunc){ sp = sp.replace(/\\n/gi, '\n').replace(/^    /gim, ''); }

            console.warn((error.dep ? 'Check dependencies:\n' : 'Suspected elements:\n') + sp,
            'color:red;',
            'color:unset;');

        }

    }

}