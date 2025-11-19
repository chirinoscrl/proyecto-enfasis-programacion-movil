import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorldSelectPage } from './world-select.page';

describe('WorldSelectPage', () => {
  let component: WorldSelectPage;
  let fixture: ComponentFixture<WorldSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
