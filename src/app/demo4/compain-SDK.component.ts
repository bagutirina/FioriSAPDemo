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
import {
  compainSDKData,
  scores,
  statuses,
  PDFTemplate,
  evaluations,
} from './compain-SDK.data';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  data = [...compainSDKData];
  selectedAccess = ['Offen', 'Offen', 'Offen', '', '', '', '', '', ''];
  loading = false;
  private pdfMake: any;
  readonly token = 'compin-semantic-bridge-super-secret-access-token';
  evaluations = evaluations;

  contracts: string[] = [];
  selectedContracts = [];
  codes: string[] = [];
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

  today = new Date();

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
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Insurance');
    this.loadFilters();
    this.loadMoreData();
  }

  loadMoreData() {
    this.loading = true;
    this.cdr.detectChanges();

    this.http
      .get<any>(
        'https://qd5xlflzyj.execute-api.eu-central-1.amazonaws.com/v0/job/config/compin123',
        {
          headers: new HttpHeaders({
            Authorization: `Bearer compin-semantic-bridge-super-secret-access-token`,
            'Content-Type': 'application/json',
            Accept: '*/*',
          }),
        }
      )
      .subscribe({
        next: (response) => {
          this.loading = false;

          this.data = [
            ...response.map((item: any) => item.data).filter((d: any) => d),
            ...this.data,
          ];
          this.loadFilters();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('API error', err);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  loadFilters() {
    this.contracts = Array.from(
      new Set(this.data.map((row) => row.metadata.contract_types).flat())
    ).sort();

    this.codes = Array.from(
      new Set([
        ...this.data
          .map((row) => row.icds.map((i: { icd_code: any }) => i.icd_code))
          .flat(),
        ...this.data
          .map((row) =>
            row.rejections.map((i: { icd_code: any }) => i.icd_code)
          )
          .flat(),
      ])
    );
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
        return 'status-open';
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
    return text.replace(/^-\s*/, '').replace(/^\*\s*/, '');
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

  //generate pdf
  async generarePdf() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFonts = await import('pdfmake/build/vfs_fonts');

      pdfMakeModule.vfs = pdfFonts.vfs;
      this.pdfMake = pdfMakeModule;
    }
    this.pdfMake
      .createPdf(PDFTemplate(this.data.filter((row) => row.checked)))
      .open();
  }
}
