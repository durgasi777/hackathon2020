import { Component } from '@angular/core';
import { ExcelDatabaseService } from '../../services/excel-database.service';

@Component({
  selector: 'app-historical-table',
  templateUrl: './historical-table.component.html',
  styleUrls: ['./historical-table.component.scss']
})
export class HistoricalTableComponent {
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['Location', 'Building Type', 'Levels', 'Project', 'Category Name', 'Type Name', 'Load Bearing', 'Material', 'Thickness', 'Finish', 'Rate', 'Name', 'Object type', 'Building Element Is External', 'Reference Level', 'Category', 'Length', 'Height', 'Width', 'Area', 'Volume'];
  private nonEmptyColumnNames: string[];
  private nonEmptyColumnNamesMap: Map<string, number>;
  private dataWithoutHeader2: any;

  constructor(private excelDatabaseService: ExcelDatabaseService) {
  }

  get data() {
    return this.excelDatabaseService.data;
  }

  get dataWithoutHeader() {
    if (this.data) {
      this.dataWithoutHeader2 = this.data.slice(1);
    }
    return this.dataWithoutHeader2;
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
    const index = this.nonEmptyColumnNamesMap.get(column);
    return element[index];
  }

  // getColumnNames() {
  //   if (this.data) {
  //     const temp = this.data[0].toString();
  //     const x = 235;
  //   }
  // }
}

export class Column {
  name: string;
  index: number;
}
