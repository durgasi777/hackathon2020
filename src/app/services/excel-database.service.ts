import { Injectable } from '@angular/core';

type AOA = any[][];

@Injectable()
export class ExcelDatabaseService {
  data: AOA;

  headersIndexToCompareMap = {
    Location: 0,
    BuildingType: 1,
    Levels: 2,
    Project: 3,
    CategoryName: 4,
    TypeName: 5,
    LoadBearing: 6,
    Material: 7,
    Thickness: 8,
    Finish: 10,
    Rate: 11
  };

  loaData(data: AOA): void {
    this.data = data;
  }

  isAvailable(): boolean {
    return !!this.data;
  }

  filter(match: string[]): { id: number, jobName: string, location: string, type: string, level: string, finish:string}[] {
    let result = [];
    //skip header row
    for(let rowIndex = 1; rowIndex < this.data.length; rowIndex++) {
      const location = this.headersIndexToCompareMap.Location;
      const buildingType = this.headersIndexToCompareMap.BuildingType;
      const category = this.headersIndexToCompareMap.CategoryName;
      if(match[location] !== this.data[rowIndex][location] || match[buildingType] !== this.data[rowIndex][buildingType] || match[category] !== this.data[rowIndex][category]){
        continue;
      }

      result.push({
        id: rowIndex, 
        jobName: this.data[rowIndex][this.headersIndexToCompareMap.Project],
        location: this.data[rowIndex][this.headersIndexToCompareMap.Location],
        type: this.data[rowIndex][this.headersIndexToCompareMap.BuildingType],
        level: this.data[rowIndex][this.headersIndexToCompareMap.Levels],
        category: this.data[rowIndex][this.headersIndexToCompareMap.CategoryName],
        finish: this.data[rowIndex][this.headersIndexToCompareMap.Finish]
      });
    }
    return result;
  }

  private getColumnIndexToCompare(): number[] {
    // only match some of the header
    // see headersIndexToCompareMap to know what is being matched 
    return Object.values(this.headersIndexToCompareMap).filter(value => value > 4 && value < 11 && value !== 9);
  }
}
