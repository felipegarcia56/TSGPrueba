import { TestBed } from '@angular/core/testing';

import { ServicesClientService } from './services-client.service';

describe('ServicesClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesClientService = TestBed.get(ServicesClientService);
    expect(service).toBeTruthy();
  });
});
