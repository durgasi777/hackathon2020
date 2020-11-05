import { Injectable } from '@angular/core';

type AOA = any[][];

@Injectable()
export class ExcelDatabaseService {
  data: AOA;
  cacheSimilarScore = new Map<number, number[]>();
  headersIndexMap = {
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
    this.cacheSimilarScore = new Map<number, number[]>();

    for(let rowIndex = 0; rowIndex < this.data.length; rowIndex++) {
      for(let colIndex = 0; colIndex < this.data[rowIndex].length; colIndex++) {
      //create maps so its easier to search later  
      }
    }
  }

  isAvailable(): boolean {
    return !!this.data;
  }
  
  getRowSimilarityScore(rowIndex: number, match: string[]): number[] {
    //use cache if exist
    if(!!this.cacheSimilarScore.get(rowIndex)) {
      return this.cacheSimilarScore.get(rowIndex);
    }

    var scores: number[] = [];
    this.data[rowIndex].forEach((column, index) => {
      if(column === match[index]) {
        scores.push(1);
      } else {
        scores.push(0);
      }
    });

    //set cache
    this.cacheSimilarScore.set(rowIndex, scores);
    return scores;
  }
}
