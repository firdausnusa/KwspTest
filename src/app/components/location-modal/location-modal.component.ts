import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css'],
})
export class LocationModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { location; currentPosition },
    private dialogRef: MatDialogRef<LocationModalComponent>
  ) {}
  locationData = undefined;
  coordinates = [];

  lng = 101.4871154;
  lat = 3.0960172;

  ngOnInit(): void {
    this.locationData = this.data.location;
    this.coordinates.push({
      lat: this.data.currentPosition.lat,
      lng: this.data.currentPosition.lng,
    });
    this.coordinates.push({
      lat: this.locationData.lat,
      lng: this.locationData.lon,
    });

    console.warn('this.coordinates', this.coordinates);
    console.warn('this.data.currentPosition', this.data.currentPosition);
  }

  closeFilterModal() {
    this.dialogRef.close();
  }

  getDistance(location) {
    if (!this.data.currentPosition) {
      return 0;
    }
    if (
      this.data.currentPosition.lng == location.lon &&
      this.data.currentPosition.lat == location.lat
    ) {
      return 0;
    } else {
      var radlat1 = (Math.PI * this.data.currentPosition.lat) / 180;
      var radlat2 = (Math.PI * location.lat) / 180;
      var theta = this.data.currentPosition.lng - location.lon;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist.toFixed(2);
    }
  }
  openInMap() {
    let url = `https://maps.google.com/?q=${this.locationData.lat},${this.locationData.lon}`;
    window.open(url, '_blank');
  }
}
