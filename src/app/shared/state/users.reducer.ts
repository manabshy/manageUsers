import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { UserModel, calculateUsersGrossEarnings } from '../models/user';
import { UsersPageActions, UsersApiActions } from '../../users/actions';
import { act } from "@ngrx/effects";


const createUser = (users: UserModel[], user: UserModel) => [...users, user];
const updateUser = (users: UserModel[], changes: UserModel) =>
  users.map(user => {
    return user.id === changes.id ? Object.assign({}, user, changes) : user;
  });
const deleteUser = (users: UserModel[], userId: string) =>
  users.filter(user => userId !== user.id);


export interface State {
    collection: UserModel[];
    activeUserId: string | null;
}

export const initialState: State = {
    collection: [],
    activeUserId: null
}

export const usersReducer = createReducer(
    initialState,
    on(UsersPageActions.enter, (state, action) => {
        return {
            ...state,
            activeUserId: null
        }
    }),
    on(UsersPageActions.clearSelectedUser, (state, action) => {
            return {
                ...state,
                activeUserId: null
            }

    }),
    on(UsersPageActions.selectUser,(state, action) => {
        return {
            ...state,
            activeUserId: action.userId
        }
    }),
    on(UsersApiActions.usersLoaded, ( state, action) => {
        return {
            ...state,
            collection:  action.users

        }
    }),
    on(UsersApiActions.userDeleted, (state, action) => {
        return {
            ...state,
            collection: deleteUser(state.collection, action.userId)
        }
    }),
    on(UsersApiActions.userCreated, (state, action) => {
        return {
            ...state,
            collection: createUser(state.collection, action.user)
        }
    }),
    on(UsersApiActions.userUpdated, (state, action) => {
        return {
            ...state,
            collection: updateUser(state.collection, action.user)
        }
    })
);

export function reducer( state: State| undefined, action: Action) {
    return usersReducer(state, action);
}

/**
 *
 * Getter selectors
 */
export const selectAll = (state: State) => state.collection;
export const selectActiveUserId = (state: State) => state.activeUserId;

/***
 * Complex Selectors
 */


 export const selectActiveUser = createSelector(
    selectAll,
    selectActiveUserId,
    (users, activeUserId) => {
        return users.find(user => user.id === activeUserId);
    }
 );

 export const selectEarningsTotal_unoptimized = (state: State) => {
     const users = selectAll(state);
     return calculateUsersGrossEarnings(users)
 }

 export const selectEarningsTotal = createSelector (
   selectAll,
   calculateUsersGrossEarnings);
