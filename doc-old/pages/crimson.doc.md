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

# Créer une animation

La librairie Crimson ne comporte qu'une fonction du même nom `crimson()` qui prend un seul argument. Cet argument doit être un objet javascript. Dans cet objet il est possible de renseigner plusieurs paramètres qui seront détaillés dans les sections suivantes.

\* *indique les champs obligatoires.*

```javascript
crimson({...});
```

## Les paramètres

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
**Progress** n'est effectif qu'une fois, au premier lancement de l'animation.

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

Le premier et le second sont équivalent si aucune fonction d'assouplissement n'est spécifiée. Si un tableau de fonctions d'assouplissement est utilisé,
alors le premier argument est un tableau des ratios de ces mêmes fonctions.

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

## Les méthodes

Une fois définie, une animation ne fait rien toute seule. Il est nécessaire d'utiliser les différentes méthodes fournies par `crimson()`.
Dans un premier temps il faut assigner l'animation à une variable.

```javascript
var animation = crimson({
    duration: 1000,
    animation: function(){
        // increment something here
    }
});
```

Maintenant c'est depuis notre variable `animation` que l'on peut accéder aux différentes méthodes listées ci-dessous.

## Les contrôles

### start (obsolète depuis la version @1.1.1)

```javascript
// obsolète, utiliser play à la place
animation.start(ratio);
```

### play

```javascript
animation.play(ratio);
```

Cette méthode permet de lancer une animation ainsi que d'enlever la pause de l'animation.
La méthode **play** peut prendre un argument (facultatif) qui correspond au ratio de départ
de l'animation.

### pause

```javascript
animation.pause();
```

Cette méthode met en pause l'animation en cours.

### stop

```javascript
animation.stop();
```

Cette méthode stoppe l'animation en cours. La fonction **stop** déclenchera toujours
l'événement **onfinish**.

### jumpTo

```javascript
animation.jumpTo(ratio);
```

Cette méthode déplace l'animation au ratio spécifié en paramètre.
Attention cependant si l'animation est en **pause** il faudra enlever la pause à l'aide
de **play** pour que le saut soit joué.

Si aucun argument n'est spécifié, cette méthode renverra systématiquement au ratio 0 et
non au ratio courant, pour des raisons de performance.

*Ne déclenchera jamais l'evenement **onfinish** si l'animation est en pause.*

### moveTo

```javascript
animation.moveTo(ratio);
```

Même principe que pour **jumpTo** à la différence que l'effet est visible lorsque l'animation est
en **pause**.
Attention cependant contrairement à **jumpTo** cette méthode mettra en pause l'animation si celle-ci
est en cours de lecture.

Si aucun argument n'est spécifié, cette méthode renverra systématiquement au ratio 0 et
non au ratio courant, pour des raisons de performance.

*Ne déclenchera jamais l'evenement **onfinish**.*

Pour déclencher manuellement la fonction liée à **onfinish** il convient de tester manuellement le ratio
au sein de l'animation.

```javascript
animation = crimson({
    duration: 1000,
    animation: function(p, l){
        // do something ...
        if(l === animation.status().reverse?0:1){
            myOnfinishFunction();
        }
        // Ou si le ratio de fin est connu
        if(l === 1){ myOnfinishFunction(); }
    }
});
```

### reverse

```javascript
animation.reverse(true | false);
```

Cette méthode permet d'inverser le déroulé de l'animation à n'importe quel moment,
si l'animation n'est pas entrain de jouer, mais aussi pendant qu'elle se déroule.

**reverse** peut prendre un booléen en argument (facultatif) permettant de fixer
le statut de l'inversion.

## Les modifieurs

### change

```javascript
animation.change({

    duration: ...,
    easing: ...,
    progress: ...,
    animation: ...,
    onfinish: ...

});
```

Cette méthode permet de changer un ou plusieurs paramètres de l'animation simultanément
et à n'importe quel moment.

## Les statuts

### status

```javascript
animation.status();
```

Cette méthode renvoie le statut de l'animation au travers de différentes variables.

- `status().play` renvoie `true` si l'animation est entrain de jouer
- `status().reverse` renvoie `true` si l'animation est inversée
- `status().finish` renvoie `true` si l'animation est terminée
- `status().progress` renvoie le ratio courant de l'animation

Grace à cette méthode il est par exemple très facile de renvoyer le ratio de fin d'une
animation.

```javascript
animation.moveTo(animation.status().reverse?0:1);
// revoie 0 ou 1 selon que l'animation est jouée à l'envers ou à l'endroit
```