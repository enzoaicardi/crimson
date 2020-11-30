# Dependencies

Le plugin **dependencies** ermet de chercher et d'obtenir les dépendences d'un plugin CrimsonSand.

<a href="../plugins/plugin.dependencies.js" download>Télécharger ici</a>

## Fonctionnement

Dependencies dispose de deux fonctions `findDependencies()` et `getDependencies()` qui peuvent être utilisées pour accéder aux dépendances des différents plugins installés.

### findDependencies

```javascript
cnsPlugins.findDependencies('plugin-name');
```

Retourne les dépendances du plugin dans la console du navigateur avec un indicateur :

- \+ La dépendance est déjà installée.
- \- La dépendance n'est pas installée.

### getDependencies

```javascript
cnsPlugins.findDependencies('plugin-name');
```

Installe les dépendance à la fin du corps du document.

L'installation consiste en l'ajoute d'une balise `<script>` par dépendance contenant comme attribut `src` le lien renseigné dans la dépendance. D'où l'importance de renseigner correctement les dépendances.

Comme vous l'aurez compris il ne s'agit donc pas d'une installation en dur, ainsi pour la production nous vous conseillons d'ajouter les plugins manuellement. `getDependencies` est avant tout là pour vous simplifier la tâche lors de la conception.

Pour assurer son bon fonctionnement, votre script utilisant les plugins doit se trouver après toutes les balises des plugins (c'est à dire en dernière position du `<body>` élément).

```html
<!-- CrimsonSand -->
<script src="cns.js"></script>

<!-- Les plugins (l'ordre n'a pas d'importance) -->
<script src="plugins/plugin1.js"></script>
<script src="plugins/plugin2.js"></script>
<script src="plugins/plugin.dependencies.js"></script>

<!-- Les dépendances seront placées ici -->

<!-- Le script qui utilise CrimsonSand et les plugins est à la fin -->
<script src="myscript"></script>
```

Pour appeler correctement `getDependencies` il faut l'utiliser au début de `myscript` et englober le reste du script
dans un `window.onload`.

```javascript
// myscript.js
cnsPlugins.getDependencies('plugin-name');

window.onload = function(){

    // execute the script here

}
```

C'est un ensemble assez couteux à mettre en place et qui doit être restecpté pour eviter les boggues. Pour cette raison il est préférable d'installer manuellement les plugins pour la production.