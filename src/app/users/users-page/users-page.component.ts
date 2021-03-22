import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel, UserRequiredProps } from 'src/app/shared/models/user';
import { UsersService } from '../../shared/services/user.service';
import { State, selectUsersEarningsTotal, selectAllUsers, selectActiveUser } from '../../shared/state';
import { UsersPageActions, UsersApiActions} from '../actions';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users$:Observable<UserModel[]>;
  currentUser$: Observable<UserModel|undefined>;
  total: number = 0;
  total$: Observable<number>;

  constructor(private usersService: UsersService, private store: Store<State>) {

    this.total$ = store.select(selectUsersEarningsTotal);
    this.users$ = store.select(selectAllUsers);
    this.currentUser$ = store.select(selectActiveUser);
  }

  ngOnInit() {

    this.store.dispatch(UsersPageActions.enter());
    this.getUsers();
    this.removeSelectedUser();
  }

  getUsers() {
    this.usersService.all().subscribe(users => {
      this.store.dispatch(UsersApiActions.usersLoaded({users: users}));
    });
  }


  onSelect(user: UserModel) {
    this.store.dispatch(UsersPageActions.selectUser({userId: user.id}));
  }

  onCancel() {
    this.removeSelectedUser();
  }

  removeSelectedUser() {
    this.store.dispatch(UsersPageActions.clearSelectedUser());
  }

  onSave(user: UserRequiredProps | UserModel) {
    if ("id" in user) {
      this.updateUser(user);
    } else {
      this.saveUser(user);
    }
  }

  saveUser(userProps: UserRequiredProps) {
    this.store.dispatch(UsersPageActions.createUser({user: userProps}));
    // TODO This will be moved to an NgRx effect
    this.usersService.create(userProps).subscribe((user) => {
      this.store.dispatch(UsersApiActions.userCreated({user: user}));

      this.getUsers();
      this.removeSelectedUser();
    });
  }

  updateUser(user: UserModel) {
    this.store.dispatch(UsersPageActions.updateUser({userId: user.id, changes: user}));
    // TODO This will be moved to an NgRx effect
    this.usersService.update(user.id, user).subscribe((user) => {
      this.store.dispatch(UsersApiActions.userUpdated({user: user}));
      this.getUsers();
      this.removeSelectedUser();
    });
  }

  onDelete(user: UserModel) {
    this.store.dispatch(UsersPageActions.deleteUser({userId: user.id}));
    // TODO This will be moved to an NgRx effect
    this.usersService.delete(user.id).subscribe(() => {
      this.store.dispatch(UsersApiActions.userDeleted({userId: user.id}));

      this.getUsers();
      this.removeSelectedUser();
    });
  }
  onDeleteAll() {
    // TODO : Not Implemented
    // Dispatch Event to Delete All users
  }
}
