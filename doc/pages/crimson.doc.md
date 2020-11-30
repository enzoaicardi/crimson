# Crimson

Crimson est une fonction qui permet la mise en place d'animations web contrôlables grace à des méthodes personnalisées.

<a href="../lib/crimson.js" download>Télécharger ici</a>

## Caractéristiques

Crimson respecte la charte suivante :

- Compatible ES5 (+95% des navigateurs)
- Très Léger (~60 lignes de code non compacté)
- Fiable (utilisable en production)

## Fonctionnement

Crimson utilise `requestAnimationFrame` pour fonctionner, et ajoute une mince surcouche qui permet de mettre en place et de controler facilement les animations.

## Créer une animation

La librairie Crimson ne comporte qu'une fonction du même nom `crimson()` qui prend un seul argument. Cet argument doit être un objet javascript. Dans cet objet il est possible de renseigner plusieurs paramètres qui seront détaillés dans les sections suivantes.

\* indique les champs obligatoires.

```javascript
crimson({...});
```

### * duration

```javascript
crimson({
    duration: 1000
});
```

Définit la durée de l'animation en **millisecondes**.
Pensez à vérifier qu'aucune transition concernant vos propriétés n'est définie sur vos éléments, sinon le déroulé de l'animation peut être fortement altéré.

### progress

```javascript
crimson({
    progress: 0.5
});
```

Un nombre entre 0 et 1 qui représente le **ratio** de départ de l'animation.

### easing
```javascript
crimson({
    easing: EASING.function
});
```

Représente la fonction d'assouplissement de l'animation.
Il est possible de spécifier un tableau de fonctions.
[En savoir plus](?page=easings).

### * animation

```javascript
crimson({
    animation: function(p, l){
        // increment some value here
    }
});
```

Indique la fonction qui sera effectué à chaque repeinture lors de l'animation. Cette fonction prend deux arguments, le premier correspond au ratio courant de l'animation selon la fonction d'**assouplissement**, le second correspond au ratio de l'animation **linéaire**.

Le premier et le second sont équivalent si aucune fonction d'assouplissement n'est spécifiée. Si un tableau de fonctions d'assouplissement est utilisé, alors le second argument est un tableau
des ratios de ces mêmes fonctions.

### onfinish
```javascript
crimson({
    onfinish: function(l){
        // do something here
    }
});
```

Indique la fonction à effectuer lorsque l'animation sera terminée. Cette fonction ne prend qu'un argument correspondant au ratio final de l'animation.

### debug
```javascript
crimson({
    debug: true|false
});
```

Indique si l'animation doit livrer des informations dans la console concernant son état.

## Utilisation

Une fois définie, une animation ne fait rien toute seule. Il est nécessaire d'utiliser les différentes méthodes fournies par `crimson()`, pour cela dans un premier temps il faut assigner l'animation à une variable.

```javascript
var animation = crimson({
    duration: 1000,
    animation: function(){
        // increment something here
    }
});
```

Maintenant c'est depuis notre variable `animation` que l'on peut accéder aux différentes méthodes listées ci-dessous.


### start

Pour lancer une animation il suffit d'utiliser la méthode start de cette animation.

```javascript
animation.start(ratio);
```

La méthode **start** peut prendre un argument (facultatif) qui correspond au ratio de départ
de l'animation, le cas contraire il sera équivalent à `progress || 0`.

### pause

```javascript
animation.pause();
```

Cette méthode met en pause l'animation en cours.


### play

```javascript
animation.play();
```

Cette méthode permet d'enlever la pause de l'animation.

### jumpTo

```javascript
animation.jumpTo(ratio);
```

Cette méthode déplace l'animation au ratio spécifié en paramètre.
Attention cependant si l'animation est en **pause** il faudra enlever la pause à l'aide
de **play** pour que le saut soit réalisé.

### moveTo

```javascript
animation.moveTo(ratio);
```

Même principe que pour **jumpTo** à la différence que l'effet est visible lorsque l'animation est
en **pause** ou non débutée.
Attention cependant contrairement à **jumpTo** cette méthode mettra en pause l'animation si celle-ci
est en cours de lecture.


### reverse

```javascript
animation.reverse();
```

Cette méthode permet d'inverser le déroulé de l'animation à n'importe quel moment,
c'est à dire pendant une **pause** ou même si elle n'a pas débuté, mais aussi pendant qu'elle se déroule.
Attention cependant **start** n'annule pas un appel de **reverse**, il faudra donc appeler à nouveau
**reverse** pour jouer l'animation à l'endroit.