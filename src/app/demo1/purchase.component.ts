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
  categories,
  chartData,
  prices,
  products,
  warranties,
} from './purchase.data';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
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
export class PurchaseComponent {
  checkboxValue: boolean | null = false;
  hoveredRowIndex: any;
  searchText = '';
  ascending = false;
  sortByKey = '';
  products = products;
  chart: Chart | undefined;
  chartOptions: any;

  // filters
  vendors = Array.from(
    new Set(products.map((row) => row.vendor).filter((v) => v))
  );
  selectedVendor = [];
  warranties = warranties;
  selectedWarranties = [];
  materials = Array.from(
    new Set(products.map((row) => row.material).filter((v) => v))
  );
  selectedMaterials = [];
  prices = prices;
  selectedPrices = [];
  date: Nullable<FdDate> = FdDate.getNow();
  selectedRange: Nullable<DateRange<FdDate>>;
  selectedRow: any;
  suppliersOnCategories: any;

  user: ShellbarUser = {
    fullName: 'William Willson',
    colorAccent: 6,
    image: 'assets/images/user_Stefan.jpg',
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
              label: 'Overall Percentage Purchased',
              data: data.map((row) => row.percent),
              borderColor: 'red',
              yAxisID: 'yy',
              type: 'line',
            },
            {
              label: 'Amount Purchased',
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

  // Select all
  select(i: any): void {
    if (products[i].rowSpan) {
      products[i + 1].checked = !products[i + 1].checked;
    }
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
    products.forEach((row) => (row.checked = true));
  }
  private _deselectAll(): void {
    products.forEach((row) => (row.checked = false));
  }
  private _getSelectAllValue(): boolean | null {
    const checked = products.filter((row) => row.checked);
    if (checked.length === products.length) {
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
      data: products[index],
      ariaLabelledBy: 'fd-dialog-header-7',
      ariaDescribedBy: 'fd-dialog-body-7',
    });
  }

  layout: FlexibleColumnLayout = 'OneColumnStartFullScreen';
  changeLayout(newValue: FlexibleColumnLayout): void {
    this.layout = newValue;
  }

  // shellbar
  setGroupHovering(i: any, clear = false) {
    if (products[i].rowSpan) {
      products[i + 1].hovered = !clear;
    } else if (products[i].isRowSpanChild) {
      products[i - 1].hovered = !clear;
    }
  }

  prepareSuppliers() {
    this.suppliersOnCategories = categories
      .map((category) => {
        const filteredProducts = products.filter(
          (product) => product.checked && product.category === category.id
        );

        // Obținem produse unice după nume
        const uniqueProducts = Array.from(
          new Map(
            filteredProducts.map((product) => [product.name, product])
          ).values()
        );

        return {
          name: category.name,
          products: uniqueProducts.map((product) => product.name),
          suppliers: Array.from(
            new Map(
              uniqueProducts
                .flatMap((product) => product.suppliers || [])
                .map((supplier) => [supplier.name, supplier])
            ).values()
          ),
        };
      })
      .filter((category) => category.suppliers?.length);
  }
}
