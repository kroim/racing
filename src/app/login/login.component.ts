import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    let login_flag = localStorage.getItem('softrams_racing_login');
    if (login_flag == null || login_flag == 'false') {}
    else {
      this.router.navigate(['/members']);
    }
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.appService.username = this.loginForm.value.username;
    localStorage.setItem('softrams_racing_login', "true");
    localStorage.setItem('softrams_racing_name', this.loginForm.value.username);
    this.router.navigate(['/members']);
  }

}
