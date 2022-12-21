import { TestBed } from '@angular/core/testing';

import { SoulService } from './soul.service';

describe('SoulService', () => {
  let service: SoulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
