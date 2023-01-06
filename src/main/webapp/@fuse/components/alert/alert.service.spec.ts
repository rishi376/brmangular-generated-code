import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FuseAlertService } from './alert.service';

describe('FuseAlertService', () => {
  let service: FuseAlertService;
  describe('FuseAlertService', () => {
    beforeEach(() => {
      service = TestBed.inject(FuseAlertService);
    });
    it('Should have method to subscribe to get show alerts', () => {
      const response = service.onShow;
      expect(response).toBeInstanceOf(Observable);
    });
    it('Should have method to subscribe to get dismiss alerts', () => {
      const response = service.onDismiss;
      expect(response).toBeInstanceOf(Observable);
    });
    it('onShow method should stream the alert from show method', () => {
      // GIVEN
      const exceptedResponse = 'hello';

      // WHEN
      service.show('hello');

      // THEN
      service.onShow.subscribe(alert => {
        expect(alert).toBe(exceptedResponse);
      });
    });
    it('onDismiss method should stream the alert from dismiss method', () => {
      // GIVEN
      const exceptedResponse = 'hello';

      // WHEN
      service.dismiss('hello');

      // THEN
      service.onDismiss.subscribe(alert => {
        expect(alert).toBe(exceptedResponse);
      });
    });
  });
  describe('FuseAlertService', () => {
    beforeEach(() => {
      service = TestBed.inject(FuseAlertService);
    });
    it('Should not show anything with null alert', () => {
      // GIVEN
      const nextFn = jest.fn();

      // WHEN
      service.show(null);
      service.onShow.subscribe(alert => {
        nextFn();
      });

      // THEN
      expect(nextFn).not.toHaveBeenCalled();
    });
    it('Should not dismiss anything with null alert', () => {
      // GIVEN
      const nextFn = jest.fn();

      // WHEN
      service.dismiss(null);
      service.onDismiss.subscribe(alert => {
        nextFn();
      });

      // THEN
      expect(nextFn).not.toHaveBeenCalled();
    });
  });
});
