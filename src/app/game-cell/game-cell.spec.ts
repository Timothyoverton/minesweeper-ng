import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCell } from './game-cell';

describe('GameCell', () => {
  let component: GameCell;
  let fixture: ComponentFixture<GameCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
