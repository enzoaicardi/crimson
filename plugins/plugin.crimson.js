cnsPlugins.crimson = {

    extend: 'for',
    authors: ['Enzo Aicardi'],
    links: {portfolio: 'https://enzo.aicardi.pro'},
    version: '1.0.0',
    dependencies: {
        crimson: ['1.0.0', 'crimson is required']
    },

    // réception des arguments
    function: function(arg){

        function animate(f, tg){

            var obj = typeof arg[0] === 'object'?arg[0]:f.log({p: 'crimson', m: m.no, d: arg});

            var animation = typeof obj.animation === 'function'?function(p, l){obj.animation(p, l, tg);}:function(){};
            var onfinish = typeof obj.onfinish === 'function'?function(l){obj.onfinish(l, tg);f.next(f);}:function(){};

            var an = crimson({

                debug: obj.debug || false,

                duration: obj.duration || 0,
                progress: obj.progress || 0,
                easing: obj.easing || 'linear',

                animation: animation,
                onfinish: onfinish

            });

            an.start();

        }

        return [animate];

    }

}