import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SoulService } from 'src/app/services/soul.service';
import { GoogleMapsModule } from '@angular/google-maps';

import { SoulMapComponent } from './soul-map.component';
import { of } from 'rxjs';

describe('SoulMapComponent', () => {
  const soulId = '0x2';
  let component: SoulMapComponent;
  let fixture: ComponentFixture<SoulMapComponent>;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj(
      'SoulService',
      ['getSoulDetailsById'],
      [soulId]
    );
    const activatedRouteSpy = {
      snapshot: { paramMap: convertToParamMap({ soulId: soulId }) },
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, GoogleMapsModule],
      declarations: [SoulMapComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulMapComponent);
    component = fixture.componentInstance;
    soulsServiceSpy.getSoulDetailsById.and.returnValue(
      of({ geometry: 'POINT(5.9559 47.8084)' })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
