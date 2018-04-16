import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
    private _registerUrk = "http://localhost:5000/api/register";
    private _loginUrk = "http://localhost:5000/api/login";
    

    constructor(private http: HttpClient) {

    }

    registerUser(user) {
        return this.http.post<any>(this._registerUrk, user);
    }

    loginUser(user){
        return this.http.post<any>(this._loginUrk, user);        
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

}