import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokeHeaderComponent } from './poke-header/poke-header.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PokeHeaderComponent,
    PokeListComponent
  ],
  exports: [
    PokeHeaderComponent,
    PokeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
