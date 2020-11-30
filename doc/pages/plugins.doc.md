# Plugins

CrimsonSand est une ossature, les plugins sont un passage quasi-obligatoire. Ils permettent d'adapter CrimsonSand au besoin du developpeur et ainsi évitent d'avoir du code lourd et complexe.

CrimsonSand permet la création et l'utilisation de plugins. En créant un plugin, ce dernier devient accessible via la méthode du même nom directement depuis la fonction `cns()`.

## Fonctionnement

Les plugins doivent hériter d'une méthode CrimsonSand et retournent toujours les arguments de ces méthodes dites **primaires**.

Cependant l'existence de méthodes **primaires** comme **exec** ou **for** ouvrent des possibilités infinies dans la création de plugins.

Un exemple de plugin possible peut être le Morphing SVG (non-développé).

L'important à retenir c'est que la présence de plugins permet d'avoir un code plus modulaire et moins lourd, tout en restant aussi rapide que l'execution des méthodes **primaires**.

## Ajouter un plugin

Un plugin CrimsonSand n'est rien d'autre qu'une fonction qui étend une méthode CrimsonSand et qui retourne
les arguments correspondants.

Pour créer un plugin il faut d'abord ajouter ce dernier à l'objet `cnsPlugin`.

Un plugin est un objet javascript avec plusieurs paramètres. Deux sont obligatoires :
- **extend** correspond au la méthode à étendre.
- **function** correspond à la fonction qui sera utilisée, elle doit impérativement retourner le tableau des arguments attendus par la méthode étendue depuis **extend**.

Il est important de noter qu'un plugin peut étendre un autre plugin. Un plugin portant le même nom qu'une méthode **primaire** ne sera jamais exécuté. De même si deux plugins portent le même nom alors seul le dernier déclaré sera exécuté.

La fonction utilisée prend deux arguments (faculatifs) :
- **args** le tableau des arguments que seront passés à la méthode du nom du plugin.
- **s** les fonctions de stockage.

Les fonctions de stockage de l'objet **s** ou **storage** permettent aux plugins de communiquer entre eux au sein d'une même queue d'execution.

### Paramètres optionnels

| property     | data                                             |
|--------------|--------------------------------------------------|
| name         | `'plugin-name'`                                  |
| version      | `'0.0.1'`                                        |
| authors      | `['author', 'co-author', ...]`                   |
| date         | `'dd/mm/yy hh:mm'`                               |
| license      | `'LICENSE NAME'`                                 |
| links        | `{portfolio: 'https://<link>', ...}`             |
| dependencies | `{name: ['version', 'link'], ...}`               |

### s.setStorage

```javascript
s.setStorage(value);
```

Cette fonction permet de stocker une valeur pour le plugin qui l'execute, afin d'éviter la corruption des valeurs, `setStorage` ne peut enregistrer de valeur que pour le plugin qui l'utilise.

Attention cependant, le stockage est relatif à la queue d'execution, les queues d'execution (les fonctions `cns()`) ne peuvent pas influencer le stockage d'une autre queue.

### s.getStorage

```javascript
s.getStorage(plugin);
```

Cette fonction retourne la valeur de stockage d'un plugin, cela permet par exemple de récupérer une valeur définie plus tot dans la queue d'execution, il n'est cependant pas conseillé de modifier la référence pour éviter tout type de corruption.

## Nommer le plugin

Dans un soucis d'organisation nous pensons utile de nommer les plugins suivant cette convention :
`plugin.<plugin-name>.js`, pour notre exemple ce serait `plugin.monplugin.js`.

Il peut être judicieux de placer ces fichiers dans un dossier **plugins, cns-plugins** ou **cns**.

## Création du plugin

Nous allons ci-dessous étendre la méthode `'exec'` pour faire passer un message personnalisé en argument.

```javascript
// création du plugin
cnsPlugins.monplugin = {

    // on étend exec
    extend: 'exec',

    // création de la fonction qui sera exécuté lors de l'appel du plugin
    function: function(args, s){

        var message = args[0] || 'pas de message';
        var msg = function(f, t){
            console.log(message);
            f.next();
        }

        // on retourne le tableau des arguments de exec Array<function>
        return [msg];

    }

};
```

Pour aller plus loin il faut savoir qu'un plugin peut étendre un autre plugin. Dans ce cas il peut être très utile de spécifier la dépendance en paramètre avec **dependencies:** afin que l'utilisateur puisse utiliser les méthodes `cnsPlugin.findDependencies('plugin-name')` et `cnsPlugin.getDependencies('plugin-name')`.

Par exemple :

```javascript
// création du plugin
cnsPlugins.monautreplugin = {

    // on étend monplugin
    extend: 'monplugin',
    dependencies: {
        'monplugin': ['1.0.0', 'https://link...']
    }

    // création de la fonction qui sera exécuté lors de l'appel du plugin
    function: function(args, s){
        var message = args[0] || 'pas de message';
        // on retourne le tableau des arguments de monplugin Array<string>.
        return [message + ' | message envoyé depuis monautreplugin'];
    }

};
```

Comme on peut le constater **monautreplugin** ne contient pas d'instruction `f.next();` et ne retourne pas
de fonction car **monautreplugin** étend **monplugin** et non **exec**.

### Télécharger un plugin

Pour ajouter un plugin externe vous pouvez télécharger le fichier .js correspondant ou le lien de ce fichier
et ajouter une balise `<script src="new-plugin.js"></script>` juste après celle de CrimsonSand et avant vos scripts utilisant la librairie.

**L'ordre ci-dessous est très important à respecter pour que tout fonctionne correctement**.

```html
<!-- CrimsonSand -->
<script src="cns.js"></script>

<!-- Les plugins ici (l'ordre n'a pas d'importance) -->

<!-- Le script qui utilise CrimsonSand et les plugins est à la fin -->
<script src="myscript"></script>
```

## Utiliser un plugin

Pour utiliser un plugin c'est simple, nous allons faire la démonstration en utilisant notre plugin **monplugin**
créé [ci-dessus](#création-du-plugin).

```javascript
// on lance une fonction cns
cns([
    // on lance le plugin via la méthode qui porte son nom
    'monplugin', ['mon message perso']
]);

// dans la console on obtient :
// monplugin: mon message perso
```