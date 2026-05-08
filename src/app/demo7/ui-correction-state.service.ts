import { Injectable } from '@angular/core';
import { CorrectionData } from './ui-correction.model';

@Injectable({ providedIn: 'root' })
export class UICorrectionStateService {
  private store = new Map<number, CorrectionData>();

  save(index: number, data: CorrectionData): void {
    this.store.set(index, data);
  }

  load(index: number): CorrectionData | null {
    return this.store.get(index) ?? null;
  }

  clear(index: number): void {
    this.store.delete(index);
  }
}
