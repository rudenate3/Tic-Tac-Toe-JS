import { Board } from '../game/models/Board'
import { PageObject } from '../PageObject'

export class Game {
  constructor() {
    this.gameBoardInstance = {}
    this.gameEnded = false
    this.playerXTurn = true
    this.turnCount = 0
    this.xWins = 0
    this.oWins = 0
    this.ties = 0
    this.games = 0

    PageObject.gameBoardContainer.addEventListener('click', () => {
      this.squareClicked(event.target.id)
    })
  }

  newGame() {
    this.games++
    if (this.gameBoardInstance && this.gameBoardInstance.board) {
      this.turnCount = 0
      this.playerXTurn = true
      this.gameEnded = false
    }
    this.gameBoardInstance = {}
    PageObject.messagesDiv.innerHTML = ''
    this.gameBoardInstance = new Board()
  }

  onWin(player) {
    this.gameEnded = true.val
    if (player === 'X') {
      this.xWins++
      PageObject.xWinsSpan.innerHTML = this.xWins
    } else {
      this.oWins++
      PageObject.oWinsSpan.innerHTML = this.oWins
    }
    PageObject.messagesDiv.innerHTML = `Player ${player} has won the game!`
  }

  onTie() {
    this.gameEnded = true
    this.ties++
    PageObject.tiesSpan.innerHTML = this.ties
    PageObject.messagesDiv.innerHTML = 'Tie Game!'
  }

  addMove(squareId, player) {
    this.gameBoardInstance.board.reduce((prev, curr) => {
      if (curr.id === squareId) {
        curr.val = player
      }
    }, this.gameBoardInstance)
    document.querySelector(`#${squareId}`).innerHTML = player
    if (this.gameBoardInstance.checkForWin(player)) {
      this.onWin(player)
    } else if (this.turnCount === 8) {
      this.onTie()
    }
    this.turnCount++
  }

  squareClicked(squareId) {
    if (this.gameEnded) {
      PageObject.messagesDiv.innerHTML = 'Game is over'
      return
    }
    if (document.querySelector(`#${squareId}`).innerHTML !== '') {
      PageObject.messagesDiv.innerHTML = 'Space Taken'
      return
    }
    if (PageObject.messagesDiv.innerHTML === 'Space Taken')
      PageObject.messagesDiv.innerHTML = ''
    this.playerXTurn ? this.addMove(squareId, 'X') : this.addMove(squareId, 'O')
    this.playerXTurn = !this.playerXTurn
  }
}
