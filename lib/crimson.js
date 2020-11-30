/* CrimsonSand
    author: Enzo Aicardi,
    website: enzoaicardi.com,
    creation_date: 16/11/2020,
    license: GNU GPLv3
*/

var animeCallBack = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

function crimson(obj){

    var debug       = obj.debug || false;
    var pstart      = obj.progress || 0;
    var pcurrent    = obj.progress || 0;
    var animation   = obj.animation || function(){};
    var onfinish    = obj.onfinish || function(){};
    var easing      = obj.easing || 'linear';
    var paused      = false;
    var invert      = false;
    
    var time = {
        start: performance.now(),
        total: obj.duration || 0
    };

    function anime(now){

        time.elapsed = Math.max(now - time.start, 0);

        var p = time.elapsed / time.total;
        p = invert?Math.max(pstart-p,0):Math.min(p+pstart, 1);

        pcurrent = p;
        var ep = p;

        if(typeof easing === 'function'){ ep = easing(p); }
        else if(typeof easing === 'object'){ ep = []; for(var i=0; i<easing.length; i++){ progress.push(easing[i](p)); } }
        if(debug){ console.log('crimson: animation running... \np = '+ep+';\nl = '+p+';'); }
    
        animation(ep, p);

        if(p && (invert?p>0:p<1) && !paused){
            animeCallBack(anime);
        }else if(!paused){ paused = true; onfinish(ep, p); }

    }

    function start(v){  paused = false; time.start = performance.now(); pstart = v || obj.progress || invert?1:0; animeCallBack(anime); }
    function stop(){    pstart = invert?1:0; }
    function play(){    if(paused){paused = false; time.start = performance.now(); pstart = pcurrent; animeCallBack(anime);}}
    function pause(){   paused = paused?false:true}
    function moveTo(v){ paused = true; time.start = performance.now(); pstart = v || 0; animeCallBack(anime); }
    function jumpTo(v){ pstart = v || 0; }
    function reverse(){ time.start = performance.now(); pstart = pcurrent; invert = invert?false:true; }

    return {
        start: start, stop: stop,
        moveTo: moveTo, jumpTo: jumpTo,
        play: play, pause: pause,
        reverse: reverse
    }

}