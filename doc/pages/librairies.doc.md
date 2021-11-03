# Librairies

CrimsonSand est un ensemble de deux librairies indépendantes.

## CrimsonSand

*Peu de tests réalisés en production*

CrimsonSand est une ossature sur laquelle peut se greffer tout un tas de fonctions, modules et plugins, le code est ainsi très léger et correspond uniquement à des besoins spécifiques. CrimsonSand permet la mise en place d'une queue d'exécution grace à des callbacks (fonctions de rappel) non bloquants. Cela permet d'executer les méthodes les unes à la suite des autres.

[Voir la documentation](?page=crimsonsand).

## Crimson

Crimson est une fonction qui permet la mise en place d'animations web efficaces, fortement compatibles et contrôlables grace à des méthodes personnalisées.

[Voir la documentation](?page=crimson).

### Comparaison

Une comparaison en terme de lignes de code n'a pas beaucoup de sens en ce qui concerne les performances d'animation (GSAP semble otenir de meilleurs résultats dans tous les cas de figure), mais trouve son utilité au niveau du temps de chargement de la librairie.

| Nom        | CrimsonSand | Crimson | AnimeJS | GSAP   | JQuery |
|------------|-------------|---------|---------|--------|--------|
| Lignes     |         260 |      80 |    1130 |   4000 |   8800 |
| Caractères |        6000 |    1600 |   32600 | 106300 | 287600 |

Consultez les différents benchs sur [cette page](https://codepen.io/GreenSock/pen/srfxA?editors=1010).