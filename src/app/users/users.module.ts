import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material.module";
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    UsersPageComponent,
    UsersDetailComponent,
    UsersListComponent
  ],
  exports: [
    UsersPageComponent,
    UsersDetailComponent
  ]
})
export class UsersModule { }
