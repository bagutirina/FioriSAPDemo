export const compainSDKData: any[] = [
  {
    timestamp: '6/19/2025',
    metadata: {
      patient_name: 'Max Mustermann',
      gender: 'Männlich',
      date_of_birth: '12-12-1997',
      document_date: '6/19/2025',
      occupation: 'Student',
      contract_types: ['RZ A', 'Tarif SG/10'],
    },
    icds: [
      {
        icd_code: 'E66',
        highlighted: true,
        name: 'Adipositas durch übermäßige Kalorienzufuhr',
        evidence: [
          '* Der Patient weist eine deutliche positive Energiebilanz bei gleichzeitigem Bewegungsmangel auf.',
          '* Kein Hinweis auf endokrine oder genetische Ursachen – primär kalorienbedingte Gewichtszunahme.',
          '* BMI von 34,2 kg/m², entsprechende Befunde sprechen für eine alimentäre Adipositas.',
        ],
        priority: 'Primary',
        justification:
          'Die Berichte deuten darauf hin, dass die Gewichtszunahme des Patienten vor allem durch eine chronisch positive Energiebilanz – also eine übermäßige Kalorienzufuhr bei gleichzeitig geringem Energieverbrauch – verursacht wird. Da keine Hinweise auf endokrine oder genetische Ursachen vorliegen, spricht dies für eine alimentäre Adipositas, bei der Überernährung der Hauptfaktor ist. Der BMI von 34,2 kg/m² bestätigt das Vorliegen von Adipositas gemäß der Klassifikation E66.',
      },
      {
        icd_code: 'J45',
        name: 'Asthma bronchiale',
        evidence: [
          '* In der Auskultation beidseits exspiratorisches Giemen, vereinbar mit einer obstruktiven Ventilationsstörung.',
          '* Es besteht eine bekannte Asthma bronchiale-Diagnose seit dem Kindesalter mit regelmäßiger inhalativer Therapie.',
          '* Im Rahmen einer allergischen Exposition kam es zu einem akuten Asthmaanfall mit Dyspnoe und Hustenreiz.',
        ],
        priority: 'Secondary',
        justification:
          'Die Befunde wie exspiratorisches Giemen und obstruktive Ventilationsstörung in der Auskultation sind typische Zeichen einer Atemwegsobstruktion bei Asthma bronchiale. Die bestehende Diagnose seit dem Kindesalter sowie das Auftreten eines akuten Asthmaanfalls nach allergischer Exposition bestätigen den chronisch-entzündlichen Charakter der Erkrankung. Zusammen mit den Symptomen Dyspnoe und Hustenreiz sprechen diese Befunde klar für die Diagnose J45 – Asthma bronchiale.',
      },
      {
        icd_code: 'S62.50',
        name: 'Fraktur des Daumens, Teil nicht näher bezeichnet',
        evidence: [
          '* Klinisch bestehen Druckschmerz und Krepitation im Daumengrundglied, der genaue Frakturverlauf ist noch abzuklären.',
          '* Im Röntgenbild zeigte sich eine Fraktur im Bereich des Daumenskeletts',
        ],
        priority: 'Secondary',
        justification:
          'Die klinischen Symptome wie Druckschmerz und Krepitation im Daumengrundglied deuten auf eine knöcherne Verletzung hin, die durch das Röntgenbild bestätigt wird. Die Fraktur im Bereich des Daumenskeletts ohne genauere Lokalisation spricht für eine Daumenfraktur, deren genaue Ausdehnung noch abgeklärt werden muss. Diese Befunde sind typisch für die Diagnose S62.50 – Fraktur des Daumens, Teil nicht näher bezeichnet.',
      },
    ],
    rejections: [],
    score: '47%',
    evaluation: 'Mit Aufschlag anbieten',
    status: 'Abgeschlossen',
  },
  {
    timestamp: '6/12/2025',
    metadata: {
      patient_name: 'Martina Expemplario',
      gender: 'Weiblich',
      date_of_birth: '08-21-1988',
      document_date: '6/12/2025',
      occupation: 'Software Developer',
      contract_types: ['RZ A', 'Tarif WG', 'KVS3/EKV2'],
    },
    icds: [
      {
        icd_code: 'S93',
        name: 'Verstauchung und Zerrung einer oder mehrerer Zehen',
        evidence: [
          '* Klinisch zeigt sich eine deutliche Druckempfindlichkeit über dem Grundgelenk der zweiten Zehe, kein Hinweis auf Fraktur im Röntgenbild.',
          '* Die Untersuchung ergab eine Zerrung der Kapselbandstrukturen an der Zehengrundgelenksregion mit eingeschränkter Beweglichkeit.',
        ],
        priority: 'Primary',
        justification:
          'Die beschriebenen Befunde – insbesondere die Druckempfindlichkeit über dem Grundgelenk der zweiten Zehe und die Zerrung der Kapselbandstrukturen bei fehlendem Frakturnachweis im Röntgen – sprechen für eine Verstauchung oder Zerrung der Zehe. Die eingeschränkte Beweglichkeit bestätigt zudem die funktionelle Beeinträchtigung typischerweise bei einer solchen Weichteilverletzung. Somit passen die klinischen und bildgebenden Befunde gut zur Diagnose S93.',
      },
      {
        icd_code: 'L84',
        name: 'Hühneraugen und Horn- (Haut-) Schwielen',
        evidence: [
          '* Der Patient klagt über lokale Druckschmerzen beim Gehen, verursacht durch eine ausgeprägte Schwielenbildung an der lateralen Fußkante.',
          '* Typische Hyperkeratosen mit zentralem Hornkegel im Bereich der plantaren Vorfußregion sprechen für ein Hühnerauge.',
        ],
        priority: 'Secondary',
        justification:
          'Die beschriebenen lokalen Druckschmerzen und die ausgeprägte Schwielenbildung an der Fußkante deuten auf eine chronische mechanische Reizung hin, die typisch für Hornhautverdickungen ist. Die charakteristischen Hyperkeratosen mit zentralem Hornkegel im Bereich des Vorfußes sind ein typisches Merkmal von Hühneraugen (Clavi). Diese klinischen Zeichen sprechen somit eindeutig für die Diagnose L84 – Hühneraugen und Hornschwielen.',
      },
    ],
    rejections: [],
    score: '97%',
    evaluation: 'Unkritisch',
    status: 'Abgeschlossen',
  },
  {
    timestamp: '6/12/2025',
    metadata: {
      patient_name: 'Martha Beih-Spiel',
      gender: 'Weiblich',
      date_of_birth: '06-03-1950',
      document_date: '6/12/2025',
      occupation: 'Rentner',
      contract_types: ['RZ A', 'RZ TA', 'KVS3/EKV2'],
    },
    icds: [
      {
        icd_code: 'S70.0',
        name: 'Prellung der Hüfte',
        evidence: [
          '* Der Patient berichtet über einen Sturz auf die linke Körperseite mit anschließenden Schmerzen im Bereich der Hüfte.',
          '* Es zeigt sich ein ausgedehntes Hämatom über dem Trochanter major bei intaktem Knochenstatus.',
          '* Sonografisch keine Gelenkbeteiligung, jedoch deutliche Weichteilschwellung im Bereich der lateralen Hüfte.',
        ],
        priority: 'Secondary',
        justification:
          'Die berichteten Schmerzen nach einem Sturz auf die Hüfte sowie das ausgedehnte Hämatom über dem Trochanter major sprechen für eine Weichteilverletzung ohne Knochenbeteiligung. Der intakte Knochenstatus im Röntgenbild und die sonografisch nachgewiesene Weichteilschwellung ohne Gelenkbeteiligung bestätigen das Bild einer Prellung der Hüfte. Diese Befunde sind typisch für die Diagnose S70.0 – Prellung der Hüfte.',
      },
      {
        icd_code: 'L40',
        name: 'Psoriasis',
        evidence: [
          '* Dermatohistologisch zeigt sich eine Akanthose mit Parakeratose, vereinbar mit einer Psoriasis vulgaris.',
          '* Die Familienanamnese ist positiv für Psoriasis, erste Symptome traten im dritten Lebensjahrzehnt auf.',
        ],
        priority: 'Secondary',
        justification:
          'Die dermatohistologischen Befunde mit Akanthose und Parakeratose sind charakteristisch für die Psoriasis vulgaris und bestätigen die klinische Diagnose. Zudem spricht die positive Familienanamnese zusammen mit dem typischen Erkrankungsbeginn im dritten Lebensjahrzehnt für eine genetisch und immunologisch bedingte Psoriasis. Diese Merkmale unterstützen somit eindeutig die Diagnose L40 – Psoriasis.',
      },
    ],
    rejections: [
      {
        icd_code: 'I74',
        name: 'Arterielle Embolie und Thrombose',
        evidence: [
          '* Die Duplexsonographie zeigte eine frische Thrombose der A. femoralis superficialis mit fehlender Flusskontinuität.',
        ],
        priority: 'Primary',
        justification:
          'Die Duplexsonographie weist auf eine frische Thrombose der A. femoralis superficialis hin, was eine akute Verschlusserscheinung der Arterie durch ein Blutgerinnsel darstellt. Die fehlende Flusskontinuität bestätigt den Verschluss der Gefäßlumen, was typisch für eine arterielle Thrombose oder Embolie ist. Diese Befunde sprechen somit klar für die Diagnose I74 – arterielle Embolie und Thrombose.',
      },
      {
        icd_code: 'G30',
        name: 'Alzheimer-Krankheit',
        evidence: [
          '* Die Patientin zeigt eine progrediente Gedächtnisstörung mit Orientierungsproblemen im Alltag, typisch für eine demenzielle Entwicklung.',
          '* In der neuropsychologischen Testung zeigten sich deutliche Defizite im Kurzzeitgedächtnis, in der Wortflüssigkeit und im logischen Denken.',
        ],
        priority: 'Secondary',
        justification:
          'Die progrediente Gedächtnisstörung und die Orientierungsprobleme im Alltag sind charakteristische Symptome einer demenziellen Erkrankung wie der Alzheimer-Krankheit. Die neuropsychologischen Testungen, die Defizite im Kurzzeitgedächtnis, der Wortflüssigkeit und im logischen Denken zeigen, unterstützen diese Diagnose zusätzlich. Diese Befunde passen somit gut zum klinischen Bild der Alzheimer-Krankheit (G30).',
      },
    ],
    score: '0%',
    evaluation: 'Abzulehnen',
    status: 'Abgelehnt',
  },
];

// score range
export const scores = [
  'Unter 20',
  '20 - 40',
  '40 - 60',
  '60 - 80',
  '80 - 90',
  'Über 90',
];

export const statuses = [
  'Offen',
  'In Bearbeitung',
  'Abgeschlossen',
  'Abgelehnt',
];
