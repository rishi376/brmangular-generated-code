import { Injectable } from '@angular/core';
import { allUsers, USERTYPE } from './common/account/data';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private loggedInUser;

  constructor() {}

  getUserById(login: string): USERTYPE {
    return allUsers.find(eachUser => eachUser.login === login);
  }

  registerloggedinUser(loggedinUser: USERTYPE): void {
    this.loggedInUser = loggedinUser;
  }

  getLoggedInUser(): USERTYPE {
    return this.loggedInUser;
  }
}
