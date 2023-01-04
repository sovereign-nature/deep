import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulPropertiesComponent } from './soul-properties.component';

describe('SoulPropertiesComponent', () => {
  let component: SoulPropertiesComponent;
  let fixture: ComponentFixture<SoulPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulPropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
