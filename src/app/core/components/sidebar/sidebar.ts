import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  menuItems = [
    { label: 'Home', icon: 'fa fa-home', route: '/', exact: true },
    { label: 'Pacientes', icon: 'fa fa-users', route: '/pacientes', exact: false },
    { label: 'Profissionais', icon: 'fa fa-user-doctor', route: '/profissionais', exact: false },
    { label: 'Recepcionistas', icon: 'fa fa-id-badge', route: '/recepcionistas', exact: false },
  ];
}
