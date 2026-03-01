import { TestBed } from '@angular/core/testing';

import { RulesNodeService } from './rules-node-service';

describe('RulesNodeService', () => {
  let service: RulesNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
