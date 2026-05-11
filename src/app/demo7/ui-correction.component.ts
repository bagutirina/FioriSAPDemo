import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UICorrectionStateService } from './ui-correction-state.service';
import { UICorrectionHelperService } from './ui-correction-helper.service';
import {
  CorrectionTableCell,
  CorrectionTable,
  CorrectionData,
  CorrectionPage,
  SourceRef,
} from './ui-correction.model';

@Component({
  selector: 'app-ui-correction',
  templateUrl: './ui-correction.component.html',
  styleUrls: ['./ui-correction.component.scss'],
})
export class UICorrectionComponent implements OnInit {
  correctionData!: CorrectionData;
  private exampleIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private state: UICorrectionStateService,
    private helper: UICorrectionHelperService,
  ) {}
  private _showOnlyHighlighted = false;
  get showOnlyHighlighted(): boolean {
    return this._showOnlyHighlighted;
  }
  set showOnlyHighlighted(value: boolean) {
    if (this._showOnlyHighlighted === value) return;
    const currentImage = this.currentPage?.image;
    this._showOnlyHighlighted = value;
    this.invalidateCache();
    const newIdx = currentImage
      ? (this.displayCorrectionData?.pages.findIndex(
          (p) => p.image === currentImage,
        ) ?? -1)
      : -1;
    this.currentPageIdx = newIdx >= 0 ? newIdx : 0;
  }

  get currentPage() {
    return this.displayCorrectionData?.pages[this.currentPageIdx];
  }

  get totalPages(): number {
    return this.displayCorrectionData?.pages.length ?? 0;
  }

  get realPageNumber(): number {
    const img = this.currentPage?.image;
    if (!img) return this.currentPageIdx + 1;
    return this.correctionData.pages.findIndex((p) => p.image === img) + 1;
  }

  get totalRealPages(): number {
    return this.correctionData?.pages.length ?? 0;
  }

  get pageDots(): Array<{
    hasAnomaly: boolean;
    isCurrent: boolean;
    navigable: boolean;
  }> {
    const currentImg = this.currentPage?.image;
    return (this.correctionData?.pages ?? []).map((page) => ({
      hasAnomaly: this.pageHasAnomalies(page),
      isCurrent: page.image === currentImg,
      navigable: !this.showOnlyHighlighted || this.pageHasAnomalies(page),
    }));
  }

  navigateToDot(realPageIdx: number): void {
    const realPage = this.correctionData?.pages[realPageIdx];
    if (!realPage) return;
    if (this.showOnlyHighlighted && !this.pageHasAnomalies(realPage)) return;
    const filteredIdx =
      this.displayCorrectionData?.pages.findIndex(
        (p) => p.image === realPage.image,
      ) ?? -1;
    if (filteredIdx === -1) return;
    this.cancelEdit();
    this.activeSourceRefs = null;
    this.currentPageIdx = filteredIdx;
  }

  private pageHasAnomalies(page: CorrectionPage): boolean {
    const isAnomaly = (item: {
      originalHighlighted: boolean;
      value: string;
      originalValue: string;
    }) => item.originalHighlighted && item.value === item.originalValue;
    return (
      page.fields.some(isAnomaly) ||
      page.tables.some((t) => t.rows.some((row) => row.some(isAnomaly)))
    );
  }

  prevPage(): void {
    if (this.currentPageIdx > 0) {
      this.currentPageIdx--;
      this.activeSourceRefs = null;
      this.cancelEdit();
    }
  }

  nextPage(): void {
    if (this.currentPageIdx < this.totalPages - 1) {
      this.currentPageIdx++;
      this.activeSourceRefs = null;
      this.cancelEdit();
    }
  }
  editingItem: { value: string } | null = null;
  editingValue = '';
  activeSourceRefs: SourceRef[] | null = null;
  currentPageIdx = 0;

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
      : table.rows.filter((row) =>
          row.some((c) => c.originalHighlighted && c.value === c.originalValue),
        );
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
        .filter((i) =>
          visibleRows.some((row) => {
            const c = row[i];
            return c?.originalHighlighted && c.value === c.originalValue;
          }),
        );
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

  get noAnomaliesMessage(): string | null {
    if (!this.showOnlyHighlighted) return null;
    if (this.helper.hasAnomalies(this.correctionData)) return null;
    return this.helper.hadOriginalAnomalies(this.exampleIndex)
      ? 'Keine Auffälligkeiten mehr vorhanden – alle wurden korrigiert.'
      : 'Keine Auffälligkeiten vorhanden.';
  }

  private buildFilteredData(): CorrectionData {
    const isAnomaly = (item: {
      originalHighlighted: boolean;
      value: string;
      originalValue: string;
    }) => item.originalHighlighted && item.value === item.originalValue;
    return {
      generalFields: this.correctionData.generalFields.filter(isAnomaly),
      pages: this.correctionData.pages
        .map((page) => ({
          ...page,
          fields: page.fields.filter(isAnomaly),
          tables: page.tables.filter((table) =>
            table.rows.some((row) => row.some(isAnomaly)),
          ),
        }))
        .filter((page) => page.fields.length > 0 || page.tables.length > 0),
    };
  }

  logBboxCoord(event: MouseEvent): void {
    // const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    // const x = +((event.clientX - rect.left) / rect.width).toFixed(4);
    // const y = +((event.clientY - rect.top) / rect.height).toFixed(4);
    // console.log(`bbox → x: ${x}, y: ${y}  |  { bbox: { x: ${x}, y: ${y}, width: 0.05, height: 0.02 } }`);
  }

  setActive(item: { sourceRefs?: SourceRef[] }): void {
    this.activeSourceRefs = item.sourceRefs?.length ? item.sourceRefs : null;
    if (this.activeSourceRefs?.length) {
      setTimeout(() => this.scrollToBbox());
    }
  }

  private scrollToBbox(): void {
    const container = document.querySelector<HTMLElement>('.content-right');
    const bboxEl = container?.querySelector<HTMLElement>('.bbox-highlight');
    if (!container || !bboxEl) return;
    const containerRect = container.getBoundingClientRect();
    const bboxRect = bboxEl.getBoundingClientRect();
    const bboxTopInScroll =
      bboxRect.top - containerRect.top + container.scrollTop;
    const bboxBottomInScroll =
      bboxRect.bottom - containerRect.top + container.scrollTop;
    const targetScroll =
      (bboxTopInScroll + bboxBottomInScroll) / 2 - container.clientHeight / 2;
    container.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  isHighlighted(item: {
    originalHighlighted: boolean;
    value: string;
    originalValue: string;
  }): boolean {
    const current = this.editingItem === item ? this.editingValue : item.value;
    return item.originalHighlighted && current === item.originalValue;
  }

  isEdited(item: { value: string; originalValue: string }): boolean {
    const current = this.editingItem === item ? this.editingValue : item.value;
    return current !== item.originalValue;
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
      const item = this.editingItem as { value: string };
      const valueChanged = item.value !== this.editingValue;
      item.value = this.editingValue;
      if (valueChanged) {
        this.invalidateCache();
        this.clampPageIdx();
      }
      this.editingItem = null;
    }
  }

  private clampPageIdx(): void {
    if (!this.showOnlyHighlighted) return;
    const total = this.totalPages;
    if (total > 0 && this.currentPageIdx >= total) {
      this.currentPageIdx = total - 1;
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  addRow(table: CorrectionTable): void {
    table.rows.push(
      table.columns.map(() => ({
        value: '',
        highlighted: false,
        originalValue: '',
        originalHighlighted: false,
      })),
    );
    this.invalidateCache();
  }

  deleteRow(table: CorrectionTable, row: CorrectionTableCell[]): void {
    if (this.editingItem) this.cancelEdit();
    const index = table.rows.indexOf(row);
    if (index !== -1) table.rows.splice(index, 1);
    this.invalidateCache();
    this.clampPageIdx();
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

  confirm(): void {
    if (this.editingItem) this.commitEdit();
    this.state.save(this.exampleIndex, this.correctionData);
    this.router.navigate(['/UICorrection']);
  }

  cancel(): void {
    this.editingItem = null;
    this.correctionData = this.helper.getCurrentVersion(this.exampleIndex);
    this.invalidateCache();
    this.router.navigate(['/UICorrection']);
  }

  ngOnInit(): void {
    this.exampleIndex = Number(this.route.snapshot.paramMap.get('index') ?? 0);
    this.correctionData = this.helper.getCurrentVersion(this.exampleIndex);
    if (this.route.snapshot.queryParamMap.get('highlighted') === 'true') {
      this._showOnlyHighlighted = true;
    }
  }
}
