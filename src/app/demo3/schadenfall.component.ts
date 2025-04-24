import { Component } from '@angular/core';
import {
  DialogService,
  FdDate,
  ShellbarUser,
  ShellbarUserMenu,
} from '@fundamental-ngx/core';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  DATE_TIME_FORMATS,
  DatetimeAdapter,
  FD_DATETIME_FORMATS,
  FdDatetimeAdapter,
} from '@fundamental-ngx/core/datetime';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
  schadenfallData,
  betragsspanne,
  scoringbereich,
} from './schadenfall.data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-schadenfall',
  templateUrl: './schadenfall.component.html',
  styleUrls: ['./schadenfall.component.scss'],
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
export class SchadenfallComponent {
  checkboxValue: boolean | null = false;
  searchText = '';
  ascending = false;
  sortByKey = '';
  schadenfallData = schadenfallData;
  selectedAccess = ['', '', '', '', ''];

  // filters

  //typ
  typs = Array.from(
    new Set(schadenfallData.map((row) => row.typ).filter((v) => v))
  );
  selectedTyps = [];

  //summe
  betragsspanne = betragsspanne;
  selectedBetragsspanne = [];

  // score
  scoringbereich = scoringbereich;
  selectedScoringbereich = [];

  //status
  statuses = Array.from(
    new Set(schadenfallData.map((row) => row.status).filter((v) => v))
  );
  selectedStatuses = [];

  //date
  date: Nullable<FdDate> = FdDate.getNow();
  selectedRange: Nullable<DateRange<FdDate>>;

  selectedRow: any;
  showOnlyChecked = false;

  //user
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

  constructor(
    public dialogService: DialogService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Schadenfallanalyse');
  }

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
    schadenfallData.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    schadenfallData.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = schadenfallData.filter((row) => row.checked);
    if (checked.length === schadenfallData.length) {
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
    this.schadenfallData[index].expanded =
      !this.schadenfallData[index].expanded;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Review':
        return 'status-review';
      case 'Completed':
        return 'status-completed';
      case 'Discarded':
        return 'status-discarded';
      default:
        return '';
    }
  }

  get filteredSchadenfallData() {
    return this.schadenfallData
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(this.searchText.toLowerCase())
        )
      )
      .filter((row) => (this.showOnlyChecked ? row.checked : true));
  }
}
