import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PausePage } from './pause.page';

describe('PausePage', () => {
  let component: PausePage;
  let fixture: ComponentFixture<PausePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PausePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
