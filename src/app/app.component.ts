import { Component } from '@angular/core';
import {
  DialogContentType,
  DialogService,
  RangeSelector,
} from '@fundamental-ngx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Fiori SAP Demo';
  private readonly _rangeSelector = new RangeSelector();
  checkboxValue: boolean | null = false;
  filterVal = '';
  ascending = true;
  sortByKey = 'name';
  tableRows: any[] = [
    {
      name: 'Purchase request 1',
      status: 'Available',
      date: '09-07-18',
      description: `A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous
                flowering plants in the genus Musa.`,
      checked: false,
    },
    {
      name: 'Purchase request 2',
      status: 'Temporary unavailable',
      date: '09-07-18',
      description: `An apple is an edible fruit produced by an apple tree (Malus domestica).
          Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.`,
      checked: false,
    },
    {
      name: 'Purchase request 3',
      status: 'Out of stock',
      date: '09-07-18',
      description: `The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most
                economically significant plant in the family Bromeliaceae.`,
      checked: false,
    },
  ];

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  // SELECTION
  select(index: number, event: MouseEvent): void {
    // using rangeSelector utility to be able to select multiple rows while "shift" is pressed
    const checkedToggled = !this.tableRows[index].checked;
    this._rangeSelector.onRangeElementToggled(index, event);
    this._rangeSelector.applyValueToEachInRange(
      (idx) => (this.tableRows[idx].checked = checkedToggled)
    );
    this._setValue();
  }

  selectAll(checked: boolean): void {
    this.checkboxValue = checked;
    if (checked) {
      this._selectAll();
    } else {
      this._deselectAll();
    }
  }

  private _selectAll(): void {
    this.tableRows.forEach((row) => (row.checked = true));
  }

  private _deselectAll(): void {
    this.tableRows.forEach((row) => (row.checked = false));
  }

  private _getSelectAllValue(): boolean | null {
    const checked = this.tableRows.filter((row) => row.checked);
    if (checked.length === this.tableRows.length) {
      return true;
    } else if (!checked.length) {
      return false;
    }
    // returning null to set selection state to "indeterminate"
    return null;
  }

  private _setValue(): void {
    this.checkboxValue = this._getSelectAllValue();
  }

  setActiveItem(index: number): void {
    this.tableRows.map((item, rowIndex) => {
      item.active = rowIndex === index;
      return item;
    });
  }

  onSortChanged(sortByKey: string) {
    if (this.sortByKey == sortByKey) {
      this.ascending = !this.ascending;
    } else {
      this.sortByKey = sortByKey;
    }
  }

  openCloseDialog(template: DialogContentType, index: number): void {
    const dialogRef = this.dialogService.open(template, {
      width: '300px',
      responsivePadding: true,
      data: this.tableRows[index].description,
      ariaLabelledBy: 'fd-dialog-header-7',
      ariaDescribedBy: 'fd-dialog-body-7',
    });
  }
}
