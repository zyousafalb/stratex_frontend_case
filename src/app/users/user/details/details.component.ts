import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() details: UserModel[] = new Array<UserModel>();
  @Output() deleteUser = new EventEmitter<{id: number, role: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  removeUserByIdAndType(id :number, role: number) {
    let obj = {id:id , role: role};
    this.deleteUser.emit(obj);
  }
}
