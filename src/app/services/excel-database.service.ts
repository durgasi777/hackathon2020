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

  filter(match: string[]): { id: number, jobName: string, location: string, buildingType: string,
    type:string, material:string, loadBearing:string, thickness:string, level: string, finish:string, rate: string, score: Map<number, number>}[] {
      
    let result = [];
    const columnToCompare = this.getColumnIndexToCompare();
    //skip header row
    for(let rowIndex = 1; rowIndex < this.data.length; rowIndex++) {
      const location = this.headersIndexToCompareMap.Location;
      const buildingType = this.headersIndexToCompareMap.BuildingType;
      const category = this.headersIndexToCompareMap.CategoryName;
      if(match[location] !== this.data[rowIndex][location] || match[buildingType] !== this.data[rowIndex][buildingType] || match[category] !== this.data[rowIndex][category]){
        continue;
      }

      const score = new Map<number, number>();
      for(let colIndex = 1; colIndex < this.data[rowIndex].length; colIndex++) {
        const col = this.data[rowIndex][colIndex];
        if(columnToCompare.indexOf(colIndex) > -1) {	        
          if(col === match[colIndex]) {
            score.set(colIndex, 1);	          
          } else {	         
            score.set(colIndex, 0);	            
          }	          
        }
      }

      result.push({
        id: rowIndex, 
        jobName: this.data[rowIndex][this.headersIndexToCompareMap.Project],
        location: this.data[rowIndex][this.headersIndexToCompareMap.Location],
        buildingType: this.data[rowIndex][this.headersIndexToCompareMap.BuildingType],
        level: this.data[rowIndex][this.headersIndexToCompareMap.Levels],
        category: this.data[rowIndex][this.headersIndexToCompareMap.CategoryName],
        type: this.data[rowIndex][this.headersIndexToCompareMap.TypeName],
        material: this.data[rowIndex][this.headersIndexToCompareMap.Material],
        loadBearing: this.data[rowIndex][this.headersIndexToCompareMap.LoadBearing],
        thickNess: this.data[rowIndex][this.headersIndexToCompareMap.Thickness],
        finish: this.data[rowIndex][this.headersIndexToCompareMap.Finish],
        rate: this.data[rowIndex][this.headersIndexToCompareMap.Rate],
        score: score
      });
    }
    return result;
  }

  // getConfidenceByIndex(index: number, match: string[]): number {

  // }

  private getColumnIndexToCompare(): number[] {
    // only match some of the header
    // see headersIndexToCompareMap to know what is being matched 
    return Object.values(this.headersIndexToCompareMap).filter(value => value > 4 && value < 9);
  }
}
