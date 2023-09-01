# RootMe Challenges: Programmation

## Suite arithmétique

Mon Profile [RootMe](https://www.root-me.org/ElPeauDeLaBanana?lang=fr)
Url du [Challenge](https://www.root-me.org/fr/Challenges/Programmation/Suite-arithmetique)

### Énoncé

Renvoyer le résultat d’une suite arithmétique en moins de deux secondes ? Qui a dit impossible ?
Les suites sont générés aléatoirement.
Exemple d'une suite généré:
Un+1 = [ -43 + Un ] - [ n * 24 ]
U0 = -691
You must find U220565
You have only 2 seconds to send the result with the HTTP GET method (at http://challenge01.root-me.org/programmation/ch1/ep1_v.php?result=...)

### Processus de résolution

En accédant à la page du challenge, j'ai observé la séquence générée en procédant à plusieurs rafraîchissements de la page pour en générait une nouvelle, je cherchais les éléments de l'opération qui changé, et j'ai donc remarqué 4 éléments variables a chaque fois conformément à la formule suivante:

Un+1 = [ element1 +||- Un ] +||- [ n * element2 ]

Au sein de la première paire de crochets, le premier nombre et l'opération variaient, et "Un" resté constant.
Entre les deux paires de crochets, l'opération était modifiée.
Finalement, dans la dernière paire de crochets, "n" et l'opération restaient immuables, la seule variation résidait dans "element2"
Il y avait en plus U0 ainsi que celle de l'élément correspondant à l'itération "Un" dont la valeur changeait.

Dans la phase suivante, j'avais besoin d'extraire ces éléments pour les utiliser dans mon programme grace à une requête GET et j'ai dû parser de l'html, j'ai aussi compris qu'a l'avenir j'utiliserais une librairie pour le faire car c'était assez contraignant avec la méthode que j'ai employée.

J'ai fait une fonction pour calculer le therme souhaité de la séquence et j'ai refait une requête GET avec le résultat et j'ai pu avoir le flag de ce défi.

Challenge fait par [Baco](https://www.root-me.org/Baco?lang=fr)
