import { Component } from '@angular/core';
import {
  DialogContentType,
  DialogService,
  FdDate,
  FlexibleColumnLayout,
  ShellbarUser,
  ShellbarUserMenu,
} from '@fundamental-ngx/core';
import Chart from 'chart.js/auto';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  DATE_TIME_FORMATS,
  DatetimeAdapter,
  FD_DATETIME_FORMATS,
  FdDatetimeAdapter,
} from '@fundamental-ngx/core/datetime';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { monitorData, prices, warranties } from './monitor.data';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DatetimeAdapter,
      useClass: FdDatetimeAdapter,
    },
    {
      provide: DATE_TIME_FORMATS,
      useValue: FD_DATETIME_FORMATS,
    },
  ],
})
export class MonitorComponent {
  checkboxValue: boolean | null = false;
  searchText = '';
  ascending = false;
  sortByKey = '';
  monitorData = monitorData;

  // filters
  vendors = Array.from(
    new Set(monitorData.map((row) => row.vendor).filter((v) => v))
  );
  selectedVendor = [];
  warranties = warranties;
  selectedWarranties = [];
  materials = Array.from(
    new Set(monitorData.map((row) => row.material).filter((v) => v))
  );
  selectedMaterials = [];
  prices = prices;
  selectedPrices = [];
  date: Nullable<FdDate> = FdDate.getNow();
  selectedRange: Nullable<DateRange<FdDate>>;
  selectedRow: any;
  showOnlyChecked = false;

  user: ShellbarUser = {
    fullName: 'William Willson',
    colorAccent: 6,
    image: 'assets/images/user_Georg.jpg',
  };

  userMenu: ShellbarUserMenu[] = [
    { text: 'Settings', callback: () => {} },
    {
      text: 'Sign Out',
      callback: () => {
        alert('Goodbye...');
      },
    },
  ];
  actions = [
    {
      glyph: 'bell',
      callback: () => {
        alert("Don't click this!   :)");
      },
      label: 'Notifications',
      notificationCount: 1,
      notificationLabel: 'Unread Notifications',
    },
  ];

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  // Select all
  select(i: any): void {
    this._setSelectAllValue();
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
    monitorData.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    monitorData.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = monitorData.filter((row) => row.checked);
    if (checked.length === monitorData.length) {
      return true;
    } else if (!checked.length) {
      return false;
    }
    // returning null to set selection state to "indeterminate"
    return null;
  }
  private _setSelectAllValue(): void {
    this.checkboxValue = this._getSelectAllValue();
  }

  onSortChanged(sortByKey: string) {
    if (this.sortByKey == sortByKey) {
      this.ascending = !this.ascending;
    } else {
      this.sortByKey = sortByKey;
    }
  }

  toggleRowExpansion(index: number) {
    // Comută între expansiune și retragere
    this.monitorData[index].expanded = !this.monitorData[index].expanded;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmed Case':
        return 'status-confirmed';
      case 'Relevant':
        return 'status-relevant';
      case 'Under Review':
        return 'status-review';
      case 'Closed':
        return 'status-closed';
      case 'Not Relevant':
        return 'status-not-relevant';
      default:
        return '';
    }
  }
}
