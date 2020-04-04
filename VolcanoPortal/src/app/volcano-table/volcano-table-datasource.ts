import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { VolcanoService } from '../volcano.service'
import { Volcano } from '../volcano';

/**
 * Data source for the VolcanoTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class VolcanoTableDataSource extends DataSource<Volcano> {
  data: Volcano[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private volcanoService: VolcanoService) {
    super();
  }

  public loadData() {
    this.volcanoService.getVolcanoes()
      .subscribe(volcanoes => this.data = volcanoes);
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Volcano[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Volcano[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    this.volcanoService.getVolcanoes(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(volcanoes => this.data = volcanoes);
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Volcano[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'volcanoName': return compare(a.volcanoName, b.volcanoName, isAsc);
        case 'elevation': return compare(+a.elevation, +b.elevation, isAsc);
        case 'region': return compare(a.region, b.region, isAsc);
        case 'country': return compare(+a.country, +b.country, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
