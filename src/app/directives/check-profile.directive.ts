import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Directive({
  selector: '[checkProfile]',
})
export class CheckProfileDirective {
  private profileSubscription: Subscription;

  constructor(
    private _profile: ProfileService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this._profile.isActive) {
      debugger;
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    // this.profileSubscription = this._auth
    //   .isAuthorized(this.allowedRoles)
    //   .subscribe((value) => {
    //     if (value) {
    //       this.viewContainerRef.createEmbeddedView(this.templateRef);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    // if (this.authSubscription) {
    //   this.authSubscription.unsubscribe();
    // }
  }
}
