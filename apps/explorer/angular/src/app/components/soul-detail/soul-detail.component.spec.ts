import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulDetailComponent } from './soul-detail.component';

describe('SoulDetailComponent', () => {
  let component: SoulDetailComponent;
  let fixture: ComponentFixture<SoulDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
