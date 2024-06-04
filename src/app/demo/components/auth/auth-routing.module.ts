import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'register', component: RegisterComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
