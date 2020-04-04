import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VolcanoTableDataSource } from './volcano-table-datasource';
import { Volcano } from '../volcano';
import { VolcanoService } from '../volcano.service';

@Component({
  selector: 'app-volcano-table',
  templateUrl: './volcano-table.component.html',
  styleUrls: ['./volcano-table.component.css']
})
export class VolcanoTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Volcano>;
  dataSource: VolcanoTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['volcanoName', 'elevation', 'region', 'country', 'type', 'status'];

  constructor(private volcanoService: VolcanoService) {

  }

  ngOnInit() {
    this.dataSource = new VolcanoTableDataSource(this.volcanoService);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
