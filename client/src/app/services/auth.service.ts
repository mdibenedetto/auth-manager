import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    private _registerUrk = "/api/register";
    private _loginUrk = "/api/login";

    constructor(
        private http: HttpClient,
        private router: Router) { }

    registerUser(user) {
        return this.http.post<any>(this._registerUrk, user);
    }

    loginUser(user) {
        return this.http.post<any>(this._loginUrk, user);
    }

    logoutUser() {
        localStorage.removeItem('token');
        this.router.navigate(['/events']);
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

}