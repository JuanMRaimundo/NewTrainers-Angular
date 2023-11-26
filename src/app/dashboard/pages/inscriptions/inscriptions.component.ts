import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent {
  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(InscriptionActions.loadInscriptions());
  }

  addInscription(): void {
    this.dialog.open(InscriptionDialogComponent);
  }
}
