import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

import { ExcelDatabaseService } from '../../services/excel-database.service';

type AOA = any[][];

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent {
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  constructor(private dbService: ExcelDatabaseService) {}
  
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.dbService.loaData(data);
      
      const headers: string[] = [];

      // print headers to console so confirm the order
      // this.data.forEach((row, index) => {
      //   row.forEach(val => {
      //     if(index === 0) {
      //        headers.push(val);
      //     }
      //   })
      // })
      console.log(headers);
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
