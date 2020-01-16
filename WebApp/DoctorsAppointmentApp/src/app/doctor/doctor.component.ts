import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicesService} from '../Shared/services.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  allPatients: any;

  constructor(private _router: Router,private service: ServicesService) { }

  ngOnInit() {

    this.service.GetAllPatients().subscribe((data :any ) => {
      this.allPatients = data; 
      localStorage.setItem('patientDetails', JSON.stringify(data));
      console.log('data', data)
  });

  }

  SignOut() {
    this._router.navigate(['/home']).
      then(() => {
        window.location.reload();
      });
  }

}
