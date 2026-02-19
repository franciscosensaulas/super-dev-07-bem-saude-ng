import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly authService = inject(AuthService);
  user$ = this.authService.user$;

  menuItems = [
    { label: 'Home', icon: 'fa fa-home', route: '/', exact: true },
    { label: 'Pacientes', icon: 'fa fa-users', route: '/pacientes', exact: false },
    { label: 'Profissionais', icon: 'fa fa-user-doctor', route: '/profissionais', exact: false },
    { label: 'Recepcionistas', icon: 'fa fa-id-badge', route: '/recepcionistas', exact: false },
  ];

  logout() {
    this.authService.logout(
      { logoutParams: { returnTo: window.location.origin } }
    );
  }
}
