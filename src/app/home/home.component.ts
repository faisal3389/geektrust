import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FalconeServiceService } from './../falcone-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  allPlanets = [];
  unselectedPlanetNames = [];
  allPlanetsNames = [];
  selectedList = {};
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
          this.unselectedPlanetNames.push(spaceBall.name);
        })
      });
  }

  planetSelected(...args) {
    console.log(args);
    this.selectedList[args[0]] = args[1].value;
    // this.unselectedPlanetNames = [];
    // this.allPlanetsNames.forEach((planetName) => {
    //   if(Object.values(this.selectedList).indexOf(planetName) === -1) {
    //     this.unselectedPlanetNames.push(planetName);
    //   }
    // })
  }

  findFalcone() {
    let body = {
      'planet_names': [
        "Donlon",
        "Enchai",
        "Jebing",
        "Sapir"
      ],
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

}
