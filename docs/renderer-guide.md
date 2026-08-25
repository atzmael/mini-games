# Choisir la technologie d'un mini-jeu

Le renderer est choisi jeu par jeu. Toujours utiliser la solution la plus simple qui répond réellement à la mécanique.

| Besoin principal | Choix par défaut |
| --- | --- |
| Quiz, clicker, cartes, boutons, interface | DOM |
| Arcade 2D simple, dessin dynamique, particules | Canvas 2D |
| Jeu 2D avec sprites, scènes, caméra, tilemaps ou physique | Phaser |
| Jeu ou expérience 3D | Three.js |
| Données, graphiques ou réseaux au cœur du gameplay | D3.js |

## DOM

Pour les jeux principalement constitués d'interface : quiz, clickers, idle games, jeux de cartes simples et puzzles textuels. Très léger et naturellement adapté au responsive et à l'accessibilité. À éviter lorsqu'un grand nombre d'éléments doivent être redessinés à chaque frame.

## Canvas 2D

Choix par défaut pour les petits jeux arcade : Pong, Snake, Breakout, esquive, shoot'em up simple, dessin ou particules. API native, légère et performante. Si le jeu oblige à recréer caméra, scènes, tilemaps, animations ou systèmes de collisions génériques, passer à Phaser.

## Phaser

Pour un vrai jeu 2D structuré : platformer, RPG 2D, nombreux sprites, niveaux, caméra, animations, tilemaps ou physique. Ne pas l'utiliser pour une mécanique que quelques centaines de lignes de Canvas peuvent gérer proprement.

## Three.js

Quand la 3D apporte quelque chose à la mécanique ou à l'expérience : runner 3D, low-poly, exploration, spatial ou objets 3D interactifs. Ne pas choisir Three.js uniquement pour donner un aspect 3D à une mécanique naturellement 2D.

## D3.js

D3 n'est pas un moteur de jeu. L'utiliser lorsque les données font partie de la mécanique : réseaux, cartes de données, simulation, visualisation interactive ou puzzle basé sur des graphiques. Il peut être combiné avec DOM, SVG ou Canvas.

## Combinaisons

Le DOM reste adapté aux menus, HUD, pause et game over, tandis que Canvas, Phaser ou Three.js gèrent le gameplay. D3 peut compléter un renderer lorsque des données doivent être transformées ou visualisées.

## Arbre de décision

```text
Gameplay principalement constitué d'interface ?
├─ oui → DOM
└─ non
   ├─ besoin réel de 3D ? → Three.js
   └─ 2D
      ├─ données/graphiques au cœur du gameplay ? → D3.js + DOM/SVG/Canvas
      └─ jeu classique
         ├─ mécanique simple ? → Canvas 2D
         └─ sprites/scènes/caméra/tilemaps/physique ? → Phaser
```

## Principe

Commencer simple et changer de technologie uniquement lorsqu'une contrainte concrète le justifie. Ne jamais ajouter Phaser, Three.js ou D3.js parce qu'ils pourraient servir plus tard.
