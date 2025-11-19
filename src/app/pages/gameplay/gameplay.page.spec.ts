import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameplayPage } from './gameplay.page';

describe('GameplayPage', () => {
  let component: GameplayPage;
  let fixture: ComponentFixture<GameplayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
