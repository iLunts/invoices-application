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
  loadingPopover: any;

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
      this._auth.SetUserData(res.user);
      this._router.navigate([environment.startPageAfterLogin], {
        replaceUrl: true,
      });
      this.loadingPopover.dismiss();

      // if (!res.user.emailVerified) {
      //   this._auth.SendVerificationMail().then((res: any) => {});
      // }
    });
  }

  loginOnGoogle() {
    this._auth.GoogleAuth();
  }

  async showLoading() {
    this.loadingPopover = await this._loading.create({
      cssClass: 'popover--loading',
      spinner: null,
      duration: 5000,
      message: 'Загрузка...',
      translucent: true,
      backdropDismiss: true,
    });
    await this.loadingPopover.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed with role:', role);
  }
}
