import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() resetClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  reset() {
    console.log('reset pressed');
    this.resetClicked.emit();
  }
}
