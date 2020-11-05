import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  loading: boolean = false;

  constructor() {
  }

  onRefresh(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
