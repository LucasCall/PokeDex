import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { PaginationSettings } from '../model/pagination-settings';
import { ColorList } from '../model/color-list';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError = false;

  private readonly MAX_TOTAL_ITEMS = 649;

  paginationSettings: PaginationSettings = new PaginationSettings();

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  private fetchPokemons(): void {
    const offset = (this.paginationSettings.currentPage - 1) * this.paginationSettings.pageSize;
    this.paginationSettings.indexBase = offset;

    this.pokeApiService.apiListAllPokemons(offset, this.paginationSettings.pageSize).subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;

        this.paginationSettings.totalItems = Math.min(res.count, this.MAX_TOTAL_ITEMS);
        this.paginationSettings.totalPages = Math.ceil(this.paginationSettings.totalItems / this.paginationSettings.pageSize);
        this.updateDisplayedPages();
      },
    );
  }

  public changePage(page: number): void {
    if (page >= 1 && page <= this.paginationSettings.totalPages) {
      this.paginationSettings.currentPage = page;
      this.fetchPokemons();
    }
  }

  private updateDisplayedPages(): void {
    const middlePage = Math.ceil(this.paginationSettings.pagesToDisplay / 2);
    const startPage = Math.max(1, this.paginationSettings.currentPage - middlePage + 1);
    const endPage = Math.min(this.paginationSettings.totalPages, startPage + this.paginationSettings.pagesToDisplay - 1);
    this.paginationSettings.displayedPages = [];

    for (let i = startPage; i <= endPage; i++) {
      this.paginationSettings.displayedPages.push(i);
    }
  }

  public onItemsPerPageChange(newPageSize: number): void {
    this.paginationSettings.currentPage = 1;
    this.paginationSettings.pageSize = newPageSize;
    this.fetchPokemons();
  }  

  getPokemonTypeStyle(type: string): any {
    const typeColor = ColorList.typeColors[type];
  
    if (typeColor) {
      return typeColor;
    } else {
      return { backgroundColor: '#000', color: '#fff' };
    }
  }
  
  
}
