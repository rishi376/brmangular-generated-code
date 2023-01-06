import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';
import { FuseConfigService } from './config.service';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FuseConfigService', () => {
  let fuseConfigService: FuseConfigService;
  const defaultConfig = { hello: 'hello', world: 'world' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        SessionStorageService,
        {
          // Disable 'theme' sanity check
          provide: FUSE_APP_CONFIG,
          useValue: defaultConfig
        }
      ]
    });
    fuseConfigService = TestBed.inject(FuseConfigService);
  });

  describe('Default config value with get', () => {
    it('Should return the default config value', () => {
      // GIVEN

      // WHEN
      fuseConfigService.config$.subscribe(obsValue => {
        // THEN
        expect(obsValue).toEqual(defaultConfig);
      });
    });
  });

  describe('When non-default config value is set', () => {
    it('Should emit the non-default config value', () => {
      // GIVEN
      const nonDefaultConfig = { hello: 'foo', world: 'bar' };
      fuseConfigService.config = nonDefaultConfig;

      // WHEN
      fuseConfigService.config$.subscribe(obsValue => {
        // THEN
        expect(obsValue).toEqual(nonDefaultConfig);
      });
    });
  });

  describe('When non-default config value is set', () => {
    it('Should emit the non-default config value', () => {
      // GIVEN
      const nonDefaultConfig = { hello: 'good', world: 'morning' };
      fuseConfigService.config = nonDefaultConfig;
      fuseConfigService.reset();

      // WHEN
      fuseConfigService.config$.subscribe(obsValue => {
        // THEN
        expect(obsValue).toEqual(defaultConfig);
      });
    });
  });
});
