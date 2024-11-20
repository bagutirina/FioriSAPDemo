import { Component } from '@angular/core';
import {
  DialogContentType,
  DialogService,
  FlexibleColumnLayout,
  RangeSelector,
} from '@fundamental-ngx/core';
import Chart from 'chart.js/auto';

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
  ascending = false;
  sortByKey = '';
  tableRows: any[] = [
    {
      name: 'Desk',
      date: '2025-02-01',
      amount: '2',
      vendor: 'IKEA',
      warranty: '',
      size: '',
      price: '599',
      material: 'OE10_D1',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Desk',
      date: '2025-02-01',
      amount: '2',
      vendor: 'IKEA',
      warranty: '',
      size: '',
      price: '799',
      material: 'OE10_D2',
      properties: 'height-adjustable',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Chair',
      date: '2025-02-01',
      amount: '3',
      vendor: 'Trendoffice',
      warranty: '',
      size: '',
      price: '399',
      material: 'OE10_C3',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Roller Cabinet',
      date: '2025-02-01',
      amount: '3',
      vendor: 'Trendoffice',
      warranty: '',
      size: '',
      price: '899',
      material: 'OE10_CB4',
      properties: 'lockable',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Laptop',
      date: '2025-02-01',
      amount: '2',
      vendor: 'Dell',
      warranty: '3 years',
      size: '',
      price: '1450',
      material: 'HW10_L1',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Laptop',
      date: '2025-02-01',
      amount: '1',
      vendor: 'Dell',
      warranty: '3 years',
      size: '',
      price: '1850',
      material: 'HW10_L1',
      properties: 'with GPU',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Monitor',
      date: '2025-02-01',
      amount: '6',
      vendor: 'Dell',
      warranty: '3 years',
      size: 'more than 17 inch',
      price: 'up to 100 Euro',
      material: '',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Visual Studio License',
      date: '2025-02-01',
      amount: '1',
      vendor: 'Microsoft',
      warranty: '',
      size: '',
      price: '199',
      material: '23412-M-2343',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Visual Studio Pro License',
      date: '2025-03-01',
      amount: '1',
      vendor: 'Microsoft',
      warranty: '',
      size: '',
      price: '299',
      material: '23412-M-2343',
      properties: '',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
    {
      name: 'Shelf - large',
      date: '2025-02-01',
      amount: '1',
      vendor: '',
      warranty: '',
      size: '3x2 Meter',
      price: '',
      material: '',
      properties: 'Including assembly service',
      description: `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`,
      checked: false,
    },
  ];
  chartData: any[] = [
    { name: 'Desk', count: 50, percent: 20 },
    { name: 'Desk', count: 70, percent: 30 },
    { name: 'Chair', count: 120, percent: 30 },
    { name: 'Roller cabinet', count: 150, percent: 30 },
    { name: 'Laptop', count: 200, percent: 40 },
    { name: 'Laptop', count: 250, percent: 50 },
    { name: 'Visual Studio Licence', count: 200, percent: 10 },
    { name: 'Visual Studio Pro Licence', count: 260, percent: 20 },
    { name: 'Networking Equipment', count: 270, percent: 30 },
    { name: 'Assembly Service', count: 100, percent: 20 },
    { name: 'Office Software Subscription', count: 150, percent: 30 },
    { name: 'Keyboard', count: 120, percent: 30 },
  ];

  chart: Chart | undefined;
  chartOptions: any;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    const data = this.chartData;
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
              backgroundColor: '#5899da',
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
      data: this.tableRows[index],
      ariaLabelledBy: 'fd-dialog-header-7',
      ariaDescribedBy: 'fd-dialog-body-7',
    });
  }

  localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';
  changeLayout(newValue: FlexibleColumnLayout): void {
    this.localLayout = newValue;
  }
}
