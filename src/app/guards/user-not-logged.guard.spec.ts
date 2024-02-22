import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotLoggedGuard } from './user-not-logged.guard';

describe('userNotLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
