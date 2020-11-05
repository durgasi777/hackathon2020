import { Injectable } from '@angular/core';

type AOA = any[][];

@Injectable()
export class ExcelDatabaseService {
  data: AOA;
  cacheSimilarScore: { columnScore: Map<number, number>, rate: number }[];
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
    Finish: 9,
    Rate: 10
  };

  loaData(data: AOA): void {
    this.data = data;
    delete this.cacheSimilarScore;

    for(let rowIndex = 0; rowIndex < this.data.length; rowIndex++) {
      for(let colIndex = 0; colIndex < this.data[rowIndex].length; colIndex++) {
      //create maps so its easier to search later  
      }
    }
  }

  isAvailable(): boolean {
    return !!this.data;
  }
  

  // comapre a row against database according to columnIndexToCompare
  // returns an array of object with 
  //    columnScpre: Map<number1, number2> where number 1 is the headerIndex and number2 is 1 (matched) or 0 (not matched)
  //    rate: cost per unit
  getRowSimilarityScore(match: string[]): { columnScore: Map<number, number>, rate: number }[] {
    //use cache if exist
    if(!!this.cacheSimilarScore) {
      return this.cacheSimilarScore;
    }

    let scores = [];
    let columnIndexToCompare = this.getColumnIndexToCompare();

    //skip header row
    for(let rowIndex = 1; rowIndex < this.data.length; rowIndex++) {
      let columnScore = new Map<number, number>();

      this.data[rowIndex].forEach((col, colIndex) => {
        //only compare indexes listed in headersIndexToCompareMap
        if(columnIndexToCompare.some(val => val === colIndex))
        {
          if(col === match[colIndex]) {
            columnScore.set(colIndex, 1);
          } else {
            columnScore.set(colIndex, 0);
          }
        }
      });

      scores.push({ columnScore: columnScore, rate: this.data[rowIndex][this.headersIndexToCompareMap.Rate] });
    }

    //set cache
    this.cacheSimilarScore = scores;
    return scores;
  }

  private getColumnIndexToCompare(): number[] {
    // only match some of the header
    // see headersIndexToCompareMap to know what is being matched 
    return Object.values(this.headersIndexToCompareMap).filter(value => value > 4 && value < 10);
  }
}
