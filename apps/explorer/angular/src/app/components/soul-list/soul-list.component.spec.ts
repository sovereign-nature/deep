import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoulService } from 'src/app/services/soul.service';

import { SoulListComponent } from './soul-list.component';

describe('SoulListComponent', () => {
  let component: SoulListComponent;
  let fixture: ComponentFixture<SoulListComponent>;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj('SoulService', [
      'getSoulsList',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SoulListComponent],
      providers: [{ provide: SoulService, useValue: soulsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
