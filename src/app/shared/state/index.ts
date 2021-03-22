import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromUsers from './users.reducer';

export interface State {
    users: fromUsers.State
}

export const reducers: ActionReducerMap<State> = {
    users: fromUsers.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

/** Users State **/

export const selectUsersState = (state: State) => state.users;
export const selectActiveUser = createSelector(
  selectUsersState,
  fromUsers.selectActiveUser
)

export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.selectAll
)

export const selectUsersEarningsTotal = createSelector(
    selectUsersState,
    fromUsers.selectEarningsTotal
)
