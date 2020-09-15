import { Injectable } from '@angular/core';
import { OverlayComponent } from '../components/ui/overlay/overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor() {}

  open() {
    // Returns an OverlayRef (which is a PortalHost)
    // const overlayRef = this.overlay.create();

    // Create ComponentPortal that can be attached to a PortalHost
    // const filePreviewPortal = new ComponentPortal(OverlayComponent);

    // Attach ComponentPortal to PortalHost
    // overlayRef.attach(filePreviewPortal);
  }
}
