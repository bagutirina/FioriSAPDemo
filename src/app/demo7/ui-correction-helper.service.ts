import { Injectable } from '@angular/core';
import { uiCorrectionMockData } from './ui-correction.mock';
import { UICorrectionStateService } from './ui-correction-state.service';
import {
  CorrectionData,
  CorrectionField,
  CorrectionPage,
  CorrectionTable,
  CorrectionTableCell,
  CorrectionColumn,
} from './ui-correction.model';

@Injectable({ providedIn: 'root' })
export class UICorrectionHelperService {
  constructor(private state: UICorrectionStateService) {}

  /** Returns saved version (deep clone) if it exists, otherwise a fresh mapped mock. */
  getCurrentVersion(index: number): CorrectionData {
    const saved = this.state.load(index);
    return saved ? structuredClone(saved) : this.mapMockItem(uiCorrectionMockData[index]);
  }

  /** True if any field/cell is still at its original anomalous value (not yet corrected). */
  hasAnomalies(data: CorrectionData): boolean {
    const isAnomaly = (item: { originalHighlighted: boolean; value: string; originalValue: string }) =>
      item.originalHighlighted && item.value === item.originalValue;
    return (
      data.generalFields.some(isAnomaly) ||
      data.pages.some(
        (page) =>
          page.fields.some(isAnomaly) ||
          page.tables.some((t) => t.rows.some((row) => row.some(isAnomaly))),
      )
    );
  }

  /** True if the original mock for this index had any anomalies (before any edits). */
  hadOriginalAnomalies(index: number): boolean {
    return this.hasAnomalies(this.mapMockItem(uiCorrectionMockData[index]));
  }

  /**
   * True if a saved version exists AND at least one value differs from the original mock.
   * Uses value comparison — does not rely on the `edited` flag.
   */
  hasEdits(index: number): boolean {
    const saved = this.state.load(index);
    if (!saved) return false;
    const original = this.mapMockItem(uiCorrectionMockData[index]);
    return this.dataDiffers(saved, original);
  }

  mapMockItem(raw: any): CorrectionData {
    return {
      generalFields: this.mapGeneralFields(raw.general),
      pages: raw.pages.map((page: any) => this.mapPage(page)),
    };
  }

  private mapGeneralFields(general: Record<string, any>): CorrectionField[] {
    return Object.entries(general).map(([label, field]) => ({
      label,
      value: field.value,
      highlighted: field.highlight ?? false,
      originalValue: field.value,
      originalHighlighted: field.highlight ?? false,
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
        originalValue: field.value,
        originalHighlighted: field.highlight ?? false,
      }));
    return {
      image: `assets/ui-correction/${page.image}`,
      fields,
      tables: page.tables.map((t: any) => this.mapTable(t)),
    };
  }

  private mapTable(table: any): CorrectionTable {
    const columns: CorrectionColumn[] = (table.rows[0] as string[]).map((v) => ({ value: v }));
    const dataRows = table.rows.slice(1);
    const rows: CorrectionTableCell[][] = dataRows.map(
      (row: string[], rowIndex: number) =>
        row.map((value: string, cellIndex: number) => ({
          value,
          highlighted: table.highlights?.[rowIndex]?.[cellIndex] ?? false,
          originalValue: value,
          originalHighlighted: table.highlights?.[rowIndex]?.[cellIndex] ?? false,
        })),
    );
    return { columns, rows };
  }

  private dataDiffers(saved: CorrectionData, original: CorrectionData): boolean {
    if (saved.generalFields.length !== original.generalFields.length) return true;
    if (saved.generalFields.some((f, i) => f.value !== original.generalFields[i].value)) return true;

    if (saved.pages.length !== original.pages.length) return true;
    return saved.pages.some((page, pi) => {
      const origPage = original.pages[pi];
      if (page.fields.length !== origPage.fields.length) return true;
      if (page.fields.some((f, fi) => f.value !== origPage.fields[fi].value)) return true;
      if (page.tables.length !== origPage.tables.length) return true;
      return page.tables.some((t, ti) => {
        const origTable = origPage.tables[ti];
        if (t.rows.length !== origTable.rows.length) return true;
        return t.rows.some((row, ri) =>
          row.some((cell, ci) => cell.value !== origTable.rows[ri]?.[ci]?.value),
        );
      });
    });
  }
}
