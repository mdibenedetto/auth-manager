import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { IUser } from '../../model/IUser';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginUserData: IUser = {
        email: 'admin@test.com',
        password:  'admin'
    } as IUser;

    constructor(
        public auth: AuthService,
        private router: Router) { }


    loginUser() {
        this.auth
            .loginUser(this.loginUserData)
            .subscribe(
                res => {
                    debugger
                    localStorage.setItem('token', res.token)
                    this.router.navigate(['/special'])
                },
                err => console.log(err)
            )
    }

}