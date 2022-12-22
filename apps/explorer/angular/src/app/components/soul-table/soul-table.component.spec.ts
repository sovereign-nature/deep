import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulTableComponent } from './soul-table.component';

describe('SoulTableComponent', () => {
  let component: SoulTableComponent;
  let fixture: ComponentFixture<SoulTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
