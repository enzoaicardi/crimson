var docBut = document.querySelector('.home a');
var docButAnimation = crimson({
    duration: 2000,
    easing: EASING.easeInQuint,
    animation: function(p){
        docBut.style.backgroundImage = 'linear-gradient(to right, transparent '+(100*p)+'%, #EBD37C 0%, #EBD37C)';
    },
    onfinish: function(){
        docButAnimation2.start();
    }
});
var docButAnimation2 = crimson({
    duration: 1000,
    easing: EASING.easeOutQuint,
    animation: function(p){
        if(p>0.9){
            docBut.style.color = '#252423';
        }
        docBut.style.backgroundImage = 'linear-gradient(to right, #EBD37C '+(100*p)+'%, transparent 0%, transparent)';
    }
});

var logoBig = document.querySelector('.logo-big');
var logoAnimation = crimson({
    duration: 2000,
    easing: EASING.easeOutQuint,
    animation: function(p, l){
        logoBig.style.opacity = l;
        docBut.style.opacity = l;
        logoBig.style.transform = 'translateY(-'+(10*(1-p))+'vmin)';
    }
});

logoAnimation.start();
docButAnimation.start();

var secQueue = document.querySelector('section.queue');

cns([
    // 'debug', [true],
    '$', ['.home .arrow'],
    'css', [
        {'transform': [400, 'translateY(10px)', 'ease']},
        {'transform': [2000, 'translateY(0px)', 'linear']}
    ],
    'repeat', ['infinite', 1]
]);


function arrowClick(){
    var a = window.pageYOffset, b = secQueue.offsetTop, c=true;
    var an = crimson({
        duration: 1000,
        easing: EASING.easeOutQuint,
        animation: function(p){
            window.scrollTo(0, p*(b-a)+a);
        }
    });

    an.start();
}

var planet = document.querySelectorAll('.planet > div');
function planetRotate(target, time){
    var an = crimson({
        duration: time,
        animation: function(p){
            target.style.transform = 'rotateZ('+p*360+'deg)';
        },
        onfinish: function(){
            an.start();
        }
    }); 
    an.start();
}

planetRotate(planet[0], 10000);
planetRotate(planet[1], 6000);
planetRotate(planet[2], 8000);

var moveto = document.querySelector('.moveto');
var cursor = moveto.querySelector('.cursor svg');
var cursorBAR = moveto.querySelector('.cursor');
var cursorBC = cursorBAR.getBoundingClientRect();
var cDOWN = false;

cursor.addEventListener('mousedown', cursorDOWN, {passive:true});
cursor.addEventListener('touchstart', cursorDOWN, {passive:true});
function cursorDOWN(){ cDOWN = true; }

document.addEventListener('mouseup', cursorUP, {passive:true});
document.addEventListener('touchend', cursorUP, {passive:true});
function cursorUP(){ cDOWN = false; }

moveto.addEventListener('mousemove', cursorMOVE, {passive:true});
moveto.addEventListener('touchmove', cursorMOVE, {passive:true});
function cursorMOVE(e){
    if(cDOWN){
        var ev = e.type === 'mousemove' ? e : e.touches[0];
        var x = ev.clientX;
        var bl = cursorBC.left+15;
        var bw = cursorBAR.offsetWidth-30;

        if(x-bl>=0 && x-bl<=bw){
            cursor.style.left = (x-bl) + 'px';
            cast.moveTo((x-bl)/bw);
        }
    }
}

var castBall = document.querySelector('.moveto .cast .ball');
var castBorder = document.querySelector('.moveto .cast .border');
var cast = crimson({
    duration: 3000,
    easing: EASING.easeOutBounce,
    animation: function(p, l){
        castBall.style.top = 'calc('+(p*100)+'% - '+(p*30)+'px)';
        castBall.style.left = 'calc('+(l*100)+'% - '+(p*30)+'px)';
        castBorder.style.left = 'calc('+(l*100)+'% - '+(p*30)+'px)';
    }
});

var controls = document.querySelector('.controls');
var color = '#aaaaaa';
var sundata = [false, false, 0];

var sun = crimson({
    duration: 2000,
    easing: EASING.easeOutQuint,
    animation: function(p, l){
        controls.style.backgroundImage = 'radial-gradient(circle at 50% 50%, transparent '+(p*100-(1-l)*30)+'%, '+color+' '+(p*100)+'%, transparent '+(p*100+30)+'%)';
    },
    onfinish: function(){
        color = color === '#aaaaaa' ? '#EBD37C' : '#aaaaaa';
        sun.start(sundata[2]);
    }
});

var sunPLAY = controls.querySelector('.play');
var sunREVERSE = controls.querySelector('.reverse');

sunPLAY.addEventListener('click', function(){
    if(!sundata[0]){
        sunPLAY.innerHTML = '<svg><use xlink:href="#play"></use></svg>';
        sundata[0] = true;
        sundata[1] = true;
        sun.start();
    }else if(!sundata[1]){
        sunPLAY.innerHTML = '<svg><use xlink:href="#play"></use></svg>';
        sundata[1] = true;
        sun.play();
    }else{
        sunPLAY.innerHTML = '<svg><use xlink:href="#pause"></use></svg>';
        sundata[1] = false;
        sun.pause();
    }
}, {passive:true});

sunREVERSE.addEventListener('click', function(){
    sun.reverse();
    sundata[2] = sundata[2] === 0 ? 1 : 0;
}, {passive:true});

var source = document.querySelector('.source');
var pc = source.querySelector('.pc');
var ecran = pc.querySelector('.ecran');
var chassis = pc.querySelector('.chassis');
var opened = false;

function isIE() {
    const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    const msie = ua.indexOf('MSIE '); // IE 10 or older
    const trident = ua.indexOf('Trident/'); //IE 11

    return (msie > 0 || trident > 0);
}
if(!isIE()){
    document.addEventListener('scroll', openPc, {passive:true});
}else{
    console.log('Vous utilisez internet explorer, vous ne devriez pas. Certaines animations sont désactivées.');
    pc.textContent = 'Incompatible avec Internet Explorer.'
    ecran.style.display = 'none';
    chassis.style.display = 'none';
    pc.style.border = '2px solid crimson';
}

function openPc(){
    if(window.pageYOffset >= source.offsetTop - source.offsetHeight/8 && !opened){
        opened = true;
        ecran.style.width = '88%';
        ecran.style.left = '6%';
        ecran.style.transform = 'translateZ(-40vmin) translateY(-15vmin) rotateX(0deg)';
        chassis.style.width = '80%';
        chassis.style.left = '10%';
        chassis.style.transform = 'translateZ(-30vmin) translateY(30vmin) rotateX(45deg)';
        document.removeEventListener('scroll', openPc, {passive:true});
    }
}