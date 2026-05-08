import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { uiCorrectionMockData } from './ui-correction.mock';
import { UICorrectionHelperService } from './ui-correction-helper.service';

@Component({
  selector: 'app-ui-correction-list',
  templateUrl: './ui-correction-list.component.html',
  styleUrls: ['./ui-correction-list.component.scss'],
})
export class UICorrectionListComponent implements OnInit {
  examples: Array<{
    index: number;
    belegart: string;
    pageCount: number;
    hasHighlights: boolean;
    hasEdits: boolean;
  }> = [];

  constructor(private router: Router, private helper: UICorrectionHelperService) {}

  ngOnInit(): void {
    this.examples = uiCorrectionMockData.map((_, i) => {
      const current = this.helper.getCurrentVersion(i);
      return {
        index: i,
        belegart: current.generalFields.find((f) => f.label === 'Belegart')?.value
          ?? uiCorrectionMockData[i].general.Belegart.value,
        pageCount: current.pages.length,
        hasHighlights: this.helper.hasAnomalies(current),
        hasEdits: this.helper.hasEdits(i),
      };
    });
  }

  select(index: number): void {
    this.router.navigate(['/UICorrection', index]);
  }

  selectHighlighted(index: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/UICorrection', index], { queryParams: { highlighted: true } });
  }
}
