import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SoulFilter } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

import { SoulFilterComponent } from './soul-filter.component';

describe('SoulFilterComponent', () => {
  let component: SoulFilterComponent;
  let fixture: ComponentFixture<SoulFilterComponent>;
  let el: DebugElement;
  const soulServiceSpy = jasmine.createSpyObj('SoulService', [
    'setFilterToSouls',
  ]);

  const form: SoulFilter = {
    searchById: '',
    soulStatus: -1,
    createdDate: 0,
    updatedDate: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [SoulFilterComponent],
      providers: [{ provide: SoulService, useValue: soulServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SoulFilterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all form fields', () => {
    const formElementInputs = el.queryAll(By.css('input'));
    const formElementSelect = el.queryAll(By.css('select'));

    expect(formElementInputs.length).toBe(3, 'Unexpected to find 3 inputs');
    expect(formElementSelect.length).toBe(1, 'Unexpected to find 3 inputs');
  });

  it('should have reactive form with default values', () => {
    pending();
  });

  it('should detect value changes on inputs send value to setFilterToSouls()', () => {
    pending();
  });

  it('should include filter parameters in the url', () => {
    pending();
  });
});
