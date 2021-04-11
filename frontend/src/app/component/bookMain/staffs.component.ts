import { Component } from '@angular/core';
import { UserRepository } from 'src/app/repository/user.repository';
import { UserDTO } from 'src/app/model/userDTO.model';
 
/**
 * Component - StaffsComponent
 * The first component when the administrator login succeed
 */
@Component({
  templateUrl: 'staffs.component.html',
  styleUrls: ['../../app.component.css']
})
export class StaffsComponent {
  /**
   * Constructor
   * @param userRepository
   */
  constructor(public userRepository: UserRepository) {}

  async ngOnInit(): Promise<void> {
    await this.getUsersAsync();
  }

  /**
   * get method to get users
   */
  get users(): UserDTO[] {
    return this.userRepository.getUsers();
  }

  async getUsersAsync(): Promise<any> {
    await this.userRepository.getUsersAsync().then(resolve => {
        return resolve;
    })
  }

  /**
   * update the staff
   */
  updateUser(user: UserDTO): void {
    user.status = user.status == 'true' ? 'false' : 'true';
    this.userRepository.updateUser(user);
  }
}
