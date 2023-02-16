import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SoulService } from 'src/app/services/soul.service';

import { SoulImageComponent } from './soul-image.component';

describe('SoulImageComponent', () => {
  const soulId = '0x2';
  const properties = {
    tokenURI: 'ipfs://QmWcL7iVVnungvFsh5VR58NiK919VpKye62MAaDTNpsFfH',
    image:
      'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
    id: soulId,
    name: 'Sikio',
  };
  let component: SoulImageComponent;
  let fixture: ComponentFixture<SoulImageComponent>;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj(
      'SoulService',
      ['getSoulDetailsById', 'getMetadata'],
      [soulId, 'QmWcL7iVVnungvFsh5VR58NiK919VpKye62MAaDTNpsFfH']
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
    soulsServiceSpy.getSoulDetailsById.and.returnValue(
      of({
        image:
          'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
      })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have image with correct path and alt', () => {
    const formattedUrl = component.ipfsToUrl(
      component.properties?.image ? component.properties?.image : ''
    );
    expect(formattedUrl).toBe(
      'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
      'The image path is not correct'
    );
    expect(component.properties?.image?.[1]).toBe(soulId);
  });
});
