import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';
import { AccountService } from 'app/core/auth/account.service';
import { ProfileType } from './enumerations/profile-type.model';
import { ProfileSource } from './enumerations/profile-source.model';
import { ProfileStatus } from './enumerations/profile-status.model';
import dayjs from 'dayjs/esm';
import { ProfileVerificationStatus } from './enumerations/profile-verification-status.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string;
  profile: BehaviorSubject<Profile> = new BehaviorSubject(null);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _profileService: ProfileService,
    private accountService: AccountService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: 'customer',
        icon: 'heroicons_outline:user-circle',
        title: 'Customer',
        description: 'Manage your public profile and private information'
      },
      {
        id: 'payment-info',
        icon: 'heroicons_outline:user-circle',
        title: 'PaymentInfo',
        description: 'Manage your public profile and private information'
      },
      {
        id: 'passport',
        icon: 'heroicons_outline:user-circle',
        title: 'Passport',
        description: 'Manage your public profile and private information'
      }
      /* brm-needle-add-profile-section-panels - brm-generator will add profile section panels here */
    ];

    this.selectedPanel = this.panels[0] ? this.panels[0].id : 'empty';

    // TODO - use the correct higher order pipemethod
    this.accountService.identity().subscribe(account => {
      // if(account.authorities && account.authorities.includes('csuser')) {
      //   this._profileService.find(id).subscribe(response => {
      //     if (response.body) {
      //       this.profile.next(response.body);
      //     } else {
      //       // TODO - See what to do here - throw error???
      //     }
      //   });
      // }
      // else{
      //   this._profileService.queryProfileInfo({ 'userId.in': account.id }).subscribe(response => {
      //     if (response.body) {
      //       this.profile.next(response.body);
      //     } else {
      //       // TODO - See what to do here - throw error???
      //     }
      //   });
      // }
      this._profileService.queryProfileInfo({ 'userId.in': account.id }).subscribe(response => {
            if (response.body) {
              this.profile.next(response.body);
            } else {
              // TODO - See what to do here - throw error???
            }
          });
    });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
