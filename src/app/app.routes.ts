import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'callback',
        loadComponent: () => import('./pages/callback/callback').then((m) => m.Callback)
    },
    {
        path: '',
        loadComponent: () => import('./layout/layout').then((m) => m.Layout),
        canActivate: [authGuard],
        children: [
            { path: 'recepcionistas', loadComponent: () => import('./pages/recepcionistas/list/list').then((m) => m.List) },
            { path: 'pacientes', loadComponent: () => import('./pages/pacientes/list/list').then((m) => m.List) },
            { path: 'profissionais', loadComponent: () => import('./pages/profissionais/list/list').then((m) => m.List) },
        ]
    },
];
