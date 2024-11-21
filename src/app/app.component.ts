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
import {
  chartData,
  descriptionExample,
  prices,
  tableRows,
  warranties,
} from './app.data';
import {
  SearchInput,
  SuggestionItem,
  ValueLabelItem,
} from '@fundamental-ngx/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  title = 'Fiori SAP Demo';
  checkboxValue: boolean | null = false;
  filterVal = '';
  ascending = false;
  sortByKey = '';
  tableRows = tableRows;
  chart: Chart | undefined;
  chartOptions: any;

  // filters
  vendors = Array.from(
    new Set(tableRows.map((row) => row.vendor).filter((v) => v))
  );
  selectedVendor = [];
  warranties = warranties;
  selectedWarranties = [];
  materials = Array.from(
    new Set(tableRows.map((row) => row.material).filter((v) => v))
  );
  selectedMaterials = [];
  prices = prices;
  selectedPrices = [];
  date: Nullable<FdDate> = FdDate.getNow();
  selectedRange: Nullable<DateRange<FdDate>>;

  user: ShellbarUser = {
    fullName: 'William Willson',
    colorAccent: 6,
    image: 'assets/images/user.jpg',
  };

  userMenu: ShellbarUserMenu[] = [
    { text: 'Settings', callback: this.settingsCallback },
    { text: 'Sign Out', callback: this.signOutCallback },
  ];
  actions = [
    {
      glyph: 'bell',
      callback: this.actionNotificationCallback,
      label: 'Notifications',
      notificationCount: 2,
      notificationLabel: 'Unread Notifications',
    },
  ];
  searchTerm = '';
  inputText = '';
  searchTerms = ['Apple', 'Banana', 'Kiwi', 'Strawberry'];
  categories: ValueLabelItem[] = [
    {
      value: 'red',
      label: 'Red',
    },
    {
      value: 'orange',
      label: 'Orange',
    },
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'blue',
      label: 'Blue',
    },
    {
      value: 'indigo',
      label: 'Indigo',
    },
    {
      value: 'violet',
      label: 'Violet',
    },
  ];

  suggestions: SuggestionItem[] = [
    {
      value: 'Apple',
    },
    {
      value: 'Banana',
    },
    {
      value: 'Blueberry',
    },
    {
      value: 'Cherry',
    },
    {
      value: 'Grape',
    },
    {
      value: 'Lemon',
    },
    {
      value: 'Lime',
    },
    {
      value: 'Orange',
    },
    {
      value: 'Peach',
    },
    {
      value: 'Pineapple',
    },
    {
      value: 'Plum',
    },
    {
      value: 'Raspberry',
    },
  ];

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    const data = chartData;
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          barPercentage: 0.4, // Ajustează lățimea barelor (0.5 este o valoare moderată, mai mică va face barele mai subțiri)
          categoryPercentage: 0.6, // Ajustează gap-ul dintre bare (valoare mai mică pentru mai mult spațiu)
          ticks: {
            maxRotation: 0, // Împiedică rotirea etichetelor
            minRotation: 0, // Etichetele nu se vor roti
            autoSkip: false, // Permite să sară etichetele pentru a se potrivi
          },
        },
        y: {
          ticks: {
            precision: 0,
          },
          max: 300,
        },
        yy: {
          position: 'right',
          precision: 0,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value: number) {
              return value + '%';
            },
          },
          max: 60,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          position: 'nearest',
          padding: 20,
          titleColor: 'black',
          bodyColor: 'black',
          titleMarginBottom: 10,
          displayColors: false,
          callbacks: {
            label: function (context: any) {
              const datasetIndex = context.datasetIndex;
              if (datasetIndex === 0) {
                return `${context.dataset.label}: ${context.raw}%`;
              } else {
                return `${context.dataset.label}: ${context.raw}`;
              }
            },
          },
          backgroundColor: function (context: {
            tooltipItems: { datasetIndex: any }[];
          }) {
            // Verificăm care dataset este (graficul bară sau liniar)
            const datasetIndex = context.tooltipItems[0]?.datasetIndex;
            if (datasetIndex === 0) {
              return '#fdeeeee8';
            } else if (datasetIndex === 1) {
              return '#dee9f3e8';
            }
            return '#ffffff'; // Fundal default
          },
        },
        animation: {
          type: 'easeInSine',
        },
      },
    };
    this.chart = new Chart(
      document.getElementById('chart') as HTMLCanvasElement,
      {
        type: 'bar',
        data: {
          labels: data.map((row) => row.name),
          datasets: [
            {
              label: 'Overall Percentage Purchesed',
              data: data.map((row) => row.percent),
              borderColor: 'red',
              yAxisID: 'yy',
              type: 'line',
            },
            {
              label: 'Amount Purchesed',
              data: data.map((row) => row.count),
              backgroundColor: '#5899da', // '0a6ed1','#5899da',
              maxBarThickness: 50, // Lățimea maximă a barelor
              yAxisID: 'y',
            },
          ],
        },
        options: this.chartOptions,
        plugins: [
          {
            id: 'responsiveLabels',
            afterBuildTicks(chart) {
              const ctx = chart.ctx;
              const xAxis = chart.scales['x'];

              const chartWidth = chart.width;
              const numLabels = xAxis.ticks.length;
              const spacePerLabel = chartWidth / numLabels;

              xAxis.ticks.forEach((tick, index) => {
                const label = data[index].name;
                const labelWidth = ctx.measureText(label).width;
                if (labelWidth > spacePerLabel) {
                  xAxis.ticks[index].label =
                    label.substring(0, Math.floor(spacePerLabel / 8)) + '...';
                }
              });
            },
          },
        ],
      }
    );
  }

  settingsCallback(): void {
    alert('Settings Clicked');
  }

  signOutCallback(): void {
    alert('Sign Out Clicked');
  }

  // Select all
  select(): void {
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
    tableRows.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    tableRows.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = tableRows.filter((row) => row.checked);
    if (checked.length === tableRows.length) {
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

  openCloseDialog(template: DialogContentType, index: number): void {
    const dialogRef = this.dialogService.open(template, {
      responsivePadding: true,
      maxWidth: '800px',
      data: tableRows[index],
      ariaLabelledBy: 'fd-dialog-header-7',
      ariaDescribedBy: 'fd-dialog-body-7',
    });
  }

  localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';
  changeLayout(newValue: FlexibleColumnLayout): void {
    this.localLayout = newValue;
  }

  // shellbar
  actionNotificationCallback($event: any): void {
    console.log($event);
    alert("Don't click this!   :)");
  }

  onSearchClick(): void {
    console.log('Search icon clicked');
    // Poți deschide un popup sau naviga către o altă funcționalitate
  }
}
