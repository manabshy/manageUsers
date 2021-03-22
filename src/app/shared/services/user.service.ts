import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as uuid from "uuid/v4";
import { UserModel, UserRequiredProps } from "../models/user";

const BASE_URL = "http://localhost:3000/Users";
const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<UserModel[]>(BASE_URL);
  }

  load(id: string) {
    return this.http.get<UserModel>(`${BASE_URL}/${id}`);
  }

  create(UserProps: UserRequiredProps) {
    const User: UserModel = {
      id: uuid(),
      ...UserProps
    };

    return this.http.post<UserModel>(
      `${BASE_URL}`,
      JSON.stringify(User),
      HEADER
    );
  }

  update(id: string, updates: UserRequiredProps) {
    return this.http.patch<UserModel>(
      `${BASE_URL}/${id}`,
      JSON.stringify(updates),
      HEADER
    );
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
