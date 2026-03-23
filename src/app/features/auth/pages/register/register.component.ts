import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  fullName: string = '';
  phone: string = '';
  address: string = '';
  confirmPassword: string = '';

  constructor(
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.typeView = params['view'];
    });
  }

  onSubmit() {
    console.log('Đăng nhập:', { email: this.email, password: this.password });
    // this.router.navigate(['/dashboard']);
  }

}
