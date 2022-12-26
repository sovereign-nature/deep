import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SoulService } from 'src/app/services/soul.service';

import { SoulImageComponent } from './soul-image.component';

describe('SoulImageComponent', () => {
  const soulId = '0x2';
  let component: SoulImageComponent;
  let fixture: ComponentFixture<SoulImageComponent>;

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
      imports: [RouterTestingModule],
      declarations: [SoulImageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SoulImageComponent);
    component = fixture.componentInstance;
    component.imageProperties = [
      'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob',
      soulId,
    ];
    soulsServiceSpy.getSoulDetailsById.and.returnValue(
      of({
        image:
          'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob',
      })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have image with correct path and alt', () => {
    const formattedUrl = component.ipfsToUrl(
      component.imageProperties?.[0] ? component.imageProperties?.[0] : ''
    );
    expect(formattedUrl).toBe(
      'https://ipfs.io/ipfs/bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob',
      'The image path is not correct'
    );
    expect(component.imageProperties?.[1]).toBe(soulId);
  });
});
