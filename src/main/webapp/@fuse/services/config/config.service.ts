import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, take, tap } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';
import { AccountService } from 'app/core/auth/account.service';
import { AppConfig } from 'app/core/config/app.config';
import { Authority } from 'app/config/authority.constants';
import { Account } from 'app/core/auth/account.model';

@Injectable({
  providedIn: 'root'
})
export class FuseConfigService {
  private _config: BehaviorSubject<any>;

  /**
   * Constructor
   */
  constructor(@Inject(FUSE_APP_CONFIG) config: any, private accountService: AccountService) {
    this._config = new BehaviorSubject(config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  /**
   * Setter & getter for config
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    // Execute the observable
    this._config.next(config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resets the config to the default
   */
  reset(): void {
    // Set the config
    this._config.next(this.config);
  }

  updateDefaultLayout(): Observable<[Account, any]> {
    return combineLatest([this.accountService.identity(), this.config$]).pipe(
      take(1),
      tap(([account, configData]) => {
        if (account && (account.authorities.includes(Authority.admin) || account.authorities.includes(Authority.backOfficeUser))) {
          this.config = { layout: 'classy' };
        } else if (account && account.authorities.includes(Authority.user)) {
          this.config = { layout: 'enterprise' };
        }
      })
    );
  }
}
