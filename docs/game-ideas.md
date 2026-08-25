# Mini-games — idées de jeux

Ce fichier sert de backlog pour les concepts de jeux à explorer plus tard.

## En production

### Coin Goblin

**Pitch**  
Un petit gobelin collecte des pièces dans une salle de plateformes. Plus il transporte d'argent, plus son sac devient lourd et réduit sa mobilité. Il faut décider quand continuer à prendre des risques et quand déposer son butin dans un coffre pour sécuriser les points.

**Boucle principale**  
Ramasser → s'alourdir → prendre des risques → déposer → retrouver sa mobilité → recommencer.

**Format visé**
- parties de 1 à 5 minutes ;
- score / high score ;
- clavier + tactile ;
- gameplay 2D Phaser ;
- HUD et menus hors canvas si nécessaire.

**Pistes d'évolution**
- pièces bronze / argent / or ;
- pièces maudites avec bonus et handicap ;
- multiplicateur de combo ;
- coffre mobile ;
- plateformes mobiles et pièges ;
- événements courts : pluie de pièces, gravité réduite, sol dangereux ;
- skins ;
- leaderboard plus tard.

---

## Backlog

### Dungeon Delivery

Tu incarnes un coursier dans un donjon. Il faut atteindre une destination avec un colis dont les propriétés modifient les règles du déplacement.

Exemples :
- fragile : éviter les chutes et impacts ;
- explosif : livraison sous contrainte de temps ;
- vivant : le colis tente de s'échapper ;
- énorme : mobilité réduite ou encombrement différent.

**Intérêt principal** : runs courts, humour, grande variété possible à partir d'un système simple de modificateurs.

### Last Pixel Standing

Petite arène vue de dessus dans laquelle les déplacements et actions détruisent progressivement le terrain. Plus la partie avance, moins il reste d'espace sûr.

Pistes :
- dash ;
- ennemis ;
- projectiles ;
- bonus ;
- terrain destructible ;
- combos ;
- survie / high score.

**Intérêt principal** : très bon potentiel arcade et systémique, mais demande davantage d'équilibrage et de polish pour être réellement satisfaisant.

---

## Règles pour les prochains concepts

Avant de passer un jeu du backlog en production, vérifier qu'il possède :

1. une mécanique principale compréhensible en quelques secondes ;
2. une boucle de jeu qui crée de vraies décisions ;
3. une session courte et rejouable ;
4. une condition d'échec ou de fin claire ;
5. une raison de rejouer : score, maîtrise, variation ou progression ;
6. un scope compatible avec un mini-jeu web ;
7. une identité visuelle ou mécanique suffisante pour ne pas ressembler à une démo technique.
