import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { SoulService } from 'src/app/services/soul.service';
import { SoulPropertiesComponent } from './soul-properties.component';

describe('SoulPropertiesComponent', () => {
  let component: SoulPropertiesComponent;
  let fixture: ComponentFixture<SoulPropertiesComponent>;

  beforeEach(async () => {
    const soulsServiceSpy = jasmine.createSpyObj(
      'SoulService',
      ['getMetadata'],
      ['QmWcL7iVVnungvFsh5VR58NiK919VpKye62MAaDTNpsFfH']
    );
    await TestBed.configureTestingModule({
      declarations: [SoulPropertiesComponent],
      imports: [ApolloTestingModule, HttpClientTestingModule],
      providers: [{ provide: SoulService, useValue: soulsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
