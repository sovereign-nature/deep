import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { SoulService } from 'src/app/services/soul.service';
import { SoulFilterComponent } from '../soul-filter/soul-filter.component';
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
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        SoulListComponent,
        SoulTableComponent,
        SoulFilterComponent,
        StatusPipe,
      ],
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
    component.data$ = of(souls);

    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table');

    expect(table).toBeTruthy();
  });

  it('should contain filter', () => {
    const filter = fixture.nativeElement.querySelector('form');
    expect(filter).toBeTruthy();
  });
});
