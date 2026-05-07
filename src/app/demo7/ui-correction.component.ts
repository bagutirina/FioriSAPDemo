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

interface CorrectionColumn {
  value: string;
}

interface CorrectionTable {
  columns: CorrectionColumn[];
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
  private _showOnlyHighlighted = false;
  get showOnlyHighlighted(): boolean { return this._showOnlyHighlighted; }
  set showOnlyHighlighted(value: boolean) {
    if (this._showOnlyHighlighted === value) return;
    this._showOnlyHighlighted = value;
    this.invalidateCache();
  }
  editingItem: { value: string } | null = null;
  editingValue = '';

  private _displayCache: { highlighted: boolean; data: CorrectionData } | null = null;
  private rowCache = new WeakMap<CorrectionTable, CorrectionTableCell[][]>();
  private colCache = new WeakMap<CorrectionTable, number[]>();

  get displayCorrectionData(): CorrectionData | undefined {
    if (!this.correctionData) return undefined;
    if (this._displayCache?.highlighted === this.showOnlyHighlighted) {
      return this._displayCache.data;
    }
    const data = this.showOnlyHighlighted ? this.buildFilteredData() : this.correctionData;
    this._displayCache = { highlighted: this.showOnlyHighlighted, data };
    return data;
  }

  getDisplayRows(table: CorrectionTable): CorrectionTableCell[][] {
    if (this.rowCache.has(table)) return this.rowCache.get(table)!;
    const rows = !this.showOnlyHighlighted
      ? table.rows
      : table.rows.filter((row) => row.some((cell) => cell.highlighted));
    this.rowCache.set(table, rows);
    return rows;
  }

  getVisibleColumnIndices(table: CorrectionTable): number[] {
    if (this.colCache.has(table)) return this.colCache.get(table)!;
    let indices: number[];
    if (!this.showOnlyHighlighted) {
      indices = table.columns.map((_, i) => i);
    } else {
      const visibleRows = this.getDisplayRows(table);
      indices = table.columns
        .map((_, i) => i)
        .filter((i) => visibleRows.some((row) => row[i]?.highlighted));
    }
    this.colCache.set(table, indices);
    return indices;
  }

  trackByIndex(index: number, _item: any): number {
    return index;
  }

  private invalidateCache(): void {
    this._displayCache = null;
    this.rowCache = new WeakMap();
    this.colCache = new WeakMap();
  }

  private buildFilteredData(): CorrectionData {
    return {
      generalFields: this.correctionData.generalFields,
      pages: this.correctionData.pages
        .map((page) => ({
          ...page,
          tables: page.tables.filter((table) =>
            table.rows.some((row) => row.some((cell) => cell.highlighted)),
          ),
        }))
        .filter((page) => page.tables.length > 0),
    };
  }



  startEdit(item: { value: string }): void {
    if (this.editingItem === item) return;
    this.editingItem = item;
    this.editingValue = item.value;
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.cell-edit-input');
      input?.focus();
      input?.select();
    });
  }

  commitEdit(): void {
    if (this.editingItem) {
      this.editingItem.value = this.editingValue;
      this.editingItem = null;
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  addRow(table: CorrectionTable): void {
    table.rows.push(table.columns.map(() => ({ value: '', highlighted: false })));
    this.invalidateCache();
  }

  deleteRow(table: CorrectionTable, row: CorrectionTableCell[]): void {
    if (this.editingItem) this.cancelEdit();
    const index = table.rows.indexOf(row);
    if (index !== -1) table.rows.splice(index, 1);
    this.invalidateCache();
  }

  confirm(): void {}

  cancel(): void {
    this.editingItem = null;
    this.correctionData = this.mapMockData(uiCorrectionMockData);
    this.invalidateCache();
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
    const columns: CorrectionColumn[] = (table.rows[0] as string[]).map(
      (v) => ({ value: v }),
    );
    const dataRows = table.rows.slice(1);

    const rows: CorrectionTableCell[][] = dataRows.map(
      (row: string[], rowIndex: number) =>
        row.map((value: string, cellIndex: number) => ({
          value,
          highlighted: table.highlights?.[rowIndex]?.[cellIndex] ?? false,
        })),
    );

    return { columns, rows };
  }
}
