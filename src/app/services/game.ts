import { Injectable } from '@angular/core';

export interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export enum GameState {
  Playing,
  Won,
  Lost
}

@Injectable({
  providedIn: 'root'
})
export class Game {
  private readonly ROWS = 10;
  private readonly COLS = 20;
  private readonly MINES = 10;
  
  board: Cell[][] = [];
  gameState: GameState = GameState.Playing;
  mineCount: number = this.MINES;
  
  constructor() {
    this.initializeGame();
  }
  
  initializeGame(): void {
    this.gameState = GameState.Playing;
    this.mineCount = this.MINES;
    this.createBoard();
    this.placeMines();
    this.calculateNeighborMines();
  }
  
  private createBoard(): void {
    this.board = [];
    for (let row = 0; row < this.ROWS; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.COLS; col++) {
        this.board[row][col] = {
          x: col,
          y: row,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        };
      }
    }
  }
  
  private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.MINES) {
      const row = Math.floor(Math.random() * this.ROWS);
      const col = Math.floor(Math.random() * this.COLS);
      
      if (!this.board[row][col].isMine) {
        this.board[row][col].isMine = true;
        minesPlaced++;
      }
    }
  }
  
  private calculateNeighborMines(): void {
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        if (!this.board[row][col].isMine) {
          this.board[row][col].neighborMines = this.countNeighborMines(row, col);
        }
      }
    }
  }
  
  private countNeighborMines(row: number, col: number): number {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS && this.board[r][c].isMine) {
          count++;
        }
      }
    }
    return count;
  }
  
  revealCell(row: number, col: number): void {
    if (this.gameState !== GameState.Playing || 
        this.board[row][col].isRevealed || 
        this.board[row][col].isFlagged) {
      return;
    }
    
    this.board[row][col].isRevealed = true;
    
    if (this.board[row][col].isMine) {
      this.gameState = GameState.Lost;
      this.revealAllMines();
      return;
    }
    
    if (this.board[row][col].neighborMines === 0) {
      this.revealEmptyNeighbors(row, col);
    }
    
    this.checkWinCondition();
  }
  
  private revealEmptyNeighbors(row: number, col: number): void {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS) {
          if (!this.board[r][c].isRevealed && !this.board[r][c].isFlagged) {
            this.revealCell(r, c);
          }
        }
      }
    }
  }
  
  private revealAllMines(): void {
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        if (this.board[row][col].isMine) {
          this.board[row][col].isRevealed = true;
        }
      }
    }
  }
  
  private checkWinCondition(): void {
    let revealedCount = 0;
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        if (this.board[row][col].isRevealed && !this.board[row][col].isMine) {
          revealedCount++;
        }
      }
    }
    
    if (revealedCount === (this.ROWS * this.COLS - this.MINES)) {
      this.gameState = GameState.Won;
    }
  }
  
  toggleFlag(row: number, col: number): void {
    if (this.gameState !== GameState.Playing || this.board[row][col].isRevealed) {
      return;
    }
    
    this.board[row][col].isFlagged = !this.board[row][col].isFlagged;
    this.mineCount += this.board[row][col].isFlagged ? -1 : 1;
  }
  
  resetGame(): void {
    this.initializeGame();
  }
}
