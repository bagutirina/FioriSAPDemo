export const schadenfallData: any[] = [
  {
    fall: '334 ZZB: Hagelschaden Auto Feb 2025',
    antragsteller: 'Francesco Di Mascerazzi',
    policennummer: 'TNB - 3035 - 110B',
    schadenfallnummer: '334 ZZB',
    ort: 'Lingen',
    typ: 'Wetterschaden',
    summe: 800,
    datum: '2025-02-28',
    score: 72,
    status: 'In Bearbeitung',
    beurteilung: 'Offen',
    beteiligtePersonen: 'Georg Juelke',
    logischeInkonsistenzen: 72,
    zeitlicheInkonsistenzen: 21,
    ungewöhnlicheAngaben: 0,
    korrelationMitBetrugsfällen: 0,
    schadenshergang:
      'Ich hatte mein Auto draußen geparkt als es über Nacht gehagelt hatte. Die Nagelkörner haben die Windschutzscheibe und die Motorhaube stark beschädigt.',
    einschätzung:
      'Es wurden mehrere schwerwiegende Unstimmigkeiten zwischen der Benutzerbeschreibung und dem erkannten Schadensbild festgestellt. Die Art des Schadens, die Tageszeit des Vorfalls und der Umfang der Schäden stimmen nicht überein. Diese Diskrepanzen deuten auf eine mögliche betrügerische Aktivität hin und erfordern eine gründlichere Untersuchung.',
    image: 'image_1.png',
  },
  {
    fall: '118 BVR: Brandschaden Küche Jan 2025',
    antragsteller: 'Julia Meinhardt',
    policennummer: 'TNB - 9012 - 887D',
    schadenfallnummer: '118 BVR',
    ort: 'München',
    typ: 'Brandschaden',
    summe: 1450,
    datum: '2025-01-10',
    score: 84,
    status: 'Abgeschlossen',
    beurteilung: 'Geschlossen',
    beteiligtePersonen: 'Bagut Irina',
    logischeInkonsistenzen: 5,
    zeitlicheInkonsistenzen: 2,
    ungewöhnlicheAngaben: 1,
    korrelationMitBetrugsfällen: 0,
    schadenshergang:
      'Beim Kochen hat sich ein Tuch entzündet und das Feuer hat sich auf die Küchenzeile ausgebreitet.',
    einschätzung:
      'Die Beschreibung stimmt mit den festgestellten Brandspuren überein. Die Temperaturverläufe und der Brandschwerpunkt passen zum Bericht.',
    image: 'image_3.png',
  },
  {
    fall: '791 KLM: Einbruch Keller März 2025',
    antragsteller: 'Rainer Vogel',
    policennummer: 'TNB - 4509 - 776F',
    schadenfallnummer: '791 KLM',
    ort: 'Hamburg',
    typ: 'Einbruch',
    summe: 980,
    datum: '2025-03-12',
    score: 51,
    status: 'Abgelehnt',
    beteiligtePersonen: 'Georg Juelke',
    beurteilung: 'Offen',
    logischeInkonsistenzen: 18,
    zeitlicheInkonsistenzen: 12,
    ungewöhnlicheAngaben: 7,
    korrelationMitBetrugsfällen: 5,
    schadenshergang:
      'Der Keller wurde aufgebrochen, als ich nicht zu Hause war. Gestohlen wurden ein E-Bike und Werkzeuge.',
    einschätzung:
      'Beschädigung am Schloss vorhanden, aber Zeitpunkt unklar. Kameraaufzeichnung unvollständig.',
    auffalligkeiten:
      'Fehlende Meldung an Polizei.*Kein Kaufnachweis für das E-Bike beigelegt.',
  },
];

// summe range
export const betragsspanne = [
  'Unter 100 EUR',
  '100 - 1.000 EUR',
  '1.000 - 10.000 EUR',
  '10.000 - 100.000 EUR',
  'Über 100.000 EUR',
];

// score range
export const scoringbereich = [
  'Unter 20',
  '20 - 40',
  '40 - 60',
  '60 - 80',
  '80 - 90',
  'Über 90',
];
