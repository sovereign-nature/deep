import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SoulService } from 'src/app/services/soul.service';

import { SoulDetailComponent } from './soul-detail.component';

describe('SoulDetailComponent', () => {
  let component: SoulDetailComponent;
  let fixture: ComponentFixture<SoulDetailComponent>;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj('SoulService', [
      'getSoulDetailsById',
    ]);
    const activatedRouteSpy = {
      snapshot: { paramMap: convertToParamMap({ soulId: '0x2' }) },
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SoulDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
