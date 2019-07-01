import { TestBed } from '@angular/core/testing';

import { NyanBuilderService } from './nyan-builder.service';

describe('NyanBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NyanBuilderService = TestBed.get(NyanBuilderService);
    expect(service).toBeTruthy();
  });
});
