# Css

`css` est un plugin de la librairie standard CrimsonSand qui permet de mettre facilement en place des transitions CSS les unes à la suite des autres en combinant les effets et les timings.

<a href="../plugins/plugin.css.js" download>Télécharger ici</a>

## Fonctionnement

```javascript
'css', [
    {
        'property|method': [duration, 'value'[, 'easing'[, delay]]]
    }
]
```

La méthode **css** permet de créer des [animations CSS](https://developer.mozilla.org/fr/docs/Web/CSS/transition)
complexes de manière simple grace à sa syntaxe.
Cette méthode s'appuie sur les [transitions CSS](https://developer.mozilla.org/fr/docs/Web/CSS/transition).

## Set :

La méthode **css** prend de 0 à une infinité d'arguments. Les seuls arguments acceptés sont des objets javascript.
Ces objets peuvent contenir des propriétés CSS ou des méthodes. 

Chaque objet est considéré comme un **set** :

```javascript
'css', [
    // set n°1
    {
        'property': [duration, 'value', 'easing'],
        'property': [duration, 'value', 'easing']
    },
    // set n°2
    {
        'property': [duration, 'value', 'easing'],
        'property': [duration, 'value', 'easing']
    }
    ...
]
```

Les **set** sont executés les uns à la suite des autres, ils représentent en quelque sorte des blocs de définition des transitions. Ces **set** sont des objets javascript, ils ne peuvent donc pas contenir plus d'une fois la même propriété.

### Property :

Il est possible de spécifier des propriétés CSS au sein d'un **set** ainsi que la manière de l'animer.

```javascript
'css', [
    {
        'background-color': [1000, 'red', 'linear', 0]
    }
]
```

Chaque propriété CSS peut prendre jusqu'à quatre arguments au sein d'un tableau :
- **duration** la durée de l'animation en millisecondes (obligatoire).
- **value** la nouvelle valeur de la propriété (obligatoire).
- **easing** la fonction [cubic-bezier](https://developer.mozilla.org/fr/docs/Web/CSS/timing-function) (facultatif) [En savoir plus](?page=beziers).
- **delay** le delais avant le début de l'animation en millisecondes (facultatif).

## Autres méthodes

Le plugin `css` possède ses propres méthodes qui ne sont pas des propriétés CSS.

### pause

```javascript
'pause', [int]
```

La méthode **pause** ajoute un temps de pause en millisecondes après l'execution du **set** dans lequel elle
est utilisée.

### next

```javascript
'next', [int]
```

La méthode **next** définit le délais avant l'execution du **set** suivant en millisecondes. Par défaut il correspond au temps d'execution de la plus longue transition du **set**.

### smooth

```javascript
'smooth', [true|false]
```

La méthode **smooth** définit si les transitions doivent êtres éliminées ou concervées lors du passage d'un
**set** à un autre. Cette méthode ralentit très légèrement la mise en place des transitions, il est donc
utile de la désactiver lorsqu'elle n'est plus utilisée. Par convention **smooth** doit se trouver après toutes
les propriétés (pas d'importance pour les méthodes) du **set** par soucis de propreté d'écriture.

### class
```javascript
'class', ['add'|'remove', string]
```

La méthode **class** permet d'ajouter ou de supprimer une classe à l'élément courant.