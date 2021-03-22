import { createAction, props } from "@ngrx/store";
import { UserModel } from '../../shared/models/user';

export const usersLoaded = createAction(
    '[Users API] Users Loaded success',
    props<{users: UserModel[]}>()
)

export const userCreated = createAction(
    '[Users API] Users Created Success',
    props<{user: UserModel}>()
)

export const userUpdated = createAction(
    '[Users API] Users Updated Success',
    props<{user: UserModel}>()
)

export const userDeleted = createAction(
    '[Users API] Users Deleted Success',
    props<{userId: string}>()
)


