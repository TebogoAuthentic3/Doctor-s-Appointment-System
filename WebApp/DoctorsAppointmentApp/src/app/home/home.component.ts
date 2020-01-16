import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicesService} from '../Shared/services.service';
import {Patient} from '../Shared/patient.model'
import {NgForm} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ServicesService]
})
export class HomeComponent implements OnInit {

  AdmName: any;
  AdmPass: any;
  patName: any;
  patPass: any;
  registerPatient: Patient;
  login: any;

  constructor(private _router: Router,private service: ServicesService,private toastr: ToastrService) { }

  ngOnInit() {
    this.registerPatient = new Patient();
    this.resetForm();
  }

  DoctorLogin() {if (this.AdmName === 'doctor' && this.AdmPass === '123') {
      console.log('passed', this.AdmName);
      this._router.navigate(['/doctor']).
      then(() => {
        window.location.reload();
      });
    } else {
      console.log('failed');
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
        this.registerPatient = {
          USERNAME: '',
          PASSWORD: '',
          FIRSTNAME: '',
          LASTNAME: '',
          CONTACT: null,
          PATIENTID : null,
          EMAILADDRESS: '',
          TIME: '',
          GENDER: '',
          CATEGORY: '',
          DATE: '',
          DOB: ''
        }
     }
  }

  register(form:NgForm){
    this.service.registerPatient(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
        //this.toastr.error('Failed to add patient details');
        alert('Failed to add patient details');
      } else {
        //this.toastr.success('patient details added.');
        alert('patient details added.');
        this.resetForm(form);
        window.location.reload();
      }  
    });
  }


}
