import { Injectable } from '@angular/core';

type AOA = any[][];

@Injectable()
export class ExcelDatabaseService {
  data: AOA;
  cacheSimilarScore: Map<number, number>[];
  headersIndexToCompareMap = {
    Project: 0,
    Family: 1,
    Name: 2,
    Object_Type: 3,
    Building_Element_Is_External: 4,
    Reference_Level: 5,
    Category: 6,
    Length: 7,
    Height: 8,
    Width: 9,
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
  // returns an array of Map<number1, number2> where number 1 is the headerIndex and number2 is 1 (matched) or 0 (not matched)
  getRowSimilarityScore(match: string[]): Map<number, number>[] {
    //use cache if exist
    if(!!this.cacheSimilarScore) {
      return this.cacheSimilarScore;
    }

    let scores = [];
    let columnIndexToCompare = this.getColumnIndexToCompare();

    //skip header row
    for(let rowIndex = 1; rowIndex < this.data.length; rowIndex++) {
      let rowScore = new Map<number, number>();
      this.data[rowIndex].forEach((col, colIndex) => {

        //only compare indexes listed in headersIndexToCompareMap
        if(columnIndexToCompare.some(val => val === colIndex))
        {
          if(col === match[colIndex]) {
            rowScore.set(colIndex, 1);
          } else {
            rowScore.set(colIndex, 0);
          }
        }
      })
      scores.push(rowScore);
    }

    //set cache
    this.cacheSimilarScore = scores;
    return scores;
  }

  private getColumnIndexToCompare(): number[] {
    return Object.values(this.headersIndexToCompareMap);
  }
}
