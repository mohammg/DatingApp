import { Component, OnInit } from '@angular/core';
// Look too Import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
values: any;
// Next Step To Call service
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();

  }
getValues() {
  // step 3 Call Web Service
  this.http.get('http://localhost:5000/api/values')
  .subscribe(response => { this.values = response;
  }
  , error => {
    console.error(error);
  });
}
}
