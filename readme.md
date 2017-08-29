# Othello

A JavaScript game played in the DOM

![Othello](http://i.imgur.com/tWdPyZK.png)

## Rules

Othello is a strategy board game for two players, played on an 8×8 uncheckered board. There are sixty-four identical game pieces called discs, which are light on one side and dark on the other. Players take turns placing discs on the board with their assigned color facing up. During a play, any discs of the opponent's color that are in a straight line and bounded by the disc just placed and another disc of the current player's color are turned over to the current player's color.

The object of the game is to have the majority of discs turned to display your color when the last playable empty square is filled.

## To play

Download the `.zip` and install the dependencies with yarn or npm.

```sh
yarn install
npm install
```

Run gulp to compile the public folder and serve the game on `localhost:7000`.

```sh
gulp
```

![Othello](http://i.imgur.com/XxOWtjR.png)
