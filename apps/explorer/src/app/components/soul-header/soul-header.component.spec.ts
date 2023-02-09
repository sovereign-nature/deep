import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulHeaderComponent } from './soul-header.component';

describe('SoulHeaderComponent', () => {
  let component: SoulHeaderComponent;
  let fixture: ComponentFixture<SoulHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
