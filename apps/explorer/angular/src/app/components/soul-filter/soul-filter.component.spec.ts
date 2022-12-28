import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulFilterComponent } from './soul-filter.component';

describe('SoulFilterComponent', () => {
  let component: SoulFilterComponent;
  let fixture: ComponentFixture<SoulFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
