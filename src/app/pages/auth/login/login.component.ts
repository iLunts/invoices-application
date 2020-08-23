import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

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
    private _fb: FormBuilder,
    private _loading: LoadingController
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {}

  login() {
    if (this.form.invalid) {
      return;
    }
    this.showLoading();
    this._auth.SignIn(this.f.email.value, this.f.password.value).then((res) => {
      this._router.navigateByUrl(environment.startPageAfterLogin);
      this._auth.SetUserData(res.user);
      this._loading.dismiss();
      if (!res.user.emailVerified) {
        this._auth.SendVerificationMail().then((res: any) => {
          // alert('SendVerificationMail: ' + res);
        });
      }
    });
  }

  loginOnGoogle() {
    this._auth.GoogleAuth();
  }

  async showLoading() {
    const loading = await this._loading.create({
      cssClass: 'popover--loading',
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}
