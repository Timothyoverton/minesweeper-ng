import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../services/game';

@Component({
  selector: 'app-game-cell',
  imports: [],
  templateUrl: './game-cell.html',
  styleUrl: './game-cell.css'
})
export class GameCell {
  @Input() cell!: Cell;
  @Output() cellClick = new EventEmitter<{ row: number, col: number }>();
  @Output() rightClick = new EventEmitter<{ row: number, col: number }>();

  onCellClick(): void {
    this.cellClick.emit({ row: this.cell.y, col: this.cell.x });
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.rightClick.emit({ row: this.cell.y, col: this.cell.x });
  }

  getCellDisplay(): string {
    if (this.cell.isFlagged) {
      return '🚩';
    }
    
    if (!this.cell.isRevealed) {
      return '';
    }
    
    if (this.cell.isMine) {
      return '💣';
    }
    
    return this.cell.neighborMines > 0 ? this.cell.neighborMines.toString() : '';
  }

  getCellClass(): string {
    let classes = 'cell';
    
    if (this.cell.isRevealed) {
      classes += ' revealed';
      if (this.cell.isMine) {
        classes += ' mine';
      }
    } else {
      classes += ' hidden';
    }
    
    if (this.cell.isFlagged) {
      classes += ' flagged';
    }
    
    return classes;
  }
}
