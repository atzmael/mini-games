# __GAME_TITLE__

## Concept

À définir dans le chat dédié au jeu.

## Mécanique principale

Une seule mécanique centrale clairement identifiable.

## Contrôles

À définir.

## Renderer

Choisir selon `docs/renderer-guide.md`.

## UI du jeu

- Le HUD lié au gameplay (score, vies, chrono, ressources, etc.) doit être affiché **dans la zone de jeu**, pas dans la fiche ou l'interface extérieure.
- Utiliser un overlay DOM au-dessus du Canvas/WebGL quand c'est plus lisible qu'un HUD dessiné dans le renderer.
- La zone `game-stage` doit pouvoir passer en plein écran indépendamment du reste de la page.
- En plein écran, seule l'expérience de jeu et son HUD restent visibles.
- Les informations secondaires (description, aide longue, contexte) restent hors de la zone de jeu.

## Contraintes

- Partie courte.
- Aucun backend sans nécessité réelle.
- Mobile si la mécanique le permet.
- Build toujours fonctionnel.
- Dépendances limitées au strict nécessaire.

## Statut

Draft.
