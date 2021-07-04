import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api-service/api.service';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LOCATION } from '../../data/mock-location';
import { LocationService } from 'src/app/services/location-service/location.service';
import * as _ from 'lodash';
export interface LocationTableItem {
  nam: string;
  key: string;
  ads: string;
  dis: number;
  efd: string;
  ste: string;
  lon: number;
  fax: string;
  lat: number;
}

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css'],
})
export class LocationTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LocationTableItem>;
  dataSource = new MatTableDataSource(LOCATION);
  @Input() text: string;
  @Input() color: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['key', 'nam', 'ads', 'dis'];
  nameListForModal = [];
  searchModel = '';
  originalData = [];
  prevSelected = [];
  currentPosition = undefined;

  @Output() btnClick = new EventEmitter();
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private locationService: LocationService
  ) {
    this.locationService.getPosition().then((pos) => {
      this.currentPosition = pos;
    });
  }

  ngOnInit() {
    //comment due to CORS error
    // this.apiService.getPost().subscribe((data) => {
    //   console.warn('data res', data);
    // });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.originalData = this.dataSource.data;
  }

  openFilterModal() {
    LOCATION.filter((location) => {
      let index = this.nameListForModal.findIndex(
        (name) => name == location.nam
      );
      if (index === -1) {
        this.nameListForModal.push(location.nam);
      }
    });
    let dialogRef = this.dialog.open(FilterModalComponent, {
      width: '500px',
      height: '400px',
      data: {
        allLocation: this.nameListForModal,
        prevSelected: this.prevSelected,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.prevSelected = _.uniq(result);
      if (
        _.isEmpty(result) ||
        this.prevSelected.length === this.originalData.length
      ) {
        this.dataSource.filter = '';
        return;
      }
      this.dataSource.filterPredicate = function (
        data,
        filter: string
      ): boolean {
        return data.nam.toLowerCase().includes(filter);
      };
      result.forEach((res) => {
        this.dataSource.filter = res.toLowerCase();
      });
    });
  }

  filter() {
    this.dataSource.filter = this.searchModel.toLowerCase();
  }

  onClickFilter() {
    this.btnClick.emit();
  }

  getDistance(location) {
    if (!this.currentPosition) {
      return 0;
    }
    if (
      this.currentPosition.lng == location.lon &&
      this.currentPosition.lat == location.lat
    ) {
      return 0;
    } else {
      var radlat1 = (Math.PI * this.currentPosition.lat) / 180;
      var radlat2 = (Math.PI * location.lat) / 180;
      var theta = this.currentPosition.lng - location.lon;
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

  openLocation(location) {
    console.warn(location);
    let dialogRef = this.dialog.open(LocationModalComponent, {
      width: '80%',
      height: '80%',
      data: { location: location, currentPosition: this.currentPosition },
    });
  }
}
