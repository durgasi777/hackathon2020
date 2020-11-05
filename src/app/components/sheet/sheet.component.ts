import { Component, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

import { ExcelDatabaseService } from '../../services/excel-database.service';


type AOA = any[][];

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})

export class SheetComponent {
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  @Output()
  onFileUploaded = new EventEmitter<void>();

  constructor(private dbService: ExcelDatabaseService) {
    console.log(`db service is online: ${this.dbService.isAvailable()}`)
  }

  onFileChange(evt: any) {
    /* wire up file reader */
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
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
    this.onFileUploaded.emit();
  }

  getScore(): void {
    //hardcode to check 2 rows
    for(let rowIndex = 1; rowIndex < 3; rowIndex++) {
      const rowData = this.data[rowIndex];
      const result = this.dbService.filter(rowData);
      result.forEach((row) => {
        console.log(row);
      });
      //console.log(result);
    }
  }

}
