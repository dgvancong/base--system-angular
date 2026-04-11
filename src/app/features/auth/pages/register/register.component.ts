import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
     if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(100)]],
      department: ['', [Validators.maxLength(100)]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return !isValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      console.log('Vui lòng kiểm tra lại thông tin đăng ký');
      return;
    }
    this.isLoading = true;
    const registerData = {
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      firstName: this.registerForm.value.firstName || '',
      lastName: this.registerForm.value.lastName || ''
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          console.log(response.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        else {
          console.log(response.message || 'Đăng ký thất bại');
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error?.errors) {
          error.error.errors.forEach((err: string) => {
          console.log(err);});
        }
        else {
          console.log(error.message || 'Có lỗi xảy ra, vui lòng thử lại');
        }
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) {
      return 'Trường này là bắt buộc';
    }
    if (control.errors['email']) {
      return 'Email không đúng định dạng';
    }
    if (control.errors['minlength']) {
      return `Tối thiểu ${control.errors['minlength'].requiredLength} ký tự`;
    }
    if (control.errors['maxlength']) {
      return `Tối đa ${control.errors['maxlength'].requiredLength} ký tự`;
    }
    if (control.errors['pattern']) {
      return 'Chỉ được chứa chữ cái, số và dấu gạch dưới';
    }
    if (control.errors['passwordStrength']) {
      return 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    const passwordControl = this.registerForm.get('password');
    const confirmControl = this.registerForm.get('confirmPassword');
    if (!confirmControl?.touched) return '';
    if (confirmControl.errors?.['required']) {
      return 'Vui lòng xác nhận mật khẩu';
    }
    if (this.registerForm.errors?.['passwordMismatch'] && confirmControl.value) {
      return 'Mật khẩu xác nhận không khớp';
    }
    return '';
  }

  get hasUpperCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[A-Z]/.test(password);
  }

  get hasLowerCase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[a-z]/.test(password);
  }

  get hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[0-9]/.test(password);
  }

  get hasSpecialChar(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[@$!%*?&]/.test(password);
  }

  get hasMinLength(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password?.length >= 6;
  }

}
