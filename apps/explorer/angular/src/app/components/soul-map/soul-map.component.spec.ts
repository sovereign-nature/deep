import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulMapComponent } from './soul-map.component';

describe('SoulMapComponent', () => {
  let component: SoulMapComponent;
  let fixture: ComponentFixture<SoulMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
