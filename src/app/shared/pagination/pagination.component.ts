import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationSettings } from '../model/pagination-settings';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() paginationSettings: PaginationSettings = new PaginationSettings();
  @Output() changePageEvent = new EventEmitter<number>();
  @Output() itemsPerPageChangeEvent = new EventEmitter<number>();


  public changePage(page: number): void {
    if (page >= 1 && page <= this.paginationSettings.totalPages) {
      this.changePageEvent.emit(page);
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

  public onItemsPerPageChange(newPageSize: number): void {
    this.paginationSettings.currentPage = 1;
    this.paginationSettings.pageSize = newPageSize;
    this.itemsPerPageChangeEvent.emit(newPageSize);
  }
}
