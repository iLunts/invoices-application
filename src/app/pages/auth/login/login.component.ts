import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { EMAIL_VALIDATION } from 'src/app/shared/constants/validators';

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
    private _loading: LoadingController,
    private _notification: NotificationService
  ) {
    this.form = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          // Validators.pattern(EMAIL_VALIDATION),
        ],
      ],
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
    this._auth.SignIn(this.f.email.value, this.f.password.value).then(
      (res) => {
        this._auth.SetUserData(res.user);
        this._router.navigate([environment.startPageAfterLogin], {
          replaceUrl: true,
        });
        this.loadingPopover.dismiss();

        // TODO: Check if email not verified
        // if (!res.user.emailVerified) {
        //   this._auth.SendVerificationMail().then((res: any) => {});
        // }
      },
      (error: any) => {
        if (this.loadingPopover) {
          this.loadingPopover.dismiss();
        }
        this._notification.error(error.message);
      }
    );
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
  }
}
