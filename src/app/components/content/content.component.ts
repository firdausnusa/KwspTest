import { Component, OnInit, ViewChild } from '@angular/core';
import { LOCATION } from '../../data/mock-location';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  listData: any = [];
  locations = LOCATION;
  lat = 52.2296756;
  lng = 21.0122287;

  coordinates = [
    { lat: 52.2296756, lng: 21.0122287 },
    { lat: 52.406374, lng: 16.9251681 },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
