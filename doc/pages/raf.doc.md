# Crimson (plugin)

Le plugin crimson utilise la librairie [crimson](?page=crimson). Il permet de mettre en place une animation qui sera directement démarrée et passera à la méthode suivante lors de `onfinish`.

<a href="../plugins/plugin.crimson.js" download>Télécharger ici</a>

## Fonctionnement

```javascript
cns([
    'crimson', [{...}]
]);
```

Cette méthode ne prend qu'un argument qui est un objet javascript, vous en trouverez les détails sur [cette page](?page=crimson).

### animation

```javascript
cns([
    'crimson', [{
        animation: function(p, l, t){
            // increment something here
        }
    }]
]);
```

La principale différence avec **crimson** c'est qu'il est possible de récupérer au travers du paramètre animation, l'argument **t** qui représente l'objet **t** ou **target** de [for](?page=crimsonsand#for).

### onfinish

```javascript
cns([
    'crimson', [{
        onfinish: function(p, t){
            // do something here
        }
    }]
]);
```

La principale différence avec **crimson** c'est qu'il est possible de récupérer au travers du paramètre onfinish, l'argument **t** qui représente l'objet **t** ou **target** de [for](?page=crimsonsand#for).