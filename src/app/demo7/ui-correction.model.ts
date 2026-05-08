export interface CorrectionField {
  label: string;
  value: string;
  highlighted: boolean;
}

export interface CorrectionTableCell {
  value: string;
  highlighted: boolean;
}

export interface CorrectionColumn {
  value: string;
}

export interface CorrectionTable {
  columns: CorrectionColumn[];
  rows: CorrectionTableCell[][];
}

export interface CorrectionPage {
  image: string;
  fields: CorrectionField[];
  tables: CorrectionTable[];
}

export interface CorrectionData {
  generalFields: CorrectionField[];
  pages: CorrectionPage[];
}
