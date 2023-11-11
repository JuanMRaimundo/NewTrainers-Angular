import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/dashboard/pages/users/models';
import { environment } from 'src/environments/environment.local';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';

describe('AuthService Test', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router)],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AuthService should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should establish an authenticated user when login()', () => {
    const userMock: User = {
      id: 1,
      name: 'proof',
      lastName: 'test',
      email: 'proof@email.com',
      password: '123456789',
      age: 32,
      token: 'karls3rd3j34bfakd342jb',
      role: 'adminTest',
    };
    service.login({
      email: userMock.email,
      password: userMock.password,
    });

    httpController
      .expectOne({
        method: 'GET',
        url: `${environment.baseUrl}/users?email=${userMock.email}&password=${userMock.password}`,
      })
      .flush([userMock]);

    service.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toEqual(userMock);
      },
    });
  });
});
