import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent implements OnInit {
  test: 'modal';
  selectedList = [];
  selectedAll = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { allLocation; prevSelected },
    private dialogRef: MatDialogRef<FilterModalComponent>
  ) {}

  ngOnInit(): void {
    this.selectedList = this.data.prevSelected;
    if (this.data.prevSelected.length === this.data.allLocation.length) {
      this.selectedAll = true;
      return;
    }
  }

  checkAll() {
    this.data.allLocation.forEach((data) => {
      this.selectedList.push(data);
    });
    if (this.selectedAll) {
      this.selectedList = [];
    }
  }

  getChecked(subLocation) {
    let index = this.selectedList.findIndex((name) => name == subLocation);
    if (index != -1) {
      return true;
    }
    return false;
  }

  updateSelected(selected) {
    this.selectedList.push(selected);
  }

  resetFilterModal() {
    this.selectedList = [];
    this.selectedAll = false;
  }

  closeFilterModal() {
    this.dialogRef.close(this.selectedList);
  }
}
