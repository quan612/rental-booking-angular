import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalCardComponent } from './rental-card/rental-card.component';

import { RouterModule } from '@angular/router';
import { TimeFormatPipe } from './pipe/time-format';
import { UpperLetterPipe } from './pipe/uppercase';

@NgModule({
  declarations: [RentalCardComponent, TimeFormatPipe, UpperLetterPipe],
  exports: [RentalCardComponent, TimeFormatPipe, UpperLetterPipe],
  imports: [RouterModule, CommonModule],
})
export class SharedModule {}
