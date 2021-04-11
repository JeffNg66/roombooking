import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from '../model/rest.datasource';

/**
 * AuthService Injectable - for user authentification
 */
@Injectable()
export class AuthService {
  /**
   * Constructor
   */
  constructor(private dataSource: RestDataSource) {}

  /**
   * Authenticate user
   */
  authenticate(username: string, password: string): Observable<boolean> {
    return this.dataSource.authenticate(username, password);
  }

  /**
   * Get method for authentification
   */
  get authenticated(): boolean {
    return this.dataSource.auth_token != null;
  }

  /**
   * Clear authentification info
   */
  clear(): void {
    this.dataSource.auth_token = null;
  }
}
