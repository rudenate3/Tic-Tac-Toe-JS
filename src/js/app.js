import { Game } from './game/Game'

const game = new Game()

document
  .querySelector('#new-game-button')
  .addEventListener('click', () => game.newGame())
