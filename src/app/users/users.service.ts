import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable()
export class UsersService {
  userUrl = './assets/employees.json';
  private modals: any[] = [];

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }


  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
      // remove modal from array of active modals
      this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  close(id: string) {
      // close modal specified by id
      const modal = this.modals.find(x => x.id === id);
      modal.close();
  }


}
