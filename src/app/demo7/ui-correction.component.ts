import { Component, OnInit } from '@angular/core';
import { uiCorrectionMockData } from './ui-correction.mock';

interface CorrectionField {
  label: string;
  value: string;
  highlighted: boolean;
}

interface CorrectionTableCell {
  value: string;
  highlighted: boolean;
}

interface CorrectionTable {
  columns: string[];
  rows: CorrectionTableCell[][];
}

interface CorrectionPage {
  image: string;
  fields: CorrectionField[];
  tables: CorrectionTable[];
}

interface CorrectionData {
  generalFields: CorrectionField[];
  pages: CorrectionPage[];
}

@Component({
  selector: 'app-ui-correction',
  templateUrl: './ui-correction.component.html',
  styleUrls: ['./ui-correction.component.scss'],
})
export class UICorrectionComponent implements OnInit {
  correctionData!: CorrectionData;
  showOnlyHighlighted = false;

  get displayCorrectionData(): CorrectionData | undefined {
    if (!this.correctionData || !this.showOnlyHighlighted) {
      return this.correctionData;
    }

    return {
      generalFields: this.correctionData.generalFields,
      pages: this.correctionData.pages
        .map((page) => ({
          ...page,

          // păstrăm mereu câmpurile informative ale paginii
          fields: page.fields,

          // filtrăm doar rows din tabele
          tables: page.tables
            .map((table) => ({
              ...table,
              rows: table.rows.filter((row) =>
                row.some((cell) => cell.highlighted),
              ),
            }))
            .filter((table) => table.rows.length > 0),
        }))
        .filter((page) => page.tables.length > 0),
    };
  }

  toggleView(): void {
    this.showOnlyHighlighted = !this.showOnlyHighlighted;
  }

  ngOnInit(): void {
    this.correctionData = this.mapMockData(uiCorrectionMockData);
  }

  private mapMockData(rawData: any): CorrectionData {
    return {
      generalFields: this.mapGeneralFields(rawData.general),
      pages: rawData.pages.map((page: any) => this.mapPage(page)),
    };
  }

  private mapGeneralFields(general: Record<string, string>): CorrectionField[] {
    return Object.entries(general).map(([label, value]) => ({
      label,
      value,
      highlighted: false,
    }));
  }

  private mapPage(page: any): CorrectionPage {
    const reservedKeys = ['image', 'tables'];

    const fields: CorrectionField[] = Object.entries(page)
      .filter(([key]) => !reservedKeys.includes(key))
      .map(([label, field]: [string, any]) => ({
        label,
        value: field.value,
        highlighted: field.highlight,
      }));

    return {
      image: `assets/ui-correction/${page.image}`,
      fields,
      tables: page.tables.map((table: any) => this.mapTable(table)),
    };
  }

  private mapTable(table: any): CorrectionTable {
    const columns = table.rows[0];
    const dataRows = table.rows.slice(1);

    const rows: CorrectionTableCell[][] = dataRows.map(
      (row: string[], rowIndex: number) =>
        row.map((value: string, cellIndex: number) => ({
          value,
          highlighted: table.highlights?.[rowIndex]?.[cellIndex] ?? false,
        })),
    );

    return {
      columns,
      rows,
    };
  }
}
