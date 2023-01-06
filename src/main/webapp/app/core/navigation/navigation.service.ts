import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap, take, switchMap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { AccountService } from '../auth/account.service';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private accountService: AccountService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for navigation
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all navigation data
   */
  get(): Observable<Navigation> {
    return this.accountService.identity().pipe(
      take(1),
      switchMap(account =>
        this._httpClient.get<any>('api/navigations').pipe(
          tap(serverNavigations => {
            const navigations: FuseNavigationItem[] = [];
            serverNavigations.forEach(eachNavigation => {
              const navigationItem = this.buildNavigation(eachNavigation);
              if (eachNavigation.children) {
                navigationItem.children = eachNavigation.children.map(eachChild => this.buildNavigation(eachChild));
              }
              navigations.push(navigationItem);
            });
            this._navigation.next({ compact: navigations, default: navigations, futuristic: navigations, horizontal: navigations });
          })
        )
      )
    );
  }

  buildNavigation(eachNavigation): FuseNavigationItem {
    return Object.assign({}, eachNavigation);
  }
}
