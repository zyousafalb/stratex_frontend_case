import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from 'rxjs';
import { UserModel, UserType } from 'src/app/model/user.model';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  userRole : UserModel[] ;
  seniorUser : UserModel[] ;
  wfm : UserModel[];
  users : UserModel[];

  user : UserModel;

  constructor(public userServices : UsersService) {

    // assign default values
    this.userRole  =  new Array<UserModel>();
    this.seniorUser  =  new Array<UserModel>();
    this.wfm  =  new Array<UserModel>();
    this.users  =  new Array<UserModel>();

    this.user = new UserModel();
   }

  ngOnInit(): void {
    // get data from file 
    this.userServices.getJSON().subscribe((data  )=> {
      this.users = data.users;

      this.userRole = this.users.filter(x => x.role == UserType.user);
      this.seniorUser = this.users.filter(x => x.role == UserType.seniorUser);
      this.wfm = this.users.filter(x => x.role == UserType.wfm);
    });
  }

  openModal( id: string) {
    this.userServices.open(id);
  }

  closeModal(userForm:any,id: string) {
    if(userForm.invalid) {

      this.validate(userForm);
      this.userServices.open(id);

    } else {
      this.addUser();
      this.userServices.close(id);
      userForm.reset();
    }
    
  }

  addUser() {
    let userType = +this.user.role;

    switch (userType) {
      case UserType.user:
        this.user.id = (this.userRole.length  + 1);
        this.userRole.push(this.user);
        break;
      case UserType.seniorUser:
        this.user.id = (this.seniorUser.length  + 1);
        this.seniorUser.push(this.user);
        break;  
    
      default:
        this.user.id = (this.wfm.length  + 1);
        this.wfm.push(this.user);
        break;
    }
    
    this.users.push(this.user);
    this.user = new UserModel();

  }

  removeUser($event : any) {

    let id = +$event.id;
    let type = +$event.role;
    // pointer
    let objType = this.wfm;
    let index = -1;
    
    switch (type) {
      case UserType.user:
        index = this.userRole.findIndex(x => x.id == id && x.role == UserType.user );
        objType = this.userRole;
        break;
      case UserType.seniorUser:
        index = this.seniorUser.findIndex(x => x.id == id && x.role == UserType.seniorUser);
        objType = this.seniorUser;
        break;  
    
      default:
        index = this.wfm.findIndex(x => x.id == id && x.role == UserType.wfm);
        break;
    }
  
    if (index != -1) {
      objType.splice(index, 1);
      index = this.users.findIndex(x => x.id == id && x.role == type);

      this.users.splice(index, 1);
    }
  }
  
  reserForm() {
    this.user = new UserModel();
  }

  searching(event : any) {
  // searching on first name
    let value = event.target.value;
    let result = value == '' ? this.users : this.users.filter(item => item.firstName.search(new RegExp(value, 'i')) > -1);

    this.userRole = result.filter(x => x.role == UserType.user);
    this.seniorUser = result.filter(x => x.role == UserType.seniorUser);
    this.wfm = result.filter(x => x.role == UserType.wfm);

  }

  validate(formGroup : any){
    // validate all fields if click without touch any field
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.form.get(field);
        if (control instanceof FormControl) {
            control.markAsDirty();
        } else if (control instanceof FormGroup) {
            this.validate(control);
        }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
