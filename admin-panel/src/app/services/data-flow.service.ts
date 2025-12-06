import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  async isLoggedIn(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const response = await firstValueFrom(
        this.http
          .get<{ valid: boolean }>('http://localhost:3000/users/verify', {
            headers,
          })
          .pipe(
            map((res) => res.valid),
            catchError(() => of(false))
          )
      );

      return response; // true or false
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.clear();
  }
}
