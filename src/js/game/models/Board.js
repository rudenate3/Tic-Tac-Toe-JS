import Square from './Square'

import { PageObject } from '../../PageObject'

const dimension = 3

export class Board {
  constructor() {
    this.board = []
    this.createBoard()
  }

  allSamePlayer(player, lineArray) {
    return lineArray.every(square => square === player)
  }

  createBoard() {
    let boardHtml = '<table>'
    for (let row = 0; row < dimension; row++) {
      boardHtml += '<tr>'
      for (let column = 0; column < dimension; column++) {
        const squareId = `r${row}c${column}`
        boardHtml += `<td id="${squareId}" class="square"></td>`
        this.board.push(new Square(squareId))
      }
      boardHtml += '</tr>'
    }
    boardHtml += '</table>'
    PageObject.gameBoardContainer.innerHTML = boardHtml
  }

  checkForWin(player) {
    return (
      this.allSamePlayer(player, [
        // Top Row
        this.board[0].val,
        this.board[1].val,
        this.board[2].val
      ]) ||
      this.allSamePlayer(player, [
        // Middle Row
        this.board[3].val,
        this.board[4].val,
        this.board[5].val
      ]) ||
      this.allSamePlayer(player, [
        // Bottom Row
        this.board[6].val,
        this.board[7].val,
        this.board[8].val
      ]) ||
      this.allSamePlayer(player, [
        // First Column
        this.board[0].val,
        this.board[3].val,
        this.board[6].val
      ]) ||
      this.allSamePlayer(player, [
        // Second Column
        this.board[1].val,
        this.board[4].val,
        this.board[7].val
      ]) ||
      this.allSamePlayer(player, [
        // Third Column
        this.board[2].val,
        this.board[5].val,
        this.board[8].val
      ]) ||
      this.allSamePlayer(player, [
        // Diagonal Top-Left > Bottom-Right
        this.board[0].val,
        this.board[4].val,
        this.board[8].val
      ]) ||
      this.allSamePlayer(player, [
        // Diagonal Bottom-Left > Top-Right
        this.board[6].val,
        this.board[4].val,
        this.board[2].val
      ])
    )
  }
}
