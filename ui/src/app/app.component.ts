import { Component } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
    timeout: 2000,
    limit: 3,
    tapToDismiss: true,
    showCloseButton: { 'warning': true, 'error': false }
  });
}
