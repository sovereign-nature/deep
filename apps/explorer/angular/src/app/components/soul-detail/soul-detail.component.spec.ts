import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SoulService } from 'src/app/services/soul.service';
import { SoulPropertiesComponent } from '../soul-properties/soul-properties.component';

import { SoulDetailComponent } from './soul-detail.component';

describe('SoulDetailComponent', () => {
  const soulId = '0x2';
  const details = {
    collectionName: '-',
    createdAt: 1665497178,
    id: soulId,
    name: 'Sovereign Nature Identifier #N',
    owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
    status: 1,
    updatedAt: 1665497178,
  };
  let component: SoulDetailComponent;
  let fixture: ComponentFixture<SoulDetailComponent>;
  let el: DebugElement;

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
      declarations: [SoulDetailComponent, SoulPropertiesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SoulService, useValue: soulsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    soulsServiceSpy.getSoulDetailsById.and.returnValue(of(details));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 properties in soul details', () => {
    const detailsEl: DebugElement[] = el.queryAll(
      By.css('.details div span:last-child')
    );
    expect(detailsEl.length).toBe(7, 'Unexpected to find 7 properties');
  });

  it('should have the right values in soul details', () => {
    const detailsEl: DebugElement[] = el.queryAll(
      By.css('.details div span:last-child')
    );
    console.log(detailsEl[5].nativeElement.innerHTML);
    expect(detailsEl[0].nativeElement.innerHTML).toContain(
      details.collectionName,
      'Unexpected value of collectionName'
    );
    expect(detailsEl[1].nativeElement.innerHTML).toContain(
      details.createdAt,
      'Unexpected value of createdAt'
    );
    expect(detailsEl[2].nativeElement.innerHTML).toContain(
      details.id,
      'Unexpected value of id'
    );
    expect(detailsEl[3].nativeElement.innerHTML).toContain(
      details.name,
      'Unexpected value of name'
    );
    expect(detailsEl[4].nativeElement.innerHTML).toContain(
      details.owner,
      'Unexpected value of owner'
    );
    expect(detailsEl[5].nativeElement.innerHTML).toContain(
      details.status,
      'Unexpected value of status'
    );
    expect(detailsEl[6].nativeElement.innerHTML).toContain(
      details.updatedAt,
      'Unexpected value of updatedAt'
    );
  });
});
