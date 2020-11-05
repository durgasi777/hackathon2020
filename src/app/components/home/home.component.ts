import { Component, ViewChild } from '@angular/core';
import { HistoricalTableComponent } from '../table/historical-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  @ViewChild('historicalTable')
  historicalTableComponent: HistoricalTableComponent;

  loading: boolean = false;

  constructor() {
  }

  onRefresh(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  onJobAFileUploaded() {
    this.historicalTableComponent.onJobAPushed();
  }
}
