import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@NgModule({
  declarations: [InscriptionsComponent, InscriptionsTableComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects]),
    SharedModule,
  ],
})
export class IncriptionsModule {}
