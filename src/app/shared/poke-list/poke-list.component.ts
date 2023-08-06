import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { PaginationSettings } from '../pagination-settings';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError = false;
  
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
        this.paginationSettings.totalItems = res.count;
        this.paginationSettings.totalPages = Math.ceil(this.paginationSettings.totalItems / this.paginationSettings.pageSize);
        this.updateDisplayedPages();
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public changePage(page: number): void {
    if (page >= 1 && page <= this.paginationSettings.totalPages) {
      this.paginationSettings.currentPage = page;
      this.fetchPokemons();
    }
  }

  public onItemsPerPageChange(): void {
    this.paginationSettings.currentPage = 1;
    this.paginationSettings.pageSize = this.paginationSettings.selectedItemsPerPage;
    this.fetchPokemons();
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

  public goToFirstPage(): void {
    if (this.paginationSettings.currentPage !== 1) {
      this.changePage(1);
    }
  }

  public goToLastPage(): void {
    if (this.paginationSettings.currentPage !== this.paginationSettings.totalPages) {
      this.changePage(this.paginationSettings.totalPages);
    }
  }
}
