import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from "../models/bike";
import { Modify } from "../models/modify";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  bike: Bike[];
  environment: Environment;
  selectedbike: Bike;
  modify: Modify;


  constructor(private http: HttpClient) {
    this.environment = new Environment();
    this.selectedbike = new Bike();
    this.modify = new Modify();
  }

  getBikes() {
    return this.http.get(this.environment.urlBike);
  }

  getUnassignedBikes() {
    return this.http.get(this.environment.urlBike+"/unassigned");
  }

  getSingleBike(_id: string) {
    return this.http.get(this.environment.urlBike + `/${_id}/studentdetail`);
  }

  postBike(bike: Bike) {
    return this.http.post(this.environment.urlBike, bike);
  }
  deleteBike(_id: string){
    return this.http.delete(this.environment.urlBike + `/${_id}`)
  } 
  deleteBikeStation(modify: Modify) {
    return this.http.post(this.environment.urlStation+"/deletebike", modify);
  }
  postBikeStation(modify: Modify) {
    return this.http.post(this.environment.urlStation+"/addbike", modify);
  }
}
