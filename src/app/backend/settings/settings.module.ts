import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [SettingsComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
