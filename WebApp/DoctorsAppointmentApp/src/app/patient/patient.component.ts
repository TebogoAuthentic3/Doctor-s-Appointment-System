import { Component, OnInit } from '@angular/core';
import {Patient} from '../Shared/patient.model'
import {Attended} from '../Shared/attended.model'
import {ServicesService} from '../Shared/services.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientDetails: any;
  body: Attended;


  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
    console.log("data",this.patientDetails);

    this.service.GetAllAttended().subscribe((data :any ) => {
      console.log('data222', data)
  });
  }

  attend(pat: Patient){
 


    this.body = {
      LASTNAME: pat.LASTNAME,
      FIRSTNAME: pat.FIRSTNAME,
      USERNAME: pat.USERNAME,
      CONTACT: pat.CONTACT,
      EMAILADDRESS: pat.EMAILADDRESS,
      GENDER: pat.GENDER,
      CATEGORY: pat.CATEGORY,
      DATE: pat.DATE,
      DOB: pat.DOB,
      TIME: pat.TIME,
      ID: pat.PATIENTID
    }

    this.service.Attended(this.body)
    .subscribe((data: any) => {
      if (data.length < 0) {
        alert('Oops something went wrong');
      } else {
        alert('Proceed to attend patient');
        window.location.reload();
      }  
    });

  }

  delete(pat: Patient){
    this.service.deleteBookings(pat.PATIENTID)
    .subscribe((data : any ) => {
      console.log('dleeted',data)
      window.location.reload();
    });
  }

}
