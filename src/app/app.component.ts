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
  chart: Chart | undefined;
  chartOptions: any;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    const data: any[] = [
      { name: 'Desk', count: 50, percent: 20 },
      { name: 'Monitor', count: 70, percent: 30 },
      { name: 'Chair', count: 120, percent: 30 },
      { name: 'Laptop', count: 150, percent: 30 },
      { name: 'Roller cabinet', count: 200, percent: 40 },
      { name: 'Visual Studio Licence', count: 250, percent: 50 },
      { name: 'Visual Studio Pro Licence', count: 200, percent: 10 },
      { name: 'Mouse', count: 260, percent: 20 },
      { name: 'Networking Equipment', count: 270, percent: 30 },
      { name: 'Server Maintenance', count: 100, percent: 20 },
      { name: 'Office Software Subscription', count: 150, percent: 30 },
      { name: 'Keyboard', count: 120, percent: 30 },
    ];

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

  localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';
  changeLayout(newValue: FlexibleColumnLayout): void {
    this.localLayout = newValue;
  }
}
