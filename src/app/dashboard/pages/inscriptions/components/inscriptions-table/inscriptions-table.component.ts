import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Inscription } from '../../models';
import {
  selectInscription,
  selectDeleteInscription,
  selectInscriptionLoading,
} from '../../store/inscription.selectors';
import { InscriptionActions } from '../../store/inscription.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class InscriptionsTableComponent {
  isLoading$: Observable<boolean>;
  dataSource = [];
  expandedElement!: Inscription | null;
  displayedColumns: string[] = ['id', 'course', 'student', 'actions'];
  inscriptions$: Observable<Inscription[]>;
  deleteInscription$: Observable<Inscription[]>;
  userRole$: Observable<'ADMIN' | 'TEACHER' | undefined>;

  constructor(private store: Store) {
    this.inscriptions$ = this.store.select(selectInscription);
    this.deleteInscription$ = this.store.select(selectDeleteInscription);
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
    this.isLoading$ = this.store.select(selectInscriptionLoading);
  }

  onDelete(inscriptionID: number): void {
    Swal.fire({
      title: '¿Estás seguro que desea eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(
          InscriptionActions.deleteInscription({ inscriptionID })
        );
      }
    });
  }
}
