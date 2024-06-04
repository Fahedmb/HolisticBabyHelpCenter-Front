
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        MessagesModule,
        MessageModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
