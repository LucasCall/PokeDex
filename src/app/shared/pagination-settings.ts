export class PaginationSettings {
    public currentPage = 1;
    public pageSize = 10;
    public totalItems = 0;
    public pagesToDisplay = 6;
    public totalPages: number = 0;
    public displayedPages: number[] = [];
    public indexBase: number = 0;
    public itemsPerPageOptions = [10, 20, 50];
    public selectedItemsPerPage = this.itemsPerPageOptions[0];
  }
  