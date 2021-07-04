import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;

  @Input() locations: any;
  nameListForModal = [];

  @Output() btnClick = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    let rawArray = [];
    this.locations.forEach((name) => {
      rawArray.push(name.nam);
    });

    //unique the array
    let unique = rawArray.filter((v, i, a) => a.indexOf(v) === i);
    this.nameListForModal = unique;
  }

  openFilterModal() {
    let dialogRef = this.dialog.open(FilterModalComponent, {
      width: '500px',
      height: '400px',
      data: { locations: this.nameListForModal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.warn(`dialog result: ${result}`)
    })
  }

  onClickFilter() {
    this.btnClick.emit();
  }
}
