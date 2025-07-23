import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game, GameState } from '../services/game';
import { GameCell } from '../game-cell/game-cell';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, GameCell],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css'
})
export class GameBoard {
  GameState = GameState;

  constructor(public gameService: Game) {}

  onCellClick(event: { row: number, col: number }): void {
    this.gameService.revealCell(event.row, event.col);
  }

  onRightClick(event: { row: number, col: number }): void {
    this.gameService.toggleFlag(event.row, event.col);
  }

  resetGame(): void {
    this.gameService.resetGame();
  }

  getGameStatusMessage(): string {
    switch (this.gameService.gameState) {
      case GameState.Won:
        return '🎉 You Won! 🎉';
      case GameState.Lost:
        return '💥 Game Over! 💥';
      default:
        return `Mines: ${this.gameService.mineCount}`;
    }
  }
}
