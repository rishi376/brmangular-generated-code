// jest.mock('app/core/navigation/navigation.service');
jest.mock('@fuse/services/media-watcher/media-watcher.service');
jest.mock('@fuse/components/navigation/navigation.service');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnterpriseLayoutComponent } from './enterprise.component';
// import { NavigationService } from 'app/core/navigation/navigation.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService } from '@fuse/components/navigation';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SessionStorageService } from 'ngx-webstorage';

describe('enterpriseLayoutComponent', () => {
  let fixture: ComponentFixture<EnterpriseLayoutComponent>;
  let comp: EnterpriseLayoutComponent;
  // let navigationService: NavigationService;
  let fuseMediaWatcherService: any;
  let fuseNavigationService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      declarations: [EnterpriseLayoutComponent],
      providers: [
        // NavigationService,
        FuseMediaWatcherService,
        FuseNavigationService,
        SessionStorageService,
        {
          // Disable 'theme' sanity check
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    })
      .overrideTemplate(EnterpriseLayoutComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseLayoutComponent);
    comp = fixture.componentInstance;
    // navigationService = TestBed.inject(NavigationService);
    fuseMediaWatcherService = TestBed.inject(FuseMediaWatcherService);
    fuseNavigationService = TestBed.inject(FuseNavigationService);
  });

  it('should show error if passwords do not match', () => {
    // GIVEN
    comp.toggleNavigation('something');

    // THEN
    expect(fuseNavigationService).toBeTruthy();
    expect(fuseNavigationService.getComponent).toHaveBeenCalled();
  });
});
