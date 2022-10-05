import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardService } from './board.service';
import { Level4Component } from './level4.component';

describe('Level 4', () => {
  let boardServiceStub: Partial<BoardService>;
  let fixture: ComponentFixture<Level4Component>;
  let component: Level4Component;

  beforeEach(() => {
    boardServiceStub = {
      boardContent: [
        [ 1, 1, 1 ],
        [ 2, 2, 0 ],
        [ 0, 0, 0 ],
      ],
      winnerIndex: 1,
    };

    TestBed.configureTestingModule({
      declarations: [Level4Component],
      providers: [{ provide: BoardService, useValue: boardServiceStub }],
    });
    fixture = TestBed.createComponent(Level4Component);
    component = fixture.componentInstance;
  });

  it('should get correct style', () => {
    expect(component.getStyle(0, 0)).toBe('occupied-X');
  });

  it('should get correct player', () => {
    expect(component.getPlayer(0, 0)).toBe('X');
  });

  it('should get correct winner', () => {
    expect(component.getWinningPlayer()).toBe('X');
  });

  it('generate the correct content', () => {
    expect(component.content[0].filter(c => c.class === 'occupied-X').length).toEqual(3);
    expect(component.content[0].filter(c => c.playerName === 'X').length).toEqual(3);
    expect(component.content[1].filter(c => c.class === 'occupied-O').length).toEqual(2);
    expect(component.content[1].filter(c => c.playerName === 'O').length).toEqual(2);
    expect(component.content[2].filter(c => c.class === '').length).toEqual(3);
    expect(component.content[2].filter(c => c.playerName === '').length).toEqual(3);
  });
});
