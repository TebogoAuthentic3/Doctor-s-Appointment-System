import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../Shared/services.service';

@Component({
  selector: 'app-attended',
  templateUrl: './attended.component.html',
  styleUrls: ['./attended.component.css']
})
export class AttendedComponent implements OnInit {

  attended: any;

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.service.GetAllAttended().subscribe((data :any ) => {
      this.attended = data; 
      console.log('data', data) 
  });
  }

}
