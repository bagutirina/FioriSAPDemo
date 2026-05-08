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
  get showOnlyHighlighted(): boolean {
    return this._showOnlyHighlighted;
  }
  set showOnlyHighlighted(value: boolean) {
    if (this._showOnlyHighlighted === value) return;
    this._showOnlyHighlighted = value;
    this.invalidateCache();
  }
  editingItem: { value: string } | null = null;
  editingValue = '';

  private _displayCache: { highlighted: boolean; data: CorrectionData } | null =
    null;
  private rowCache = new WeakMap<CorrectionTable, CorrectionTableCell[][]>();
  private colCache = new WeakMap<CorrectionTable, number[]>();

  get displayCorrectionData(): CorrectionData | undefined {
    if (!this.correctionData) return undefined;
    if (this._displayCache?.highlighted === this.showOnlyHighlighted) {
      return this._displayCache.data;
    }
    const data = this.showOnlyHighlighted
      ? this.buildFilteredData()
      : this.correctionData;
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
          fields: page.fields.filter((f) => f.highlighted),
          tables: page.tables.filter((table) =>
            table.rows.some((row) => row.some((cell) => cell.highlighted)),
          ),
        }))
        .filter((page) => page.fields.length > 0 || page.tables.length > 0),
    };
  }

  startEdit(item: { value: string }): void {
    if (this.editingItem === item) return;
    this.editingItem = item;
    this.editingValue = item.value;
    setTimeout(() => {
      const input =
        document.querySelector<HTMLInputElement>('.cell-edit-input');
      input?.focus();
      // input?.select();
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
    table.rows.push(
      table.columns.map(() => ({ value: '', highlighted: false })),
    );
    this.invalidateCache();
  }

  deleteRow(table: CorrectionTable, row: CorrectionTableCell[]): void {
    if (this.editingItem) this.cancelEdit();
    const index = table.rows.indexOf(row);
    if (index !== -1) table.rows.splice(index, 1);
    this.invalidateCache();
  }

  onCellKeydown(
    event: KeyboardEvent,
    pageIdx: number,
    tableIdx: number,
    rowIdx: number,
    visColIdx: number,
  ): void {
    if ((event.target as HTMLElement).tagName === 'INPUT') return;
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.navigate(pageIdx, tableIdx, rowIdx, visColIdx, 'right');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.navigate(pageIdx, tableIdx, rowIdx, visColIdx, 'left');
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigate(pageIdx, tableIdx, rowIdx, visColIdx, 'down');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigate(pageIdx, tableIdx, rowIdx, visColIdx, 'up');
        break;
      case 'Tab':
        this.navTabFromElement(event, `${pageIdx}-${tableIdx}`);
        break;
      case 'Enter':
      case 'F2':
        event.preventDefault();
        this.startEditAtPos(pageIdx, tableIdx, rowIdx, visColIdx);
        break;
    }
  }

  onInputKeydown(
    event: KeyboardEvent,
    pageIdx: number,
    tableIdx: number,
    rowIdx: number,
    visColIdx: number,
  ): void {
    event.stopPropagation();
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commitEdit();
      this.navigate(pageIdx, tableIdx, rowIdx, visColIdx, 'down');
    } else if (event.key === 'Tab') {
      this.commitEdit();
      this.navTabFromElement(event, `${pageIdx}-${tableIdx}`);
    } else if (event.key === 'Escape') {
      this.cancelEdit();
      this.focusCellAt(pageIdx, tableIdx, rowIdx, visColIdx);
    }
  }

  navigate(
    pageIdx: number,
    tableIdx: number,
    rowIdx: number,
    visColIdx: number,
    dir: 'right' | 'left' | 'up' | 'down' | 'next' | 'prev',
  ): void {
    const pages = this.displayCorrectionData?.pages ?? [];
    let p = pageIdx,
      t = tableIdx,
      r = rowIdx,
      c = visColIdx;

    const tbl = () => pages[p]?.tables[t];
    const numCols = () => this.getVisibleColumnIndices(tbl()!).length;
    const numRows = () => this.getDisplayRows(tbl()!).length;

    switch (dir) {
      case 'right':
        if (c < numCols() - 1) c++;
        break;
      case 'left':
        if (c > 0) c--;
        break;
      case 'down':
        if (r < numRows() - 1) r++;
        break;
      case 'up':
        if (r > 0) r--;
        break;
      case 'next':
        if (t < (pages[p]?.tables.length ?? 0) - 1) {
          t++;
          r = 0;
          c = 0;
        } else if (p < pages.length - 1) {
          p++;
          t = 0;
          r = 0;
          c = 0;
        } else return;
        break;
      case 'prev':
        if (t > 0) {
          t--;
          r = 0;
          c = 0;
        } else if (p > 0) {
          p--;
          t = (pages[p]?.tables.length ?? 1) - 1;
          r = 0;
          c = 0;
        } else return;
        break;
    }

    this.focusCellAt(p, t, r, c);
  }

  private startEditAtPos(
    pageIdx: number,
    tableIdx: number,
    rowIdx: number,
    visColIdx: number,
  ): void {
    const pages = this.displayCorrectionData?.pages;
    if (!pages) return;
    const tableRef = pages[pageIdx]?.tables[tableIdx];
    if (!tableRef) return;
    const rows = this.getDisplayRows(tableRef);
    const cols = this.getVisibleColumnIndices(tableRef);
    const cell = rows[rowIdx]?.[cols[visColIdx]];
    if (cell) this.startEdit(cell);
  }

  private focusCellAt(p: number, t: number, r: number, c: number): void {
    setTimeout(() => {
      document
        .querySelector<HTMLElement>(`[data-cell-pos="${p}-${t}-${r}-${c}"]`)
        ?.focus();
    });
  }

  onFieldKeydown(
    event: KeyboardEvent,
    field: { value: string },
    tableId?: string,
  ): void {
    if (event.key === 'Tab') {
      this.navTabFromElement(event, tableId ?? null);
    } else if (event.key === 'Enter' || event.key === 'F2') {
      event.preventDefault();
      this.startEdit(field);
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const groupId = (event.currentTarget as HTMLElement).dataset[
        'arrowGroup'
      ];
      if (groupId) {
        const group = Array.from(
          document.querySelectorAll<HTMLElement>(
            `[data-arrow-group="${groupId}"]`,
          ),
        );
        const idx = group.indexOf(event.currentTarget as HTMLElement);
        const next =
          event.key === 'ArrowDown' ? group[idx + 1] : group[idx - 1];
        next?.focus();
      }
    }
  }

  private navTabFromElement(
    event: KeyboardEvent,
    tableId: string | null,
  ): void {
    event.preventDefault();
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-item]'),
    );
    let refEl = event.currentTarget as HTMLElement;
    if (tableId) {
      refEl =
        document.querySelector<HTMLElement>(
          `[data-nav-item][data-nav-table="${tableId}"]`,
        ) ?? refEl;
    }
    const idx = items.indexOf(refEl);
    (event.shiftKey ? items[idx - 1] : items[idx + 1])?.focus();
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
