import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { User } from "../types/entity/user";

interface LoginResponse {
  access_token: string;
}

interface RegisterResponse {}

interface GetMeReponse {
  body: { user: User }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials)
    .pipe(tap((response: LoginResponse) => this.setToken(response.access_token)));
  }
  register(user: {name: string, email: string, password: string, cep: string}) {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/user`, user)
  }

  private setToken(token: string):void {
     if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
     if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
     if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  getUserInfo(): any {
    const token = this.getToken();

    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return {email: payload.email, name: payload.name}
  }

   fetchUserDetails(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of(null)
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<GetMeReponse>(`${this.baseUrl}/user/me`, { headers });
  }

}
