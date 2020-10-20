import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ForbiddenEmailDirective, MatchValidatorDirective } from '../shared/directives/customs';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForbiddenEmailDirective, MatchValidatorDirective],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
