import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginComponent Test', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule],
    });
    const fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
  });

  it('should create login component', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should mark all form fields as "touched" if it is invalid', () => {
    loginComponent.loginForm.patchValue({
      email: 'sdfsdfasdfaafdvcxbtgfyhuk',
      password: '',
    });
    loginComponent.login();
    expect(loginComponent.emailControl.touched).toBeTrue();
    expect(loginComponent.passwordControl.touched).toBeTrue();
  });

  it('should call the AuthService login method if the form is valid', () => {
    loginComponent.loginForm.patchValue({
      email: 'decano@admin.com',
      password: '123456',
    });

    const spyOnAuthServiceLogin = spyOn(
      (loginComponent as any).authService,
      'login'
    );

    loginComponent.login();

    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
