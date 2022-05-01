# Modules

Les modules sont des objets, des variables, ou des fonctions javascript utilisables conjointement avec CrimsonSand, mais sans faire partie des méthode. Les modules ne sont donc pas des plugins.

Un module peut simplement être une variable globale réutilisable dans le code.

## Fonctionnement

mon_module.js
```javascript
function hello(){
    return 'bonjour';
}
```

mon_code.js
```javascript
console.log(hello());
```

Les modules ont vocation à simplifier la tâche du développeur en lui donnant directement accès à une ressources sans avoir besoin de la connaître entièrement.