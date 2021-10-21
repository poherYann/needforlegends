import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { ActivationService } from './activation.service';

describe('ActivationService', () => {
  let service: ActivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
