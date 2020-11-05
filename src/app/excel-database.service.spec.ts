import { inject, TestBed } from '@angular/core/testing';

import { ExcelDatabaseService } from './services/excel-database.service';

describe('ExcelDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelDatabaseService]
    });
  });

  it('should be created', inject([ExcelDatabaseService], (service: ExcelDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
