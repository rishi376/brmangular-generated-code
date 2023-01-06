import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FuseCardComponent } from './card.component';

describe('FuseCardComponent', () => {
  describe('Test Component with default inputs', () => {
    let debugEl;
    // let fixture: ComponentFixture<FuseCardComponent>;
    let cardComp: FuseCardComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, FuseCardComponent],
        imports: [NoopAnimationsModule]
      });
    });
    beforeEach(() => {
      const parentFixture = TestBed.createComponent(TestHostComponent);
      parentFixture.detectChanges();
      debugEl = parentFixture.debugElement.query(By.directive(FuseCardComponent));
      cardComp = debugEl.injector.get(FuseCardComponent);
    });
    it('Should create card component with default inputs', () => {
      expect(debugEl.componentInstance.expanded).toBe(false);
      expect(debugEl.componentInstance.face).toBe('front');
      expect(debugEl.componentInstance.flippable).toBe(false);
      expect(debugEl.nativeElement.querySelector('h1').textContent).toBe('Hello World !!!');
    });
    @Component({
      selector: 'host-component',
      template: '<fuse-card><ng-container><h1>Hello World !!!</h1></ng-container></fuse-card>'
    })
    class TestHostComponent {
      flippable: boolean = true;
    }
  });
  describe('Expandable Card with default inputs', () => {
    let debugEl;
    let parentFixture;
    // let fixture: ComponentFixture<FuseCardComponent>;
    let cardComp: FuseCardComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, FuseCardComponent],
        imports: [NoopAnimationsModule]
      });
    });
    beforeEach(() => {
      parentFixture = TestBed.createComponent(TestHostComponent);
      parentFixture.detectChanges();
      debugEl = parentFixture.debugElement.query(By.directive(FuseCardComponent));
      cardComp = debugEl.injector.get(FuseCardComponent);
    });
    it('Should create expandable card component with default inputs', () => {
      expect(debugEl.componentInstance.expanded).toBe(false);
      expect(debugEl.componentInstance.face).toBe('front');
      expect(debugEl.componentInstance.flippable).toBe(false);
      expect(debugEl.nativeElement.querySelector('h1').textContent).toBe('Hello World !!!');
    });
    it('Expandable card should expand on request', () => {
      // GIVEN
      debugEl.nativeElement.querySelector('h1').click();
      // WHEN
      parentFixture.detectChanges();
      // THEN
      expect(debugEl.nativeElement.querySelector('h2').textContent).toBe('Hello Expansion !!!');
    });
    @Component({
      selector: 'host-component',
      // eslint-disable-next-line max-len
      template:
        '<fuse-card #expandableCard01="fuseCard"><ng-container><h1 (click)="expandableCard01.expanded = !expandableCard01.expanded">Hello World !!!</h1></ng-container><ng-container fuseCardExpansion><h2>Hello Expansion !!!</h2></ng-container></fuse-card>'
    })
    class TestHostComponent {
      expanded: boolean = true;
    }
  });
  describe('flippable Card test', () => {
    let debugEl;
    let parentFixture;
    // let fixture: ComponentFixture<FuseCardComponent>;
    let cardComp: FuseCardComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, FuseCardComponent],
        imports: [NoopAnimationsModule]
      });
    });
    beforeEach(() => {
      parentFixture = TestBed.createComponent(TestHostComponent);
      parentFixture.detectChanges();
      debugEl = parentFixture.debugElement.query(By.directive(FuseCardComponent));
      cardComp = debugEl.injector.get(FuseCardComponent);
    });
    it('Should create flippable card component', () => {
      expect(debugEl.componentInstance.expanded).toBe(false);
      expect(debugEl.componentInstance.face).toBe('front');
      expect(debugEl.componentInstance.flippable).toBe(true);
      expect(debugEl.nativeElement.querySelector('.fuse-card-front').textContent).toBe('Hello');
      expect(debugEl.nativeElement.querySelector('.fuse-card-back').textContent).toBe('World');
      expect(debugEl.nativeElement.classList.contains('fuse-card-face-front'));
      expect(debugEl.nativeElement.classList.contains('fuse-card-flippable'));
    });
    @Component({
      selector: 'host-component',
      template:
        '<fuse-card flippable="true" face="front"><ng-container fuseCardFront><h1>Hello</h1></ng-container>' +
        '<ng-container fuseCardBack><h1>World</h1></ng-container></fuse-card>'
    })
    class TestHostComponent {}
  });
});
