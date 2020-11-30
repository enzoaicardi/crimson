console.log('tester loaded');
cnsPlugins.tester = {

    extend: 'css',
    authors: ['Enzo Aicardi'],
    links: {portfolio: 'https://enzoaicardi.com'},
    version: '1.0.0',
    dependencies: {
        css: ['1.0.0', 'plugins/plugin.css.js']
    },
    function: function() {
        return [
            {
                'background-color': [500, 'red']
            }
        ];
    }

}