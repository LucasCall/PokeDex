import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public currentPage = 1;
  public pageSize = 10;
  public totalItems = 0;
  public pagesToDisplay = 6;
  public displayedPages: number[] = [];
  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError = false;
  public totalPages: number = 0;
  public itemsPerPageOptions = [10, 20, 50];
  public selectedItemsPerPage = this.itemsPerPageOptions[0];
  public indexBase: number = 0;

      

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
    this.totalItems = filter.length;
  }

  private fetchPokemons(): void {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.indexBase = offset;
    this.pokeApiService.apiListAllPokemons(offset, this.pageSize).subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        this.totalItems = res.count;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.updateDisplayedPages();
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPokemons();
    }
  }

  public onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.pageSize = this.selectedItemsPerPage;
    this.fetchPokemons();
  }

  private updateDisplayedPages(): void {
    const middlePage = Math.ceil(this.pagesToDisplay / 2);
    const startPage = Math.max(1, this.currentPage - middlePage + 1);
    const endPage = Math.min(this.totalPages, startPage + this.pagesToDisplay - 1);
    this.displayedPages = [];

    for (let i = startPage; i <= endPage; i++) {
      this.displayedPages.push(i);
    }
  }

  public goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.changePage(1);
    }
  }

  public goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.changePage(this.totalPages);
    }
  }
}
