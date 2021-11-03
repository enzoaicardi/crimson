# Versions

Vous trouverez ici les différentes notes de versions de CrimsonSand.

## @1.0.0

Lancement du projet, la librairie est finie. Différentes optimisations architecturales viendront au fur et à mesure avec l'expérience et l'utilisation.

- Compatible ES5 (+95% des navigateurs)
- Léger (seulement 330 lignes de code non compacté)
- Fiable (utilisable en production)
- Modulaire

## @1.1.1

Dans cette mise à jour crimson devient beaucoup plus flexible et donne beaucoup plus d'informations sur son état, sans jamais affecter ses performances.
Lors de la mise à jour il est nécéssaire de remplacer toutes les fonctions `start()` (obsolète) par `play()` afin d'assurer le bon fonctionnement des animations.

Ajustements :

- Correction de la fonction `stop()` et `jumpTo()` qui fournissaient de valeurs de sortie incorrectes
- Correction du statut de pause au départ, il est maintenant fixé à `true` tant que l'animation n'a pas été jouée

Ajouts :

- Ajout d'un booléen optionnel à la fonction `reverse()` pour spécifier un état déterminé
- Ajout d'un paramètre numérique à la fonction `play()` pour spécifier un point de progression de départ
- Retrait de la fonction `start()` qui devient obsolète
- Ajout de la fonction `change()` qui permet de changer les paramètres de l'animation
- Ajout de la fonction `status()` qui retourne le statut courant de l'animation