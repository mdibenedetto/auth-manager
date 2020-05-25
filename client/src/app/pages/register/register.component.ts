import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { IUser } from '../../model/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: IUser = {} as any;

  constructor(
    private auth: AuthService,
    private router: Router) { }


  registerUser() {
    this.auth.registerUser(this.user)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.router.navigate(['/special'])
        },
        err => console.log(err)
      )
  }


}