import { Injectable } from '@angular/core';
import { Response, RequestMethod, RequestOptions,Headers,Http} from "@angular/http";
import {map, filter,switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { of} from 'rxjs'
import 'rxjs/add/operator/toPromise';

import {Patient} from '../Shared/patient.model';
import {Attended} from '../Shared/attended.model'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = 'http://localhost:50813';
  showPatient:Patient[];


  constructor(private http1 : Http) { }

  registerPatient(emp : Patient){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/PatientDetails',body,requestOptions).pipe(map(x => x.json()));
  }

  GetAllPatients() {
    return this.http1.get(this.url + '/api/PatientDetails')
    .pipe(map(res => res.json()));
  }

  GetAllAttended() {
    return this.http1.get(this.url + '/api/AttendedPatients')
    .pipe(map(res => res.json()));
  }
  
  Attended(emp : Attended){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Authorization':'Bearer'+ localStorage.getItem('userToken')});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions}); 
    return this.http1.post(this.url +'/api/AttendedPatients',body,requestOptions).pipe(map(x => x.json()));
  }

  deleteBookings(id : any)
  {
  console.log(id);
  return this.http1.delete(this.url + '/api/PatientDetails/'+id).pipe(map(res => res.json()));
  }

}
