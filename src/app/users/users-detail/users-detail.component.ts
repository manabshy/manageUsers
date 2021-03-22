import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent  {

  originalUser: UserModel | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  userForm = new FormGroup({
    name: new FormControl("")
  });

  @Input() set user(user: UserModel) {
    this.userForm.reset();
    this.originalUser = undefined;

    if (user) {
      this.userForm.setValue({
        name: user.name
      });

      this.originalUser = user;
    }
  }

  onSubmit(user: UserModel) {
    this.save.emit({ ...this.originalUser, ...user });
  }
}
