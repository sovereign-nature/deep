import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

import { SoulImageComponent } from './soul-image.component';

describe('SoulImageComponent', () => {
  const soulId = '0x2';
  const properties = {
    computeURI:
      'https://docs.google.com/document/d/1a9SJnL3uQlZP8R9yKv-qN4BYYfDQZakagx-O3sNw3Tg',
    dataURI:
      'https://www.marapredatorconservation.org/wp-content/uploads/2020/09/Muskuteers-Marsh.pdf',
    image:
      'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
    taxonId: 'itis:183803',
    tokenId: 2,
    tokenURI: 'ipfs://QmWcL7iVVnungvFsh5VR58NiK919VpKye62MAaDTNpsFfH',
  };
  let component: SoulImageComponent;
  let fixture: ComponentFixture<SoulImageComponent>;

  beforeEach(async () => {
    const activatedRouteSpy = {
      snapshot: { paramMap: convertToParamMap({ soulId: soulId }) },
    };
    const soulsServiceSpy = jasmine.createSpyObj('SoulService', [
      'getSoulDataById',
      'filterByCondition',
    ]);
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, RouterTestingModule],
      declarations: [SoulImageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulImageComponent);
    component = fixture.componentInstance;
    soulsServiceSpy.getSoulDataById.and.returnValue(properties);
    component.properties = properties as Partial<Soul>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have image with correct path and alt', () => {
    const formattedUrl = component.ipfsToUrl(
      component.properties?.image ? component.properties?.image : ''
    );
    expect(formattedUrl).toBe(
      'https://ipfs.io/ipfs/QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
      'The image path is not correct'
    );
    expect(component.properties?.tokenId).toBe(properties.tokenId);
  });
});
