import { DatePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { SoulService } from 'src/app/services/soul.service';
import { SoulImageComponent } from '../soul-image/soul-image.component';
import { SoulPropertiesComponent } from '../soul-properties/soul-properties.component';

import { SoulDetailComponent } from './soul-detail.component';

describe('SoulDetailComponent', () => {
  const soulId = '0x2';
  const details = {
    collectionName: '-',
    createdAt: 1675878906,
    id: soulId,
    metadata: {
      name: 'Sovereign Nature Identifier #N',
      image:
        'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
      attributes: [
        { trait_type: 'Left ear', value: 'left_ear.jpg' },
        { trait_type: 'Right ear', value: 'right_ear.jpg' },
      ],
      properties: {
        taxonId: '-',
        statusDescription: '-',
        geometry: '-',
        conservationStatus: '-',
      },
    },
    status: 1,
    updatedAt: 1675878906,
    computeURI:
      'https://docs.google.com/document/d/1a9SJnL3uQlZP8R9yKv-qN4BYYfDQZakagx-O3sNw3Tg',
    dataURI:
      'https://www.marapredatorconservation.org/wp-content/uploads/2020/09/Muskuteers-Marsh.pdf',
    taxonId: 'itis:183803',
    tokenId: 2,
    tokenURI: 'ipfs://QmWcL7iVVnungvFsh5VR58NiK919VpKye62MAaDTNpsFfH',
  };
  let component: SoulDetailComponent;
  let fixture: ComponentFixture<SoulDetailComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj(
      'SoulService',
      ['getSoulDataById', 'getMetadata', 'filterByCondition'],
      [soulId]
    );
    const activatedRouteSpy = {
      snapshot: { paramMap: convertToParamMap({ soulId: soulId }) },
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        SoulDetailComponent,
        SoulImageComponent,
        SoulPropertiesComponent,
        StatusPipe,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    soulsServiceSpy.getSoulDataById.and.returnValue(of(details));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 properties in soul details', () => {
    const detailsEl: DebugElement[] = el.queryAll(By.css('.soul__details p'));
    const name: DebugElement[] = el.queryAll(By.css('.soul__details'));
    expect(detailsEl.length).toBe(5, 'Unexpected to find 5 properties');
    expect(name.length).toBe(1, 'Unexpected to find name');
  });

  it('should have the right values in soul details', () => {
    const detailsEl: DebugElement[] = el.queryAll(By.css('.soul__details p'));
    const name: DebugElement[] = el.queryAll(By.css('.soul__details h2'));
    const datePipe = new DatePipe('en');
    const statusPipe = new StatusPipe();

    expect(name[0].nativeElement.innerHTML).toContain(
      details.metadata.name,
      'Unexpected value of name'
    );
    expect(detailsEl[0].nativeElement.textContent).toContain(
      details.id.charAt(details.id.length - 1),
      'Unexpected value of id'
    );
    expect(detailsEl[1].nativeElement.textContent).toContain(
      statusPipe.transform(details.status),
      'Unexpected value of status'
    );
    expect(detailsEl[2].nativeElement.textContent).toContain(
      details.collectionName,
      'Unexpected value of collectionName'
    );
    expect(detailsEl[3].nativeElement.textContent).toContain(
      datePipe.transform(details.createdAt * 1000),
      'Unexpected value of createdAt'
    );
    expect(detailsEl[4].nativeElement.textContent).toContain(
      datePipe.transform(details.updatedAt * 1000),
      'Unexpected value of updatedAt'
    );
  });
});
