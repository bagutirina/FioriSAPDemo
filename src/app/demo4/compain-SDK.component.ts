import { Component, TemplateRef } from '@angular/core';
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
import { compainSDKData, codes, scores } from './compain-SDK.data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-compain-SDK',
  templateUrl: './compain-SDK.component.html',
  styleUrls: ['./compain-SDK.component.scss'],
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
export class CompainSDKComponent {
  checkboxValue: boolean | null = false;
  searchText = '';
  ascending = false;
  sortByKey = '';
  compainSDKData = compainSDKData;
  selectedAccess = ['Offen', 'Offen', 'Offen', '', '', '', '', '', ''];

  // filters

  //contract
  contracts = Array.from(
    new Set(compainSDKData.map((row) => row.contract).filter((v) => v))
  );
  selectedContracts = [];

  //code
  codes = codes;
  selectedCodes = [];

  // score
  scores = scores;
  selectedScores = [];

  //status
  statuses = Array.from(
    new Set(compainSDKData.map((row) => row.status).filter((v) => v))
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
    private titleService: Title,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Insurance application');
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
    compainSDKData.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    compainSDKData.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = compainSDKData.filter((row) => row.checked);
    if (checked.length === compainSDKData.length) {
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
    this.compainSDKData[index].expanded = !this.compainSDKData[index].expanded;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In progress':
        return 'status-inProgress';
      case 'Completed':
        return 'status-completed';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  get filteredCompainSDKData() {
    return this.compainSDKData
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(this.searchText.toLowerCase())
        )
      )
      .filter((row) => (this.showOnlyChecked ? row.checked : true));
  }

  displayFunc(item: { code: string; description: string }): string {
    return `${item.code} - ${item.description}`;
  }

  valueFunc(obj: any): string {
    return obj.code;
  }

  dialogImage: string = '';

  openDialog(dialog: TemplateRef<any>): void {
    const dialogRef = this._dialogService.open(dialog, {
      responsivePadding: true,
      ariaLabelledBy: 'fd-dialog-header-10',
      ariaDescribedBy: 'fd-dialog-body-10',
      focusTrapped: true,
    });

    dialogRef.afterClosed.subscribe(
      (result) => {},
      (error) => {}
    );
  }
}
