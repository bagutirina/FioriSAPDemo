import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import {
  DialogService,
  FD_FLEXIBLE_LAYOUT_CONFIG,
  FdDate,
  FlexibleColumnLayout,
  FlexibleLayoutConfig,
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
  reasonableThreshold,
} from './compain-SDK.data';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const CustomFlexibleCardLayoutConfig: FlexibleLayoutConfig = {
  layouts: {
    OneColumnStartFullScreen: { start: 100, mid: 0, end: 0 },
    OneColumnMidFullScreen: { start: 0, mid: 100, end: 0 },
    OneColumnEndFullScreen: { start: 0, mid: 0, end: 100 },
    TwoColumnsStartExpanded: { start: 100, mid: 0, end: 0 },
    TwoColumnsMidExpanded: { start: 80, mid: 20, end: 0 },
    TwoColumnsEndExpanded: { start: 0, mid: 33, end: 67 },
    ThreeColumnsMidExpanded: { start: 25, mid: 50, end: 25 },
    ThreeColumnsEndExpanded: { start: 25, mid: 25, end: 50 },
    ThreeColumnsStartMinimized: { start: 0, mid: 50, end: 50 },
    ThreeColumnsEndMinimized: { start: 50, mid: 50, end: 0 },
  },
};

export type Feedback = 'korrekt' | 'inkorrekt' | 'irrelevant';
type TranslationKey =
  | 'patient_name'
  | 'job'
  | 'gender'
  | 'date_of_birth'
  | 'contract_types'
  | 'medication'
  | 'medical_procedures'
  | 'icd_code'
  | 'icd_name'
  | 'evidence'
  | 'score'
  | 'justification'
  | 'medically_relevant_information';

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
    {
      provide: FD_FLEXIBLE_LAYOUT_CONFIG,
      useValue: CustomFlexibleCardLayoutConfig,
    },
  ],
})
export class CompainSDKComponent {
  checkboxValue: boolean | null = false;
  searchText = '';
  ascending = false;
  sortByKey = '';
  data = [...compainSDKData].map((item) => ({
    ...item.data,
    timestamp: item.timestamp,
    id: item.id,
  }));
  reasonableThreshold = reasonableThreshold;
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

  detailedRow: any = null;

  layout: FlexibleColumnLayout = 'OneColumnStartFullScreen';
  changeLayout(newValue: FlexibleColumnLayout): void {
    this.layout = newValue;
  }
  localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';

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

          const apiData = response
            .map((item: any) =>
              item.data
                ? {
                    ...item.data,
                    timestamp: this.getDateFromTimestamp(item.timestamp),
                    id: item.id,
                  }
                : null
            )
            .filter((d: any) => d)
            .map((item: any) => ({
              ...item,
              metadata: {
                ...item.metadata,
                contract_types: this.getContractTypes(
                  item.metadata?.contract_types
                ),
              },
              icds: this.getIcds(item),
            }));

          this.data = [...apiData, ...this.data];
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

  getIcds(item: {
    icds: { icd_code: string }[];
    rejections: { icd_code: string }[];
  }) {
    const rcodes = item.rejections.map((r) => r.icd_code);
    return item.icds.filter((icd) => !rcodes.includes(icd.icd_code));
  }

