import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
  applicationNavigation,
  compactNavigation,
  defaultNavigation,
  futuristicNavigation,
  horizontalNavigation
} from 'app/mock-api/common/navigation/data';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { Authority } from 'app/config/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationMockApi extends MockApiServiceBase {
  private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
  private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
  private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
  private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

  /**
   * Constructor
   */
  // TODO: Change this name to NavigationFunctionalityMockApi
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('NavigationMockApi');
    this.checkAndregisterHandlers(() => {
      // -----------------------------------------------------------------------------------------------------
      // @ Navigation - GET
      // -----------------------------------------------------------------------------------------------------
      this._fuseMockApiService.onGet('api/applications').reply(() =>
        // Return the response
        [200, applicationNavigation]
      );

      this._fuseMockApiService.onGet('api/navigations').reply(() => {
        // Return the response
        if (this.mockApiService.getLoggedInUser()) {
          if (this.mockApiService.getLoggedInUser().authorities.includes(Authority.admin)) {
            return [200, this.buildAdminNavigation()];
          } else if (this.mockApiService.getLoggedInUser().authorities.includes(Authority.backOfficeUser)) {
            return [200, this.buildCSNavigation()];
          } else if (this.mockApiService.getLoggedInUser().authorities.includes(Authority.user)) {
            return [200, this.buildUserNavigation()];
          }
        }
        return [200, {}];
      });
    });
  }

  buildUserNavigation(): any {
    return [
      {
        id: 1,
        title: 'Application - 1',
        type: 'collapsable',
        hidden: item => false,
        active: true,
        disabled: false,
        tooltip: 'Everything related to App-1',
        children: [
          {
            id: 11,
            title: 'Create New Application',
            type: 'aside',
            hidden: item => false,
            active: true,
            disabled: false,
            tooltip: 'Click this to apply for app1'
          }
        ]
      },
      {
        id: 2,
        title: 'Application - 2',
        type: 'collapsable',
        hidden: item => false,
        active: true,
        disabled: false,
        tooltip: 'Everything related to App-1',
        children: [
          {
            id: 21,
            title: 'Create New Application',
            type: 'aside',
            hidden: item => false,
            active: true,
            disabled: false,
            tooltip: 'Click this to apply for app2'
          }
        ]
      }
    ];
  }

  buildCSNavigation(): any {
    return [
      {
        id: 1,
        title: 'Application - 1',
        type: 'collapsable',
        hidden: item => false,
        active: true,
        disabled: false,
        tooltip: 'Everything related to App-1',
        children: [
          {
            id: 11,
            title: 'Profile Search',
            type: 'basic',
            link: '/customer-service/search',
            hidden: item => false,
            active: true,
            disabled: false
          }
        ]
      },
      {
        id: 2,
        title: 'Application - 2',
        type: 'collapsable',
        hidden: item => false,
        active: true,
        disabled: false,
        tooltip: 'Everything related to App-1',
        children: [
          {
            id: 21,
            title: 'Profile Search',
            type: 'aside',
            hidden: item => false,
            active: true,
            disabled: false
          }
        ]
      }
    ];
  }

  buildAdminNavigation(): any {
    return [
      {
        id: 1,
        title: 'Application-1 Configuration',
        type: 'collapsable',
        hidden: item => false,
        active: true,
        disabled: false,
        tooltip: 'All Configurations related to Application-1',
        children: [
          {
            id: 11,
            title: 'Application Process',
            type: 'basic',
            hidden: item => false,
            active: true,
            disabled: false,
            tooltip: 'Click this to apply for app1'
          },
          {
            id: 12,
            title: 'Application Batch',
            type: 'basic',
            hidden: item => false,
            active: true,
            disabled: false,
            tooltip: 'Click this to apply for app1'
          }
        ]
      }
    ];
  }
}
