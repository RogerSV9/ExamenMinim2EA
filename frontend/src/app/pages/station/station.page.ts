import { Component, OnInit } from '@angular/core';
import { Station } from "../../models/station";
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.page.html',
  styleUrls: ['./station.page.scss'],
})
export class StationPage implements OnInit {

  stations: Station[];

  constructor(private stationService: StationService) { }

  ngOnInit() {
    this.getStations();
  }
  getStations(){
    this.stationService.getStations()
    .subscribe(res =>{
      this.stationService.station= res as Station[];
      console.log(res);
    });
  }

  refresh(): void {
    window.location.reload();
}

}
