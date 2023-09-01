# RootMe Challenges: Programmation

## Solveur de polynômes du second degré

Mon Profile [RootMe](https://www.root-me.org/ElPeauDeLaBanana?lang=fr)
Url du [Challenge](https://www.root-me.org/fr/Challenges/Programmation/Solveur-de-polynomes-du-second-degre)

### Énoncé

Votre professeur vous propose de vérifier vos compétences en maths et en automatisation, prouvez lui que vous êtes à la hauteur.

Welcome to the PolySolve challenge, you will need to solve and give the roots
of the second degree polynomial equation given to you rounded to the thousandth !

Output example for two roots => x1: -1337.777 ; x2: -7331.777
Output example for one root => x: -1337.995
Output example for no root => Not possible

### Processus de résolution

Pour ce challenge il faut développer un client TCP, j'ai adapté le modèle que j'avais déjà utilisé pour les précédents challenges impliquant une connexion TCP.
Une fois connecté, le serveur nous envoie l'énoncé avec une équation comme ceci:
[>] (001/025) Solve this equation please: -435.x² + 781.x¹ + 44 = -197
Dans l'énoncé il est expliqué qu'il faut trouver les racines de l'équation, n'ayant aucune notion des équations du second degré polynômes je me mets a suivre un [cours](https://www.youtube.com/watch?v=iAeB8AxtfdY) sur youtube pour essayer de comprendre
Une fois les notions apprises j'ai pu les appliquer dans mon programme et au final obtenu le flag du challenge

Challenge fait par [Express](https://www.root-me.org/Express?lang=fr)
