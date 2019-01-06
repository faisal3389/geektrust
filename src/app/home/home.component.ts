import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FalconeServiceService } from './../falcone-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  disableFind = false;
  allPlanets = [];
  vehicles = [];

  allPlanetsNames = [];

  selectedPlanets = {
    d1: [],
    d2: [],
    d3: [],
    d4: []
  }
  @ViewChild('dest1') dest1;
  @ViewChild('dest2') dest2;
  @ViewChild('dest3') dest3;
  @ViewChild('dest4') dest4;


  constructor(
    private fService: FalconeServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fService.getPlanets()
      .subscribe(pData => {
        this.allPlanets = pData;
        this.allPlanets.forEach(spaceBall => {
          this.allPlanetsNames.push(spaceBall.name);
        })
        this.updateDestinationChoices(this.allPlanetsNames);
      });
    this.fService.getVehicles()
      .subscribe(vData => {
        this.vehicles = vData;
      })
  }

  updateDestinationChoices(pList) {
    pList.forEach(element => {
      this.selectedPlanets.d1.push(element);
      this.selectedPlanets.d2.push(element);
      this.selectedPlanets.d3.push(element);
      this.selectedPlanets.d4.push(element);
    });
  }

  planetSelected(...args) {
    for(var i=1; i<=4; i++) {
      if (args[0] != i) {
        var index = this.selectedPlanets['d'+i].indexOf(args[1].value);
        this.selectedPlanets['d'+i].splice(index, 1);
      }
    }
  }

  makeSelectedPlanetsBody() {
    let finalPlanets = [];
    finalPlanets.push(this.dest1.value);
    finalPlanets.push(this.dest2.value);
    finalPlanets.push(this.dest3.value);
    finalPlanets.push(this.dest4.value);
    return finalPlanets;
  }
  
  findFalcone() {
    
    let body = {
      'planet_names': this.makeSelectedPlanetsBody(),
      "vehicle_names": [
        "Space pod",
        "Space rocket",
        "Space rocket",
        "Space rocket"
      ]
    }
    this.fService.findFalcone(body).subscribe(response => {
      if (response && response.status == 'success'){
        this.router.navigate(['/result'], { queryParams: { success: true, planet: response.planet_name, timeTaken: '200' } });
      } else if(response.status == 'false') {
        this.router.navigate(['/result'], { queryParams: { success: false } });
      }
    })
  }

  reset() {
    console.log('refresh clicked');
  }

}
