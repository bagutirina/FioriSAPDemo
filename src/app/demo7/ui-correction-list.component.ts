import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { uiCorrectionMockData } from './ui-correction.mock';

@Component({
  selector: 'app-ui-correction-list',
  templateUrl: './ui-correction-list.component.html',
  styleUrls: ['./ui-correction-list.component.scss'],
})
export class UICorrectionListComponent {
  examples = uiCorrectionMockData.map((item, i) => ({
    index: i,
    belegart: item.general.Belegart.value,
    pageCount: item.pages.length,
    hasHighlights: item.pages.some((p: any) =>
      p.tables?.some((t: any) =>
        t.highlights?.some((row: boolean[]) => row.some(Boolean))
      ) || Object.entries(p)
        .filter(([k]) => k !== 'image' && k !== 'tables')
        .some(([, f]: [string, any]) => f.highlight)
    ),
  }));

  constructor(private router: Router) {}

  select(index: number): void {
    this.router.navigate(['/UICorrection', index]);
  }

  selectHighlighted(index: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/UICorrection', index], { queryParams: { highlighted: true } });
  }
}
