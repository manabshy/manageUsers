import { createAction, props } from "@ngrx/store";
import { UserRequiredProps } from '../../shared/models/user';

export const enter = createAction('[Users Page] Enter');

export const selectUser = createAction('[Users Page] Select User',
    props<{ userId: string }>());

export const clearSelectedUser= createAction('Users Page] Clear Selected User');

export const createUser = createAction('Users Page] Create User',
props<{user: UserRequiredProps}>());

export const updateUser = createAction('Users Page] Update User',
props<{userId: string; changes: UserRequiredProps}>());

export const deleteUser = createAction('Users Page] Delete User',
props<{userId: string}>());