  getContractTypes(contractTypes: any) {
    return contractTypes
      ? Array.from(
          new Set(
            contractTypes
              .flatMap((s: any) =>
                s //'SDK:AM12, AM30, S1, Z8, TA6/100, PPN, LKH: GUP500, PVN, Hanse: KVS3, EKV2, PVN>KUT/100'
                  .split(',')
                  .map((t: any) => t.trim())
              )
              .filter(Boolean)
          )
        )
      : [];
  }
  getDateFromTimestamp(timestamp: string) {
    return timestamp
      ? new Date(timestamp).toLocaleDateString('ro-RO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('ro-RO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
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
    return (text + '').replace(/^-\s*/, '').replace(/^\*\s*/, '');
  }

  //icd details dialog
  detailedICD: any = null;
  detailedICD_isRejection = false;
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

  //feedback dialog
  selectedFeedbackOption: Feedback = 'korrekt';
  feedbackJustification = '';
  feedbacks: {
    [key: string]: {
      [key: string]: { feedback: Feedback; justification: string };
    };
  } = {};
  openFeedbackModal(
    dialog: TemplateRef<any>,
    itemName: string,
    index?: any,
    subIndex?: any
  ) {
    const feed =
      this.feedbacks[this.detailedRow.id]?.[
        this.getItemCode(itemName, index, subIndex)
      ];
    this.selectedFeedbackOption = feed?.feedback || 'korrekt';
    this.feedbackJustification = feed?.justification || '';

    const itemNameSplit = itemName.split('.');
    let text = '';
    if (itemNameSplit[0] === 'metadata') {
      text =
        index || index === 0
          ? this.detailedRow.metadata[itemNameSplit[1]][index]
          : this.detailedRow.metadata[itemNameSplit[1]];
    } else if (
      itemNameSplit[0] === 'icds' ||
      itemNameSplit[0] === 'rejections'
    ) {
      text =
        subIndex || subIndex === 0
          ? this.detailedRow[itemNameSplit[0]][index][itemNameSplit[1]][
              subIndex
            ]
          : this.detailedRow[itemNameSplit[0]][index][itemNameSplit[1]];
      text = text + (itemNameSplit[1] === 'score' ? '%' : '');
    } else {
      text = this.detailedRow[itemNameSplit[0]][index];
    }

    const dialogRef = this._dialogService.open(dialog, {
      responsivePadding: true,
      ariaLabelledBy: 'fd-dialog-header-10',
      ariaDescribedBy: 'fd-dialog-body-10',
      focusTrapped: true,
      width: '600px',
      data: {
        text: this.sanitizeEvidence(text),
        label:
          this.translation[
            (itemNameSplit[1] || itemNameSplit[0]) as TranslationKey
          ],
      },
    });

    dialogRef.afterClosed.subscribe(
      (result) => {
        setTimeout(() => {
          this.feedbacks[this.detailedRow.id] =
            this.feedbacks[this.detailedRow.id] || {};
          this.feedbacks[this.detailedRow.id][
            this.getItemCode(itemName, index, subIndex)
          ] = {
            feedback: this.selectedFeedbackOption,
            justification: this.feedbackJustification,
          };
          this.cdr.detectChanges();
        }, 0);
      },
      (error) => {}
    );
  }

  getItemCode(itemName: string, index?: number, subindex?: number): string {
    return `${itemName} ${index || index === 0 ? index : ''} ${
      subindex || subindex === 0 ? subindex : ''
    }`;
  }

  getItemTooltip(itemName: string, index?: number, subindex?: number) {
    if (!this.detailedRow) return '';
    const feed =
      this.feedbacks[this.detailedRow.id]?.[
        this.getItemCode(itemName, index, subindex)
      ];
    return feed || { text: 'Feedback senden' };
  }

  hasFeedback(itemName: string, index?: number, subindex?: number) {
    if (!this.detailedRow) return false;
    const feed =
      this.feedbacks[this.detailedRow.id]?.[
        this.getItemCode(itemName, index, subindex)
      ];
    return !!feed;
  }

  getItemClass(itemName: string, index?: number, subindex?: number) {
    if (!this.detailedRow) return '';
    const feed =
      this.feedbacks[this.detailedRow.id]?.[
        this.getItemCode(itemName, index, subindex)
      ];
    return !feed ? '' : feed.feedback;
  }

  translation = {
    patient_name: 'Patienten',
    job: 'Beruf',
    gender: 'Geschlecht',
    date_of_birth: 'Geburtstag',
    contract_types: 'Wunschtarif',
    medication: 'Medikament',
    medical_procedures: 'Medizinische Maßnahme',
    icd_code: 'ICD-10 Code',
    icd_name: ' ICD-10 Name',
    evidence: 'ICD-10 Relevante Textstelle',
    score: 'ICD-10 Score',
    justification: 'ICD-10 Begründung',
    medically_relevant_information: 'Weitere medizinisch relevante Information',
  };
  getFeedbackFromCode(itemCode: string): {
    label: string;
    text: string;
    feedback: Feedback;
    justification: string;
  } {
    let label = '';
    let text = '';

    const codeSplit = itemCode.split(' ');
    const itemNameSplit = codeSplit[0].split('.');
    const index = codeSplit[1];
    const subIndex = codeSplit[2];

    if (itemNameSplit[0] === 'metadata') {
      text =
        index || index === '0'
          ? this.detailedRow.metadata[itemNameSplit[1]][index]
          : this.detailedRow.metadata[itemNameSplit[1]];
    } else if (
      itemNameSplit[0] === 'icds' ||
      itemNameSplit[0] === 'rejections'
    ) {
      text =
        subIndex || subIndex === '0'
          ? this.detailedRow[itemNameSplit[0]][index][itemNameSplit[1]][
              subIndex
            ]
          : this.detailedRow[itemNameSplit[0]][index][itemNameSplit[1]];
      text = text + (itemNameSplit[1] === 'score' ? '%' : '');
    } else {
      text = this.detailedRow[itemNameSplit[0]][index];
    }

    label =
      this.translation[
        (itemNameSplit[1] || itemNameSplit[0]) as TranslationKey
      ];
    return { label, text, ...this.feedbacks[this.detailedRow.id]?.[itemCode] };
  }

  getAllFeedbacks() {
    if (!this.detailedRow || !this.feedbacks[this.detailedRow?.id]) return [];
    return Object.keys(this.feedbacks[this.detailedRow.id]).map((code) =>
      this.getFeedbackFromCode(code)
    );
  }

  //generate pdf
  async generarePdf(row?: any) {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFonts = await import('pdfmake/build/vfs_fonts');

      pdfMakeModule.vfs = pdfFonts.vfs;
      this.pdfMake = pdfMakeModule;
    }
    this.pdfMake
      .createPdf(
        PDFTemplate(row ? [row] : this.data.filter((row) => row.checked))
      )
      .open();
  }

  capitalizeFirstLetter(str: string) {
    if (!str) return ''; // dacă e null, undefined sau gol
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
