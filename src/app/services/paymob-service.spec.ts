import { TestBed } from '@angular/core/testing';

import { PaymobService } from './paymob-service';

describe('PaymobService', () => {
  let service: PaymobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
