# Librairies

CrimsonSand dispose de deux librairies.

## CrimsonSand

CrimsonSand est simplement un ossature sur laquelle on peut greffer tout un tas de fonctions, modules et plugins, le code est ainsi très léger et correspond uniquement à vos besoins. CrimsonSand permet la mise en place d'une queue d'exécution grace à des callbacks (fonctions de rappel) non bloquants. Cela permet d'executer les méthodes les unes à la suite des autres.

[Voir la documentation](?page=crimsonsand).

## Crimson

Crimson est une fonction qui permet la mise en place d'animations web efficaces, fortement compatibles et contrôlables grace à des méthodes personnalisées.

[Voir la documentation](?page=crimson).

### Comparaison

Bien qu'une comparaison en terme de lignes de code n'ait pas beaucoup de sens dans le cas ou vous trouvez des solutions spécifiques dans chaque librairie elle peut toutefois être utile dans le cas où vous utilisez des fonctionnalités disponibles dans plusieurs d'entre elles, même si une analyse plus poussée est toutefois necessaire (GSAP étant souvent plus efficace qu'AnimeJS).

| Nom        | CrimsonSand | Crimson | AnimeJS | GSAP   | JQuery |
|------------|-------------|---------|---------|--------|--------|
| Lignes     |         260 |      50 |    1130 |   4000 |   8800 |
| Caractères |        6000 |    1600 |   32600 | 106300 | 287600 |

Consultez les différents benchs sur [cette page](https://codepen.io/GreenSock/pen/srfxA?editors=1010). Aucun test n'existe actuellement pour crimson. Nous serions heureux si quelqu'un arrivait à inclure crimson dans le benchmark.