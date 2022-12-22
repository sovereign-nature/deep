import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';
import { SoulTableComponent } from '../soul-table/soul-table.component';

import { SoulListComponent } from './soul-list.component';

describe('SoulListComponent', () => {
  let component: SoulListComponent;
  let fixture: ComponentFixture<SoulListComponent>;
  const soulServiceSpy = jasmine.createSpyObj('SoulService', ['getSoulsList']);

  const souls: Soul[] = [
    {
      id: '0x2',
      owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
      status: 0,
      createdAt: 1665497178,
      updatedAt: 1665497178,
      name: 'Sovereign Nature Identifier #N',
      collectionName: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule],
      declarations: [SoulListComponent, SoulTableComponent],
      providers: [{ provide: SoulService, useValue: soulServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain table', () => {
    component.souls$ = of(souls);

    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table');

    expect(table).toBeTruthy();
  });
});
