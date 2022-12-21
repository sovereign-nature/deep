import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoulListComponent } from './soul-list.component';

describe('SoulListComponent', () => {
  let component: SoulListComponent;
  let fixture: ComponentFixture<SoulListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoulListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
