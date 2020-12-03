import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
