import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FuseConfirmationService } from './confirmation.service';
import { FuseConfirmationConfig } from './confirmation.types';
import { FuseConfirmationDialogComponent } from './dialog/dialog.component';

jest.mock('@angular/material/dialog');

describe('FuseConfirmationService', () => {
  let service: FuseConfirmationService;
  let dialog: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FuseConfirmationService,
        {
          provide: MatDialog,
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          useValue: { open: () => of({ id: 1 }) }
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FuseConfirmationService);
    dialog = TestBed.inject(MatDialog);
  });

  it(' Should inject the required service ', () => {
    // THEN
    expect(service).toBeDefined();
  });

  it(' Should inject the required service ', () => {
    // GIVEN
    const dummyConfig: FuseConfirmationConfig = {
      title: 'dummy',
      message: 'dummy',
      icon: {
        show: false,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      },
      actions: {
        confirm: {
          show: false,
          label: 'dummy',
          color: 'warn'
        },
        cancel: {
          show: false,
          label: 'Cancel'
        }
      },
      dismissible: true
    };
    const calledWith = {
      autoFocus: false,
      disableClose: false,
      data: dummyConfig,
      panelClass: 'fuse-confirmation-dialog-panel'
    };

    // WHEN
    jest
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of({ id: 1 }) } as MatDialogRef<typeof FuseConfirmationDialogComponent>);
    service.open(dummyConfig).afterClosed().subscribe();

    // THEN
    expect(dialog.open).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(FuseConfirmationDialogComponent, calledWith);
  });
});
