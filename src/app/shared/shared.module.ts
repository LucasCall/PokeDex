import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokeHeaderComponent } from './poke-header/poke-header.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    PokeHeaderComponent,
    PokeListComponent,
    PaginationComponent
  ],
  exports: [
    PokeHeaderComponent,
    PokeListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
