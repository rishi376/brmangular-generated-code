import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { FuseAlertComponent } from './alert.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FuseAlertService } from './alert.service';
import { FuseUtilsService } from '@fuse/services/utils';
import { By } from '@angular/platform-browser';

describe('FuseAlertComponent', () => {
  describe('Test with default inputs', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let alertFixture: ComponentFixture<FuseAlertComponent>;
    let alertComp: FuseAlertComponent;
    let alertService: FuseAlertService;
    let childDebugEl;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, FuseAlertComponent, MatIcon],
        imports: [MatIconTestingModule, NoopAnimationsModule],
        providers: [ChangeDetectorRef]
      });
    });
    beforeEach(() => {
      // Create the Parent component
      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      // Get the child component
      childDebugEl = fixture.debugElement.query(By.directive(FuseAlertComponent));
      alertComp = childDebugEl.injector.get(FuseAlertComponent);
      // Get the injected services
      alertService = TestBed.inject(FuseAlertService);
      alertFixture = TestBed.createComponent(FuseAlertComponent);
    });
    it('Should render the component with default inputs', () => {
      expect(childDebugEl).toBeDefined();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeTruthy();
    });
    it('Should have the defaut inputs', () => {
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(false);
      expect(alertComp.name).toBe('hello');
      expect(alertComp.type).toBe('primary');
      expect(alertComp.showIcon).toBe(true);
      expect(alertComp.appearance).toBe('soft');
    });
    it('Should not be dismissable', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertComp.dismiss();

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(false);
      expect(markForCheckSpy).not.toBeCalled();
      alertComp.dismissedChanged.subscribe(() => {
        nextFn();
      });
      expect(nextFn).not.toHaveBeenCalled();
    });
    it('Nothing should happen when show is called on dismissed state', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertComp.show();

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(false);
      expect(markForCheckSpy).not.toBeCalled();
      alertComp.dismissedChanged.subscribe(() => {
        nextFn();
      });
      expect(nextFn).not.toHaveBeenCalled();
    });
    it('Should not be dismissable from alert service dismiss observable', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');
      alertComp.name = 'hello';

      // WHEN
      alertService.show('hello');

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(false);
      expect(markForCheckSpy).not.toBeCalled();
      alertComp.dismissedChanged.subscribe(() => {
        nextFn();
      });
      expect(nextFn).not.toHaveBeenCalled();
    });
    it('Should not be showable from alert service show observable', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');
      alertComp.name = 'hello';

      // WHEN
      alertService.dismiss('hello');

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(false);
      expect(markForCheckSpy).not.toBeCalled();
      alertComp.dismissedChanged.subscribe(() => {
        nextFn();
      });
      expect(nextFn).not.toHaveBeenCalled();
    });
    @Component({
      selector: 'host-component',
      template: '<fuse-alert name="hello" ></fuse-alert>'
    })
    class TestHostComponent {}
  });
  describe('Test with custom inputs', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let alertComp: FuseAlertComponent;
    let alertService: FuseAlertService;
    let childDebugEl;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, FuseAlertComponent, MatIcon],
        imports: [MatIconTestingModule, NoopAnimationsModule],
        providers: [
          {
            provide: ChangeDetectorRef
          }
        ]
      });
    });
    beforeEach(() => {
      // Create the Parent component
      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      // Get the child component
      childDebugEl = fixture.debugElement.query(By.directive(FuseAlertComponent));
      alertComp = childDebugEl.injector.get(FuseAlertComponent);
      // Get the injected services
      alertService = TestBed.inject(FuseAlertService);
    });
    it('Should not render the component based on the custom input', () => {
      expect(childDebugEl).toBeDefined();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeFalsy();
    });
    it('Should have the custom inputs', () => {
      expect(alertComp.dismissed).toBe(true);
      expect(alertComp.dismissible).toBe(true);
    });
    it('Should be dismissable', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertComp.dismiss();
      fixture.detectChanges();

      // THEN
      expect(alertComp.dismissed).toBe(true);
      expect(alertComp.dismissible).toBe(true);
      expect(markForCheckSpy).toBeCalled();
      expect(fixture.componentInstance.dissChanged).toBe(true);
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeFalsy();
    });
    it('Should show the alert when show method is called', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertComp.show();
      fixture.detectChanges();

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(true);
      expect(markForCheckSpy).toBeCalled();
      expect(fixture.componentInstance.dissChanged).toBe(false);
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeTruthy();
    });
    it('Should show when received request from the service', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertService.show('hello');
      fixture.detectChanges();

      // THEN
      expect(alertComp.dismissed).toBe(false);
      expect(alertComp.dismissible).toBe(true);
      expect(markForCheckSpy).toBeCalled();
      expect(fixture.componentInstance.dissChanged).toBe(false);
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeTruthy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeTruthy();
    });
    it('Should dismiss when received request from the service', () => {
      // GIVEN
      const nextFn = jest.fn();
      const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const markForCheckSpy = jest.spyOn(changeDetectorRef.constructor.prototype, 'markForCheck');

      // WHEN
      alertService.dismiss('hello');
      fixture.detectChanges();

      // THEN
      expect(alertComp.dismissed).toBe(true);
      expect(alertComp.dismissible).toBe(true);
      expect(markForCheckSpy).toBeCalled();
      expect(fixture.componentInstance.dissChanged).toBe(true);
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-container')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-default-icon')).toBeFalsy();
      expect(childDebugEl.nativeElement.querySelector('.fuse-alert-dismiss-button')).toBeFalsy();
    });
    @Component({
      selector: 'host-component',
      template: '<fuse-alert name="hello" dismissed="true" dismissible="true" (dismissedChanged)="callme($event)"></fuse-alert>'
    })
    class TestHostComponent {
      public dissChanged: any;
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      callme(data: any) {
        this.dissChanged = data;
      }
    }
  });
});
