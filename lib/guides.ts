// Ratgeber-Artikel (SEO-Content). Bewusst als Daten gepflegt, damit neue
// Artikel ohne Code-Kenntnisse ergänzt werden können. Jeder Abschnitt kann
// Fließtext, Duft-Paare (teuer -> günstig) oder eine Duftliste enthalten.
// Duft-Verweise erfolgen über den slug aus der perfumes-Tabelle.

export type GuidePairing = { expensive: string; cheap: string; note: string };

export type GuideSection = {
  heading?: string;
  body?: string[];
  pairings?: GuidePairing[];
  perfumes?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: 'guenstige-alternativen-zu-teuren-dueften',
    title: 'Günstige Alternativen zu teuren Parfüms: die besten Dupes',
    description:
      'Teure Düfte wie Creed Aventus haben oft günstige Alternativen, die erstaunlich ähnlich riechen. Hier die besten Spar-Tipps aus unserem Duftkatalog.',
    intro: [
      'Ein sogenanntes „Dupe" ist ein günstiger Duft, der einem teuren Original in der Richtung sehr nahekommt. Gerade in der Schweiz lohnt sich der Blick auf solche Alternativen: ähnlicher Duft, deutlich kleinerer Preis.',
      'Wichtig ehrlich gesagt: Ein Dupe ist nie zu 100 % identisch und hält manchmal etwas kürzer. Aber für den Alltag sind viele Alternativen verblüffend gut – und du sparst oft über 200 Franken.'
    ],
    sections: [
      {
        heading: 'Die besten Duft-Paare: teuer und die günstige Alternative',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Club de Nuit Intense Man von Armaf gilt als die bekannteste günstige Alternative zu Creed Aventus – fruchtig-rauchig mit Ananas und Birke, für einen Bruchteil des Preises.'
          },
          {
            expensive: 'armani-acqua-di-gio-homme',
            cheap: 'davidoff-cool-water',
            note: 'Du magst die frische, aquatische Richtung von Acqua di Gio? Davidoff Cool Water bietet eine ähnlich sommertaugliche Frische – ein echter Klassiker zum kleinen Preis.'
          },
          {
            expensive: 'ysl-black-opium',
            cheap: 'ariana-cloud',
            note: 'Für die süße, gourmandige Richtung von Black Opium ist Ariana Grande Cloud eine günstige, kuschelige Alternative mit Praline und Vanille.'
          },
          {
            expensive: 'tobacco-vanille',
            cheap: 'khamrah',
            note: 'Tom Ford Tobacco Vanille ist würzig-süß und teuer. Lattafa Khamrah geht in eine ähnlich warme, süß-würzige Richtung mit Dattel und Zimt – zum Sparpreis.'
          }
        ]
      },
      {
        body: [
          'Mein Tipp: Mach zuerst unser Duft-Quiz, um deine Richtung herauszufinden. Danach findest du auf jeder Duftseite unter „Riecht ähnlich wie …" automatisch weitere passende Alternativen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte',
    title: 'Die besten Sommerdüfte: frisch & leicht für heiße Tage',
    description:
      'Frische, leichte Düfte für den Sommer: aquatisch, zitrisch und unbeschwert. Unsere Empfehlungen für warme Tage – für Damen, Herren und Unisex.',
    intro: [
      'Im Sommer dürfen Düfte leicht, frisch und nicht zu schwer sein. Zitrus, aquatische Noten und ein Hauch Salz wirken bei Hitze am besten und überladen nicht.',
      'Hier unsere Empfehlungen aus dem Katalog – von günstig bis edel.'
    ],
    sections: [
      {
        perfumes: [
          'davidoff-cool-water',
          'armani-acqua-di-gio-homme',
          'dolce-gabbana-light-blue',
          'jo-malone-wood-sage-sea-salt',
          'orto-megamare',
          'versace-dylan-blue',
          'allure-homme-sport',
          'invictus'
        ]
      },
      {
        heading: 'Worauf du bei Sommerdüften achten solltest',
        body: [
          'Bei Hitze wirkt ein Duft viel intensiver als im Winter – weniger ist also mehr. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Leichte Konzentrationen (Eau de Toilette) und frische Familien (Zitrus, aquatisch, grüner Tee) sind angenehmer als schwere, süsse Düfte.',
          'Frische Düfte verfliegen schneller – ein kleiner Reisezerstäuber für die Tasche hilft, am Nachmittag kurz nachzulegen.',
          'Tagsüber und im Büro gilt: lieber dezent. Schwere Abenddüfte können bei Hitze schnell aufdringlich wirken.'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Welcher Duft passt zu welchem Anlass?',
    description:
      'Büro, Date oder Abend – nicht jeder Duft passt überall. So findest du den richtigen Duft für Alltag, Date und besondere Abende.',
    intro: [
      'Der gleiche Duft wirkt im Büro anders als beim Date. Als Faustregel gilt: tagsüber dezent und sauber, abends darf es wärmer und intensiver sein.',
      'Hier passende Empfehlungen für die drei häufigsten Anlässe.'
    ],
    sections: [
      {
        heading: 'Für Alltag & Büro: dezent und gepflegt',
        body: ['Frisch, sauber und nicht zu aufdringlich – damit liegst du im Büro immer richtig.'],
        perfumes: ['chanel-bleu-de-chanel', 'terre-dhermes', 'boss-bottled', 'ysl-y-edp', 'le-labo-santal-33']
      },
      {
        heading: 'Für Dates: charmant und anziehend',
        body: ['Etwas süßer, wärmer oder blumiger – Düfte, die in Erinnerung bleiben.'],
        perfumes: ['ysl-black-opium', 'coco-mademoiselle', 'lancome-la-vie-est-belle', 'versace-eros', 'pdm-delina']
      },
      {
        heading: 'Für besondere Abende: intensiv und edel',
        body: ['Hier dürfen die großen, tiefen Düfte ran – mit Projektion und Charakter.'],
        perfumes: ['creed-aventus', 'tobacco-vanille', 'mugler-angel', 'tom-ford-oud-wood', 'baccarat-rouge-540']
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süße Düfte: Vanille, Schokolade & Karamell',
    description:
      'Warme, süße Gourmand-Düfte mit Vanille, Schokolade, Karamell und Tonkabohne – kuschelig, sinnlich und perfekt für kühle Tage.',
    intro: [
      'Süße Düfte – auch Gourmands genannt – riechen nach guten Dingen: Vanille, Schokolade, Karamell, Praline oder Kaffee. Sie wirken warm, einladend und bleiben angenehm in Erinnerung.',
      'Hier unsere süßesten Empfehlungen aus dem Katalog – von günstig bis edel.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'montale-intense-cafe',
          'khamrah',
          'mugler-angel',
          'burberry-goddess',
          'kilian-angels-share',
          'lattafa-yara'
        ]
      },
      {
        heading: 'Worauf du bei süssen Düften achten solltest',
        body: [
          'Süsse Gourmand-Düfte sind oft sehr präsent – ein bis zwei Sprühstösse reichen, sonst wirken sie schnell zu schwer.',
          'Am schönsten kommen sie in der kühlen Jahreszeit und am Abend zur Geltung; bei grosser Hitze können sie aufdringlich werden.',
          'Tipp: Wer es süss, aber alltagstauglich mag, greift zu Varianten mit etwas Frische oder Holz – sie wirken weniger „dessertartig".'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: warm, intensiv & einhüllend',
    description:
      'Wärmende Düfte für Herbst und Winter: Oud, Amber, Vanille und Gewürze, die bei Kälte besonders schön zur Geltung kommen.',
    intro: [
      'Im Winter darf ein Duft schwerer und wärmer sein. Holz, Amber, Oud, Gewürze und süße Noten entfalten sich bei Kälte besonders gut und hüllen dich angenehm ein.',
      'Diese Düfte sind wie gemacht für die kalte Jahreszeit.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'tom-ford-oud-wood',
          'baccarat-rouge-540',
          'mugler-angel',
          'nasomatto-black-afgano',
          'initio-oud-greatness',
          'xerjoff-naxos',
          'lattafa-asad'
        ]
      },
      {
        heading: 'Worauf du bei Winterdüften achten solltest',
        body: [
          'In der Kälte darf ein Duft kräftiger sein – warme Noten wie Vanille, Amber, Oud und Gewürze entfalten sich bei niedrigen Temperaturen besonders schön.',
          'Höhere Konzentrationen (Eau de Parfum oder Extrait) lohnen sich, weil sie länger halten und mehr Tiefe haben.',
          'Auf der Haut hält ein Duft im Winter oft länger als im Sommer – an kalter Luft braucht er aber einen kurzen Moment, um sich zu entfalten.',
          'Tipp: Eincremen vor dem Sprühen hilft gerade im Winter gegen trockene Heizungsluft, die den Duft schneller verfliegen lässt.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Die besten Unisex-Düfte: für alle gemacht',
    description:
      'Düfte ohne Geschlecht: vielseitige Unisex-Parfüms, die an jedem gut riechen – von frisch bis warm-holzig.',
    intro: [
      'Unisex-Düfte sind nicht auf Damen oder Herren festgelegt – sie passen einfach zu dir, egal wer du bist. Oft sind es vielseitige, ausgewogene Kompositionen.',
      'Hier unsere Lieblinge zum Teilen oder einfach für jeden Geschmack.'
    ],
    sections: [
      {
        perfumes: [
          'baccarat-rouge-540',
          'le-labo-santal-33',
          'byredo-gypsy-water',
          'tobacco-vanille',
          'kilian-angels-share',
          'orto-megamare',
          'mancera-cedrat-boise',
          'nishane-ani'
        ]
      },
      {
        heading: 'Was macht einen Unisex-Duft aus?',
        body: [
          'Unisex-Düfte verzichten auf typisch „weibliche" oder „männliche" Klischees und setzen auf ausgewogene, vielseitige Kompositionen – oft holzig, frisch oder leicht orientalisch.',
          'Sie eignen sich perfekt zum Teilen im Haushalt und für alle, die sich nicht festlegen wollen.',
          'Tipp: Ignorier beim Testen ruhig die „Damen-" und „Herren-"Schilder – entscheidend ist allein, ob der Duft auf deiner Haut schön riecht.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-inhaltsstoffe-allergene',
    title: 'Parfum-Inhaltsstoffe & Allergene einfach erklärt',
    description:
      'Was steckt eigentlich in einem Parfum? Alkohol, Duftöl und die 26 EU-Allergene wie Limonene und Linalool – einfach und verständlich erklärt.',
    intro: [
      'Auf jeder Parfumverpackung steht eine Liste mit Inhaltsstoffen – oft mit lateinischen Namen, die etwas einschüchternd wirken. Dabei steckt dahinter kein Hexenwerk. Hier erklären wir dir einfach, was wirklich drin ist und worauf empfindliche Haut achten sollte.',
      'Wichtig vorweg: Die genaue Zusammensetzung ist von Duft zu Duft unterschiedlich und kann sich ändern. Die vollständige, gültige Liste findest du immer auf der Verpackung bzw. beim Hersteller. Dieser Artikel erklärt das Allgemeine.'
    ],
    sections: [
      {
        heading: 'Woraus besteht ein Parfum grundsätzlich?',
        body: [
          'Ein Parfum besteht im Kern aus nur drei Hauptbestandteilen:',
          '1. Alkohol (auf der Liste „Alcohol Denat." oder „Alcohol"): Das Trägermittel, das den Duft verteilt und schnell verdunsten lässt. Er macht meist den grössten Anteil aus.',
          '2. Wasser (Aqua): Sorgt für die richtige Konsistenz.',
          '3. Duftöl (Parfum / Fragrance): Die eigentliche Duftmischung aus vielen einzelnen Riechstoffen – das Herzstück, das den Charakter ausmacht.'
        ]
      },
      {
        heading: 'Warum steht da nur „Parfum" und keine genaue Mischung?',
        body: [
          'Die genaue Duftformel ist ein gut gehütetes Betriebsgeheimnis der Hersteller. Deshalb darf die Mischung der Riechstoffe gesammelt als „Parfum" oder „Fragrance" angegeben werden – sonst könnte jeder den Duft einfach nachbauen.',
          'Genau deshalb arbeiten wir auf Auressa mit Duftnoten (z. B. Bergamotte, Vanille, Sandelholz): Sie beschreiben, wie ein Duft riecht und wirkt – das ist für dich viel hilfreicher als eine Chemie-Liste.'
        ]
      },
      {
        heading: 'Die 26 Allergene: Limonene, Linalool & Co.',
        body: [
          'Bestimmte natürliche Duftbestandteile können bei empfindlichen Menschen Hautreaktionen auslösen. In der EU (und in der Schweiz angelehnt) müssen 26 solcher Stoffe ab einer gewissen Menge einzeln genannt werden – deshalb tauchen sie auf der Liste auf.',
          'Die häufigsten sind: Limonene (zitrusartig), Linalool (blumig, in Lavendel), Citronellol und Geraniol (rosig), Eugenol (würzig, Nelke), Coumarin (heuartig, süsslich) und Citral.',
          'Wichtig: Diese Stoffe sind nicht „schlecht" – sie stecken auch in vielen natürlichen Ölen und Blüten. Sie werden nur aufgelistet, damit Allergikerinnen und Allergiker sie erkennen können.'
        ]
      },
      {
        heading: 'Tipps bei empfindlicher Haut',
        body: [
          'Sprüh den Duft auf Kleidung statt direkt auf gereizte Hautstellen.',
          'Teste neue Düfte zuerst an einer kleinen Stelle (z. B. Armbeuge) und warte einen Tag.',
          'Achte bei bekannter Allergie gezielt auf den entsprechenden Stoff in der Inhaltsliste auf der Verpackung.',
          'Weniger ist mehr: 1–2 Sprühstösse reichen meist völlig.'
        ]
      },
      {
        heading: 'Bonus: EdT, EdP oder Parfum – was ist der Unterschied?',
        body: [
          'Der Unterschied liegt in der Konzentration des Duftöls:',
          'Eau de Toilette (EdT): leichter, frischer, hält kürzer – ideal für den Sommer und tagsüber.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langanhaltender – der häufigste Typ.',
          'Parfum / Extrait: am intensivsten und teuersten, hält am längsten – schon wenig genügt.'
        ]
      },
      {
        body: [
          'Mein Tipp: Wenn du wissen willst, welche Duftrichtung zu dir passt, mach unser Duft-Quiz – danach zeigen wir dir die passenden Düfte samt Noten, Saison und Anlass.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-duefte-unter-50-franken',
    title: 'Die besten Düfte unter 50 Franken',
    description:
      'Gut riechen muss nicht teuer sein: Unsere Lieblingsdüfte für unter CHF 50 – von frisch bis süss, für Damen, Herren und Unisex.',
    intro: [
      'Ein toller Duft muss nicht 150 Franken kosten. Gerade von Marken wie Lattafa, Armaf oder Davidoff gibt es erstaunlich gute Parfüms für kleines Geld.',
      'Hier unsere Favoriten unter CHF 50 – perfekt zum Ausprobieren, Verschenken oder für jeden Tag.'
    ],
    sections: [
      {
        perfumes: [
          'khamrah',
          'lattafa-asad',
          'club-de-nuit-intense',
          'davidoff-cool-water',
          'lattafa-yara',
          'joop-homme',
          'sdj-cheirosa-62',
          'tabac-original'
        ]
      },
      {
        heading: 'Worauf du bei günstigen Düften achten solltest',
        body: [
          'Günstig heisst nicht schlechter: Gerade arabische Marken wie Lattafa und Armaf bieten erstaunliche Haltbarkeit und Projektion für wenig Geld.',
          'Achte auf die Variante: Oft gibt es bei diesen Marken direkt das intensivere Eau de Parfum – mehr Tiefe und Haltbarkeit ohne Aufpreis.',
          'Sparsam dosieren: Viele günstige Düfte sind kräftig. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe – so vermeidest du Fehlkäufe, auch im kleinen Budget.'
        ]
      },
      {
        body: [
          'Tipp: Viele dieser günstigen Düfte sind auch starke „Dupes" für teure Originale – schau dazu in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'wie-lange-haelt-parfum-haltbarkeit',
    title: 'Wie lange hält ein Parfum? Haltbarkeit & richtig auftragen',
    description:
      'Warum verfliegt dein Parfum so schnell – und wie hält es länger? Tipps zum richtigen Auftragen plus die langlebigsten Düfte aus unserem Katalog.',
    intro: [
      'Kennst du das? Morgens aufgesprüht, mittags weg. Wie lange ein Duft hält, hängt von der Konzentration, deiner Haut und vom richtigen Auftragen ab.',
      'Hier die wichtigsten Tipps – und am Ende die langlebigsten Düfte aus unserem Katalog.'
    ],
    sections: [
      {
        heading: 'So hält dein Duft länger',
        body: [
          'Auf gepflegte, leicht eingecremte Haut sprühen – auf trockener Haut verfliegt der Duft schneller.',
          'Auf die „Pulspunkte" auftragen: Handgelenke, Hals, hinter den Ohren, Ellenbeugen. Dort ist es warm und der Duft entfaltet sich.',
          'Nicht verreiben! Das Aneinanderreiben der Handgelenke „bricht" die Duftmoleküle und verkürzt die Haltbarkeit.',
          'Auch in Haare und auf Kleidung (vorsichtig) sprühen – dort hält Duft besonders lange.',
          'Eau de Parfum (EdP) hält länger als Eau de Toilette (EdT). Mehr dazu in unserem Ratgeber zu Inhaltsstoffen.'
        ]
      },
      {
        heading: 'Warum verfliegt mein Parfum so schnell?',
        body: [
          'Wenn ein Duft kaum hält, liegt es selten am Parfum allein. Häufige Gründe: sehr trockene Haut (der Duft hat nichts, woran er „haften" kann), eine leichte Konzentration wie Eau de Toilette, oder schlicht zu wenig aufgetragen.',
          'Auch die Duftrichtung spielt mit: frische, zitrische Düfte sind von Natur aus flüchtiger als warme, süsse oder holzige Kompositionen.',
          'Und manchmal riechst du deinen eigenen Duft nur selbst nicht mehr, obwohl andere ihn noch deutlich wahrnehmen – die Nase gewöhnt sich daran (man nennt das Geruchsadaption).'
        ]
      },
      {
        heading: 'Welche Düfte halten von Natur aus am längsten?',
        body: [
          'Als Faustregel halten warme, schwere Duftfamilien länger als leichte, frische:',
          'Gourmand (Vanille, Karamell, Tonkabohne) und orientalische Düfte: sehr langlebig, oft 8–12 Stunden.',
          'Holzige Düfte (Sandelholz, Oud, Patchouli): ebenfalls sehr ausdauernd.',
          'Florale Düfte: mittlere Haltbarkeit, je nach Aufbau.',
          'Frische und zitrische Düfte (Clean): am flüchtigsten – dafür herrlich leicht im Sommer. Hier lohnt sich ein zweiter Sprühstoss am Mittag.'
        ]
      },
      {
        heading: 'Parfum richtig lagern',
        body: [
          'Hitze, Licht und Luft sind die grössten Feinde eines Dufts. So bleibt er länger frisch:',
          'Kühl und dunkel lagern – ein geschlossener Schrank ist besser als das Fensterbrett.',
          'Nicht im Badezimmer aufbewahren: die ständigen Temperatur- und Feuchtigkeitswechsel lassen den Duft schneller „kippen".',
          'In der Originalverpackung lassen – der Karton schützt zuverlässig vor Licht.',
          'Den Flakon nicht schütteln und gut verschlossen halten, damit möglichst wenig Luft hineingelangt.'
        ]
      },
      {
        heading: 'Wie lange ist ein Parfum haltbar?',
        body: [
          'Ungeöffnet und kühl gelagert hält ein Parfum oft viele Jahre. Nach dem Öffnen entfaltet es sich am schönsten innerhalb der ersten ein bis drei Jahre.',
          'Woran du erkennst, dass ein Duft „umgekippt" ist: Die Farbe wird deutlich dunkler, er riecht oben säuerlich oder metallisch, oder der Charakter wirkt flach und alkoholisch.',
          'Ein kleiner Hinweis auf der Verpackung – das Tiegel-Symbol mit „12M" oder „24M" – gibt an, wie viele Monate der Duft nach dem Öffnen optimal ist.'
        ]
      },
      {
        heading: 'Die langlebigsten Düfte aus unserem Katalog',
        perfumes: [
          'tobacco-vanille',
          'baccarat-rouge-540',
          'khamrah',
          'montale-intense-cafe',
          'mugler-angel',
          'club-de-nuit-intense'
        ]
      }
    ]
  },
  {
    slug: 'parfum-geschenk-die-besten-duefte-zum-verschenken',
    title: 'Parfum verschenken: die besten Düfte als Geschenk',
    description:
      'Parfum ist ein wunderschönes Geschenk – wenn es passt. Unsere sicheren Favoriten zum Verschenken für Frauen und Männer, plus Tipps zur Auswahl.',
    intro: [
      'Ein Duft ist ein persönliches, edles Geschenk. Die Kunst ist, etwas zu wählen, das fast jeder mag – nicht zu speziell, aber trotzdem besonders.',
      'Hier unsere „sicheren" Geschenk-Tipps, die erfahrungsgemäss sehr gut ankommen.'
    ],
    sections: [
      {
        heading: 'Für Frauen',
        perfumes: ['coco-mademoiselle', 'lancome-la-vie-est-belle', 'ysl-black-opium', 'ch-good-girl']
      },
      {
        heading: 'Für Männer',
        perfumes: ['chanel-bleu-de-chanel', 'jpg-le-male', 'ea-stronger-with-you', 'boss-bottled']
      },
      {
        heading: 'Tipps für das perfekte Duft-Geschenk',
        body: [
          'Denk an den Stil der Person: Mag sie es eher frisch und dezent oder warm und auffällig? Im Zweifel passt ein vielseitiger Klassiker fast immer.',
          'Eau de Parfum wirkt als Geschenk edler und hält länger als ein leichtes Eau de Toilette.',
          'Ein bekannter, beliebter Duft ist sicherer als ein sehr spezieller – ausgefallene Nischendüfte sind Geschmackssache.',
          'Schön verpackt mit einer kleinen Karte zur Duftrichtung macht das Geschenk gleich persönlicher.'
        ]
      },
      {
        body: [
          'Unsicher, was die Person mag? Verschenk einen Gutschein oder mach unser Duft-Quiz gemeinsam – so triffst du den Geschmack viel sicherer.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen mögen',
    description:
      'Welche Herrendüfte kommen besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Männer – von frisch bis süss-würzig.',
    intro: [
      'Manche Männerdüfte ernten einfach besonders oft Komplimente. Meist sind es warme, einladende oder sauber-frische Düfte, die angenehm in Erinnerung bleiben.',
      'Hier die Klassiker, die erfahrungsgemäss sehr gut ankommen.'
    ],
    sections: [
      {
        perfumes: [
          'dior-sauvage',
          'jpg-le-male',
          'ea-stronger-with-you',
          'versace-eros',
          'ch-bad-boy',
          'pr-1-million',
          'boss-the-scent',
          'dior-fahrenheit'
        ]
      },
      {
        heading: 'Warum diese Düfte so gut ankommen',
        body: [
          'Es sind meist warme, einladende oder sauber-frische Düfte – sie signalisieren Nähe und Gepflegtheit, statt nur laut zu sein.',
          'Süsse, warme Noten wie Vanille, Tonkabohne, Zimt und süsses Holz gelten als besonders „anziehend" und gemütlich.',
          'Auch frische, saubere Düfte (Zitrus, sauberer Moschus) wirken attraktiv, weil sie nach frisch geduschter Haut riechen.',
          'Dezent dosieren: Komplimente erntet, wer aus der Nähe gut riecht – nicht, wer eine ganze Duftwolke hinterlässt.'
        ]
      },
      {
        body: [
          'Wichtig: „Kommt gut an" ist kein Garant – am Ende zählt, dass der Duft zu dir passt. Mach das Quiz, um deine eigene Richtung zu finden.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Die besten Vanille-Düfte',
    description:
      'Warme, süsse Vanille-Düfte zum Verlieben: kuschelig, sinnlich und perfekt für kühle Tage. Unsere Vanille-Favoriten für Damen, Herren und Unisex.',
    intro: [
      'Vanille ist die wohl beliebteste süsse Note: warm, cremig und einladend. Mal pur und kuschelig, mal kombiniert mit Gewürzen, Tabak oder Karamell.',
      'Hier unsere schönsten Vanille-Düfte aus dem Katalog.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'khamrah',
          'guerlain-mon',
          'ariana-cloud',
          'burberry-goddess',
          'lattafa-yara',
          'jpg-la-belle'
        ]
      },
      {
        heading: 'Welcher Vanille-Typ bist du?',
        body: [
          'Pur & cremig: weiche, dessertartige Vanille wie in Kayali Vanilla 28 – kuschelig und süss.',
          'Würzig & warm: Vanille mit Tabak, Zimt oder Dattel (z. B. Tobacco Vanille, Khamrah) – tief und erwachsen.',
          'Frisch abgemildert: Vanille mit Holz oder einem Hauch Zitrus wirkt alltagstauglicher und weniger schwer.'
        ]
      },
      {
        heading: 'Worauf du bei Vanille-Düften achten solltest',
        body: [
          'Vanille kann ganz unterschiedlich wirken: pudrig-elegant, dessertartig-süss oder warm-rauchig in Kombination mit Tabak und Gewürzen.',
          'Sehr süsse, reine Vanille kann schnell schwer werden – wer es alltagstauglich mag, wählt Vanille mit Holz, Moschus oder einem Hauch Frische.',
          'Vanille gehört zur Basis und hält von Natur aus lange – ideal für Herbst, Winter und gemütliche Abende.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Die besten Oud-Düfte',
    description:
      'Oud – das „flüssige Gold" der Parfümerie: orientalisch, edel und intensiv. Unsere besten Oud-Düfte von günstig bis luxuriös.',
    intro: [
      'Oud (auch Agarholz) ist eine der edelsten und intensivsten Duftnoten überhaupt: warm, holzig, leicht rauchig und sehr langanhaltend. Besonders schön im Herbst und Winter.',
      'Hier unsere Empfehlungen – von erschwinglich bis exklusiv.'
    ],
    sections: [
      {
        perfumes: [
          'tom-ford-oud-wood',
          'initio-oud-greatness',
          'lattafa-badee-amethyst',
          'mancera-red-tobacco',
          'montale-arabians-tonka',
          'sa-shaghaf-oud',
          'penhaligons-halfeti'
        ]
      },
      {
        heading: 'Oud für Einsteiger',
        body: [
          'Wenn du Oud zum ersten Mal trägst, starte mit weicheren, süsslichen Varianten – etwa Oud mit Rose, Safran oder Vanille.',
          'Reines, rauchig-medizinisches Oud kann anfangs ungewohnt wirken; gib ihm 15 bis 30 Minuten auf der Haut.',
          'Günstige Oud-Düfte wie von Lattafa sind ideal, um die Richtung kennenzulernen, bevor du in ein teures Nischen-Oud investierst.'
        ]
      },
      {
        heading: 'Worauf du bei Oud-Düften achten solltest',
        body: [
          'Echtes Oud ist sehr teuer, deshalb arbeiten die meisten Düfte mit hochwertigen Oud-Akkorden – das ist völlig normal und riecht trotzdem edel.',
          'Oud ist intensiv und langlebig: Hier reicht wirklich ein Sprühstoss. Lieber dezent starten und bei Bedarf nachlegen.',
          'Am schönsten kommt Oud in der kühlen Jahreszeit und am Abend zur Geltung. Wunderbar harmoniert es mit Rose, Safran und süssen Noten wie Vanille und Dattel.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-zitrus-duefte',
    title: 'Die besten Zitrus-Düfte',
    description:
      'Spritzig, frisch und gute Laune pur: Die besten Zitrus-Düfte mit Bergamotte, Zitrone und Grapefruit – ideal für Sommer, Büro und heisse Tage.',
    intro: [
      'Zitrus-Düfte sind frisch, leicht und sofort gute Laune: Zitrone, Bergamotte, Grapefruit und Orange wirken sauber und unbeschwert – perfekt für warme Tage und fürs Büro.',
      'Hier unsere spritzigsten Empfehlungen.'
    ],
    sections: [
      {
        perfumes: [
          'armani-acqua-di-gio-homme',
          'davidoff-cool-water',
          'adp-colonia',
          'armani-acqua-di-gioia',
          'hermes-jardin-nil',
          'mancera-cedrat-boise',
          'dolce-gabbana-light-blue',
          'creed-silver-mountain-water'
        ]
      },
      {
        heading: 'Zitrus für jede Gelegenheit',
        body: [
          'Fürs Büro: klare, saubere Zitrusdüfte mit Bergamotte oder Zitrone wirken gepflegt und nie aufdringlich.',
          'Für heisse Tage: spritzige Grapefruit- und Orangennoten sind herrlich erfrischend.',
          'Für den Abend: Zitrus mit holziger oder würziger Basis (z. B. Vetiver, Zedernholz) bekommt mehr Tiefe und hält länger.'
        ]
      },
      {
        heading: 'Worauf du bei Zitrus-Düften achten solltest',
        body: [
          'Zitrus-Noten sind herrlich frisch, aber von Natur aus flüchtig – viele Zitrus-Düfte halten kürzer. Ein zweiter Sprühstoss am Mittag wirkt Wunder.',
          'Achte auf eine holzige oder moschusartige Basis (z. B. Zedernholz, Vetiver, weisser Moschus): Sie verankert die Frische und macht den Duft langlebiger.',
          'Zitrus ist die perfekte Wahl für Sommer, heisse Tage und das Büro – sauber, leicht und nie aufdringlich.'
        ]
      }
    ]
  },
  {
    slug: 'damenduefte-die-maenner-lieben',
    title: 'Damendüfte, die Männer lieben',
    description:
      'Welche Frauendüfte kommen bei Männern besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Frauen – von süss-warm bis verführerisch.',
    intro: [
      'Manche Damendüfte ziehen einfach magisch an und ernten besonders oft Komplimente – gerade von Männern. Meist sind es warme, süsse oder sinnlich-verführerische Kompositionen, die angenehm in Erinnerung bleiben.',
      'Hier die Düfte, die als echte „Anziehungs-Klassiker" gelten.'
    ],
    sections: [
      {
        perfumes: [
          'ysl-black-opium',
          'lancome-la-vie-est-belle',
          'ch-good-girl',
          'lancome-la-nuit-tresor',
          'coco-mademoiselle',
          'lattafa-yara',
          'ysl-mon-paris',
          'gisada-ambassadora'
        ]
      },
      {
        heading: 'Was diese Düfte gemeinsam haben',
        body: [
          'Meist sind es warme, süsse oder sinnliche Kompositionen – mit Vanille, Amber, Praline oder weissen Blüten, die einladend und verführerisch wirken.',
          'Gourmand-Noten (süss und „essbar") gelten als besonders anziehend, weil sie an Gemütlichkeit und Genuss erinnern.',
          'Auch sauber-pudrige Moschus-Düfte kommen sehr gut an, weil sie nach gepflegter, weicher Haut riechen.',
          'Wichtig: Diese Düfte sind meist präsent – ein bis zwei Sprühstösse reichen, damit sie anziehend statt aufdringlich wirken.'
        ]
      },
      {
        body: [
          'Ehrlich gesagt: „Was Männer mögen" ist Geschmackssache und sehr individuell. Der schönste Duft ist der, in dem du dich selbstbewusst fühlst. Mach unser Quiz, um deine eigene Lieblingsrichtung zu finden.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-nach-sternzeichen',
    title: 'Parfum nach Sternzeichen: Welcher Duft passt zu deinem Zeichen?',
    description:
      'Welcher Duft passt zu deinem Sternzeichen? Vom Widder bis zu den Fischen – pro Zeichen ein Luxus-Duft und eine günstigere Alternative in ähnlicher Duftrichtung.',
    intro: [
      'Astrologie ist keine Wissenschaft – aber eine schöne, spielerische Inspiration. Dein Sternzeichen sagt nichts Verbindliches über deinen perfekten Duft, kann aber ein charmanter Startpunkt sein, um deinen Stil zu finden.',
      'Ein Hinweis zur Ehrlichkeit: Die genannten Spar-Picks sind eigenständige Düfte in ähnlicher Duftrichtung – keine identischen Kopien der Luxus-Düfte. Sie gehen in eine verwandte Richtung, riechen aber nicht exakt gleich.',
      'Noch genauer als jedes Sternzeichen ist übrigens unser Duft-Quiz – ganz unten findest du den Link.'
    ],
    sections: [
      {
        heading: '♈ Widder (21. März – 20. April)',
        body: [
          'Widder sind energiegeladen, mutig und lieben den großen Auftritt. Dazu passt ein Duft mit Feuer: würzig, warm und durchsetzungsstark.',
          'Luxus-Pick: Viktor&Rolf Spicebomb. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Asad. Beide setzen auf würzig-rauchige Wärme, die die Energie des Widders unterstreicht.'
        ],
        perfumes: ['viktor-rolf-spicebomb', 'lattafa-asad']
      },
      {
        heading: '♉ Stier (21. April – 20. Mai)',
        body: [
          'Stiere genießen mit allen Sinnen: Beständigkeit, Wärme und etwas Süße. Ein gourmandiger, behaglicher Duft trifft ihren Geschmack perfekt.',
          'Luxus-Pick: Tom Ford Tobacco Vanille. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Khamrah. Warme Vanille, Tabak und Dattel wirken sinnlich und genussvoll.'
        ],
        perfumes: ['tobacco-vanille', 'khamrah']
      },
      {
        heading: '♊ Zwillinge (21. Mai – 21. Juni)',
        body: [
          'Zwillinge sind neugierig, leicht und kommunikativ. Ein verspielter, frischer Duft mit einem Hauch Süße passt zu ihrer Wandelbarkeit.',
          'Luxus-Pick: Dolce & Gabbana Light Blue. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara. Leicht, fröhlich und unkompliziert – ideal für spontane Tage.'
        ],
        perfumes: ['dolce-gabbana-light-blue', 'lattafa-yara']
      },
      {
        heading: '♋ Krebs (22. Juni – 22. Juli)',
        body: [
          'Krebse sind gefühlvoll, sanft und lieben Geborgenheit. Weiche, pudrige Moschus-Noten spiegeln ihre warme, nahbare Art.',
          'Luxus-Pick: Narciso Rodriguez For Her. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Club de Nuit Woman. Weicher Moschus und Amber sorgen für ein Gefühl von Wärme und Nähe.'
        ],
        perfumes: ['narciso-for-her', 'armaf-club-de-nuit-woman']
      },
      {
        heading: '♌ Löwe (23. Juli – 23. August)',
        body: [
          'Löwen strahlen, sind großzügig und wollen gesehen werden. Ein opulenter Signature-Duft mit guter Strahlkraft ist ihre Bühne.',
          'Luxus-Pick: Maison Francis Kurkdjian Baccarat Rouge 540. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara Tous. Edel, strahlend und unverwechselbar – ganz wie der Löwe.'
        ],
        perfumes: ['baccarat-rouge-540', 'lattafa-yara-tous']
      },
      {
        heading: '♍ Jungfrau (24. August – 23. September)',
        body: [
          'Jungfrauen lieben Klarheit, Pflege und Natürlichkeit. Ein cleaner, frisch-mineralischer Duft wirkt an ihnen mühelos elegant.',
          'Luxus-Pick: Jo Malone Wood Sage & Sea Salt. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Mayar. Saubere, unaufdringliche Noten unterstreichen ihre natürliche Eleganz.'
        ],
        perfumes: ['jo-malone-wood-sage-sea-salt', 'lattafa-mayar']
      },
      {
        heading: '♎ Waage (24. September – 23. Oktober)',
        body: [
          'Waagen suchen Harmonie, Charme und Ästhetik. Ein ausgewogener, blumiger Duft passt zu ihrem Sinn für Schönheit.',
          'Luxus-Pick: Chloé Eau de Parfum. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Vanity Femme. Weiche florale Eleganz bringt ihre Balance und ihren Charme zum Ausdruck.'
        ],
        perfumes: ['chloe-edp', 'armaf-vanity-femme']
      },
      {
        heading: '♏ Skorpion (24. Oktober – 22. November)',
        body: [
          'Skorpione sind intensiv, geheimnisvoll und tiefgründig. Ein dunkler, holzig-orientalischer Duft mit Oud verstärkt ihre magnetische Ausstrahlung.',
          'Luxus-Pick: Tom Ford Oud Wood. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Oud for Glory. Tiefe Oud- und Holznoten wirken geheimnisvoll und anziehend.'
        ],
        perfumes: ['tom-ford-oud-wood', 'lattafa-oud-for-glory']
      },
      {
        heading: '♐ Schütze (23. November – 21. Dezember)',
        body: [
          'Schützen sind abenteuerlustig, warmherzig und freiheitsliebend. Ein gemütlicher, warm-holziger Duft weckt ihr Fernweh.',
          'Luxus-Pick: Maison Margiela Replica By the Fireplace. Günstigere Alternative in ähnlicher, warm-holziger Richtung: Lattafa Fakhar (Men). Warme, einhüllende Noten passen zu ihrer optimistischen Wärme.'
        ],
        perfumes: ['replica-fireplace', 'lattafa-fakhar-men']
      },
      {
        heading: '♑ Steinbock (22. Dezember – 20. Januar)',
        body: [
          'Steinböcke sind ehrgeizig, klassisch und souverän. Ein edler, zeitlos-holziger Duft unterstreicht ihre seriöse Präsenz.',
          'Luxus-Pick: Creed Aventus. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Club de Nuit Intense Man. Fruchtig-rauchiges Holz wirkt souverän und hochwertig.'
        ],
        perfumes: ['creed-aventus', 'club-de-nuit-intense']
      },
      {
        heading: '♒ Wassermann (21. Januar – 19. Februar)',
        body: [
          'Wassermänner sind eigenständig, modern und unkonventionell. Ein minimalistischer, holzig-cleaner Duft passt zu ihrem individuellen Stil.',
          'Luxus-Pick: Le Labo Santal 33. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Ana Abiyedh. Cremiges Holz und klare Noten wirken modern und eigenständig.'
        ],
        perfumes: ['le-labo-santal-33', 'lattafa-ana-abiyedh']
      },
      {
        heading: '♓ Fische (20. Februar – 20. März)',
        body: [
          'Fische sind träumerisch, sensibel und romantisch. Ein aquatisch-frischer, weicher Duft spiegelt ihre sanfte, verträumte Art.',
          'Luxus-Pick: Giorgio Armani Acqua di Gioia. Günstigere Alternative in ähnlicher, aquatisch-frischer Richtung: Davidoff Cool Water. Klare Wasser- und Zitrusnoten wirken sanft, frisch und verträumt.'
        ],
        perfumes: ['armani-acqua-di-gioia', 'davidoff-cool-water']
      },
      {
        body: [
          'Sternzeichen sind ein schöner, spielerischer Einstieg – aber dein echter Lieblingsduft hängt von deinem persönlichen Geschmack ab, nicht vom Kalender. Unser Duft-Quiz findet ihn in unter 1 Minute, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-fuer-einsteiger-erster-signature-duft',
    title: 'Parfum für Einsteiger: so findest du deinen ersten Signature-Duft',
    description:
      'Neu in der Welt der Düfte? So findest du Schritt für Schritt deinen ersten Signature-Duft – ohne teure Fehlkäufe. Mit einfachen Tipps und sicheren Einsteiger-Empfehlungen.',
    intro: [
      'Vor dem Parfumregal zu stehen kann überfordern: hunderte Flakons, fremde Begriffe und stolze Preise. Dabei ist es gar nicht so schwer, deinen Lieblingsduft zu finden – wenn du weisst, worauf du achten musst.',
      'Hier bekommst du eine einfache Anleitung für deinen ersten eigenen Duft – ganz ohne Fachchinesisch.'
    ],
    sections: [
      {
        heading: 'Schritt 1: Finde deine Duftrichtung',
        body: [
          'Düfte teilen sich grob in vier Familien: frisch/clean (Zitrus, Meer, sauberer Moschus), süss/gourmand (Vanille, Karamell, Amber), holzig/woody (Sandelholz, Leder, Oud) und blumig/floral (Rose, Jasmin, Pfirsich).',
          'Überleg dir, welche dieser Beschreibungen dich sofort anspricht – das ist deine Startrichtung. Unser Duft-Quiz nimmt dir diese Einordnung in unter einer Minute ab.'
        ]
      },
      {
        heading: 'Schritt 2: Verstehe die Duftpyramide',
        body: [
          'Ein Parfum verändert sich über die Zeit. Das beschreibt die sogenannte Duftpyramide:',
          'Kopfnoten: der erste Eindruck beim Aufsprühen – verfliegt schon nach Minuten.',
          'Herznoten: der Kern des Dufts, der nach kurzer Zeit hervorkommt.',
          'Basisnoten: das, was nach Stunden auf der Haut übrig bleibt.',
          'Wichtig: Beurteile einen Duft nie nur in der ersten Minute – gib ihm 15 bis 30 Minuten auf der Haut.'
        ]
      },
      {
        heading: 'Schritt 3: Richtig testen – und teure Fehlkäufe vermeiden',
        body: [
          'Teste höchstens zwei bis drei Düfte gleichzeitig – sonst überfordert sich die Nase.',
          'Sprüh auf die Haut, nicht nur auf einen Papierstreifen: Auf der Haut riecht jeder Duft individuell.',
          'Trag ihn einen halben Tag und beobachte, ob du ihn noch magst – und wie andere reagieren.',
          'Günstiger Trick: Bestell zuerst eine kleine Abfüllung oder Probe, bevor du den grossen Flakon kaufst.'
        ]
      },
      {
        heading: 'Sichere Einsteiger-Empfehlungen',
        body: [
          'Diese Düfte gelten als vielseitig und leicht zu mögen – ein guter Startpunkt für deinen ersten Signature-Duft.'
        ],
        perfumes: [
          'dior-sauvage',
          'chanel-bleu-de-chanel',
          'lattafa-yara',
          'armani-acqua-di-gioia',
          'jo-malone-wood-sage-sea-salt',
          'khamrah'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-fruehlingsduefte',
    title: 'Die besten Frühlingsdüfte: frisch, blumig & leicht',
    description:
      'Leichte, blumig-frische Düfte für den Frühling – grüne Noten, Blüten und Zitrus. Unsere Frühlings-Favoriten für Damen und Herren.',
    intro: [
      'Der Frühling ruft nach leichten, lebendigen Düften: zarte Blüten, grüne Noten und ein Hauch Zitrus passen perfekt zu den ersten warmen Tagen.',
      'Hier unsere schönsten Frühlingsdüfte aus dem Katalog – frisch, fröhlich und nicht zu schwer.'
    ],
    sections: [
      {
        perfumes: ['marc-jacobs-daisy', 'chloe-edp', 'gucci-bloom', 'dior-miss-dior', 'montblanc-legend', 'pdm-greenley', 'creed-green-irish-tweed', 'dkny-be-delicious']
      },
      {
        heading: 'Frühlingsduft für jeden Anlass',
        body: [
          'Für den Alltag: leichte florale oder grüne Düfte begleiten dich dezent durch den Tag.',
          'Fürs erste Date im Freien: ein fruchtig-blumiger Duft wirkt frisch und einladend.',
          'Für den Übergang: Wenn es abends noch kühl ist, darf ein Hauch Moschus oder Holz für etwas Wärme sorgen.'
        ]
      },
      {
        heading: 'Worauf du bei Frühlingsdüften achten solltest',
        body: [
          'Setz auf leichte, frische Kompositionen – blumig, grün oder zitrisch. Schwere, süsse Winterdüfte wirken jetzt schnell zu wuchtig.',
          'Eau de Toilette und leichte Eau de Parfum sind ideal: präsent, aber luftig.',
          'Tipp: Frühlingsdüfte eignen sich wunderbar für den Alltag, das Büro und entspannte Treffen im Freien.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-bueroduefte',
    title: 'Die besten Büro-Düfte: dezent & angenehm',
    description:
      'Bürotaugliche Düfte, die angenehm dezent bleiben und niemanden stören – frisch, sauber und gepflegt. Unsere Empfehlungen für Damen und Herren.',
    intro: [
      'Im Büro gilt: Ein Duft soll dich begleiten, nicht den ganzen Raum füllen. Dezent, sauber und gepflegt ist hier die beste Wahl.',
      'Diese Düfte gelten als angenehm bürotauglich – präsent genug, um wahrgenommen zu werden, aber nie aufdringlich.'
    ],
    sections: [
      {
        perfumes: ['chanel-bleu-de-chanel', 'ysl-y-edp', 'boss-bottled', 'le-labo-santal-33', 'jo-malone-wood-sage-sea-salt', 'coco-mademoiselle', 'narciso-for-her', 'dior-homme']
      },
      {
        heading: 'Diese Düfte trägst du besser nicht ins Büro',
        body: [
          'Sehr süsse Gourmands (viel Vanille, Karamell, Schokolade) können im geschlossenen Raum schnell erdrückend wirken.',
          'Schwere Oud- und Amber-Bomben gehören eher in den Abend als an den Schreibtisch.',
          'Sehr intensive „Beast-Mode"-Düfte mit grosser Projektion sind im Grossraumbüro oft zu viel des Guten.'
        ]
      },
      {
        heading: 'So liegst du im Büro immer richtig',
        body: [
          'Weniger ist mehr: Ein bis zwei Sprühstösse reichen. Im geschlossenen Raum wirkt ein Duft stärker als draussen.',
          'Frische, holzige und sauber-moschusartige Düfte sind angenehmer als schwere, süsse oder sehr intensive Kompositionen.',
          'Trag den Duft eher auf die Kleidung als grossflächig auf die Haut – so bleibt er dezenter.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-das-lange-haelt-beast-mode',
    title: 'Düfte, die extrem lange halten („Beast-Mode")',
    description:
      'Parfums mit enormer Haltbarkeit und Projektion: Diese Düfte halten oft den ganzen Tag – von süss-warm bis dunkel-holzig.',
    intro: [
      'Manche Düfte sind echte Ausdauer-Wunder: Einmal aufgesprüht, begleiten sie dich oft den ganzen Tag und sind auch für andere deutlich wahrnehmbar.',
      'Hier unsere langlebigsten, projektionsstärksten Düfte – sparsam dosieren ist hier Pflicht.'
    ],
    sections: [
      {
        perfumes: ['baccarat-rouge-540', 'tobacco-vanille', 'khamrah', 'mugler-angel', 'ysl-black-opium', 'nasomatto-black-afgano', 'jpg-ultra-male', 'lattafa-asad']
      },
      {
        heading: 'So dosierst du Beast-Mode-Düfte richtig',
        body: [
          'Ein Sprühstoss auf die Brust und einer in den Nacken reichen meist für den ganzen Tag.',
          'Im Sommer und in Innenräumen lieber noch sparsamer – diese Düfte projizieren stark.',
          'Wenn du unsicher bist: einmal in die Luft sprühen und hindurchgehen – so wird der Duft sanfter und gleichmässiger.'
        ]
      },
      {
        heading: 'Wichtig bei sehr starken Düften',
        body: [
          'Hier reicht wirklich ein Sprühstoss – zu viel wirkt schnell erdrückend, gerade in Innenräumen.',
          'Diese Düfte kommen in der kühlen Jahreszeit und am Abend am besten zur Geltung.',
          'Wenn du es dezenter magst: einmal in die Luft sprühen und hindurchgehen – so wird der Duft sanfter.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-hochzeitsduefte-braut',
    title: 'Hochzeitsdüfte: die schönsten Parfums für die Braut',
    description:
      'Der Duft zum schönsten Tag: elegante, romantische Parfums für die Braut – zeitlos, fein und voller guter Erinnerungen.',
    intro: [
      'Ein Duft wird zum Souvenir deines grossen Tages: Jahre später erinnert dich ein Hauch davon sofort an die Hochzeit. Deshalb darf er besonders sein.',
      'Hier elegante, romantische Düfte, die zu einer Braut wunderbar passen – zeitlos statt trendig.'
    ],
    sections: [
      {
        perfumes: ['coco-mademoiselle', 'chanel-no-5', 'chloe-edp', 'ysl-libre', 'pdm-delina', 'viktor-rolf-flowerbomb', 'dior-miss-dior', 'jo-malone-pear-freesia']
      },
      {
        heading: 'Wann du deinen Hochzeitsduft aussuchen solltest',
        body: [
          'Plane ein paar Wochen Vorlauf ein, damit du in Ruhe testen und dich entscheiden kannst.',
          'Trag den Kandidaten vorab zu einem schönen Anlass – so verknüpfst du ihn schon mit guten Gefühlen.',
          'Denk an die Jahreszeit: ein leichter, blumiger Duft für die Sommerhochzeit, etwas Wärmeres für den Winter.'
        ]
      },
      {
        heading: 'Tipps für den Hochzeitsduft',
        body: [
          'Wähle etwas Zeitloses, das du auch in Jahren noch schön findest – nicht den lautesten Trend.',
          'Trag den Duft schon ein paar Mal vorher, damit du sicher bist, dass er sich auf deiner Haut richtig anfühlt.',
          'Ein dezenter, eleganter Duft passt meist besser als ein sehr schwerer – du möchtest umarmt werden, ohne andere zu überduften.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-holzigen-duefte',
    title: 'Die besten holzigen Düfte: edel, warm & zeitlos',
    description:
      'Holzige Düfte mit Sandelholz, Zedernholz, Oud und Vetiver – edel, warm und sehr tragefreundlich. Unsere Favoriten für Damen, Herren und Unisex.',
    intro: [
      'Holzige Düfte wirken edel, warm und erwachsen. Sandelholz, Zedernholz, Vetiver und Oud geben ihnen Tiefe und machen sie angenehm tragefreundlich.',
      'Hier unsere schönsten holzigen Düfte – von frisch-holzig bis dunkel und cremig.'
    ],
    sections: [
      {
        perfumes: ['le-labo-santal-33', 'creed-aventus', 'chanel-bleu-de-chanel', 'tom-ford-oud-wood', 'byredo-gypsy-water', 'club-de-nuit-intense', 'dior-homme', 'terre-dhermes']
      },
      {
        heading: 'Welches Holz steckt drin?',
        body: [
          'Sandelholz: cremig, weich und leicht süsslich – sehr tragefreundlich.',
          'Zedernholz: trocken, klar und elegant – häufig in frisch-holzigen Düften.',
          'Vetiver: erdig-grün und rauchig – gibt Frische und Charakter.',
          'Oud & Leder: dunkel, intensiv und edel – am schönsten am Abend und in der kühlen Jahreszeit.'
        ]
      },
      {
        heading: 'Worauf du bei holzigen Düften achten solltest',
        body: [
          'Holzige Noten gehören zur Basis und halten von Natur aus lange – ideal für den ganzen Tag.',
          'Frisch-holzige Düfte (mit Zitrus oder Vetiver) passen gut in den Alltag; dunkle, cremige Hölzer wie Sandelholz oder Oud wirken abends am schönsten.',
          'Holz harmoniert wunderbar mit Gewürzen, Leder und süssen Noten wie Vanille.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-blumigen-duefte',
    title: 'Die besten blumigen Düfte: feminin & elegant',
    description:
      'Blumige Düfte mit Rose, Jasmin, Pfingstrose und Orangenblüte – romantisch, elegant und vielseitig. Unsere floralen Favoriten.',
    intro: [
      'Blumige Düfte sind der Inbegriff von Eleganz: Rose, Jasmin, Pfingstrose oder Orangenblüte wirken feminin, romantisch und zeitlos.',
      'Hier unsere schönsten floralen Düfte – von zart und frisch bis opulent.'
    ],
    sections: [
      {
        perfumes: ['coco-mademoiselle', 'chloe-edp', 'gucci-bloom', 'ysl-libre', 'dior-miss-dior', 'chanel-no-5', 'lancome-idole', 'pdm-delina']
      },
      {
        heading: 'Welche Blüte passt zu dir?',
        body: [
          'Rose: zeitlos und romantisch – mal klassisch, mal modern mit Frucht oder Oud kombiniert.',
          'Jasmin & Orangenblüte: warm, sinnlich und leicht betörend.',
          'Pfingstrose & Maiglöckchen: frisch, leicht und zart – ideal für den Frühling.',
          'Iris & Veilchen: pudrig-elegant für alle, die es feiner mögen.'
        ]
      },
      {
        heading: 'Worauf du bei blumigen Düften achten solltest',
        body: [
          'Blumig heisst nicht „altmodisch": Moderne Florals kombinieren Blüten mit Frucht, Moschus oder Holz und wirken sehr aktuell.',
          'Zarte, frische Florals passen perfekt in Frühling und Alltag; opulente, süsse Blütendüfte kommen abends und in der kühlen Jahreszeit schön zur Geltung.',
          'Tipp: Wenn dir reine Blüten zu klassisch sind, achte auf florale Düfte mit einer fruchtigen oder holzigen Note.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-frischen-aquatischen-duefte',
    title: 'Die besten frischen & aquatischen Düfte',
    description:
      'Aquatische Düfte wie eine Meeresbrise: sauber, frisch und unbeschwert. Unsere Favoriten für Sommer, Sport und heisse Tage.',
    intro: [
      'Aquatische Düfte riechen nach frischer Luft, Wasser und Sauberkeit – wie eine Meeresbrise an einem klaren Tag. Perfekt für alle, die es leicht und unaufdringlich mögen.',
      'Hier unsere frischsten Empfehlungen für Sommer, Sport und den Alltag.'
    ],
    sections: [
      {
        perfumes: ['dior-sauvage', 'davidoff-cool-water', 'jo-malone-wood-sage-sea-salt', 'prada-luna-rossa-ocean', 'light-blue-homme', 'armani-acqua-di-gioia', 'creed-silver-mountain-water', 'adp-colonia']
      },
      {
        heading: 'Frisch ist nicht gleich frisch',
        body: [
          'Aquatisch: nach Meer, Wasser und Salz – wie eine Brise am Strand.',
          'Zitrisch: spritzig nach Zitrone, Bergamotte und Grapefruit.',
          'Grün: nach frisch geschnittenem Gras, Blättern und Kräutern.',
          'Clean-Moschus: nach frisch gewaschener Wäsche und sauberer Haut.'
        ]
      },
      {
        heading: 'Worauf du bei frischen Düften achten solltest',
        body: [
          'Aquatische und zitrische Noten sind herrlich leicht, verfliegen aber schneller – ein zweiter Sprühstoss am Mittag hält die Frische.',
          'Ideal für heisse Tage, Sport und das Büro, weil sie nie schwer oder aufdringlich wirken.',
          'Eine holzige oder moschusartige Basis macht frische Düfte langlebiger.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-moschus-pudrigen-duefte',
    title: 'Pudrige & Moschus-Düfte: weich und sinnlich',
    description:
      'Weiche, pudrige Düfte mit Moschus, Iris und Veilchen – elegant, hautnah und sinnlich. Unsere Favoriten für jeden Tag.',
    intro: [
      'Pudrige und moschusartige Düfte wirken weich, gepflegt und angenehm hautnah – wie ein Duft, der dich sanft umhüllt.',
      'Hier unsere Empfehlungen für alle, die es elegant, dezent und sinnlich mögen.'
    ],
    sections: [
      {
        perfumes: ['narciso-for-her', 'coco-mademoiselle', 'chanel-no-5', 'lancome-idole', 'ysl-libre', 'prada-paradoxe', 'lattafa-mayar', 'malle-musc-ravageur']
      },
      {
        heading: 'Pudrig oder Moschus – wo ist der Unterschied?',
        body: [
          'Pudrig: weiche, leicht „make-up-artige" Noten wie Iris, Veilchen und Heliotrop – elegant und ein wenig nostalgisch.',
          'Moschus (Musk): sauber-weiche Basisnoten, die nach gepflegter, warmer Haut riechen – sehr hautnah und vielseitig.',
          'Viele Düfte kombinieren beides: Das ergibt den typisch weichen, „frisch geduschten" Charakter.'
        ]
      },
      {
        heading: 'Worauf du bei pudrigen & Moschus-Düften achten solltest',
        body: [
          'Diese Düfte bleiben oft nah an der Haut – das ist gewollt und wirkt sehr elegant statt aufdringlich.',
          'Sie sind herrlich vielseitig und passen zu fast jedem Anlass, vom Büro bis zum Date.',
          'Iris- und Veilchennoten geben den pudrigen Charakter; weisser Moschus sorgt für das saubere, weiche Gefühl.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-layering-duefte-kombinieren',
    title: 'Parfum-Layering: zwei Düfte richtig kombinieren',
    description:
      'Layering bedeutet, zwei Düfte zu schichten und so deine eigene Duftkreation zu erschaffen. So gelingt das Kombinieren – einfach erklärt.',
    intro: [
      'Beim Layering trägst du zwei Düfte übereinander und erschaffst so eine ganz persönliche Note, die niemand sonst genau so hat.',
      'Klingt kompliziert, ist es aber nicht – mit ein paar einfachen Regeln gelingt es dir sofort.'
    ],
    sections: [
      {
        heading: 'Die Grundregeln',
        body: [
          'Kombiniere einen einfachen, „glatten" Duft mit einem charaktervollen – zum Beispiel eine Vanille- oder Moschus-Basis mit etwas Würzigem oder Holzigem.',
          'Trag den schwereren Duft zuerst auf, dann den leichteren darüber.',
          'Weniger ist mehr: ein Sprühstoss pro Duft genügt zum Ausprobieren.'
        ]
      },
      {
        heading: 'Was gut zusammenpasst',
        body: [
          'Vanille und Holz: warm und gemütlich.',
          'Rose und Oud: edel und orientalisch.',
          'Zitrus und Vanille: frisch startend, warm endend.',
          'Moschus passt fast immer und macht jeden Duft weicher.'
        ]
      },
      {
        heading: 'Gut zum Kombinieren',
        body: ['Diese vielseitigen Düfte eignen sich besonders als Basis zum Schichten:'],
        perfumes: ['le-labo-santal-33', 'tobacco-vanille', 'khamrah', 'baccarat-rouge-540']
      }
    ]
  },
  {
    slug: 'edt-edp-parfum-unterschied',
    title: 'EdT, EdP oder Parfum? Die Unterschiede einfach erklärt',
    description:
      'Eau de Toilette, Eau de Parfum oder Extrait – was ist der Unterschied? So erkennst du, welche Konzentration für dich die richtige ist.',
    intro: [
      'Auf Flakons steht „EdT", „EdP" oder „Parfum" – diese Kürzel sagen, wie stark ein Duft ist. Der Unterschied liegt in der Konzentration des Duftöls.',
      'Hier erklären wir dir einfach, was die Begriffe bedeuten und welche Variante wann sinnvoll ist.'
    ],
    sections: [
      {
        heading: 'Die wichtigsten Konzentrationen',
        body: [
          'Eau de Cologne (EdC): sehr leicht und frisch, hält nur wenige Stunden.',
          'Eau de Toilette (EdT): leicht und frisch, ideal für Sommer und Tag – hält meist 3 bis 5 Stunden.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langlebiger – der häufigste Typ, hält oft 6 bis 8 Stunden.',
          'Parfum / Extrait: die intensivste und teuerste Variante, hält am längsten – schon wenig genügt.'
        ]
      },
      {
        heading: 'Welche Variante ist die richtige für mich?',
        body: [
          'Für den Sommer, das Büro und tagsüber: eher EdT – leicht und frisch.',
          'Für Herbst, Winter, Abende und mehr Haltbarkeit: EdP oder Parfum.',
          'Tipp: Die gleiche Duftlinie riecht als EdT oft etwas frischer und als EdP etwas wärmer – es lohnt sich, beide zu testen.'
        ]
      }
    ]
  },
  {
    slug: 'haeufige-parfum-fehler',
    title: '5 häufige Parfum-Fehler – und wie du sie vermeidest',
    description:
      'Verreiben, falsch lagern, zu viel sprühen: Die häufigsten Parfum-Fehler und wie du sie ganz einfach vermeidest.',
    intro: [
      'Beim Umgang mit Parfum schleichen sich schnell kleine Fehler ein, die Haltbarkeit und Duftbild verschlechtern.',
      'Hier die fünf häufigsten – und wie du sie ganz einfach vermeidest.'
    ],
    sections: [
      {
        heading: '1. Die Handgelenke aneinander reiben',
        body: ['Das „bricht" die Duftmoleküle und lässt den Duft schneller verfliegen. Einfach aufsprühen und trocknen lassen.']
      },
      {
        heading: '2. Parfum im Badezimmer lagern',
        body: ['Hitze, Licht und Feuchtigkeit lassen den Duft schneller kippen. Besser kühl, dunkel und in der Originalverpackung aufbewahren.']
      },
      {
        heading: '3. Zu viel sprühen',
        body: ['Mehr Duft heisst nicht besser. Ein bis zwei Sprühstösse reichen meist – zu viel wirkt aufdringlich, und die eigene Nase gewöhnt sich daran.']
      },
      {
        heading: '4. Auf trockene Haut sprühen',
        body: ['Auf gepflegter, leicht eingecremter Haut hält ein Duft deutlich länger als auf trockener.']
      },
      {
        heading: '5. Einen Duft in der ersten Minute beurteilen',
        body: ['Die Kopfnoten verfliegen schnell. Gib einem Duft 15 bis 30 Minuten auf der Haut, bevor du urteilst.']
      }
    ]
  },
  {
    slug: 'parfums-mit-schweizer-bezug',
    title: 'Düfte mit Schweizer Bezug',
    description:
      'Parfums von Marken mit Schweizer Wurzeln wie Chopard und Gisada – elegant und hochwertig. Kuratiert von Auressa, deiner Schweizer Duft-Plattform.',
    intro: [
      'Auressa wird in der Schweiz kuratiert – und auch in der Duftwelt gibt es Marken mit Schweizer Wurzeln. Chopard (Genf) und Gisada sind zwei davon.',
      'Hier ein kleiner, feiner Blick auf Düfte mit Schweizer Bezug.'
    ],
    sections: [
      {
        perfumes: ['gisada-ambassador', 'gisada-ambassadora', 'chopard-happy', 'davidoff-cool-water', 'davidoff-cool-water-woman']
      },
      {
        heading: 'Marken mit Schweizer Wurzeln',
        body: [
          'Chopard: Das Luxushaus aus Genf ist vor allem für Schmuck und Uhren bekannt – macht aber auch elegante Düfte wie Happy Chopard.',
          'Davidoff: Die Marke geht auf Zino Davidoff aus Genf zurück. Cool Water gehört zu den meistverkauften frischen Herrendüften überhaupt.',
          'Gisada: Ein Schweizer Dufthaus mit modernen, eleganten Kompositionen wie Ambassador und Ambassadora.'
        ]
      },
      {
        heading: 'Warum lokal Sinn macht',
        body: [
          'Wir achten bewusst auf Schweizer Preise (CHF) und Verfügbarkeit – damit du weisst, was wirklich relevant ist.',
          'Düfte mit Schweizer Bezug sind ein schönes, lokales Geschenk – etwa zum Geburtstag oder als Mitbringsel.',
          'Du suchst nicht nach einer bestimmten Marke, sondern nach deinem Duft? Dann mach unser Quiz – es findet deine Richtung in unter einer Minute.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-lattafa-duefte',
    title: 'Die besten Lattafa-Düfte',
    description:
      'Lattafa bietet erstaunlich gute Düfte für kleines Geld – warm, langlebig und oft eine günstige Alternative zu teuren Originalen. Unsere Favoriten.',
    intro: [
      'Die Marke Lattafa hat in kurzer Zeit viele Fans gewonnen: tolle Haltbarkeit, warme Kompositionen und das alles zu erstaunlich kleinen Preisen.',
      'Hier unsere liebsten Lattafa-Düfte aus dem Katalog.'
    ],
    sections: [
      {
        perfumes: ['khamrah', 'lattafa-asad', 'lattafa-yara', 'lattafa-fakhar-men', 'lattafa-oud-for-glory', 'lattafa-ana-abiyedh', 'lattafa-yara-tous', 'lattafa-mayar']
      },
      {
        heading: 'Welcher Lattafa-Duft passt zu dir?',
        body: [
          'Süss & würzig: Khamrah mit Dattel, Zimt und Vanille – kuschelig und winterlich.',
          'Fruchtig & rauchig: Asad in der Richtung von Creed Aventus – ideal für selbstbewusste Auftritte.',
          'Cremig & feminin: Yara und Yara Tous – beliebte, leicht süsse Damenlieblinge.',
          'Frisch & blumig: Mayar für alle, die es dezenter und alltagstauglich mögen.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Viele Lattafa-Düfte gelten als günstige Alternativen zu teuren Originalen – ähnliche Richtung, viel kleinerer Preis.',
          'Die Düfte sind oft sehr langlebig und projektionsstark: ein bis zwei Sprühstösse genügen.',
          'Mehr Spar-Tipps findest du in unserem Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-armaf-duefte',
    title: 'Die besten Armaf-Düfte',
    description:
      'Armaf ist bekannt für preiswerte Düfte mit toller Haltbarkeit – allen voran Club de Nuit. Unsere Armaf-Favoriten für Damen und Herren.',
    intro: [
      'Armaf hat sich mit der Club-de-Nuit-Reihe einen Namen gemacht: charaktervolle Düfte mit toller Haltbarkeit zu kleinen Preisen.',
      'Hier unsere liebsten Armaf-Düfte aus dem Katalog.'
    ],
    sections: [
      {
        perfumes: ['club-de-nuit-intense', 'armaf-cdn-sillage', 'armaf-cdn-milestone', 'armaf-cdn-untold', 'armaf-club-de-nuit-woman', 'armaf-vanity-femme']
      },
      {
        heading: 'Die Club-de-Nuit-Reihe im Überblick',
        body: [
          'Intense Man: der Bestseller – fruchtig-rauchig und die bekannteste günstige Aventus-Alternative.',
          'Sillage: frischer und etwas grüner, ideal für wärmere Tage.',
          'Milestone und Untold: modern und vielseitig, mit fruchtigen und süssen Akzenten.',
          'Club de Nuit Woman: die feminine, blumig-fruchtige Variante der Reihe.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Club de Nuit Intense Man gilt als eine der bekanntesten günstigen Alternativen zu Creed Aventus.',
          'Armaf-Düfte sind oft kräftig und langlebig – sparsam dosieren lohnt sich.',
          'Du suchst gezielt nach günstigen Alternativen? Schau in unseren Dupe-Ratgeber.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-herbstduefte',
    title: 'Die besten Herbstdüfte: warm, würzig & gemütlich',
    description:
      'Wärmende Düfte für den Herbst: würzig, holzig und leicht süss – ideal für kühle, goldene Tage. Unsere Herbst-Favoriten für Damen, Herren und Unisex.',
    intro: [
      'Der Herbst ist die schönste Zeit für etwas wärmere Düfte: Wenn die Tage kühler und die Blätter golden werden, dürfen würzige, holzige und leicht süsse Noten ran. Sie wirken gemütlich und einhüllend, ohne schon so schwer zu sein wie ein tiefer Winterduft.',
      'Hier unsere liebsten Herbstdüfte aus dem Katalog – von erschwinglich bis edel, für jeden Geschmack.'
    ],
    sections: [
      {
        perfumes: [
          'lattafa-asad',
          'tobacco-vanille',
          'ysl-la-nuit-de-lhomme',
          'club-de-nuit-intense',
          'guerlain-lhomme-ideal',
          'mancera-red-tobacco',
          'boss-bottled-night',
          'pdm-herod'
        ]
      },
      {
        heading: 'Worauf du bei Herbstdüften achten solltest',
        body: [
          'Der Herbst ist der ideale Übergang: etwas wärmer als im Sommer, aber noch nicht so wuchtig wie im tiefen Winter. Würzige, holzige und sanft süsse Noten passen jetzt am besten.',
          'Typische Herbst-Noten sind Tabak, Zimt, Kardamom, Tonkabohne, Leder und warmes Holz – sie wirken auf kühler Luft besonders rund und gemütlich.',
          'Eau de Parfum lohnt sich jetzt wieder mehr: Es hält länger und entfaltet bei kühleren Temperaturen schön Tiefe. Ein bis zwei Sprühstösse genügen meist.',
          'Tipp: Viele Herbstdüfte funktionieren auch im Winter – wer flexibel bleiben will, wählt eine würzig-holzige Komposition, die sich über beide Jahreszeiten tragen lässt.'
        ]
      },
      {
        body: [
          'Du bist unsicher, welche Richtung dir steht? Mach unser Duft-Quiz – es findet deine Lieblingsrichtung in unter einer Minute, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-nischenduefte',
    title: 'Die besten Nischendüfte: besonders & aussergewöhnlich',
    description:
      'Nischendüfte heben sich vom Mainstream ab: eigenständig, hochwertig und aussergewöhnlich. Was Nischenparfums ausmacht – und unsere Favoriten aus dem Katalog.',
    intro: [
      'Nischendüfte sind die Gegenwelt zu den grossen Mainstream-Parfums: Statt für den Massengeschmack gemacht, setzen sie auf Eigenständigkeit, hochwertige Rohstoffe und einen unverwechselbaren Charakter. Wer etwas Besonderes sucht, das nicht jeder trägt, wird hier fündig.',
      'Hier unsere schönsten Nischendüfte aus dem Katalog – von strahlend bis dunkel-holzig.'
    ],
    sections: [
      {
        perfumes: [
          'baccarat-rouge-540',
          'le-labo-santal-33',
          'nishane-hacivat',
          'xerjoff-naxos',
          'initio-oud-greatness',
          'orto-megamare',
          'byredo-gypsy-water',
          'kilian-angels-share'
        ]
      },
      {
        heading: 'Was macht einen Nischenduft aus?',
        body: [
          'Nischendüfte stammen meist von kleineren, spezialisierten Häusern, die sich auf Duftkunst statt auf Massenproduktion konzentrieren. Oft stecken hochwertigere oder ungewöhnlichere Rohstoffe drin.',
          'Sie sind in der Regel eigenständiger und „mutiger" als Designer-Düfte – dafür manchmal polarisierender. Genau das macht ihren Reiz aus: Du riechst nach dir, nicht nach dem Mainstream.',
          'Nischendüfte sind häufig teurer, halten dafür aber oft sehr lange und überzeugen mit Tiefe und Charakter. Schon ein Sprühstoss genügt meist.'
        ]
      },
      {
        heading: 'Lohnt sich der höhere Preis?',
        body: [
          'Nicht jeder Nischenduft ist automatisch besser als ein guter Designer-Duft – am Ende zählt, ob er dir gefällt und zu dir passt.',
          'Mein Tipp: Teste Nischendüfte zuerst über eine kleine Abfüllung oder Probe, bevor du den grossen Flakon kaufst. So vermeidest du teure Fehlkäufe.',
          'Übrigens: Auch unter günstigen Marken gibt es Düfte, die in eine ähnlich edle Richtung gehen – schau dazu in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte-frauen',
    title: 'Die besten Sommerdüfte für Frauen 2026',
    description:
      'Leichte, frische Damendüfte für heisse Tage: fruchtig, floral und sonnig. Unsere Sommer-Favoriten für Frauen 2026 – von günstig bis edel.',
    intro: [
      'Im Sommer dürfen Damendüfte leicht, fruchtig und strahlend sein: ein Hauch Zitrus, sonnige Blüten oder cremige Kokos-Vanille wirken bei Wärme am schönsten – ohne zu erschlagen.',
      'Hier unsere liebsten Sommerdüfte für Frauen aus dem Katalog – von günstig bis edel, für jeden Geschmack.'
    ],
    sections: [
      {
        perfumes: [
          'dolce-gabbana-light-blue',
          'armani-acqua-di-gioia',
          'lattafa-yara',
          'ariana-cloud',
          'marc-jacobs-daisy',
          'sdj-cheirosa-62',
          'dkny-be-delicious',
          'lattafa-mayar'
        ]
      },
      {
        heading: 'Welche Duftrichtung passt im Sommer zu dir?',
        body: [
          'Frisch & spritzig: aquatische und zitrische Düfte (z. B. Light Blue, Acqua di Gioia) wirken sauber und unbeschwert – ideal fürs Büro und für heisse Tage.',
          'Fruchtig & fröhlich: leichte Frucht- und Blütendüfte (z. B. DKNY Be Delicious, Marc Jacobs Daisy) bringen sofort gute Laune.',
          'Sonnig & cremig: Kokos, Pistazie oder weiche Vanille (z. B. Sol de Janeiro Cheirosa 62, Lattafa Yara) sind die kuscheligen Sommerlieblinge für Strand und laue Abende.'
        ]
      },
      {
        heading: 'So hält dein Sommerduft länger',
        body: [
          'Frische Noten verfliegen schneller – trag den Duft auf eingecremte Haut und nimm einen kleinen Zerstäuber für mittags mit.',
          'Sprüh auch vorsichtig auf Haare und Kleidung: Dort hält ein Duft oft länger als auf erhitzter Haut.',
          'Weniger ist mehr: Bei Hitze wirkt jeder Duft intensiver – ein bis zwei Sprühstösse reichen meist völlig.'
        ]
      },
      {
        body: [
          'Du weisst noch nicht, welche Richtung dir steht? Mach unser Duft-Quiz – es findet deinen Sommerduft in unter einer Minute, abgestimmt auf Duftrichtung, Anlass und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'creed-aventus-guenstige-alternativen',
    title: 'Creed Aventus: die besten günstigen Alternativen',
    description:
      'Creed Aventus ist legendär – aber teuer. Diese günstigen Alternativen gehen in die gleiche fruchtig-rauchige Richtung. Unsere Spar-Tipps aus dem Katalog.',
    intro: [
      'Creed Aventus gilt als einer der berühmtesten Herrendüfte überhaupt: fruchtige Ananas, rauchige Birke und edles Moschus-Holz. Der Preis ist allerdings happig.',
      'Die gute Nachricht: Es gibt Düfte, die in eine sehr ähnliche fruchtig-rauchige Richtung gehen – zu einem Bruchteil des Preises. Wichtig ehrlich gesagt: Keiner ist eine exakte Kopie, aber für den Alltag verblüffend nah dran.'
    ],
    sections: [
      {
        heading: 'Die besten Aventus-Alternativen im Vergleich',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Armaf Club de Nuit Intense Man ist die bekannteste Aventus-Alternative überhaupt: fruchtige Ananas, rauchige Birke und Moschus – erstaunlich nah am Original und extrem günstig.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad geht in dieselbe fruchtig-rauchige Richtung, etwas wärmer und süsser abgestimmt – ein langlebiger, projektionsstarker Sparpick.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'armaf-cdn-milestone',
            note: 'Armaf Club de Nuit Milestone geht in eine ähnliche fruchtige Richtung mit Ananas und warmem Ambroxan – moderner und süsser als Aventus, aber klar verwandt.'
          }
        ]
      },
      {
        heading: 'Worauf du bei Aventus-Alternativen achten solltest',
        body: [
          'Die Reihenfolge der Noten kann leicht abweichen: Mal steht die Ananas im Vordergrund, mal das rauchige Holz. Teste am besten auf der Haut.',
          'Günstige Alternativen sind oft sogar projektionsstärker als das Original – ein bis zwei Sprühstösse genügen.',
          'Aventus & Co. passen ganzjährig, kommen aber im Frühling und Herbst besonders schön zur Geltung.'
        ]
      },
      {
        body: [
          'Mehr Spar-Tipps zu anderen teuren Originalen findest du in unserem Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'lattafa-dupes-welches-original',
    title: 'Die besten Lattafa-Dupes: welches Original steckt dahinter?',
    description:
      'Lattafa ist bekannt für günstige Düfte, die teuren Originalen ähneln. Wir zeigen dir, welcher Luxus-Duft hinter den beliebtesten Lattafa-Parfüms steckt.',
    intro: [
      'Die Marke Lattafa hat sich einen Namen gemacht mit warmen, langlebigen Düften zu kleinen Preisen – viele davon erinnern stark an teure Originale.',
      'Hier zeigen wir dir die beliebtesten Lattafa-Düfte und in welche edle Richtung sie gehen. Ehrlich gesagt: Es sind keine exakten Kopien, aber oft verblüffend nah dran.'
    ],
    sections: [
      {
        heading: 'Lattafa & das Original im Vergleich',
        pairings: [
          {
            expensive: 'kilian-angels-share',
            cheap: 'khamrah',
            note: 'Lattafa Khamrah geht in die warme, süss-würzige Richtung von Kilian Angels Share: Dattel, Zimt und Vanille – kuschelig und langlebig, zum Sparpreis.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad trifft die fruchtig-rauchige Aura von Creed Aventus – mit Ananas, Pfeffer und Moschus-Holz.'
          },
          {
            expensive: 'initio-oud-greatness',
            cheap: 'lattafa-oud-for-glory',
            note: 'Lattafa Oud for Glory (Badee al Oud) erinnert an Initio Oud for Greatness: safranig-würziges Oud mit toller Tiefe.'
          }
        ]
      },
      {
        heading: 'Weitere beliebte Lattafa-Düfte',
        perfumes: ['lattafa-yara', 'lattafa-yara-tous', 'lattafa-mayar', 'lattafa-fakhar-men', 'lattafa-ana-abiyedh']
      },
      {
        heading: 'Lohnt sich ein Lattafa-Duft?',
        body: [
          'Für den Preis bieten Lattafa-Düfte erstaunliche Haltbarkeit und Projektion – oft halten sie 8 Stunden und länger.',
          'Sie sind ideal, um eine Duftrichtung auszuprobieren, bevor du viel Geld für ein teures Original ausgibst.',
          'Sparsam dosieren: Viele Lattafa-Düfte sind kräftig – ein bis zwei Sprühstösse reichen meist völlig.'
        ]
      },
      {
        body: [
          'Du suchst Alternativen zu einem bestimmten teuren Duft? Schau in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'parfum-fuer-junge-leute-unter-60-franken',
    title: 'Parfum für junge Leute & Einsteiger unter CHF 60',
    description:
      'Gut riechen muss nicht teuer sein: alltagstaugliche, beliebte Düfte unter CHF 60 für junge Leute und Einsteiger – frisch, süss und unkompliziert.',
    intro: [
      'Der erste eigene Duft soll gut riechen, vielseitig sein und nicht das halbe Taschengeld kosten. Zum Glück gibt es viele beliebte Düfte für kleines Geld.',
      'Hier unsere Favoriten unter CHF 60 – unkompliziert, alltagstauglich und bei jungen Leuten besonders beliebt.'
    ],
    sections: [
      {
        perfumes: [
          'lattafa-yara',
          'khamrah',
          'club-de-nuit-intense',
          'davidoff-cool-water',
          'sdj-cheirosa-62',
          'ariana-cloud',
          'joop-homme',
          'lattafa-mayar'
        ]
      },
      {
        heading: 'Worauf du beim ersten Duft achten solltest',
        body: [
          'Wähle etwas Vielseitiges, das zu Schule, Uni und Freizeit passt – frisch oder leicht süss kommt fast immer gut an.',
          'Achte auf die Haltbarkeit: Gerade arabische Marken wie Lattafa bieten erstaunlich lange Haltbarkeit fürs Geld.',
          'Sparsam dosieren: Ein bis zwei Sprühstösse reichen – zu viel wirkt schnell aufdringlich, gerade in der Schule oder im Bus.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe, um Fehlkäufe zu vermeiden.'
        ]
      },
      {
        heading: 'Frisch oder süss – was passt zu dir?',
        body: [
          'Frisch & sauber: Davidoff Cool Water und Club de Nuit Intense Man wirken gepflegt und kommen breit gut an.',
          'Süss & kuschelig: Lattafa Yara, Khamrah und Ariana Grande Cloud sind warme Lieblinge für alle, die es gemütlich mögen.',
          'Sonnig & verspielt: Sol de Janeiro Cheirosa 62 mit Pistazie und Karamell ist ein echter Komplimente-Magnet.'
        ]
      },
      {
        body: [
          'Unsicher, was zu dir passt? Mach unser Duft-Quiz – in unter einer Minute findest du deine Richtung, abgestimmt auf Geschmack und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'date-duefte-sommer',
    title: 'Date-Düfte im Sommer: frisch & anziehend',
    description:
      'Die besten Düfte fürs Sommer-Date: frisch genug für warme Tage, aber anziehend und in Erinnerung bleibend. Unsere Favoriten für Frauen und Männer.',
    intro: [
      'Beim Sommer-Date ist die Kunst, frisch zu riechen, ohne langweilig zu wirken: leicht genug für warme Abende, aber mit einem anziehenden, warmen Unterton.',
      'Hier unsere liebsten Date-Düfte für den Sommer – für Frauen und Männer.'
    ],
    sections: [
      {
        heading: 'Für Frauen: frisch-fruchtig & anziehend',
        perfumes: ['lattafa-yara', 'ariana-cloud', 'sdj-cheirosa-62', 'narciso-for-her', 'ysl-mon-paris']
      },
      {
        heading: 'Für Männer: frisch mit Charakter',
        perfumes: ['versace-eros', 'ea-stronger-with-you', 'versace-dylan-blue', 'allure-homme-sport', 'prada-luna-rossa-ocean']
      },
      {
        heading: 'Tipps für den richtigen Date-Duft im Sommer',
        body: [
          'Setz auf frische Düfte mit warmem Kern: Sie wirken sauber und nahbar, bleiben aber anziehend in Erinnerung.',
          'Dezent dosieren: Komplimente erntet, wer aus der Nähe gut riecht – nicht, wer den ganzen Raum überduftet. Ein bis zwei Sprühstösse genügen.',
          'Trag den Duft etwas vorher auf, damit sich die spritzige Kopfnote legt und der weichere Kern hervorkommt.',
          'Bei Hitze lieber leichter: Schwere, süsse Abenddüfte können beim Sommer-Date schnell aufdringlich wirken.'
        ]
      },
      {
        body: [
          'Du willst genau deinen Typ treffen? Mach unser Duft-Quiz – es findet deine Lieblingsrichtung in unter einer Minute.'
        ]
      }
    ]
  }
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

// Alle slugs, die in den Artikeln als Düfte verlinkt werden (für die Datenabfrage).
export function guidePerfumeSlugs(): string[] {
  const set = new Set<string>();
  for (const guide of guides) {
    for (const section of guide.sections) {
      section.perfumes?.forEach((s) => set.add(s));
      section.pairings?.forEach((p) => {
        set.add(p.expensive);
        set.add(p.cheap);
      });
    }
  }
  return [...set];
}
