import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserModalComponent } from './user-modal/user-modal.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './user/details/details.component';

@NgModule({
  declarations: [
    UserComponent,
    UserModalComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers : [
    UsersService
  ]
})
export class UsersModule { }
