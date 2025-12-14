import { endPointService } from './../../endpointsService';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private endPointService: endPointService) {}

  login() {
    const body = {
      email: this.email,
      password: this.password
    };

    this.endPointService.login(body)
      .subscribe({
        next: (res: any) => {
          console.log('Login OK:', res);
        },
        error: () => {
          this.errorMessage = 'Credenciais inválidas.';
        }
      });
  }
}
