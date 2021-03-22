export interface UserModel {
  id: string;
  name: string;
  salary: number

}

export type UserRequiredProps = Pick<UserModel, "name" | "salary" >;

export function calculateUsersGrossEarnings(users: UserModel[]) {
  return users.reduce((total, user) => {
    return total + parseInt(`${user.salary}`, 10) || 0;
  }, 0);
}
