import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/user.service';
import { UsersApiActions, UsersPageActions } from '../actions';

import { UsersPageComponent } from './users-page.component';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let usersService;
  let store;
  beforeEach(async(() => {
    usersService = jasmine.createSpyObj('usersService', ['all', 'update', 'delete', 'create']);
    store = jasmine.createSpyObj(['dispatch', 'pipe', 'select']);
    usersService.all.and.returnValue(of([{id: '124',name: 'x', salary: 1}]))
    TestBed.configureTestingModule({
      declarations: [ UsersPageComponent ],
      providers:[{ provide: UsersService, useValue: usersService },
        { provide: Store, useValue: store },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should able to load users', () => {
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(UsersApiActions.usersLoaded({users: [{id: '124',name: 'x', salary: 1}]}));
  });
  it('should able to delete selected user', () => {
    component.removeSelectedUser();
    expect(store.dispatch).toHaveBeenCalledWith(UsersPageActions.clearSelectedUser());
  });
  it('should able to select a user', () => {
    const user:UserModel = {id: '123', name: 'test', salary: 100};
    component.onSelect(user);
    expect(store.dispatch).toHaveBeenCalledWith(UsersPageActions.selectUser({userId: user.id}));
  });
  it('should able to update a new user', () => {
    spyOn(component, 'updateUser');
    const user:UserModel = {id: '123', name: 'test', salary: 100};
    component.onSave(user);
    expect(component.updateUser).toHaveBeenCalledWith(user);
  });

});;
