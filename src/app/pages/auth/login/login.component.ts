import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  login() {
    // this._auth.login(this.form.value).subscribe((res) => {
    //   this._router.navigateByUrl(environment.startPageAfterLogin);
    // });
    this._auth.login(this.form.value).then((res) => {
      this._router.navigateByUrl(environment.startPageAfterLogin);
      this._auth.updateUserData(res.user);
    });
  }
}
