import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-road-map-box',
  templateUrl: './road-map-box.component.html',
  styleUrls: ['./road-map-box.component.css']
})
export class RoadMapBoxComponent implements OnInit {


  @Input()  title = 'title';
  @Input()  text = 'text';
  @Input()   image = 'image'


  constructor() { }

  ngOnInit(): void {
  }

}
