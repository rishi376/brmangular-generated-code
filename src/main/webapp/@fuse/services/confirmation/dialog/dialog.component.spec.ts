import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FuseConfirmationDialogComponent } from './dialog.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('FuseConfirmationDialogComponent', () => {
  let comp: FuseConfirmationDialogComponent;
  let fixture: ComponentFixture<FuseConfirmationDialogComponent>;
  describe('With test data 1', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FuseConfirmationDialogComponent, MatIcon],
        imports: [MatButtonModule, MatDialogModule, CommonModule, MatIconTestingModule],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              title: 'Confirm action',
              message: 'Are you sure you want to confirm this action?',
              icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
              },
              actions: {
                confirm: {
                  show: true,
                  label: 'Confirm',
                  color: 'warn'
                },
                cancel: {
                  show: true,
                  label: 'Cancel'
                }
              },
              dismissible: false
            }
          },
          {
            provide: MatDialogRef,
            useValue: {}
          }
        ]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(FuseConfirmationDialogComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Component should render', () => {
      // WHEN
      fixture.detectChanges();

      // THEN
      expect(fixture).toBeTruthy();
      expect(comp).toBeDefined();
    });

    it('Should render correctly for the given sample data', () => {
      // WHEN
      const divElement: HTMLElement = fixture.nativeElement;
      // console.log(divElement.querySelectorAll('button').forEach(e => console.dir(e.className)));

      // THEN
      // By design UI elements are not tested in unit tests but this file is an exception
      expect(divElement.querySelector('.text-xl').textContent).toBe('Confirm action');
      expect(divElement.querySelector('.text-secondary').textContent).toBe('Are you sure you want to confirm this action?');
      expect(divElement.querySelector('.mat-warn').textContent).toBe(' Confirm ');
      expect(divElement.querySelector('.mat-stroked-button').textContent).toBe(' Cancel ');
    });
  });
  describe('With test data 2', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FuseConfirmationDialogComponent, MatIcon],
        imports: [MatButtonModule, MatDialogModule, CommonModule, MatIconTestingModule],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              title: 'Hello Dialogue',
              message: 'Is this a great dialogue box?',
              icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
              },
              actions: {
                confirm: {
                  show: true,
                  label: 'Oh Yaa...',
                  color: 'warn'
                },
                cancel: {
                  show: false,
                  label: 'Cancel'
                }
              },
              dismissible: false
            }
          },
          {
            provide: MatDialogRef,
            useValue: {}
          }
        ]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(FuseConfirmationDialogComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Component should render', () => {
      // WHEN
      fixture.detectChanges();

      // THEN
      expect(fixture).toBeTruthy();
      expect(comp).toBeDefined();
    });

    it('Should render correctly for the given sample data', () => {
      // WHEN
      const divElement: HTMLElement = fixture.nativeElement;
      // console.log(divElement.querySelectorAll('button').forEach(e => console.dir(e.className)));

      // THEN
      // By design UI elements are not tested in unit tests but this file is an exception
      expect(divElement.querySelector('.text-xl').textContent).toBe('Hello Dialogue');
      expect(divElement.querySelector('.text-secondary').textContent).toBe('Is this a great dialogue box?');
      expect(divElement.querySelector('.mat-warn').textContent).toBe(' Oh Yaa... ');
      expect(divElement.querySelector('.mat-stroked-button')).toBeFalsy();
    });
  });
});
