import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: UserModel[];
  @Input() readonly = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
