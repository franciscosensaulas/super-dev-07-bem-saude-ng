import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout').then((m) => m.Layout),
        children: [
            { path: 'recepcionistas', loadComponent: () => import('./pages/recepcionistas/list/list').then((m) => m.List) },
            { path: 'pacientes', loadComponent: () => import('./pages/pacientes/list/list').then((m) => m.List) },
            { path: 'profissionais', loadComponent: () => import('./pages/profissionais/list/list').then((m) => m.List) },
        ]
    },
];
