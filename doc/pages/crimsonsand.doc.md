# CrimsonSand

CrimsonSand reprend des concepts de [PurpleSand](https://purplesand.enzoaicardi.com) mais les retravaille
complétement et n'adopte pas la même syntaxe, pour cette raison les deux projets ne portent pas le même nom
même si on peut les situer (en partie) dans un prolongement logique.

<a href="../lib/cns.js" download>Télécharger ici</a>

## Caractéristiques

La version @1.0.0 de CrimsonSand est :

- Compatible ES5 (+95% des navigateurs)
- Léger (seulement 330 lignes de code non compacté)
- Fiable (utilisable en production)
- Modulaire

## Fonctionnement

CrimsonSand est simplement une ossature sur laquelle on peut greffer tout un tas de fonctions, modules et plugins, le code est ainsi très léger et correspond uniquement à vos besoins. CrimsonSand permet la mise en place d'une queue d'exécution grace à des callbacks (fonctions de rappel) non bloquants. Cela permet d'executer les méthodes les unes à la suite des autres.

CrimsonSand permet de mettre un ordre chronologique précis à votre code javascript sans le bloquer et sans utiliser de timeout.

## Créer une queue d'exécution

La librairie CrimsonSand ne comporte qu'une fonction du même nom `cns()` qui prend un seul argument. Cet argument doit être un tableau javascript. Dans ce tableau il est possible de renseigner plusieurs méthodes que nous allons détailler mais aussi de créer ses propres méthodes.

```javascript
cns([...]);
```

Le tableau fonctionne par pairs `"méthode", [arguments]` qui se suivent les unes et les autres.

## Methodes de base

Après la table des méthodes vous trouverez le détail de ces dernières.

| Nom               |               Syntaxe                        | Arguments   | Types                           |
|-------------------|----------------------------------------------|:-----------:|---------------------------------|
| $                 | `[selector]`                                 | { 1 }       | `string \| NodeList \| Element` |
| [$cut](#cut)      | `[int\|[percent](, int \| [percent])]`       | { 0, 2 }    | `integer \| Array<integer>`     |
| [$order](#order)  | `[string\|array[, 'reverse']]`               | { 1, 2 }    | `string \| array` `string`      |
| [$duplicate](#duplicate)  | `[int]`               | { 1 }    | `number`      |
|[interval](#interval)| `[int[, length][..., int[, length]]]`      | { 1 }       | `integer`                       |
| [wait](#wait)     | `[true\|false]`                              | { 1 }       | `boolean`                       |
| [pause](#pause)   | `[int]`                                      | { 1 }       | `integer`                       |
| [repeat](#repeat) | `[int(, int)]`                               | { 0, 2 }    | `integer`                       |
| [debug](#debug)   | `[true\|false]`                              | { 1 }       | `boolean`                       |
| [exec](#exec)     | `[function (f, t){ ... }]`            | { 1 }       | `function`                      |
| [for](#for)       | `[function (f, t){ ... }]`| { 1 }| `function`                      |


### $

```javascript
'$', ['selector']
'$', [[..., El, El, El]]
'$', [Element]
```

Le symbole **$** correspond au selecteur, il permet de définir le tableau des éléments à parcourir lors de l'exécution de la queue d'exécution.
  
Il est donc impératif de définir le selecteur avant des
méthodes qui utilisent le tableau des éléments.

Le sélecteur peut prendre comme arguments :
- une chaine correspondant au sélecteur css
- une NodeList
- un HTMLElement

### $cut

```javascript
'$cut', [int | [percent]]
'$cut', [int | [percent][,int | [percent]]]
```

La methode **$cut** permet de raccourcir les bornes du tableau des éléments original, c'est à dire non-ordonné. Pour cette raison il est recommandé d'utiliser **$cut** avant **[$order](#order)**.  
  
**$cut** prend un ou deux arguments. Ils peuvent être des entiers positifs ou des tableaux contenant un entier positif compris entre *0* et *100* indiquant un pourcentage par rapport à la longueur totale du tableau des éléments.

Par exemple :

```javascript
'$', [1, 2, 3, 4, 5],
'$cut', [1], // [1, 0]
'$cut', [0] // n'annule pas la précédente coupe

// résultat : [2, 3, 4, 5]
```

```javascript
'$cut', [1, 2]
// résultat : [2, 3]
```

```javascript
'$cut', [[40], 1]
// résultat : [3, 4]
```

```javascript
'$cut', [1, 1],
'$cut', [1, 1]
// résultat : [3]
```

### $order

```javascript
'$order', ['preset' | array[, 'reverse']]
```

La méthode **$order** permet de réordonner le tableau des éléments courant, c'est à dire non-original, depuis le tableau original. Pour cette raison il est recommandé d'utiliser **$order** après **[$cut](#cut)**.

La méthode **$order** peut prendre jusqu'à deux arguments, le premier correspond au tableau des index pour réorganiser l'ordre du tableau des éléments.

Il existe des *presets* qui correspondent à des tableaux d'index particuliers :
- **normal** le tableau est inchangé (permet de revenir au tableau original).
- **invert** les index sont organisés dans l'ordre décroissant.
- **center** les index sont classés des plus proches aux plus éloignés des bornes.
- **random** les index sont mélangés aléatoirement.

Le deuxième argument (facultatif) peut-être `'reverse' || undefined`, s'il vaut `'reverse'` alors l'ordre du tableau des éléments est inversé après avoir été ordonné.
Cela permet par exemple d'inverser une randomisation.

### $duplicate

```javascript
'$duplicate', [int]
```

La méthode **$duplicate** permet de dupliquer **int** fois le tableau des éléments courant, c'est à dire non-original, depuis le tableau courant.

Pour cette raison il est recommandé d'utiliser **$duplicate** après **[$cut](#cut)** et **[$order](#order)**.

### interval

```javascript
'interval', [int[, length][..., int[, length]]]
```

La méthode **interval** permet de définir l'interval en millisecondes séparant chaque itération pour les méthodes qui parcourent le tableau des éléments.

Il est possible de spécifier des **pairs** : `interval, length` qui définissent l'interval
et son étendue. Si **length** n'est pas déclarée elle vaudra 1. Pour ajouter une nouvelle **pair**
il est impératif de déclarer la **length** du précédent interval.

Un interval dont la **length** vaut 0 est ignoré. La **length** indique le nombre d'éléments
affectés par l'interval avant le prochain interval spécifié (il s'agit d'une boucle d'intervals).

Utiliser un tableau d'intervals peut être relativement compliqué au début car il faut bien comprendre son fonctionnement sur les éléments, mais il s'agit d'une fonctionnalité très intéressante si elle est couplé avec un [ordre](#order) spécifique pour que les éléments soient affectés par exemples deux à deux.

```javascript
'interval', [interval, 1, 0, 1]
```

Ou inversement :

```javascript
'interval', [0, 1, interval, 1]
```

Permettent une affectation des intervals deux à deux.

### wait

```javascript
'wait', [true|false]
```

La méthode **wait** définit si oui ou non chaque itération (pour les méthodes qui parcourent le tableau des éléments) doit attendre la fin de la précédente pour débuter.

### pause

```javascript
'pause', [int]
```

La méthode **pause** marque une pause dans la queue d'exécution de **int** millisecondes.

### repeat

```javascript
'repeat', []
'repeat', ['infinite'[,int]]
'repeat', [int[,int]]
```

La méthode **repeat** permet de répéter `number || infinite` fois les **int** méthodes précédentes.
Veillez à ne ce que votre méthode **repeat** ne répète pas une autre méthode **repeat** plus haut dans la queue d'exécution, cela provoquerait une boucle infinie entre les deux dernières méthodes **repeat** appelées.

Le premier argument définit le nombre de fois que la méthode précédent doit se répéter avant de poursuivre.

Le second argument définit le nombre de méthodes en partant de `'repeat'` qui doivent se répéter (par défaut 1).

Par exemple :

```javascript
'method n°1', [args],
'method n°2', [args],
'repeat', [ |1]

// résultat : 1 > 2 > repeat > 2 > repeat
```

```javascript
'repeat', [2]
// résultat : 1 > 2 > repeat > 2 > repeat > 2 > repeat
```

```javascript
'repeat', [1, 2]
// résultat : 1 > 2 > repeat > 1 > 2 > repeat
```

### exec

```javascript
'exec', [ function (f, t){ ... } ]
```

La méthode **exec** permet d'executer une fonction javascript dans la queue d'exécution.
La fonction prend deux arguments (facultatifs) : 
- **f** qui est un objet contenant différentes méthodes :
    - **next()** qui est une fonction permettant de passer à la méthode suivante.
    - **throw(message)** qui est une fonction permettant de provoquer une erreur.
    - **log(message)** qui est une fonction permettant d'afficher une erreur dans la console.
- **t** qui est un objet contenant une valeur :
    - **all** qui renvoie le tableau des éléments courant.

Si la fonction `next()` n'est pas utilisée alors la queue d'exécution ne pourra pas continuer. [En savoir plus](#next).

Par exemple :

```javascript
'exec', [ function (f, t){

    setTimeout(function(){

        // après 1000ms dire hello puis passer à la méthode suivante
        console.log('hello');
        f.next();

    }, 1000);

}]
```

### for

```javascript
'for', [ function (f, t){ ... } ]
```

La méthode **for** permet d'executer une fonction javascript dans la queue d'exécution, pour chaque élément dans le tableau des éléments.
La fonction prend deux arguments (facultatifs) : 

- **f** qui est un objet contenant différentes méthodes : 
    - **id** qui renvoie l'id de la fonction.
    - **this** qui renvoie la fonction courante.
    - **next(f)** qui est une fonction permettant de passer à l'itération (si wait vaut true) ou à la méthode suivante.
    - **throw(message)** qui est une fonction permettant de provoquer une erreur.
    - **log(message)** qui est une fonction permettant d'afficher une erreur dans la console.
- **t** qui est un objet contenant plusieurs valeurs : 
    - **current** qui renvoie l'élément courant sur lequel s'applique la fonction.
    - **all** qui renvoie le tableau des éléments courant.
    - **id** qui renvoie l'id de l'élément courant.

Si la fonction `next(f)` n'est pas utilisée ou qu'elle ne possède pas f comme argument, alors la queue d'exécution ne pourra pas continuer. [En savoir plus](#next).

#### next

La fonction `next()` prend un argument (facultatif) sous forme d'entier positif indiquant la position de la prochaine méthode (1 correspond à la méthode suivante, 2 celle d'après, etc.).

Dans le cas de **for** alors `next(f)` prend en premier argument **f** qui est le premier objet renvoyé par **for**, la position dans la queue devient le deuxième argument.

La fonction `next()` ne doit être executée qu'une seule fois maximum dans la fonction. Pour assurer la traçabilité des erreurs il est recommandé que `next()` soit la dernière instruction (chronologiquement) executée.
Elle peut être appelée de manière asynchrone et au travers d'écouteurs d'événements. 

Pour le dernier cas il faut impérativement que l'écouteur ne soit déclenché qu'une fois.

Il est possible d'utiliser l'option once :

```javascript
document.addEventListener('click', function (){ next(); }, {once: true});
// non compatible avec IE ({6, 11});
```

Ou la fonction suivante :

```javascript
function evt(e){
    // do something here
    next();
    document.removeEventListener(e.type, evt);
}
document.addEventListener('click', evt);
// haute compatibilité
```

#### throw

Permet de provoquer une erreur. Pour adopter le format des erreurs de CrimsonSand regardez **log** ci-dessous.

#### log

Permet d'afficher un message d'erreur dans la console.
Log prend comme seul argument un objet dont les propriétés sont les suivantes :

- **p:** le nom de la propriété | variable ayant provoqué l'erreur.
- **m:** le message à afficher.
- **t:** le type de message: warn ou fatal (par défaut).
- **d:** la donnée dans laquelle se trouve l'erreur (affiché avec [debug](#debug)).

Le message sera affiché de la manière suivante :

```javascript
    console.[type](property + ': ' + message);
    console.warn(data);
```

Il existe des messages prédéfinis accessibles via la variable globale `m`.

### debug

```
'debug', [true|false]
```

La méthode **debug** permet d'activer le mode debug de la fonction `cns()` courante. Le mode debug fournit des erreurs plus précises mais aussi le suivi du déroulement de la queue.