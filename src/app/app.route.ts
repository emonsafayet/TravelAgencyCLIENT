import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Login } from "./Public/Login/Login";
import { AdminRoutes } from "./routes/admin.route";

import { AdminLayout } from "./Layouts/AdminLayout/AdminLayout";

 
//Guard
import { AuthGuard } from './authGuard.guard';

const routes: Routes = [
    { path: 'login', component : Login},
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full', },
    // { path: '', component: AdminLayout, data: { title: 'Secure Views' }, children: AdminRoutes },
    { path: '', component: AdminLayout, canActivate:[AuthGuard], data: { title: 'Secure Views' }, children: AdminRoutes },
    { path: '**', redirectTo: 'notfound', pathMatch: 'full', },
];

export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes,{useHash: true});