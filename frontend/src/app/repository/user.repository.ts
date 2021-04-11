import { Injectable } from '@angular/core';
import { RestDataSource } from '../model/rest.datasource';
import { UserDTO } from '../model/userDTO.model';

/**
 * UserRepository class
 */
@Injectable()
export class UserRepository {
  public users: UserDTO[] = [];
  public loaded = false;

  /**
   * Constructor
   */
  constructor(private dataSource: RestDataSource) {}

  /**
   * load users from data source
   */
  loadUsers(): void {
    this.dataSource.getUsers().subscribe(users => (this.users = users));
    this.loaded = true;
  }

  /**
   * get staffs info
   */
  getUsers(): UserDTO[] {
    if (!this.loaded) {
      this.loadUsers();
    }
    return this.users;
  }

  async getUsersAsync(): Promise<any> {
    return new Promise(resolve => {
        this.dataSource.getUsers().subscribe(users => (this.users = users));
        resolve(this.users);
    })
  }

  /**
   * Update staff info
   */
  updateUser(user: UserDTO): void {
    this.dataSource.updateUser(user).subscribe(user => {
      if (user != null) {
        this.users.splice(this.users.findIndex(u => u.id == user.id), 1, user);
      }
    });
  }

  /**
   * Add new staff
   */
  addUser(user: UserDTO): void {
    this.dataSource.addUser(user).subscribe(result => {});
  }
}
