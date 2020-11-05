import { Component, OnInit } from '@angular/core';
import { ExcelDatabaseService } from '../../services/excel-database.service';
import { TableDataSource } from './table-data-source';

@Component({
  selector: 'app-historical-table',
  templateUrl: './historical-table.component.html',
  styleUrls: ['./historical-table.component.scss']
})
export class HistoricalTableComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['Location', 'Building Type', 'Levels', 'Project', 'Category Name', 'Type Name', 'Load Bearing', 'Material', 'Thickness', 'Finish', 'Rate', 'Name', 'Object type', 'Building Element Is External', 'Reference Level', 'Category', 'Length', 'Height', 'Width', 'Area', 'Volume', 'Confidence'];
  private nonEmptyColumnNames: string[];
  private nonEmptyColumnNamesMap: Map<string, number>;
  private tableDataSource2: TableDataSource;

  locations = ['Sydney', 'New York'];
  types = ['Hotel', 'Hospital'];
  levels: number[];
  finishes = ['Luxury', 'Standard', 'Budget'];
  thicknesses: number[];
  confidenceLevels: number[];

  locationFilter: string[];
  typeFilter: string[];
  levelFilter: string[];
  finishFilter: string[];
  thicknessFilter: string[];
  displayConfidence = false;

  constructor(private excelDatabaseService: ExcelDatabaseService) {
  }

  ngOnInit(): void {
    this.levels = this.getNumberArray(10, 50, 5);
    this.thicknesses = this.getNumberArray(10, 300, 10);
    this.confidenceLevels = this.getNumberArray(100, 10, -10);
    this.tableDataSource2 = new TableDataSource();
  }

  get data() {
    return this.excelDatabaseService.data;
  }

  get tableDataSource() {
    if (this.data) {
      this.tableDataSource2.data = this.data.slice(1);
    }
    return this.tableDataSource2;
  }

  get columnNames() {
    if (this.nonEmptyColumnNames) {
      return this.nonEmptyColumnNames;
    }
    if (this.data) {
      this.nonEmptyColumnNamesMap = new Map<string, number>();
      for (let i = 0; i < this.data[0].length; i++) {
        const data = this.data[0][i];
        if (!!data) {
          this.nonEmptyColumnNamesMap.set(data, i);
        }
      }
      this.nonEmptyColumnNames = Array.from(this.nonEmptyColumnNamesMap.keys());
      return this.nonEmptyColumnNames;
    }
  }

  getCell(element: any, column: any) {
    if (column === 'Confidence' && !this.displayConfidence) {
      return null;
    }
    const index = this.nonEmptyColumnNamesMap.get(column);
    return element[index];
  }

  onLocationFilterChanged(newFilter: any) {
    this.locationFilter = newFilter;
    this.onFilterChanged();
  }

  onTypeFilterChanged(newFilter: any) {
    this.typeFilter = newFilter;
    this.onFilterChanged();
  }

  onLevelsFilterChanged(newFilter: any) {
    this.levelFilter = newFilter;
    this.onFilterChanged();
  }

  onFinishFilterChanged(newFilter: any) {
    this.finishFilter = newFilter;
    this.onFilterChanged();
  }

  onThicknessFilterChanged(newFilter: any) {
    this.thicknessFilter = newFilter;
    this.onFilterChanged();
  }

  private onFilterChanged() {
    const filter = new Array<string>();
    filter.push(...this.locationFilter);
    filter.push(...this.typeFilter);
    filter.push(...this.levelFilter);
    filter.push(...this.finishFilter);
    filter.push(...this.thicknessFilter);
    if (filter.length > 0) {
      this.tableDataSource2.filter = JSON.stringify(filter);
    } else {
      this.tableDataSource2.filter = '';
    }
  }

  private getNumberArray(from: number, to: number, jump = 1): number[] {
    let len: number;
    if (from > to) {
      len = (from - to) / Math.abs(jump) + 1;
    } else {
      len = (to - from) / Math.abs(jump) + 1;
    }
    const arr = new Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = from + i * jump;
    }
    return arr;
  }
}
