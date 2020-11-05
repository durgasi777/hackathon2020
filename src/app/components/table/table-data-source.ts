import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export class TableDataSource extends MatTableDataSource<any[]> {
  private originalData: any[];

  private dataObject: any[][];

  data: any[];

  filterPredicate = (data: any[], filter: string): boolean => {
    // const jsonData = JSON.stringify(data).trim();
    // const lowerCaseFilter = filter;
    // const parsedData = JSON.parse(jsonData);
    const parsedFilter = JSON.parse(filter);
    if (!parsedFilter) {
      return true;
    }
    const array = new Array(...parsedFilter);
    const otherArray = new Array(...data);
    return array.every(value => otherArray.some(otherValue => otherValue === value));
    // return jsonData.includes(parsedFilter.some());
    // return jsonData.includes(lowerCaseFilter);
  }
}
