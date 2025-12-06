import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
    this.checkLogin();
  }

  onSubmit() {
    const SERVER_URL = 'http://localhost:3000/users/login';
    this.http.post(SERVER_URL, this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/adminpanelapp']);
      },
      error: (err) => {
        console.error('Login failed');
      },
    });
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .get('http://localhost:3000/users/verify', { headers })
        .subscribe({
          next: (res: any) => {
            if (res.valid === true) {
              this.router.navigate(['/adminpanelapp']);
            } else {
              localStorage.removeItem('token'); // invalid token
            }
          },
          error: () => localStorage.removeItem('token'), // invalid token
        });
    }
  }
}
