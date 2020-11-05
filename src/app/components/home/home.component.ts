import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  locations = ['Sydney', 'New York'];
  types = ['Hotel', 'Hospital'];
  levels: number[];
  finishes = ['Luxury', 'Standard', 'Budget'];
  thicknesses: number[];
  confidenceLevels: number[];

  loading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.levels = this.getNumberArray(10, 50, 5);
    this.thicknesses = this.getNumberArray(20, 300, 10);
    this.confidenceLevels = this.getNumberArray(100, 10, -10);
  }

  onRefresh(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  onLocationFilterChanged(newFilter: any) {
    this.onFilterChanged('Location', newFilter);
  }

  onTypeFilterChanged(newFilter: any) {
    this.onFilterChanged('Building Type', newFilter);
  }

  onLevelsFilterChanged(newFilter: any) {
    this.onFilterChanged('Levels', newFilter);
  }

  onFinishFilterChanged(newFilter: any) {
    this.onFilterChanged('Finish', newFilter);
  }

  onThicknessFilterChanged(newFilter: any) {
    this.onFilterChanged('Thickness', newFilter);
  }

  onConfidenceChanged(newConfidence: any) {
    const x = 435;
  }

  private onFilterChanged(filterName: string, newFilter: []) {

  }

  private getNumberArray(from: number, to: number, jump = 1): number[] {
    let len: number;
    if (from > to) {
      len = (from - to) / Math.abs(jump) + 1;
    } else {
      len = (to - from) / Math.abs(jump) + 1;
    }
    const arr = new Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = from + i * jump;
    }
    return arr;
  }
}
