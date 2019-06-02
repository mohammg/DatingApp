/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllertifyserviceService } from './allertifyservice.service';

describe('Service: Allertifyservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllertifyserviceService]
    });
  });

  it('should ...', inject([AllertifyserviceService], (service: AllertifyserviceService) => {
    expect(service).toBeTruthy();
  }));
});
