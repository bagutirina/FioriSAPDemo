import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
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
import { compainSDKData, scores, statuses } from './compain-SDK.data';
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
  data = compainSDKData.slice(1);
  selectedAccess = ['Offen', 'Offen', 'Offen', '', '', '', '', '', ''];
  loading = false;

  // filters

  //contract
  contracts = Array.from(
    new Set(
      compainSDKData.map((row) => row.metadata.contract_types).filter((v) => v)
    )
  );
  selectedContracts = [];

  //code
  codes = Array.from(
    new Set([
      ...compainSDKData
        .map((row) => row.icds.map((i: { icd_code: any }) => i.icd_code))
        .flat(),
      ...compainSDKData
        .map((row) => row.rejections.map((i: { icd_code: any }) => i.icd_code))
        .flat(),
    ])
  );
  selectedCodes = [];

  // score
  scores = scores;
  selectedScores = [];

  //status
  statuses = statuses;
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
    private _dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Insurance');

    setTimeout(() => {
      this.loading = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.loading = false;
        this.data = [compainSDKData[0], ...this.data];
        this.cdr.detectChanges();
      }, 10000);
    }, 100);
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
    this.data.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    this.data.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = this.data.filter((row) => row.checked);
    if (checked.length === this.data.length) {
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
    this.data[index].expanded = !this.data[index].expanded;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Offen':
        return 'status-open';
      case 'In Bearbeitung':
        return 'status-inProgress';
      case 'Abgeschlossen':
        return 'status-completed';
      case 'Abgelehnt':
        return 'status-rejected';
      default:
        return '';
    }
  }

  get filteredCompainSDKData() {
    return this.data
      .filter((row) =>
        JSON.stringify(row)
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      )
      .filter((row) => (this.showOnlyChecked ? row.checked : true));
  }
  sanitizeEvidence(text: string): string {
    return text.replace(/^-\s*/, '');
  }

  open_icd: any = null;
  open_rejection = false;
  openDialog(dialog: TemplateRef<any>): void {
    const dialogRef = this._dialogService.open(dialog, {
      responsivePadding: true,
      ariaLabelledBy: 'fd-dialog-header-10',
      ariaDescribedBy: 'fd-dialog-body-10',
      focusTrapped: true,
      width: '600px',
    });

    dialogRef.afterClosed.subscribe(
      (result) => {},
      (error) => {}
    );
  }
}
