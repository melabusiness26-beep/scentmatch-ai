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
  heroImage?: string;
  intro: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: 'guenstige-alternativen-zu-teuren-dueften',
    title: 'Parfüm-Dupes Schweiz: die besten günstigen Alternativen',
    description:
      'Teure Düfte wie Creed Aventus oder Dior Sauvage haben oft günstige Alternativen (Dupes), die erstaunlich ähnlich riechen. Die besten Parfüm-Dupes für die Schweiz, von frisch bis süß, mit ehrlicher Einschätzung.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Ein sogenanntes „Dupe" ist ein günstiger Duft, der einem teuren Original in der Richtung sehr nahekommt. Gerade in der Schweiz lohnt sich der Blick auf solche Alternativen: ähnlicher Duft, deutlich kleinerer Preis, und du musst nicht zweimal überlegen, ob du die Flasche wirklich aufsprühst.',
      'Wichtig ehrlich gesagt: Ein Dupe ist nie zu 100 % identisch und hält manchmal etwas kürzer. Aber für den Alltag sind viele Alternativen verblüffend gut. Du sparst oft über 200 Franken und kannst das Geld für weitere Entdeckungen nutzen.',
      'Die bekanntesten Dupe-Marken aus dem arabischen Raum (Lattafa, Armaf, Al Haramain) sind nicht mehr das Geheimtipp. Sie sind etabliert, weit verfügbar und bieten erstaunliche Qualität für kleines Geld. Hier sind unsere ehrlichsten Empfehlungen.'
    ],
    sections: [
      {
        heading: 'Die besten Duft-Paare: teuer und die günstige Alternative',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Club de Nuit Intense Man von Armaf gilt als die bekannteste günstige Alternative zu Creed Aventus: fruchtig-rauchig mit Ananas und Birke, für einen Bruchteil des Preises.'
          },
          {
            expensive: 'dior-sauvage',
            cheap: 'lattafa-asad',
            note: 'Dior Sauvage ist einer der meistgesuchten Herrendüfte. Lattafa Asad ist die bekannteste günstige Alternative aus der Sauvage-Familie: dieselbe würzig-ambrierte Grundrichtung mit schwarzem Pfeffer und Ambroxan, allerdings wärmer und süßer und damit am nächsten an der intensiven Variante Sauvage Elixir. Für einen Bruchteil des Preises.'
          },
          {
            expensive: 'armani-acqua-di-gio-homme',
            cheap: 'davidoff-cool-water',
            note: 'Du magst die frische, aquatische Richtung von Acqua di Gio, möchtest aber weniger ausgeben? Davidoff Cool Water ist kein exakter Klon (es riecht etwas seifiger und weniger zitrisch), gehört aber zur gleichen frisch-aquatischen Familie und ist ein günstiger Sommer-Klassiker.'
          },
          {
            expensive: 'ysl-black-opium',
            cheap: 'ariana-cloud',
            note: 'YSL Black Opium ist ein süßer Kaffee-Vanille-Gourmand. Ariana Grande Cloud ist kein exakter Klon (die typische Kaffeenote fehlt), geht aber in dieselbe süß-kuschelige Gourmand-Richtung mit Praline und Vanille, zum kleinen Preis.'
          },
          {
            expensive: 'tobacco-vanille',
            cheap: 'khamrah',
            note: 'Tom Ford Tobacco Vanille ist würzig-süß und teuer. Lattafa Khamrah geht in eine ähnlich warme, süß-würzige Richtung mit Dattel und Zimt, zum kleinen Preis.'
          },
          {
            expensive: 'baccarat-rouge-540',
            cheap: 'lattafa-ana-abiyedh',
            note: 'Baccarat Rouge 540 von Maison Francis Kurkdjian ist einer der meistgesuchten Luxusdüfte überhaupt. Lattafa Ana Abiyedh Rouge gilt in der Duft-Community als die bekannteste günstige Alternative: dieselbe warme Amber-Richtung mit Safran und Amberholz. Kein Klon, aber für den kleinen Preis verblüffend edel.'
          }
        ]
      },
      {
        heading: 'Worauf du bei Dupes achten solltest',
        body: [
          'Teste immer auf der Haut: Ein Dupe riecht auf dem Papierstreifen oder im Fläschchen anders als nach 20 Minuten auf deiner Haut. Gib ihm Zeit.',
          'Haltbarkeit: Günstige Dupes sind manchmal etwas kürzer auf der Haut als das teure Original. Dafür kosten sie oft nur einen Bruchteil. Ein zweiter Sprühstoss am Nachmittag hilft.',
          'Projektion: Viele arabische Dupes haben sogar mehr Projektion als das Original. Sparsam dosieren ist oft der bessere Plan. Ein bis zwei Sprühstösse genügen.',
          'Qualität: Seriöse Dupes (Lattafa, Armaf, Al Haramain) sind eigenständige Düfte in ähnlicher Richtung. Keine minderwertigen Kopien. Die Flakons und Verpackungen sind solide.',
          'Verfügbarkeit: Arabische Dupes sind in der Schweiz bei Notino.ch, Parfumino oder Douglas erhältlich. Die Preise in CHF sind oft noch attraktiver als im deutschen Ausland.'
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
      'Frische, leichte Düfte für den Sommer: aquatisch, zitrisch und unbeschwert. Unsere Empfehlungen für warme Tage, für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/sommerduefte-hero.jpg',
    intro: [
      'Im Sommer dürfen Düfte leicht, frisch und nicht zu schwer sein. Zitrus, aquatische Noten und ein Hauch Salz sind bei Hitze am angenehmsten. Schwere Winterdüfte mit viel Oud, Amber oder intensiver Vanille können im Hochsommer schnell erdrückend wirken, besonders in der Nähe anderer.',
      'Ein guter Sommerduft kombiniert Frische mit einer dezenten Basis: Aquatische Noten oder Zitrus vorne, etwas Moschus oder leichtes Holz im Abgang, damit er nicht sofort verfliegt. Die Dosierung ist im Sommer besonders wichtig: Bei 30 Grad entfaltet sich jeder Duft viel intensiver als im Frühling.',
      'Hier unsere Empfehlungen aus dem Katalog, von günstig bis edel, für Damen, Herren und alle dazwischen.'
    ],
    sections: [
      {
        heading: 'Die besten Sommerdüfte für alle',
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
          'Bei Hitze wirkt ein Duft viel intensiver als im Winter. Weniger ist also mehr. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Leichte Konzentrationen (Eau de Toilette) und frische Familien (Zitrus, aquatisch, grüner Tee) sind angenehmer als schwere, süsse Düfte.',
          'Frische Düfte verfliegen schneller. Ein kleiner Reisezerstäuber für die Tasche hilft, am Nachmittag kurz nachzulegen.',
          'Tagsüber und im Büro gilt: lieber dezent. Schwere Abenddüfte können bei Hitze schnell aufdringlich wirken.'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Welcher Duft passt zu welchem Anlass?',
    description:
      'Büro, Date oder Abend: nicht jeder Duft passt überall. So findest du den richtigen Duft für Alltag, Date und besondere Abende.',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=80&fit=crop',
    intro: [
      'Der gleiche Duft wirkt im Büro anders als beim Date und ein schwerer Abendduft im Grossraumbüro kann schnell für Unmut sorgen. Als Faustregel gilt: tagsüber dezent und sauber, abends darf es wärmer und intensiver sein.',
      'Der Anlass beeinflusst, wie stark du dosierst und welche Duftrichtung passt. Im Büro soll dein Duft angenehm auffallen, nicht dominieren. Beim Date darf er mehr Persönlichkeit zeigen. Abends am Tisch sind opulente Düfte der Abend-Lieblinge willkommen.',
      'Hier passende Empfehlungen für die drei häufigsten Anlässe, sowie Tipps, wie du den richtigen Duft für den richtigen Moment wählst.'
    ],
    sections: [
      {
        heading: 'Für Alltag & Büro: dezent und gepflegt',
        body: ['Frisch, sauber und nicht zu aufdringlich. Damit liegst du im Büro immer richtig. Achte auf leichte Konzentrationen (EdT) und frische bis holzige Familien.'],
        perfumes: ['chanel-bleu-de-chanel', 'terre-dhermes', 'boss-bottled', 'ysl-y-edp', 'le-labo-santal-33']
      },
      {
        heading: 'Für Dates: charmant und anziehend',
        body: ['Etwas süsser, wärmer oder blumiger: Düfte, die in Erinnerung bleiben. Wichtig: Dezent genug für die Nähe, aber präsent genug, um aufzufallen.'],
        perfumes: ['ysl-black-opium', 'coco-mademoiselle', 'lancome-la-vie-est-belle', 'versace-eros', 'pdm-delina']
      },
      {
        heading: 'Für besondere Abende: intensiv und edel',
        body: ['Hier dürfen die grossen, tiefen Düfte ran, mit Projektion und Charakter. Abends ausser Haus darf ein Duft mutig sein und du ihn selbst wählen, ohne Rücksicht auf Büro-Etikette.'],
        perfumes: ['creed-aventus', 'tobacco-vanille', 'mugler-angel', 'tom-ford-oud-wood', 'baccarat-rouge-540']
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süße Düfte: Vanille, Schokolade & Karamell',
    description:
      'Warme, süße Gourmand-Düfte mit Vanille, Schokolade, Karamell und Tonkabohne, kuschelig, sinnlich und perfekt für kühle Tage.',
    heroImage: '/ratgeber/suesse-duefte-hero.jpg',
    intro: [
      'Süsse Düfte, auch Gourmands genannt, riechen nach guten Dingen: Vanille, Schokolade, Karamell, Praline oder Kaffee. Sie wirken warm, einladend und bleiben angenehm in Erinnerung und gehören zu den beliebtesten Duftrichtungen überhaupt, besonders in der kühlen Jahreszeit.',
      'Gourmand-Düfte können sehr unterschiedlich sein: mal leicht und cremig-pudrig, mal tief und würzig mit Tabak oder Gewürzen, mal richtig dessertartig. Wichtig ist, die Dosierung im Griff zu behalten. Süsse Düfte wirken intensiver als frische, und eine Wolke Karamell im vollen Bus ist nicht das Ziel.',
      'Hier unsere süssesten Empfehlungen aus dem Katalog, von günstig bis edel, für Damen, Herren und alle mit einem Faible für verführerische Wärme.'
    ],
    sections: [
      {
        heading: 'Süsse Lieblingsdüfte aus dem Katalog',
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
        heading: 'Welcher süsse Typ bist du?',
        body: [
          'Cremig & dessertartig: Kayali Vanilla 28, Burberry Goddess und Lattafa Yara gehen in die weiche, fast essbare Richtung. Kuschelig, pudrig, ideal für Herbst und Winter.',
          'Kaffee & Praliné: Montale Intense Café und YSL Black Opium kombinieren süsse Noten mit einer dunklen, leicht bitteren Kaffee-Dimension, die erwachsenere Variante.',
          'Würzig & tief: Tobacco Vanille und Khamrah paaren Süsse mit Tabak, Zimt und Dattel. Das wirkt edel und sehr langlebig, aber nichts für zarte Gemüter.',
          'Gourmand Light: Wer es alltagstauglich mag, wählt süsse Düfte mit Holz- oder Moschuskante. Sie wirken weniger schwer und passen besser ins Büro.'
        ]
      },
      {
        heading: 'Worauf du bei süssen Düften achten solltest',
        body: [
          'Süsse Gourmand-Düfte sind oft sehr präsent. Ein bis zwei Sprühstösse reichen, sonst wirken sie schnell zu schwer, besonders in geschlossenen Räumen.',
          'Am schönsten kommen sie in der kühlen Jahreszeit und am Abend zur Geltung. Bei grosser Hitze können süsse Düfte schnell aufdringlich werden; im Sommer lieber dezenter wählen.',
          'Auf trockener Haut hält ein Gourmand-Duft kürzer. Eine geruchsneutrale Bodylotion vorher verlängert die Haltbarkeit deutlich.',
          'Wer es süss, aber alltagstauglich mag, greift zu Varianten mit etwas Frische oder Holz. Das macht sie weniger „dessertartig" und vielseitiger tragbar.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: warm, intensiv & einhüllend',
    description:
      'Wärmende Düfte für Herbst und Winter: Oud, Amber, Vanille und Gewürze, die bei Kälte besonders schön zur Geltung kommen.',
    heroImage: '/ratgeber/winterduefte-hero.jpg',
    intro: [
      'Im Winter brauchen Düfte Kraft und Wärme. Holz, Amber, Oud, Gewürze und süsse Noten entfalten sich bei Kälte besonders schön und umhüllen dich angenehm. Im Sommer wirken dieselben Düfte schnell erdrückend – Winter ist ihre Saison.',
      'Im Winter sind opulente Düfte endlich am richtigen Platz: Orientalische Düfte mit Weihrauch und Moschus, dunkle Holzdüfte mit Oud und Sandelholz, oder reichhaltige Gourmands mit Vanille und Karamell. Bei Kälte entfalten sie ihre volle Tiefe und wirken rund statt aufdringlich.',
      'Hier sind unsere liebsten Winterdüfte aus dem Katalog – von edel bis alltagstauglich, für jeden Geschmack und jede Tageszeit.'
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
          'In der Kälte darf ein Duft kräftiger sein. Warme Noten wie Vanille, Amber, Oud und Gewürze entfalten sich bei niedrigen Temperaturen besonders schön, statt aufdringlich zu wirken, entfalten sie sich langsam und harmonisch.',
          'Höhere Konzentrationen (Eau de Parfum oder Extrait) lohnen sich im Winter, weil sie länger halten und mehr Tiefe haben. Im Sommer wäre dasselbe Extrait zu intensiv.',
          'Auf der Haut hält ein Duft im Winter oft länger als im Sommer. An sehr kalter Luft braucht er aber einen kurzen Moment, um sich zu entfalten. Das ist normal.',
          'Eincremen vor dem Sprühen hilft gerade im Winter: Trockene Heizungsluft entzieht der Haut Feuchtigkeit und lässt Düfte schneller verfliegen. Eine geruchsneutrale Bodylotion gibt dem Duft besseren Halt.',
          'Dosierung: Auch wenn Winterdüfte bei Kälte weniger projizieren, reichen innen (im warmen Restaurant, im Bus) meist ein bis zwei Sprühstösse vollkommen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Die besten Unisex-Düfte: für alle gemacht',
    description:
      'Düfte ohne Geschlecht: vielseitige Unisex-Parfüms, die an jedem gut riechen, von frisch bis warm-holzig.',
    heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80&fit=crop',
    intro: [
      'Unisex-Düfte sind nicht auf Damen oder Herren festgelegt. Sie passen einfach zu dir, egal wer du bist. Oft sind es vielseitige, ausgewogene Kompositionen. Nicht zu süss-blumig, nicht zu holzig-maskulin, sondern irgendwo dazwischen.',
      'Die Kategorie Unisex hat sich in den letzten Jahren enorm entwickelt. Heute tragen Nischenhäuser wie Le Labo, Byredo oder Maison Francis Kurkdjian aktiv dazu bei, dass die Grenze zwischen „für ihn" und „für sie" immer mehr verschwimmt. Zum Vorteil aller.',
      'Hier unsere Lieblinge zum Teilen oder einfach für jeden Geschmack: vielseitig, hochwertig und ohne Schubladendenken.'
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
          'Unisex-Düfte verzichten auf typisch „weibliche" oder „männliche" Klischees und setzen auf ausgewogene, vielseitige Kompositionen. Oft holzig, frisch oder leicht orientalisch, selten rein blumig oder übermässig pudrig.',
          'Sie eignen sich perfekt zum Teilen im Haushalt: Ein Flakon für zwei funktioniert wunderbar, wenn beide ähnliche Duftvorlieben haben. Und für alle, die sich nicht festlegen wollen, sind Unisex-Düfte ohnehin die beste Wahl.',
          'Tipp: Ignorier beim Testen ruhig die „Damen-" und „Herren-"-Schilder. Die meisten wurden willkürlich gesetzt. Entscheidend ist allein, ob der Duft auf deiner Haut schön riecht und zu deinem Stil passt.'
        ]
      },
      {
        heading: 'Worauf du bei Unisex-Düften achten solltest',
        body: [
          'Unisex heisst nicht „langweilig" oder „neutral": Die besten Unisex-Düfte haben viel Charakter. Sie wirken nur nicht stereotyp männlich oder weiblich.',
          'Teste Unisex-Düfte immer auf der eigenen Haut. Durch die fehlende Geschlechter-Codierung entfalten sie sich besonders individuell. Auf mancher Haut wirken sie holziger, auf anderer blumiger.',
          'Viele Unisex-Düfte sind etwas intensiver als klassische Mainstream-Düfte. Starte mit einem Sprühstoss und schau, wie weit er projiziert, bevor du nachdosierst.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-inhaltsstoffe-allergene',
    title: 'Parfum-Inhaltsstoffe & Allergene einfach erklärt',
    description:
      'Was steckt eigentlich in einem Parfum? Alkohol, Duftöl und die deklarationspflichtigen Duftallergene wie Limonene und Linalool, einfach und verständlich erklärt.',
    heroImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&q=80&fit=crop',
    intro: [
      'Auf jeder Parfumverpackung steht eine Liste mit Inhaltsstoffen, oft mit lateinischen Namen, die etwas einschüchternd wirken. Dabei steckt dahinter kein Hexenwerk. Hier erklären wir dir einfach, was wirklich drin ist und worauf empfindliche Haut achten sollte.',
      'Wichtig vorweg: Die genaue Zusammensetzung ist von Duft zu Duft unterschiedlich und kann sich ändern. Die vollständige, gültige Liste findest du immer auf der Verpackung bzw. beim Hersteller. Dieser Artikel erklärt das Allgemeine.'
    ],
    sections: [
      {
        heading: 'Woraus besteht ein Parfum grundsätzlich?',
        body: [
          'Ein Parfum besteht im Kern aus nur drei Hauptbestandteilen:',
          '1. Alkohol (auf der Liste „Alcohol Denat." oder „Alcohol"): Das Trägermittel, das den Duft verteilt und schnell verdunsten lässt. Er macht meist den grössten Anteil aus.',
          '2. Wasser (Aqua): Sorgt für die richtige Konsistenz.',
          '3. Duftöl (Parfum / Fragrance): Die eigentliche Duftmischung aus vielen einzelnen Riechstoffen. Das Herzstück, das den Charakter ausmacht.'
        ]
      },
      {
        heading: 'Warum steht da nur „Parfum" und keine genaue Mischung?',
        body: [
          'Die genaue Duftformel ist ein gut gehütetes Betriebsgeheimnis der Hersteller. Deshalb darf die Mischung der Riechstoffe gesammelt als „Parfum" oder „Fragrance" angegeben werden. Sonst könnte jeder den Duft einfach nachbauen.',
          'Genau deshalb arbeiten wir auf Auressa mit Duftnoten (z. B. Bergamotte, Vanille, Sandelholz): Sie beschreiben, wie ein Duft riecht und wirkt, was für dich viel hilfreicher ist als eine Chemie-Liste.'
        ]
      },
      {
        heading: 'Deklarationspflichtige Allergene: Limonene, Linalool & Co.',
        body: [
          'Bestimmte natürliche Duftbestandteile können bei empfindlichen Menschen Hautreaktionen auslösen. In der EU (und in der Schweiz angelehnt) müssen solche Stoffe ab einer gewissen Menge einzeln genannt werden, deshalb tauchen sie auf der Liste auf. Lange waren das 26 Stoffe; die EU hat die Liste inzwischen deutlich erweitert (auf über 80).',
          'Die häufigsten sind: Limonene (zitrusartig), Linalool (blumig, in Lavendel), Citronellol und Geraniol (rosig), Eugenol (würzig, Nelke), Coumarin (heuartig, süsslich) und Citral.',
          'Wichtig: Diese Stoffe sind nicht „schlecht". Sie stecken auch in vielen natürlichen Ölen und Blüten. Sie werden nur aufgelistet, damit Allergikerinnen und Allergiker sie erkennen können.'
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
        heading: 'Bonus: EdT, EdP oder Parfum: was ist der Unterschied?',
        body: [
          'Der Unterschied liegt in der Konzentration des Duftöls:',
          'Eau de Toilette (EdT): leichter, frischer, hält kürzer, ideal für den Sommer und tagsüber.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langanhaltender. Der häufigste Typ.',
          'Parfum / Extrait: am intensivsten und teuersten, hält am längsten. Schon wenig genügt.'
        ]
      },
      {
        body: [
          'Mein Tipp: Wenn du wissen willst, welche Duftrichtung zu dir passt, mach unser Duft-Quiz. Danach zeigen wir dir die passenden Düfte samt Noten, Saison und Anlass.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-duefte-unter-50-franken',
    title: 'Die besten Düfte unter 50 Franken',
    description:
      'Gut riechen muss nicht teuer sein: Unsere Lieblingsdüfte für unter CHF 50, von frisch bis süss, für Damen, Herren und Unisex.',
    heroImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80&fit=crop',
    intro: [
      'Ein toller Duft muss nicht 150 Franken kosten. Gerade von Marken wie Lattafa, Armaf oder Davidoff gibt es erstaunlich gute Parfüms für kleines Geld. Mit ordentlicher Haltbarkeit, schöner Projektion und einer Zusammensetzung, die sich nicht nach „billig" anfühlt.',
      'In der Schweiz ist die Auswahl an günstigen Düften grösser als viele denken. Notino.ch, Douglas und Parfümerien haben arabische Marken wie Lattafa inzwischen fest im Sortiment. Wer weiss, wo man schaut, findet echte Geheimtipps für 20–40 CHF, die sich neben 200-Franken-Flakons nicht zu verstecken brauchen.',
      'Hier unsere Favoriten unter CHF 50, perfekt zum Ausprobieren, Verschenken oder für jeden Tag.'
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
          'Achte auf die Variante: Oft gibt es bei diesen Marken direkt das intensivere Eau de Parfum, für mehr Tiefe und Haltbarkeit ohne Aufpreis.',
          'Sparsam dosieren: Viele günstige Düfte sind kräftig. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe. So vermeidest du Fehlkäufe, auch im kleinen Budget.'
        ]
      },
      {
        body: [
          'Tipp: Viele dieser günstigen Düfte sind auch starke „Dupes" für teure Originale. Schau dazu in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'wie-lange-haelt-parfum-haltbarkeit',
    title: 'Wie lange hält ein Parfum? Haltbarkeit & richtig auftragen',
    description:
      'Wie du Parfum richtig aufträgst, damit es länger hält, plus warum Düfte verfliegen, welche am längsten halten und wie lange ein Parfum haltbar ist. Mit den langlebigsten Düften aus unserem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80&fit=crop',
    intro: [
      'Wie lange ein Duft hält, hängt von zwei Dingen ab: wie du ihn aufträgst und welcher Duft es ist. Beides erklären wir hier, verständlich und ganz ohne Fachwissen.',
      'Zuerst die besten Tipps zum richtigen Auftragen, danach alles zur Haltbarkeit: warum Düfte verfliegen, welche am längsten halten und wie lange ein Parfum überhaupt haltbar ist.'
    ],
    sections: [
      {
        heading: 'Wohin Parfum auftragen? Die richtigen Stellen',
        body: [
          'Trag Parfum auf die sogenannten Pulspunkte auf: Handgelenke, Halsansatz, hinter den Ohren und in die Ellenbeugen. Dort liegen Blutgefässe nahe an der Haut, die Wärme abgeben. Das hilft, den Duft sanft zu verströmen.',
          'Ein Profi-Trick: Sprüh auch etwas auf den Brustkorb (Dekolleté). Düfte steigen über den Tag nach oben, deshalb hält ein Duft von unten oft länger wahrnehmbar.',
          'Wer mag, sprüht zusätzlich ein bis zwei Stösse auf die Kleidung oder einen Schal. Auf Stoff hält ein Duft oft deutlich länger als auf der Haut. Vorsicht nur bei empfindlichen oder hellen Stoffen, da manche Düfte Flecken hinterlassen können.'
        ]
      },
      {
        heading: 'Wie viele Sprühstösse sind richtig?',
        body: [
          'Als Faustregel: zwei bis vier Sprühstösse reichen für die meisten Düfte völlig. Leichte, frische Düfte (Eau de Toilette) dürfen etwas grosszügiger sein, intensive Düfte (Eau de Parfum, Parfum) brauchen weniger.',
          'Weniger ist fast immer mehr: Du selbst riechst deinen Duft nach kurzer Zeit kaum noch (die Nase gewöhnt sich daran), andere aber sehr wohl. Wer „nachlegt, weil man nichts mehr riecht", überdosiert schnell.',
          'Bei Hitze wirkt ein Duft intensiver als im Winter. Im Sommer also lieber sparsamer dosieren.'
        ]
      },
      {
        heading: 'Der häufigste Fehler: Handgelenke aneinander reiben',
        body: [
          'Fast alle machen es, und es schadet dem Duft: Nach dem Auftragen die Handgelenke aneinanderzureiben. Durch die Reibung entsteht Wärme, die die feinen Kopfnoten „zerbricht" und den Duft schneller verfliegen lässt.',
          'Besser: einfach auftragen und kurz antrocknen lassen. Nicht reiben, nicht föhnen, nicht verwischen.'
        ]
      },
      {
        heading: 'So hält dein Duft den ganzen Tag',
        body: [
          'Trag Parfum auf frisch geduschte, leicht eingecremte Haut auf. Auf trockener Haut verfliegt ein Duft schneller. Eine geruchsneutrale Bodylotion oder Vaseline an den Pulspunkten gibt dem Duft „Halt".',
          'Der beste Zeitpunkt ist direkt nach dem Duschen, wenn die Poren noch leicht geöffnet sind.',
          'Sprüh aus rund 15–20 cm Abstand, damit sich der Duft fein verteilt statt in einem nassen Fleck zu landen.',
          'Für unterwegs lohnt sich ein kleiner Reisezerstäuber: So kannst du am Nachmittag dezent auffrischen, ohne das grosse Fläschchen mitzuschleppen.'
        ]
      },
      {
        heading: 'Warum verfliegt mein Parfum so schnell?',
        body: [
          'Wenn ein Duft kaum hält, liegt es selten am Parfum allein. Häufige Gründe: sehr trockene Haut (der Duft hat nichts, woran er „haften" kann), eine leichte Konzentration wie Eau de Toilette, oder schlicht zu wenig aufgetragen.',
          'Auch die Duftrichtung spielt mit: frische, zitrische Düfte sind von Natur aus flüchtiger als warme, süsse oder holzige Kompositionen.',
          'Und manchmal riechst du deinen eigenen Duft nur selbst nicht mehr, obwohl andere ihn noch deutlich wahrnehmen. Die Nase gewöhnt sich daran (man nennt das Geruchsadaption).'
        ]
      },
      {
        heading: 'Welche Düfte halten von Natur aus am längsten?',
        body: [
          'Als Faustregel halten warme, schwere Duftfamilien länger als leichte, frische:',
          'Gourmand (Vanille, Karamell, Tonkabohne) und orientalische Düfte: sehr langlebig, oft 8–12 Stunden.',
          'Holzige Düfte (Sandelholz, Oud, Patchouli): ebenfalls sehr ausdauernd.',
          'Florale Düfte: mittlere Haltbarkeit, je nach Aufbau.',
          'Frische und zitrische Düfte (Clean): am flüchtigsten, dafür herrlich leicht im Sommer. Hier lohnt sich ein zweiter Sprühstoss am Mittag.'
        ]
      },
      {
        heading: 'Parfum richtig lagern',
        body: [
          'Hitze, Licht und Luft sind die grössten Feinde eines Dufts. So bleibt er länger frisch:',
          'Kühl und dunkel lagern. Ein geschlossener Schrank ist besser als das Fensterbrett.',
          'Nicht im Badezimmer aufbewahren: die ständigen Temperatur- und Feuchtigkeitswechsel lassen den Duft schneller „kippen".',
          'In der Originalverpackung lassen. Der Karton schützt zuverlässig vor Licht.',
          'Den Flakon nicht schütteln und gut verschlossen halten, damit möglichst wenig Luft hineingelangt.'
        ]
      },
      {
        heading: 'Wie lange ist ein Parfum haltbar?',
        body: [
          'Ungeöffnet und kühl gelagert hält ein Parfum oft viele Jahre. Nach dem Öffnen entfaltet es sich am schönsten innerhalb der ersten ein bis drei Jahre.',
          'Woran du erkennst, dass ein Duft „umgekippt" ist: Die Farbe wird deutlich dunkler, er riecht oben säuerlich oder metallisch, oder der Charakter wirkt flach und alkoholisch.',
          'Ein kleiner Hinweis auf der Verpackung: das Tiegel-Symbol mit „12M" oder „24M" gibt an, wie viele Monate der Duft nach dem Öffnen optimal ist.'
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
      },
      {
        body: [
          'Du kennst jetzt die Tricks fürs Auftragen und die Haltbarkeit. Fehlt nur noch der passende Duft? Mach unser Duft-Quiz und finde in unter einer Minute heraus, welche Richtung wirklich zu dir passt.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-geschenk-die-besten-duefte-zum-verschenken',
    title: 'Parfum verschenken: die besten Düfte als Geschenk',
    description:
      'Parfum ist ein wunderschönes Geschenk, wenn es passt. Unsere sicheren Favoriten zum Verschenken für Frauen und Männer, plus Tipps zur Auswahl.',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80&fit=crop',
    intro: [
      'Ein Duft ist ein persönliches, edles Geschenk, wenn er passt. Die Kunst ist, etwas zu wählen, das fast jeder mag: nicht zu speziell, aber trotzdem besonders. Ein klassischer, vielseitiger Duft kommt fast immer besser an als ein ausgefallener Nischen-Geheimtipp, den die beschenkte Person möglicherweise nie getragen hätte.',
      'Wenn du den Geschmack der Person nicht gut kennst, bist du mit beliebten, zugänglichen Düften auf der sicheren Seite. Chanel, Dior oder Lancôme sind fast immer eine gute Wahl. Klassisch und hochwertig.',
      'Hier unsere Geschenk-Favoriten für Frauen und Männer, von frisch bis warm-elegant.'
    ],
    sections: [
      {
        heading: 'Für Frauen',
        perfumes: ['coco-mademoiselle', 'lancome-la-vie-est-belle', 'ysl-black-opium', 'ch-good-girl']
      },
      {
        heading: 'Für Männer',
        perfumes: ['chanel-bleu-de-chanel', 'le-male', 'ea-stronger-with-you', 'boss-bottled']
      },
      {
        heading: 'Tipps für das perfekte Duft-Geschenk',
        body: [
          'Denk an den Stil der Person: Mag sie es eher frisch und dezent oder warm und auffällig? Im Zweifel passt ein vielseitiger Klassiker fast immer.',
          'Eau de Parfum wirkt als Geschenk edler und hält länger als ein leichtes Eau de Toilette. Der Preisunterschied ist oft nicht gross, aber der Eindruck schon.',
          'Ein bekannter, beliebter Duft ist sicherer als ein sehr spezieller. Ausgefallene Nischendüfte sind Geschmackssache. Toll, wenn du den Geschmack der Person gut kennst, riskanter sonst.',
          'Auf Vorrat kaufen: Schau, ob die Person schon einen Duft trägt, den sie liebt. Eine zweite Flasche davon ist fast nie falsch.',
          'Schön verpackt mit einer kleinen Karte zur Duftrichtung macht das Geschenk gleich persönlicher und die beschenkte Person weiss, was sie trägt und warum du es ausgesucht hast.'
        ]
      },
      {
        body: [
          'Unsicher, was die Person mag? Nutze unseren Geschenk-Finder: Er führt dich in 4 Fragen zu perfekten Empfehlungen. Oder verschenk einen Gutschein oder macht das Duft-Quiz gemeinsam: so triffst du den Geschmack viel sicherer.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen mögen',
    description:
      'Welche Herrendüfte kommen besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Männer, von frisch bis süss-würzig.',
    heroImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80&fit=crop',
    intro: [
      'Manche Männerdüfte ernten einfach besonders oft Komplimente. Meist sind es warme, einladende oder sauber-frische Düfte, die angenehm in Erinnerung bleiben. Düfte, die man noch Stunden später wahrnimmt und denkt: „Was riecht der gut?"',
      'Was dabei auffällt: Die grössten Kompliment-Magneten sind selten die lautesten oder extrovertiertesten Düfte. Es sind oft Kompositionen, die etwas Vertrautes und Einladendes haben. Meist eine warme Vanille-Note, sauberer Moschus oder eine fruchtig-holzige Qualität, die anziehend wirkt, ohne zu überfordern.',
      'Hier die Klassiker, die besonders oft Komplimente einheimsen. Kurze Erklärung, warum sie so wirken.'
    ],
    sections: [
      {
        perfumes: [
          'dior-sauvage',
          'le-male',
          'ea-stronger-with-you',
          'versace-eros',
          'ch-bad-boy',
          '1-million',
          'boss-the-scent',
          'dior-fahrenheit'
        ]
      },
      {
        heading: 'Warum diese Düfte so gut ankommen',
        body: [
          'Es sind meist warme, einladende oder sauber-frische Düfte. Sie signalisieren Nähe und Gepflegtheit, statt nur laut zu sein.',
          'Süsse, warme Noten wie Vanille, Tonkabohne, Zimt und süsses Holz gelten als besonders „anziehend" und gemütlich.',
          'Auch frische, saubere Düfte (Zitrus, sauberer Moschus) wirken attraktiv, weil sie nach frisch geduschter Haut riechen.',
          'Dezent dosieren: Komplimente erntet, wer aus der Nähe gut riecht, nicht, wer eine ganze Duftwolke hinterlässt.'
        ]
      },
      {
        body: [
          'Am Ende zählt, dass der Duft zu dir passt und du dich darin wohlfühlst. Mach das Quiz, um deine eigene Richtung zu finden.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Die besten Vanille-Düfte',
    description:
      'Warme, süsse Vanille-Düfte zum Verlieben: kuschelig, sinnlich und perfekt für kühle Tage. Unsere Vanille-Favoriten für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/vanille-duefte-hero.jpg',
    intro: [
      'Vanille ist die wohl beliebteste süsse Note: warm, cremig und einladend. Mal pur und kuschelig, mal kombiniert mit Gewürzen, Tabak oder Karamell. Vanille gehört zu den vielseitigsten Basisnoten der Parfümwelt.',
      'Was Vanille im Duft bewirkt, hängt stark vom Kontext ab. Mit Holz wirkt sie edel und trocken, mit Praline und Kaffee fast essbar, mit Blumen elegant-feminin. Ein guter Vanille-Duft ist selten pur: Die Magie liegt in der Begleitung.',
      'Hier unsere liebsten Vanille-Düfte aus dem Katalog, von cremig-leicht bis würzig-intensiv.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'khamrah',
          'mon-guerlain',
          'ariana-cloud',
          'burberry-goddess',
          'lattafa-yara',
          'jpg-la-belle'
        ]
      },
      {
        heading: 'Welcher Vanille-Typ bist du?',
        body: [
          'Pur & cremig: weiche, dessertartige Vanille wie in Kayali Vanilla 28, kuschelig und süss.',
          'Würzig & warm: Vanille mit Tabak, Zimt oder Dattel (z. B. Tobacco Vanille, Khamrah), tief und erwachsen.',
          'Frisch abgemildert: Vanille mit Holz oder einem Hauch Zitrus wirkt alltagstauglicher und weniger schwer.'
        ]
      },
      {
        heading: 'Worauf du bei Vanille-Düften achten solltest',
        body: [
          'Vanille kann je nach Kontext sehr unterschiedlich wirken: pudrig-elegant, dessertartig-süss oder warm-rauchig mit Tabak und Gewürzen.',
          'Sehr süsse, reine Vanille kann schnell schwer werden. Wer es alltagstauglich mag, wählt Vanille mit Holz, Moschus oder einem Hauch Frische.',
          'Vanille gehört zur Basis und hält von Natur aus lange. Ideal für Herbst, Winter und gemütliche Abende.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Die besten Oud-Düfte: das flüssige Gold der Parfümerie',
    description:
      'Oud (Agarholz) ist eine der edelsten Duftnoten überhaupt: orientalisch, warm, langanhaltend und luxuriös. Die besten Oud-Düfte von günstigen Nischen bis zu exklusiven Meisterwerken.',
    heroImage: '/ratgeber/oud-duefte-hero.png',
    intro: [
      'Oud, auch Agarholz genannt, ist eine der edelsten und teuersten Duftnoten der Welt. Es stammt aus dem Harz des Adlerholzbaums und wird seit Jahrtausenden in der orientalischen Kultur geschätzt. Kein Wunder: Oud ist warm, holzig, leicht rauchig und unglaublich langanhaltend – ein Duft, der sich tief in die Erinnerung eingräbt.',
      'Der Haken: Echter Oud aus reifen Adlerholzbäumen ist extrem selten und kostet ein Vermögen. Deshalb arbeiten die meisten modernen Parfüme mit hochwertigen Oud-Akkorden – synthetische Moleküle, die das Original täuschend echt nachbilden. Das ist nicht nur günstiger, sondern für viele sogar angenehmer im Tragekomfort: prägnanter, aber ausgewogen.',
      'Hier sind unsere liebsten Oud-Düfte: von erschwinglichen Nischen-Schätzen bis zu exklusiven Luxuskreationen. Besonders schön entfalten sie sich in der kühlen Jahreszeit und am Abend.'
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
        heading: 'Oud für Einsteiger: So startest du richtig',
        body: [
          'Wenn du Oud zum ersten Mal trägst, beginne mit weicheren, süsslichen Varianten – etwa Oud mit Rose, Safran oder Vanille. Diese sind zugänglicher und helfen dir, die Richtung kennenzulernen.',
          'Reines, rauchig-medizinisches Oud kann anfangs intensiv wirken. Gib ihm 15 bis 30 Minuten auf der Haut, um dich daran zu gewöhnen. Die Nase passt sich an und der Duft wird runder.',
          'Günstige Oud-Düfte von Marken wie Lattafa, Montale oder Mancera sind perfekt zum Ausprobieren. So lernst du deine Vorliebe kennen, bevor du in exklusive Nischendüfte investierst.'
        ]
      },
      {
        heading: 'Worauf du bei Oud-Düften achten solltest',
        body: [
          'Echtes Oud kostet mehr als Gold. Deshalb nutzen fast alle modernen Düfte hochwertige Oud-Akkorde statt reines Agarholzöl. Das ist völlig normal, weit verbreitet und riecht trotzdem edel und authentisch.',
          'Oud ist intensiv und extrem langlebig. Ein bis zwei Sprühstösse reichen völlig – lieber dezent starten und bei Bedarf nachlegen. Zu viel Oud wirkt schnell aufdringlich.',
          'Die beste Zeit für Oud ist der Herbst und Winter – warm und kuschelig, am besten am Abend oder zu besonderen Anlässen. Im Sommer wirkt Oud oft zu schwer. Kombinier es mit Rose, Safran, Vanille oder Dattel für mehr Eleganz und Balance.'
        ]
      },
      {
        heading: 'Oud-Düfte lagern und pflegen',
        body: [
          'Oud ist kostbar und empfindlich gegenüber Hitze, Licht und Luftsauerstoff. Lagere deine Flasche dunkel und kühl, idealerweise in der Originalverpackung.',
          'Oud-Düfte entwickeln sich über Tage und Wochen auf deiner Haut weiter. Gib deinem neuen Oud Zeit, bevor du ein Urteil fällst. Echte Oud-Liebhaber swear by dem Aging-Effekt – der Duft wird immer schöner.',
          'Wer zu intensives Oud vortäuscht: echte Parfüme mit Oud (EDP/Eau de Parfum mindestens 15 % ätherische Öle) halten deutlich länger als Eau de Toilette.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-zitrus-duefte',
    title: 'Die besten Zitrus-Düfte: frisch, spritztig und voller Energie',
    description:
      'Zitrus-Düfte mit Bergamotte, Zitrone, Grapefruit und Orange: frisch, leicht und full of joy. Perfekt für Sommer, Büro und heisse Tage – garantiert gute Laune.',
    heroImage: '/ratgeber/zitrus-duefte-hero.jpg',
    intro: [
      'Zitrus-Düfte sind das Gegenmittel gegen schwere, dunkle Momente. Zitrone, Bergamotte, Grapefruit und Orange riechen sauber, unbeschwert und strahlend – jeder Sprühstoss hebt die Stimmung. Sie sind leicht, luftig und wirken sofort erfrischend, perfekt für alle, die es unkompliziert und energiegeladen mögen.',
      'Das Besondere: Zitrus ist eine der ältesten Duftrichtungen überhaupt. Bereits seit Jahrhunderten werden Zitrusnoten in orientalischen Parfümen, Eau de Colognes und Frischeparfümen geschätzt. Ihre Frische wirkt zeitlos – egal ob Klassiker wie Acqua di Gio oder moderne Interpretationen.',
      'Der Trick bei guten Zitrus-Düften liegt in der Basis: Pur ist Zitrus herrlich frisch, aber flüchtig. Die besten Zitrus-Kompositionen haben ein holziges, moschusartiges oder würziges Fundament, das die Frische verankert und dem Duft Tiefe und echte Ausdauer schenkt.'
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
          'Fürs Büro: klare, saubere Zitrusdüfte mit Bergamotte oder Zitrone wirken gepflegt, belebend und nie aufdringlich. Ein Klassiker, auf den man sich verlassen kann.',
          'Für heisse Tage: spritzige Grapefruit-, Zitrone- und Orangennoten sind herrlich erfrischend. Sie wirken wie eine Brise und bringen sofortige Abkühlung ins Gemüt.',
          'Für den Abend: Zitrus mit holziger oder würziger Basis (z. B. Vetiver, Zedernholz, schwarzer Pfeffer) bekommt mehr Tiefe, Eleganz und Ausdauer. So wird Zitrus auch für besondere Anlässe geeignet.'
        ]
      },
      {
        heading: 'Worauf du bei Zitrus-Düften achten solltest',
        body: [
          'Zitrus-Noten sind von Natur aus flüchtig: Sie verdampfen schneller als schwere Basis-Noten. Deshalb halten viele Zitrus-Düfte kürzer – ein zweiter Sprühstoss am Mittag wirkt Wunder und verhilft dir über den Tag.',
          'Achte auf eine starke Basis (holzig, moschusartig oder würzig): Sie verankert die Frische und macht den Duft langlebiger. Zedernholz, Vetiver, Moschus oder schwarzer Pfeffer sind ideale Partner für Zitrus.',
          'Lagern im Dunkeln: Zitrus-Düfte sind lichtempfindlich. Lagere sie dunkel und kühl, damit die Noten nicht zu schnell verflüchtigen. So bleibt dein Zitrus-Duft länger frisch und spritzig.'
        ]
      },
      {
        heading: 'Warum Zitrus immer funktioniert',
        body: [
          'Zitrus ist demokratisch: Es gefällt fast allen, wirkt elegant und nie aufdringlich. Ein Zitrus-Duft im Schrank ist wie ein zuverlässiger Freund – du brauchst ihn vielleicht nicht jeden Tag, aber wenn du ihn brauchst, ist er genau richtig.',
          'Perfekt fürs erste Mal: Wenn du gerade dein erstes Parfüm kaufst oder jemandem etwas schenken möchtest, der Dufte noch nicht kennt – Zitrus ist immer eine sichere Wahl.'
        ]
      }
    ]
  },
  {
    slug: 'damenduefte-die-maenner-lieben',
    title: 'Damendüfte, die Männer lieben',
    description:
      'Welche Frauendüfte kommen bei Männern besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Frauen, von süss-warm bis verführerisch.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fit=crop',
    intro: [
      'Manche Damendüfte ziehen einfach magisch an und ernten besonders oft Komplimente, gerade von Männern. Meist sind es warme, süsse oder sinnlich-verführerische Kompositionen, die angenehm in Erinnerung bleiben. Düfte, die man wahrnimmt und sofort denkt: „Was riecht sie gut?"',
      'Was diese Düfte verbindet: eine süss-warme Qualität, die einladend und angenehm ist, ohne zu überwältigen. Vanille, Karamell, weicher Moschus und blumige Noten kommen dabei am häufigsten gut an.',
      'Hier die Düfte, die als echte „Anziehungs-Klassiker" gelten. Ehrlicher Hinweis: Manche Frauen lieben sie, andere finden sie zu süss. Es kommt auf dich an.'
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
          'Meist sind es warme, süsse oder sinnliche Kompositionen, mit Vanille, Amber, Praline oder weissen Blüten, die einladend und verführerisch wirken.',
          'Gourmand-Noten (süss und „essbar") gelten als besonders anziehend, weil sie an Gemütlichkeit und Genuss erinnern.',
          'Auch sauber-pudrige Moschus-Düfte kommen sehr gut an, weil sie nach gepflegter, weicher Haut riechen.',
          'Wichtig: Diese Düfte sind meist präsent. Ein bis zwei Sprühstösse reichen, damit sie anziehend statt aufdringlich wirken.'
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
      'Welcher Duft passt zu deinem Sternzeichen? Vom Widder bis zu den Fischen, pro Zeichen ein Luxus-Duft und eine günstigere Alternative in ähnlicher Duftrichtung.',
    heroImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80&fit=crop',
    intro: [
      'Astrologie ist keine Wissenschaft, aber eine schöne, spielerische Inspiration. Dein Sternzeichen sagt nichts Verbindliches über deinen perfekten Duft, kann aber ein charmanter Startpunkt sein, um deinen Stil zu finden.',
      'Ein Hinweis zur Ehrlichkeit: Die genannten Spar-Picks sind eigenständige Düfte in ähnlicher Duftrichtung, keine identischen Kopien der Luxus-Düfte. Sie gehen in eine verwandte Richtung, riechen aber nicht exakt gleich.',
      'Noch genauer als jedes Sternzeichen ist übrigens unser Duft-Quiz. Ganz unten findest du den Link.'
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
          'Luxus-Pick: Dolce & Gabbana Light Blue. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara. Leicht, fröhlich und unkompliziert, ideal für spontane Tage.'
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
          'Luxus-Pick: Maison Francis Kurkdjian Baccarat Rouge 540. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara Tous. Edel, strahlend und unverwechselbar. Ganz wie der Löwe.'
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
          'Luxus-Pick: Maison Margiela Replica By the Fireplace. Günstigere Alternative in ebenfalls warmer, süß-holziger Richtung: Lattafa Badee al Oud Amethyst. Weiche Amber-, Oud- und süße Noten wirken einhüllend und passen zu ihrer optimistischen Wärme.'
        ],
        perfumes: ['replica-fireplace', 'lattafa-badee-amethyst']
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
          'Luxus-Pick: Le Labo Santal 33. Günstigere Alternative in ähnlich holzig-moderner Richtung: Mancera Cedrat Boisé. Klare Zitrus- und Holznoten wirken modern und eigenständig.'
        ],
        perfumes: ['le-labo-santal-33', 'mancera-cedrat-boise']
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
          'Sternzeichen sind ein schöner, spielerischer Einstieg, aber dein echter Lieblingsduft hängt von deinem persönlichen Geschmack ab, nicht vom Kalender. Unser Duft-Quiz findet ihn in unter einer Minute, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-fuer-einsteiger-erster-signature-duft',
    title: 'Parfum für Einsteiger: so findest du deinen ersten Signature-Duft',
    description:
      'Neu in der Welt der Düfte? So findest du Schritt für Schritt deinen ersten Signature-Duft, ohne teure Fehlkäufe. Mit einfachen Tipps und sicheren Einsteiger-Empfehlungen.',
    heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80&fit=crop',
    intro: [
      'Vor dem Parfumregal zu stehen kann überwältigend sein: hunderte Flakons, fremde Begriffe und stolze Preise. Aber mit ein paar einfachen Tricks findest du deinen Lieblingsduft schneller als du denkst.',
      'Hier bekommst du eine einfache Anleitung für deinen ersten eigenen Duft, ganz ohne Fachchinesisch.'
    ],
    sections: [
      {
        heading: 'Schritt 1: Finde deine Duftrichtung',
        body: [
          'Düfte teilen sich grob in vier Familien: frisch/clean (Zitrus, Meer, sauberer Moschus), süss/gourmand (Vanille, Karamell, Amber), holzig/woody (Sandelholz, Leder, Oud) und blumig/floral (Rose, Jasmin, Pfirsich).',
          'Überleg dir, welche dieser Beschreibungen dich sofort anspricht. Das ist deine Startrichtung. Unser Duft-Quiz nimmt dir diese Einordnung in unter einer Minute ab.'
        ]
      },
      {
        heading: 'Schritt 2: Verstehe die Duftpyramide',
        body: [
          'Ein Parfum verändert sich über die Zeit. Das beschreibt die sogenannte Duftpyramide:',
          'Kopfnoten: der erste Eindruck beim Aufsprühen. Er verfliegt schon nach Minuten.',
          'Herznoten: der Kern des Dufts, der nach kurzer Zeit hervorkommt.',
          'Basisnoten: das, was nach Stunden auf der Haut übrig bleibt.',
          'Wichtig: Beurteile einen Duft nie nur in der ersten Minute. Gib ihm 15 bis 30 Minuten auf der Haut.'
        ]
      },
      {
        heading: 'Schritt 3: Richtig testen, teure Fehlkäufe vermeiden',
        body: [
          'Teste höchstens zwei bis drei Düfte gleichzeitig, sonst überfordert sich die Nase.',
          'Sprüh auf die Haut, nicht nur auf einen Papierstreifen: Auf der Haut riecht jeder Duft individuell.',
          'Trag ihn einen halben Tag und beobachte, ob du ihn noch magst, und wie andere reagieren.',
          'Günstiger Trick: Bestell zuerst eine kleine Abfüllung oder Probe, bevor du den grossen Flakon kaufst.'
        ]
      },
      {
        heading: 'Sichere Einsteiger-Empfehlungen',
        body: [
          'Diese Düfte gelten als vielseitig und leicht zu mögen, ein guter Startpunkt für deinen ersten Signature-Duft.'
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
      'Leichte, blumig-frische Düfte für den Frühling: grüne Noten, Blüten und Zitrus. Unsere Frühlings-Favoriten für Damen und Herren, von günstig bis edel.',
    heroImage: '/ratgeber/die-besten-fruehlingsduefte.jpg',
    intro: [
      'Der Frühling ruft nach leichten, lebendigen Düften: zarte Blüten, grüne Noten und ein Hauch Zitrus passen perfekt zu den ersten warmen Tagen. Die schweren Winterdüfte kommen in die Schublade. Jetzt ist Zeit für Frische und Leichtigkeit.',
      'Wir haben die schönsten Frühlingsdüfte aus unserem Katalog zusammengestellt: für Damen, Herren und alle dazwischen, von erschwinglich bis edel.'
    ],
    sections: [
      {
        heading: 'Die besten Frühlingsdüfte für Damen',
        body: [
          'Blüten, zarte Früchte und ein Hauch Grün: Diese Düfte fangen den Frühling in einer Flasche ein.'
        ],
        perfumes: [
          'marc-jacobs-daisy',
          'chloe-edp',
          'gucci-bloom',
          'dior-miss-dior',
          'dkny-be-delicious',
          'armani-acqua-di-gioia',
          'lattafa-yara'
        ]
      },
      {
        heading: 'Die besten Frühlingsdüfte für Herren',
        body: [
          'Frisch, sauber und lebendig: Diese Herrendüfte sind ideal für wärmere Tage und hinterlassen einen positiven ersten Eindruck.'
        ],
        perfumes: [
          'montblanc-legend',
          'creed-git',
          'pdm-greenley',
          'armani-acqua-di-gio-homme',
          'davidoff-cool-water',
          'allure-homme-sport'
        ]
      },
      {
        heading: 'Günstige Frühlingsdüfte unter 50 CHF',
        body: [
          'Frühling muss nicht teuer sein. Diese Düfte liefern echte Frühlingsfrische zum kleinen Preis,ekt für den Alltag.'
        ],
        perfumes: [
          'davidoff-cool-water',
          'lattafa-yara',
          'sdj-cheirosa-62',
          'club-de-nuit-intense'
        ]
      },
      {
        heading: 'Frühlingsduft für jeden Anlass',
        body: [
          'Alltag & Büro: Leichte florale oder grüne Düfte begleiten dich dezent durch den Tag ohne aufzufallen. Weniger ist mehr. Ein bis zwei Sprühstösse reichen.',
          'Date im Freien: Ein fruchtig-blumiger Duft wirkt frisch, einladend und sympathisch. Vermeide schwere orientalische Düfte. Sie wirken im Frühling zu wuchtig.',
          'Abends & Übergang: Wenn es abends noch kühl wird, darf ein Hauch Moschus oder sanftes Holz im Basisakkord für angenehme Wärme sorgen.',
          'Sport & Outdoor: Aquatische und grüne Düfte sind hier ideal, leicht, sauber und trotzdem präsent.'
        ]
      },
      {
        heading: 'Worauf du beim Kauf achten solltest',
        body: [
          'Konzentration: Eau de Toilette (EdT) ist für den Frühling meist die beste Wahl, leichter, luftiger und günstiger als Eau de Parfum. Bei milderen Frühlingstagen kann ein EdP jedoch angenehm sein.',
          'Dosierung: Im Frühling reichen 1–2 Sprühstösse. Mit steigenden Temperaturen wirkt ein Duft intensiver als gewohnt.',
          'Noten im Fokus: Achte auf Kopfnoten wie Bergamotte, Zitrone, grünen Tee, Maiglöckchen oder Iris. Diese Noten wirken im Frühling besonders lebendig.',
          'Was du vermeiden solltest: Sehr schwere Basis-Noten wie Oud, Tabak oder dicke Vanille passen eher in den Herbst und Winter.',
          'Probiere zuerst: Bestelle wenn möglich eine Probe, bevor du einen ganzen Flakon kaufst. Auf der Haut riecht ein Duft immer anders als im Laden.'
        ]
      },
      {
        heading: 'Die typischen Noten eines Frühlingsdufts',
        body: [
          'Kopfnoten (erster Eindruck): Bergamotte, Zitrone, grüner Apfel, Grapefruit, Mandarine. Frisch und lebendig.',
          'Herznoten (der eigentliche Charakter): Rose, Maiglöckchen, Pfingstrose, Jasmin, Iris, Veilchen – blumig und feminin. Oder für Herren: Lavendel, grünes Gras, Kardamom.',
          'Basisnoten (bleibt auf der Haut): Weisser Moschus, sanftes Holz, Zedernholz, leichte Amber. Gibt Wärme ohne Schwere.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-bueroduefte',
    title: 'Die besten Büro-Düfte: dezent & angenehm',
    description:
      'Bürotaugliche Düfte, die angenehm dezent bleiben und niemanden stören, frisch, sauber und gepflegt. Unsere Empfehlungen für Damen und Herren.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&fit=crop',
    intro: [
      'Im Büro gilt: Ein Duft soll dich begleiten, nicht den ganzen Raum füllen. Dezent, sauber und gepflegt ist hier die beste Wahl und gleichzeitig eine Form von Respekt gegenüber Kolleginnen und Kollegen, die vielleicht empfindlich auf intensive Düfte reagieren.',
      'Im Grossraumbüro, im Meeting oder im Aufzug können starke Düfte schnell unangenehm werden. Das heisst nicht, dass du im Büro ganz auf Parfüm verzichten musst. Du wählst klug: frisch, holzig oder leicht blumig, mit weniger Projektion und ohne süsse oder sehr intensive Basisnoten.',
      'Diese Düfte gelten als angenehm bürotauglich, präsent genug, um wahrgenommen zu werden, aber nie aufdringlich, mit Empfehlungen für Damen und Herren.'
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
          'Trag den Duft eher auf die Kleidung als grossflächig auf die Haut. So bleibt er dezenter.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-das-lange-haelt-beast-mode',
    title: 'Düfte, die extrem lange halten („Beast-Mode")',
    description:
      'Parfums mit enormer Haltbarkeit und Projektion: Diese Düfte halten oft den ganzen Tag, von süss-warm bis dunkel-holzig.',
    heroImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80&fit=crop',
    intro: [
      'Manche Düfte sind echte Ausdauer-Wunder: Einmal aufgesprüht, begleiten sie dich oft den ganzen Tag und sind auch für andere deutlich wahrnehmbar, noch nach Stunden, ohne nachzulegen. Die Duft-Community nennt das „Beast Mode".',
      'Was Beast-Mode-Düfte ausmacht, sind vor allem zwei Faktoren: hohe Konzentration des Duftöls und eine Kombination von Inhaltsstoffen mit starkem Haftungsvermögen. Ambroxan, Iso E Super, Calone, warme Ambernoten und schwere Moschus-Verbindungen sind typische Vertreter. Sie lagern sich auf Haut und Kleidung fest und projizieren weithin.',
      'Hier unsere langlebigsten, projektionsstärksten Düfte. Sparsam dosieren ist hier Pflicht, ein Sprühstoss zu viel, und du bist das Thema des Tages.'
    ],
    sections: [
      {
        perfumes: ['baccarat-rouge-540', 'tobacco-vanille', 'khamrah', 'mugler-angel', 'ysl-black-opium', 'nasomatto-black-afgano', 'jpg-ultra-male', 'lattafa-asad']
      },
      {
        heading: 'So dosierst du Beast-Mode-Düfte richtig',
        body: [
          'Ein Sprühstoss auf die Brust und einer in den Nacken reichen meist für den ganzen Tag.',
          'Im Sommer und in Innenräumen lieber noch sparsamer. Diese Düfte projizieren stark.',
          'Wenn du unsicher bist: einmal in die Luft sprühen und hindurchgehen. So wird der Duft sanfter und gleichmässiger.'
        ]
      },
      {
        heading: 'Wichtig bei sehr starken Düften',
        body: [
          'Hier reicht wirklich ein Sprühstoss. Zu viel wirkt schnell erdrückend, gerade in Innenräumen.',
          'Diese Düfte kommen in der kühlen Jahreszeit und am Abend am besten zur Geltung.',
          'Wenn du es dezenter magst: einmal in die Luft sprühen und hindurchgehen. So wird der Duft sanfter.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-hochzeitsduefte-braut',
    title: 'Hochzeitsdüfte: die schönsten Parfums für die Braut',
    description:
      'Der Duft zum schönsten Tag: elegante, romantische Parfums für die Braut, zeitlos, fein und voller guter Erinnerungen.',
    heroImage: 'https://images.unsplash.com/photo-1519741347686-c1e331fcf8fc?w=1200&q=80&fit=crop',
    intro: [
      'Ein Duft wird zum Souvenir deines grossen Tages: Jahre später erinnert dich ein Hauch davon sofort an die Hochzeit. Das Gehirn verknüpft Erinnerungen eng mit Gerüchen: Der Hochzeitsduft wird für immer mit diesem Tag verbunden bleiben. Deshalb darf er besonders sein.',
      'Als Braut wählst du am besten einen Duft, der zeitlos und elegant ist, nicht der aktuellste Trend, sondern etwas, das du auch in zehn Jahren noch schön findest. Etwas Blumiges, Weiss-Weiches oder leicht Pudrig-Romantisches hat bei Hochzeiten seit Jahrzehnten seinen Platz.',
      'Hier elegante, romantische Düfte, die zu einer Braut wunderbar passen , zeitlos statt trendig, mit Tipps, wie du die richtige Wahl triffst.'
    ],
    sections: [
      {
        perfumes: ['coco-mademoiselle', 'chanel-no-5', 'chloe-edp', 'ysl-libre', 'pdm-delina', 'viktor-rolf-flowerbomb', 'dior-miss-dior', 'jo-malone-pear-freesia']
      },
      {
        heading: 'Wann du deinen Hochzeitsduft aussuchen solltest',
        body: [
          'Plane ein paar Wochen Vorlauf ein, damit du in Ruhe testen und dich entscheiden kannst.',
          'Trag den Kandidaten vorab zu einem schönen Anlass. So verknüpfst du ihn schon mit guten Gefühlen.',
          'Denk an die Jahreszeit: ein leichter, blumiger Duft für die Sommerhochzeit, etwas Wärmeres für den Winter.'
        ]
      },
      {
        heading: 'Tipps für den Hochzeitsduft',
        body: [
          'Wähle etwas Zeitloses, das du auch in Jahren noch schön findest, nicht den lautesten Trend.',
          'Trag den Duft schon ein paar Mal vorher, damit du sicher bist, dass er sich auf deiner Haut richtig anfühlt.',
          'Ein dezenter, eleganter Duft passt meist besser als ein sehr schwerer. Du möchtest umarmt werden, ohne andere zu überduften.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-holzigen-duefte',
    title: 'Die besten holzigen Düfte: edel, warm & zeitlos – seit Jahrhunderten der Klassiker',
    description:
      'Holzige Düfte mit Sandelholz, Zedernholz, Oud und Vetiver: edel, warm, langanhaltend. Von frisch-holzig bis dunkel-cremig – unsere liebsten Holz-Kompositionen für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/holzige-duefte-hero.png',
    intro: [
      'Holzige Düfte sind der Inbegriff von Eleganz und Reife. Sandelholz, Zedernholz, Vetiver und Oud wirken warm, erwachsen und unglaublich tragefreundlich – ob im Büro, beim Date oder zu besonderen Anlässen. Sie sind zeitlos, verlässlich und passen zu fast jeder Jahreszeit.',
      'Das Faszinierende an Holz ist seine Vielseitigkeit: Je nach Art und Begleitung kann Holz cremig und süsslich wirken (Sandelholz), klar und herb-elegant (Zedernholz), frisch-grün (Vetiver) oder dunkel und intensiv (Oud und Leder). Deshalb gibt es für jeden Geschmack ein perfektes Holz-Parfüm.',
      'Hier unsere liebsten holzigen Düfte: von frisch-holzigen Klassikern bis zu dunklen, cremigen Meisterwerken. Jeder Duft wurde ausgewählt, weil er Tiefe, Wärme und echte Qualität ausstrahlt.'
    ],
    sections: [
      {
        perfumes: ['le-labo-santal-33', 'creed-aventus', 'chanel-bleu-de-chanel', 'tom-ford-oud-wood', 'byredo-gypsy-water', 'club-de-nuit-intense', 'dior-homme', 'terre-dhermes']
      },
      {
        heading: 'Welches Holz steckt in dir?',
        body: [
          'Sandelholz: cremig, weich und leicht süsslich – der warme Klassiker. Sehr tragefreundlich, fast universell beliebt. Wirkt sowohl zu Tag als auch zu Nacht angenehm und einladend.',
          'Zedernholz: trocken, klar und elegant – der frische Klassiker. Häufig in frisch-holzigen Düften, gibt Struktur und männlich-gepflegten Charakter. Passt perfekt ins Büro.',
          'Vetiver: erdig-grün und rauchig – der aromatische Klassiker. Gibt Frische, Charakter und sofort erkennbare Persönlichkeit. Unglaublich vielseitig: von sportlich-frisch bis herb-elegant.',
          'Oud & Leder: dunkel, intensiv und edel – die Luxus-Variante. Am schönsten am Abend, in der kühlen Jahreszeit und für besondere Anlässe. Ein Zeichen von Reife und Raffinesse.'
        ]
      },
      {
        heading: 'Holzige Düfte für dein Leben',
        body: [
          'Für den Alltag: Wähle Sandelholz oder Zedernholz mit einer Spur Zitrus oder Kraut. Diese wirken gepflegt und diskret, ohne übertrieben zu wirken.',
          'Für Meetings & das Büro: Frisch-holzige Düfte (mit Zedernholz, Vetiver oder Bergamotte) signalisieren Kompetenz und Sauberkeit. Ein guter Eindruck entsteht aus der Nähe.',
          'Für Abende & besondere Anlässe: Dunklere Hölzer (Oud, Sandelholz mit Gewürzen, Leder) bekommen erst am Abend ihre volle Eleganz und Tiefe. Sie wirken sophistiziert und einprägsam.'
        ]
      },
      {
        heading: 'Worauf du bei holzigen Düften achten solltest',
        body: [
          'Holzige Noten gehören zur Basis und halten von Natur aus lange – ideal für den ganzen Tag, ohne nachspritzen zu müssen.',
          'Frisch-holzige Düfte (mit Zitrus oder Vetiver) passen perfekt in den Alltag und wirken modern. Dunkle, cremige Hölzer wie Sandelholz oder Oud werden ihre volle Pracht erst am Abend oder in den kühleren Monaten entfalten.',
          'Holz harmoniert wunderbar mit Gewürzen (Kardamom, schwarzer Pfeffer), Leder und süssen Noten (Vanille, Karamell). Das macht holzige Düfte zu echten Chamäleons – je nach Begleitung völlig unterschiedlich.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-blumigen-duefte',
    title: 'Die besten blumigen Düfte: feminin, elegant & zeitlos – seit Jahrtausenden die Klassiker',
    description:
      'Blumige Düfte mit Rose, Jasmin, Pfingstrose und Orangenblüte: romantisch, elegant und zeitlos. Von zart-frisch bis opulent-sinnlich – unsere liebsten floralen Meisterwerke für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/blumige-duefte-hero-neu.png',
    intro: [
      'Blumige Düfte sind der Inbegriff von Eleganz und Weiblichkeit. Rose, Jasmin, Pfingstrose, Orangenblüte – diese Blüten wirken zeitlos feminin, romantisch und unglaublich vielseitig. Florale Düfte sind die grösste und älteste Duftkategorie überhaupt. Kein Wunder: echte Blütenöle gehören zu den kostbarsten Rohstoffen der Parfümerie, und ihre Schönheit ist seit Jahrtausenden unerreicht.',
      'Moderne Florals haben sich dramatisch entwickelt: Weg von der klassischen „Blumenvase" hin zu komplexen Kompositionen. Heute kombinieren die besten Florals zarte Blüten mit Frucht, Moschus, Holz oder sogar Gourmand-Noten – das macht sie vielseitiger, moderner und trotzdem unglaublich romantisch.',
      'Hier unsere liebsten floralen Düfte: von hauchzart und frisch über elegant-klassisch bis hin zu opulent und sinnlich. Für Damen, für Herren, für alle, die Blüten lieben.'
    ],
    sections: [
      {
        perfumes: ['coco-mademoiselle', 'chloe-edp', 'gucci-bloom', 'ysl-libre', 'dior-miss-dior', 'chanel-no-5', 'lancome-idole', 'pdm-delina']
      },
      {
        heading: 'Welche Blüte steckt in dir?',
        body: [
          'Rose: zeitlos, romantisch und unendlich vielseitig – mal klassisch und opulent, mal modern mit Frucht, Moschus oder sogar Oud kombiniert. Die Königin unter den Blüten.',
          'Jasmin & Orangenblüte: warm, sinnlich und leicht betörend. Sie wirken intim und sinnlich, besonders schön am Abend oder in der kühlen Jahreszeit.',
          'Pfingstrose & Maiglöckchen: frisch, leicht und zart – das ist Frühling im Duft. Perfekt für alle, die es romantisch, aber nicht schwer mögen.',
          'Iris & Veilchen: pudrig-elegant und fein. Für alle, die Blüten lieben, aber subtiler und eleganter als andere Florals mögen.'
        ]
      },
      {
        heading: 'Blumig ist nicht altmodisch',
        body: [
          'Moderne Florals kombinieren Blüten geschickt mit Frucht, Moschus, Holz oder sogar Vanille und wirken dadurch komplett aktuell – alles andere als Omas Parfüm.',
          'Zarte, frische Florals (mit grünen oder fruchtigen Noten) passen perfekt in Frühling und Alltag. Opulente, süsse Blütendüfte entfalten ihre volle Schönheit am Abend und in der kühlen Jahreszeit.',
          'Florale Düfte mit einer Holz-Komponente wirken erwachsener und moderner. Eine Moschus-Basis macht Blütendüfte eleganter und langlebiger.'
        ]
      },
      {
        heading: 'Worauf du bei blumigen Düften achten solltest',
        body: [
          'Echte, hochwertige Blütenöle sind teuer – das sieht man am Preis. Synthetic Florals können auch schön sein, echte Öle haben aber eine Tiefe, die synthetische Versionen nicht erreichen.',
          'Manche Menschen finden Blütendüfte zu „süss" oder „dicht". Das ist normal – wähle dann zarte, frische Florals statt opulente, oder achte auf Florals mit einer holzigen Note.',
          'Florals halten von Natur aus lange, weil die Blüten in der Basis landen. Ideal für den ganzen Tag und für besondere Anlässe.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-frischen-aquatischen-duefte',
    title: 'Die besten aquatischen Düfte: frisch wie eine Meeresbrise – zeitlos & universell',
    description:
      'Aquatische Düfte mit Meeresbrise, Zitrus und salziger Frische: erfrischend, elegant und universell. Von Sommer & Sport bis zum Alltag – unsere liebsten frischen Meisterwerke für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/aquatische-duefte-hero.jpg',
    intro: [
      'Aquatische Düfte sind das Gegenmittel gegen Hitze, Schwere und Unbehagen. Sie riechen nach frischer Luft, Meeresbrise und sauberer Energie – wie ein Sprung ins Wasser an einem klaren Sommertag. Diese Duftkategorie wurde in den 1990ern revolutioniert (Davidoff Cool Water, Armani Acqua di Gioia) und ist seitdem nie weggegangen, aus gutem Grund: Die Kombination aus aquatischen Noten, Zitrus und sauberer Haut-Wärme wirkt universell angenehm – fast niemand verweigert sich dieser Frische.',
      'Das Faszinierende an aquatischen Düften ist ihre Ehrlichkeit und Klarheit. Sie versprechen keine Romantik, keine Verführung, keine tiefe Sinnlichkeit – sie versprechen Klarheit, Erleichterung und pure Lebensenergie. Im Gegensatz zu schweren, orientalischen Düften mit Oud oder Amber sind Aquatische unendlich leicht und präsent zugleich. Sie sind der perfekte Duft für alle, die sich nicht „verkleiden", sondern eine verbesserte Version ihrer selbst sein möchten.',
      'Hier unsere liebsten aquatischen Düfte aus dem Katalog – von günstigen, alltäglichen Klassikern bis zu edlen, zeitlosen Meisterwerken, für Damen, Herren und alle dazwischen.'
    ],
    sections: [
      {
        perfumes: ['dior-sauvage', 'davidoff-cool-water', 'jo-malone-wood-sage-sea-salt', 'prada-luna-rossa-ocean', 'light-blue-homme', 'armani-acqua-di-gioia', 'creed-silver-mountain-water', 'adp-colonia']
      },
      {
        heading: 'Die Frische-Familien: welche passt zu dir?',
        body: [
          'Aquatisch: riechen nach Meer, Wasser und Salz. Es ist eine Illusion von Frische (chemisch-synthetisch), nicht das echte Meer – aber die Illusion ist wunderschön und das ist der Punkt. Meeresbrise-Düfte wie Luna Rossa Ocean oder Creed Silver Mountain Water sind intensiv, salzig und lebensfreudlich.',
          'Zitrisch: die Klassiker mit Zitrone, Bergamotte, Grapefruit und Orange. Sie sind spritzig, hell und sofort erfrischend, aber auch am flüchtigsten. Perfekt für Morgens und für heiße Tage.',
          'Grün & Herbaceous: riechen nach frisch geschnittenem Gras, grünen Blättern, Galbanum und Kräutern. Sie sind natürlicher, fast ländlich – nicht salzig, aber intensiv frisch. Jo Malone Wood Sage & Sea Salt verbindet Grün mit salziger Komponente wunderbar.',
          'Clean-Moschus: die modernen „Wäsche-Düfte" mit sauberm Moschus und leichtem Holz. Sie riechen wie frisch gewaschene Haut, gepflegt und minimal. Diese Kategorie wächst und ist perfekt für alle, die „weniger ist mehr" mögen.'
        ]
      },
      {
        heading: 'Worauf du bei aquatischen Düften achten solltest',
        body: [
          'Haltbarkeit: Aquatische und zitrische Noten verfliegen schneller als schwere Düfte. Das ist normal. Ein zweiter, leichter Sprühstoss am Mittag hält die Frische den ganzen Tag.',
          'Basis-Note ist entscheidend: Eine holzige, moschusartige oder musky-warme Basis macht aquatische Düfte langlebiger. Schau auf die Basis-Noten: Moschus, Sandelholz oder Zedernholz = länger anhaltend.',
          'Dosierung: Frische Düfte können bei sparsamer Dosierung präsenter wirken als schwere Düfte. Ein bis zwei Sprühstösse auf Hals und Handgelenk genügen meist völlig.',
          'Jahreszeit: Im Sommer, nach dem Sport, im Büro oder zur Erfrischung am Nachmittag unschlagbar. Im Winter können aquatische Düfte manchmal zu luftig wirken – hier braucht es eine moschusartige oder süße Basis.'
        ]
      },
      {
        heading: 'Aquatisch ist für jeden Tag – und jede Jahreszeit',
        body: [
          'Sommer & Hitze: Das klassische Anwendungsgebiet. Schwere Düfte wirken erdrückend, aber Aquatische sind pure Erleichterung. Sie kühlen nicht physikalisch, aber psychologisch – eine willkommene mentale Frische.',
          'Sport & Bewegung: Nach dem Fitness, auf der Radtour oder beim Joggen: Aquatische Düfte unterstreichen das Gefühl von Aktivität und Energie. Sie riechen wie „Ich bin in Bewegung, ich bin am Leben".',
          'Alltag & Büro: Weil Aquatische nie schwer oder aufdringlich wirken und fast keine Kopfschmerzen verursachen, sind sie perfekt für lange Arbeitstage und Meetings. Niemand wird von deinem Duft gestört.',
          'Winter & Abend: Im Winter funktionieren Aquatische mit einer warmen, moschusartigen oder fruchtigen Basis wunderbar. Luna Rossa Ocean mit ihrer tieferen Basis oder eine aquatische Duft-Schicht über einem warmen Pullover – elegant und unerwartet.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-moschus-pudrigen-duefte',
    title: 'Pudrige & Moschus-Düfte: weich und sinnlich',
    description:
      'Weiche, pudrige Düfte mit Moschus, Iris und Veilchen, elegant, hautnah und sinnlich. Unsere Favoriten für jeden Tag.',
    heroImage: 'https://images.unsplash.com/photo-1588776814546-ec7e0b65c5d5?w=1200&q=80&fit=crop',
    intro: [
      'Pudrige und moschusartige Düfte wirken weich, gepflegt und angenehm hautnah, wie ein Duft, der dich sanft umhüllt. Sie sind kein lauter Auftritt, sondern das Gegenteil: eine zarte Präsenz, die aus der Nähe besonders schön ist.',
      'Pudrig klingt für manche altmodisch, aber moderne pudrige Düfte haben wenig mit dem Schminktisch der Grossmutter zu tun. Heute kombiniert man Pudernoten wie Iris und Veilchen mit Moschus, leichtem Holz oder sogar frischen Noten. Das Ergebnis ist zeitlos und eleganter als je zuvor.',
      'Hier unsere Empfehlungen für alle, die es elegant, dezent und sinnlich mögen, mit Damen-Favoriten und einem Überblick, welche Note für dich die richtige ist.'
    ],
    sections: [
      {
        perfumes: ['narciso-for-her', 'coco-mademoiselle', 'chanel-no-5', 'lancome-idole', 'ysl-libre', 'prada-paradoxe', 'lattafa-mayar', 'malle-musc-ravageur']
      },
      {
        heading: 'Pudrig oder Moschus: wo ist der Unterschied?',
        body: [
          'Pudrig: weiche, leicht „make-up-artige" Noten wie Iris, Veilchen und Heliotrop, elegant und ein wenig nostalgisch.',
          'Moschus (Musk): sauber-weiche Basisnoten, die nach gepflegter, warmer Haut riechen, sehr hautnah und vielseitig.',
          'Viele Düfte kombinieren beides: Das ergibt den typisch weichen, „frisch geduschten" Charakter.'
        ]
      },
      {
        heading: 'Worauf du bei pudrigen & Moschus-Düften achten solltest',
        body: [
          'Diese Düfte bleiben oft nah an der Haut. Das ist gewollt und wirkt sehr elegant statt aufdringlich.',
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
      'Layering bedeutet, zwei Düfte zu schichten und so deine eigene Duftkreation zu erschaffen. So gelingt das Kombinieren, einfach erklärt.',
    heroImage: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80&fit=crop',
    intro: [
      'Beim Layering trägst du zwei Düfte übereinander und erschaffst so eine ganz persönliche Note, die niemand sonst genau so hat. Das klingt nach Profi-Kunst, ist aber einfacher als gedacht und macht grossen Spass beim Experimentieren.',
      'Viele Nischenmarken empfehlen das Layering sogar ausdrücklich: Le Labo, Byredo oder Maison Margiela verkaufen bewusst unisexe, „neutrale" Düfte, die als Schicht für andere funktionieren. Du brauchst kein teures Arsenal – manchmal reicht ein einfacher Body-Splash als Basis unter deinem Lieblingsduft.',
      'Klingt kompliziert, ist es aber nicht. Mit ein paar einfachen Regeln gelingt es dir sofort und du entdeckst Kombinationen, die kein Parfümeur je so gebaut hat.'
    ],
    sections: [
      {
        heading: 'Die Grundregeln',
        body: [
          'Kombiniere einen einfachen, „glatten" Duft mit einem charaktervollen, zum Beispiel eine Vanille- oder Moschus-Basis mit etwas Würzigem oder Holzigem.',
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
      'Eau de Toilette, Eau de Parfum oder Extrait: was ist der Unterschied? So erkennst du, welche Konzentration für dich die richtige ist.',
    heroImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80&fit=crop',
    intro: [
      'Auf Flakons steht „EdT", „EdP" oder „Parfum". Diese Kürzel sagen, wie stark ein Duft konzentriert ist und das beeinflusst direkt, wie lange er hält, wie weit er projiziert und wie teuer er ist. Der Unterschied liegt in der Konzentration des Duftöls im Trägeralkohol.',
      'Mehr Duftöl bedeutet: intensiver, langlebiger, teurer. Aber nicht immer besser. Ein frisches Eau de Toilette für den Sommer macht oft mehr Sinn als ein schweres Parfum. Es kommt auf den Duft und den Anlass an.',
      'Hier erklären wir dir einfach, was die Begriffe bedeuten, welche Variante wann sinnvoll ist und was der Unterschied zwischen EdT und EdP der gleichen Duftlinie in der Praxis bedeutet.'
    ],
    sections: [
      {
        heading: 'Die wichtigsten Konzentrationen',
        body: [
          'Eau de Cologne (EdC): sehr leicht und frisch, hält nur wenige Stunden.',
          'Eau de Toilette (EdT): leicht und frisch, ideal für Sommer und Tag, hält meist 3 bis 5 Stunden.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langlebiger. Der häufigste Typ, hält oft 6 bis 8 Stunden.',
          'Parfum / Extrait: die intensivste und teuerste Variante, hält am längsten. Schon wenig genügt.'
        ]
      },
      {
        heading: 'Welche Variante ist die richtige für mich?',
        body: [
          'Für den Sommer, das Büro und tagsüber: eher EdT, leicht und frisch.',
          'Für Herbst, Winter, Abende und mehr Haltbarkeit: EdP oder Parfum.',
          'Tipp: Die gleiche Duftlinie riecht als EdT oft etwas frischer und als EdP etwas wärmer. Es lohnt sich, beide zu testen.'
        ]
      }
    ]
  },
  {
    slug: 'haeufige-parfum-fehler',
    title: '5 häufige Parfum-Fehler: und wie du sie vermeidest',
    description:
      'Verreiben, falsch lagern, zu viel sprühen: Die häufigsten Parfum-Fehler und wie du sie ganz einfach vermeidest.',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80&fit=crop',
    intro: [
      'Beim Umgang mit Parfum schleichen sich schnell kleine Fehler ein, die Haltbarkeit und Duftbild verschlechtern, oft ohne, dass man es merkt. Viele dieser Fehler macht fast jeder, einfach weil sie niemand erklärt hat.',
      'Die gute Nachricht: Sie sind leicht zu beheben. Hier die fünf häufigsten Parfum-Fehler und wie du sie ganz einfach vermeidest. Ab sofort riecht dein Duft länger, schöner und intensiver.'
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
        body: ['Mehr Duft heisst nicht besser. Ein bis zwei Sprühstösse reichen meist. Zu viel wirkt aufdringlich, und die eigene Nase gewöhnt sich daran.']
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
      'Parfums von Marken mit Schweizer Wurzeln wie Chopard und Gisada, elegant und hochwertig. Kuratiert von Auressa, deiner Schweizer Duft-Plattform.',
    heroImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80&fit=crop',
    intro: [
      'Auressa wird in der Schweiz kuratiert und wir finden es schön, wenn Düfte auch einen lokalen Bezug haben. In der Duftwelt gibt es mehrere Marken mit echten Schweizer Wurzeln: von Genfer Luxushäusern bis zu modernen Schweizer Duftlabels.',
      'Schweizer Qualität hat in der Parfümerie einen guten Ruf: sauber, präzise, hochwertig. Das zeigt sich nicht nur in der Uhren- und Schmuckindustrie, sondern auch in der kleinen, feinen Duftwelt.',
      'Hier ein feiner Blick auf Düfte mit Schweizer Bezug, kuratiert von Auressa, deiner Schweizer Duft-Plattform.'
    ],
    sections: [
      {
        perfumes: ['gisada-ambassador', 'gisada-ambassadora', 'chopard-happy', 'davidoff-cool-water', 'davidoff-cool-water-woman']
      },
      {
        heading: 'Marken mit Schweizer Wurzeln',
        body: [
          'Chopard: Das Luxushaus aus Genf ist vor allem für Schmuck und Uhren bekannt, macht aber auch elegante Düfte wie Happy Chopard.',
          'Davidoff: Die Marke geht auf Zino Davidoff aus Genf zurück. Cool Water gehört zu den meistverkauften frischen Herrendüften überhaupt.',
          'Gisada: Ein Schweizer Dufthaus mit modernen, eleganten Kompositionen wie Ambassador und Ambassadora.'
        ]
      },
      {
        heading: 'Warum lokal Sinn macht',
        body: [
          'Wir achten bewusst auf Schweizer Preise (CHF) und Verfügbarkeit. Damit du weisst, was wirklich relevant ist.',
          'Düfte mit Schweizer Bezug sind ein schönes, lokales Geschenk, etwa zum Geburtstag oder als Mitbringsel.',
          'Du suchst nicht nach einer bestimmten Marke, sondern nach deinem Duft? Dann mach unser Quiz, das deine Richtung in unter einer Minute findet.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-lattafa-duefte',
    title: 'Die besten Lattafa-Düfte',
    description:
      'Lattafa bietet erstaunlich gute Düfte für kleines Geld, warm, langlebig und oft eine günstige Alternative zu teuren Originalen. Unsere Favoriten.',
    heroImage: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80&fit=crop',
    intro: [
      'Die Marke Lattafa hat in kurzer Zeit viele Fans gewonnen – in der Duft-Community und zunehmend auch bei Mainstream-Käufern. Tolle Haltbarkeit, warme Kompositionen und das alles zu erstaunlich kleinen Preisen: Lattafa hat gezeigt, dass guter Duft keine 150 Franken kosten muss.',
      'Die Marke stammt aus Dubai und produziert seit den 2000ern. Bekannt wurden sie zuerst als Hersteller von Duft-Dupes für teure Originale , aber inzwischen stehen viele ihrer Düfte als eigenständige Favoriten in vielen Sammlungen, neben den teuren Flakons.',
      'Hier unsere liebsten Lattafa-Düfte aus dem Katalog und was jeweils dahintersteckt.'
    ],
    sections: [
      {
        perfumes: ['khamrah', 'lattafa-asad', 'lattafa-yara', 'lattafa-fakhar-men', 'lattafa-oud-for-glory', 'lattafa-ana-abiyedh', 'lattafa-yara-tous', 'lattafa-mayar']
      },
      {
        heading: 'Welcher Lattafa-Duft passt zu dir?',
        body: [
          'Süss & würzig: Khamrah mit Dattel, Zimt und Vanille, kuschelig und winterlich.',
          'Fruchtig & rauchig: Asad in der Richtung von Creed Aventus, ideal für selbstbewusste Auftritte.',
          'Cremig & feminin: Yara und Yara Tous, beliebte, leicht süsse Damenlieblinge.',
          'Frisch & blumig: Mayar für alle, die es dezenter und alltagstauglich mögen.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Viele Lattafa-Düfte gelten als günstige Alternativen zu teuren Originalen, ähnliche Richtung, viel kleinerer Preis.',
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
      'Armaf ist bekannt für preiswerte Düfte mit toller Haltbarkeit, allen voran Club de Nuit. Unsere Armaf-Favoriten für Damen und Herren.',
    heroImage: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80&fit=crop',
    intro: [
      'Armaf hat sich mit der Club-de-Nuit-Reihe einen Namen gemacht: charaktervolle Düfte mit toller Haltbarkeit zu kleinen Preisen. In der Duft-Community ist die Marke aus Dubai seit Jahren ein fester Begriff, besonders Club de Nuit Intense Man ist einer der meistdiskutierten Spar-Düfte überhaupt.',
      'Was Armaf besonders macht: Sie machen keine Geheimnis daraus, dass ihre Düfte von bekannten Originalen inspiriert sind, aber sie pflegen auch einen eigenständigen Stil. Die Qualität ist für den Preis erstaunlich gut, die Haltbarkeit oft beeindruckend.',
      'Hier unsere liebsten Armaf-Düfte aus dem Katalog, mit einem kurzen Überblick, was die einzelnen Varianten ausmacht.'
    ],
    sections: [
      {
        perfumes: ['club-de-nuit-intense', 'armaf-cdn-sillage', 'armaf-cdn-milestone', 'armaf-cdn-untold', 'armaf-club-de-nuit-woman', 'armaf-vanity-femme']
      },
      {
        heading: 'Die Club-de-Nuit-Reihe im Überblick',
        body: [
          'Intense Man: der Bestseller, fruchtig-rauchig und die bekannteste günstige Aventus-Alternative.',
          'Sillage: frischer und etwas grüner, ideal für wärmere Tage.',
          'Milestone und Untold: modern und vielseitig, mit fruchtigen und süssen Akzenten.',
          'Club de Nuit Woman: die feminine, blumig-fruchtige Variante der Reihe.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Club de Nuit Intense Man gilt als eine der bekanntesten günstigen Alternativen zu Creed Aventus.',
          'Armaf-Düfte sind oft kräftig und langlebig. Sparsam dosieren lohnt sich.',
          'Du suchst gezielt nach günstigen Alternativen? Schau in unseren Dupe-Ratgeber.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-herbstduefte',
    title: 'Die besten Herbstdüfte: warm, würzig & gemütlich',
    description:
      'Wärmende Düfte für den Herbst: würzig, holzig und leicht süss, ideal für kühle, goldene Tage. Unsere Herbst-Favoriten für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/herbstduefte-hero.jpg',
    intro: [
      'Der Herbst ist die schönste Zeit für etwas wärmere Düfte: Wenn die Tage kühler und die Blätter golden werden, dürfen würzige, holzige und leicht süsse Noten ran. Sie wirken gemütlich und einhüllend, ohne schon so schwer zu sein wie ein tiefer Winterduft.',
      'Hier unsere liebsten Herbstdüfte aus dem Katalog, von erschwinglich bis edel, für jeden Geschmack.'
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
          'Typische Herbst-Noten sind Tabak, Zimt, Kardamom, Tonkabohne, Leder und warmes Holz. Sie wirken auf kühler Luft besonders rund und gemütlich.',
          'Eau de Parfum lohnt sich jetzt wieder mehr: Es hält länger und entfaltet bei kühleren Temperaturen schön Tiefe. Ein bis zwei Sprühstösse genügen meist.',
          'Tipp: Viele Herbstdüfte funktionieren auch im Winter. Wer flexibel bleiben will, wählt eine würzig-holzige Komposition, die sich über beide Jahreszeiten tragen lässt.'
        ]
      },
      {
        body: [
          'Du bist unsicher, welche Richtung dir steht? Mach unser Duft-Quiz. Es findet deine Lieblingsrichtung in unter einer Minute, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-nischenduefte',
    title: 'Die besten Nischendüfte: besonders & aussergewöhnlich',
    description:
      'Nischendüfte heben sich vom Mainstream ab: eigenständig, hochwertig und aussergewöhnlich. Was Nischenparfums ausmacht und unseree Favoriten aus dem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1200&q=80&fit=crop',
    intro: [
      'Nischendüfte sind die Gegenwelt zu den grossen Mainstream-Parfums: Statt für den Massengeschmack gemacht, setzen sie auf Eigenständigkeit, hochwertige Rohstoffe und einen unverwechselbaren Charakter. Wer etwas Besonderes sucht, das nicht jeder trägt, wird hier fündig.',
      'Der Begriff „Nische" sagt nichts über den Preis – er beschreibt den Ansatz. Nischenmarken wie Le Labo, Byredo oder Xerjoff haben sich bewusst aus dem Massenmarkt herausgehalten, arbeiten oft mit selteneren Rohstoffen und bieten mehr Persönlichkeit als ein Mainstream-Bestseller. Das geht oft mit einem höheren Preis einher, aber nicht immer.',
      'Hier unsere schönsten Nischendüfte aus dem Katalog, von strahlend und modern bis dunkel-holzig und orientalisch.'
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
          'Sie sind in der Regel eigenständiger und „mutiger" als Designer-Düfte, dafür manchmal polarisierender. Genau das macht ihren Reiz aus: Du riechst nach dir, nicht nach dem Mainstream.',
          'Nischendüfte sind häufig teurer, halten dafür aber oft sehr lange und überzeugen mit Tiefe und Charakter. Schon ein Sprühstoss genügt meist.'
        ]
      },
      {
        heading: 'Lohnt sich der höhere Preis?',
        body: [
          'Nicht jeder Nischenduft ist automatisch besser als ein guter Designer-Duft. Am Ende zählt, ob er dir gefällt und zu dir passt.',
          'Mein Tipp: Teste Nischendüfte zuerst über eine kleine Abfüllung oder Probe, bevor du den grossen Flakon kaufst. So vermeidest du teure Fehlkäufe.',
          'Übrigens: Auch unter günstigen Marken gibt es Düfte, die in eine ähnlich edle Richtung gehen. Schau dazu in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte-frauen',
    title: 'Die besten Sommerdüfte für Frauen 2026',
    description:
      'Leichte, frische Damendüfte für heisse Tage: fruchtig, floral und sonnig. Unsere Sommer-Favoriten für Frauen 2026, von günstig bis edel.',
    heroImage: '/ratgeber/sommerduefte-frauen-hero.jpg',
    intro: [
      'Im Sommer funktionieren leichte, fruchtige Damendüfte am besten: ein Hauch Zitrus, sonnige Blüten oder cremige Kokos-Vanille wirken bei Wärme am schönsten. Schwere Düfte mit intensivem Oud oder dicker Vanille wirken bei 30 Grad schnell erdrückend, besonders in der Nähe anderer Menschen.',
      'Ein guter Sommerduft kombiniert Frische mit etwas Substanz: leichte Frucht- oder Blütennoten zu Beginn, ergänzt durch eine cremige oder holzige Basis. Bei Hitze wirken Düfte intensiver als in der kälteren Jahreszeit. Deshalb gilt hier: weniger ist mehr.',
      'Hier sind unsere liebsten Sommerdüfte für Frauen aus dem Katalog – von günstigen Alternativen bis zu edlen Klassikern, von erfrischenden Klassikern bis zu kuschelig-cremigen Stranddüften.'
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
          'Frisch & spritzig: aquatische und zitrische Düfte (z. B. Light Blue, Acqua di Gioia) wirken sauber und unbeschwert, ideal fürs Büro und für heisse Tage.',
          'Fruchtig & fröhlich: leichte Frucht- und Blütendüfte (z. B. DKNY Be Delicious, Marc Jacobs Daisy) bringen sofort gute Laune.',
          'Sonnig & cremig: Kokos, Pistazie oder weiche Vanille (z. B. Sol de Janeiro Cheirosa 62, Lattafa Yara) sind die kuscheligen Sommerlieblinge für Strand und laue Abende.'
        ]
      },
      {
        heading: 'So hält dein Sommerduft länger',
        body: [
          'Frische Noten verfliegen schneller. Trag den Duft auf eingecremte Haut und nimm einen kleinen Zerstäuber für mittags mit.',
          'Sprüh auch vorsichtig auf Haare und Kleidung: Dort hält ein Duft oft länger als auf erhitzter Haut.',
          'Weniger ist mehr: Bei Hitze wirkt jeder Duft intensiver. Ein bis zwei Sprühstösse reichen meist völlig.'
        ]
      },
      {
        body: [
          'Du weisst noch nicht, welche Richtung dir steht? Mach unser Duft-Quiz. Es findet deinen Sommerduft in unter einer Minute, abgestimmt auf Duftrichtung, Anlass und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'creed-aventus-guenstige-alternativen',
    title: 'Creed Aventus: die besten günstigen Alternativen',
    description:
      'Creed Aventus ist legendär, aber teuer. Diese günstigen Alternativen gehen in die gleiche fruchtig-rauchige Richtung. Unsere Spar-Tipps aus dem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Creed Aventus gilt als einer der berühmtesten Herrendüfte überhaupt: fruchtige Ananas, rauchige Birke und edles Moschus-Holz. Er ist seit 2010 ein Klassiker und hat eine fast mythische Stellung in der Duft-Community . Aber der Preis von über 400 CHF für einen Flakon ist happig.',
      'Die gute Nachricht: Es gibt Düfte, die in eine sehr ähnliche fruchtig-rauchige Richtung gehen, zu einem Bruchteil des Preises. Wichtig ehrlich gesagt: Keiner ist eine exakte Kopie. Aventus hat einen ganz eigenen Charakter, den kein Dupe vollständig reproduziert. Für den Alltag sind die Alternativen verblüffend nah dran.',
      'Hier die besten günstigen Alternativen zu Creed Aventus, mit ehrlichem Vergleich.'
    ],
    sections: [
      {
        heading: 'Die besten Aventus-Alternativen im Vergleich',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Armaf Club de Nuit Intense Man ist die bekannteste Aventus-Alternative überhaupt: fruchtige Ananas, rauchige Birke und Moschus, erstaunlich nah am Original und extrem günstig.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad geht in dieselbe fruchtig-rauchige Richtung, etwas wärmer und süsser abgestimmt, ein langlebiger, projektionsstarker Sparpick.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'armaf-cdn-milestone',
            note: 'Armaf Club de Nuit Milestone geht in eine ähnliche fruchtige Richtung mit Ananas und warmem Ambroxan, moderner und süsser als Aventus, aber klar verwandt.'
          }
        ]
      },
      {
        heading: 'Worauf du bei Aventus-Alternativen achten solltest',
        body: [
          'Die Reihenfolge der Noten kann leicht abweichen: Mal steht die Ananas im Vordergrund, mal das rauchige Holz. Teste am besten auf der Haut.',
          'Günstige Alternativen sind oft sogar projektionsstärker als das Original. Ein bis zwei Sprühstösse genügen.',
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
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Die Marke Lattafa hat sich einen Namen gemacht mit warmen, langlebigen Düften zu kleinen Preisen. Viele davon erinnern stark an teure Originale. Das ist kein Zufall, sondern Strategie: Lattafa arbeitet bewusst mit ähnlichen Akkorden wie bekannte Luxusdüfte.',
      'Wichtig zu wissen: Lattafa nennt ihre Düfte keine „Dupes". Sie sind eigenständige Produkte in ähnlicher Duftrichtung. Rechtlich ist das in Ordnung: Eine Duftrichtung lässt sich nicht schützen, nur Name, Logo und Flakon. So darf jeder Parfümeur in eine ähnliche Richtung komponieren.',
      'Hier zeigen wir dir die beliebtesten Lattafa-Düfte und in welche edle Richtung sie gehen. Ehrlich gesagt: Es sind keine exakten Kopien, aber oft verblüffend nah dran und für den Preis eine echte Empfehlung.'
    ],
    sections: [
      {
        heading: 'Lattafa & das Original im Vergleich',
        pairings: [
          {
            expensive: 'kilian-angels-share',
            cheap: 'khamrah',
            note: 'Lattafa Khamrah geht in die warme, süss-würzige Richtung von Kilian Angels Share: Dattel, Zimt und Vanille, kuschelig und langlebig, zum Sparpreis.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad trifft die fruchtig-rauchige Aura von Creed Aventus, mit Ananas, Pfeffer und Moschus-Holz.'
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
          'Für den Preis bieten Lattafa-Düfte erstaunliche Haltbarkeit und Projektion. Oft halten sie 8 Stunden und länger.',
          'Sie sind ideal, um eine Duftrichtung auszuprobieren, bevor du viel Geld für ein teures Original ausgibst.',
          'Sparsam dosieren: Viele Lattafa-Düfte sind kräftig. Ein bis zwei Sprühstösse reichen meist völlig.'
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
      'Gut riechen muss nicht teuer sein: alltagstaugliche, beliebte Düfte unter CHF 60 für junge Leute und Einsteiger, frisch, süss und unkompliziert.',
    heroImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80&fit=crop',
    intro: [
      'Der erste eigene Duft soll gut riechen, vielseitig sein und nicht das halbe Taschengeld kosten. Zum Glück gibt es viele beliebte Düfte für kleines Geld. Gerade arabische Marken wie Lattafa oder Armaf bieten erstaunliche Qualität für 20–40 CHF.',
      'Für junge Leute und Einsteiger gilt: lieber zu frisch und unkompliziert greifen als gleich zum teuren Nischenduft. Ein vielseitiger Duft, der in der Schule, an der Uni und im Ausgang passt, ist wertvoller als ein spezieller Duft, den man nur an bestimmten Abenden tragen kann.',
      'Hier unsere Favoriten unter CHF 60, unkompliziert, alltagstauglich und bei jungen Leuten besonders beliebt.'
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
          'Wähle etwas Vielseitiges, das zu Schule, Uni und Freizeit passt. Frisch oder leicht süss kommt fast immer gut an.',
          'Achte auf die Haltbarkeit: Gerade arabische Marken wie Lattafa bieten erstaunlich lange Haltbarkeit fürs Geld.',
          'Sparsam dosieren: Ein bis zwei Sprühstösse reichen. Zu viel wirkt schnell aufdringlich, gerade in der Schule oder im Bus.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe, um Fehlkäufe zu vermeiden.'
        ]
      },
      {
        heading: 'Frisch oder süss: was passt zu dir?',
        body: [
          'Frisch & sauber: Davidoff Cool Water und Club de Nuit Intense Man wirken gepflegt und kommen breit gut an.',
          'Süss & kuschelig: Lattafa Yara, Khamrah und Ariana Grande Cloud sind warme Lieblinge für alle, die es gemütlich mögen.',
          'Sonnig & verspielt: Sol de Janeiro Cheirosa 62 mit Pistazie und Karamell ist ein echter Komplimente-Magnet.'
        ]
      },
      {
        body: [
          'Unsicher, was zu dir passt? Mach unser Duft-Quiz. In unter einer Minute findest du deine Richtung, abgestimmt auf Geschmack und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'date-duefte-sommer',
    title: 'Date-Düfte im Sommer: frisch & anziehend',
    description:
      'Die besten Düfte fürs Sommer-Date: frisch genug für warme Tage, aber anziehend und in Erinnerung bleibend. Unsere Favoriten für Frauen und Männer.',
    heroImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&fit=crop',
    intro: [
      'Beim Sommer-Date ist die Kunst, frisch zu riechen, ohne langweilig zu wirken: leicht genug für warme Abende, aber mit einem anziehenden, warmen Unterton. Ein klassischer Sommer-Duft hilft, aber er reicht oft nicht allein. Wer beim Date in Erinnerung bleiben will, braucht etwas mit Persönlichkeit.',
      'Die besten Date-Düfte für den Sommer kombinieren zwei scheinbar gegensätzliche Qualitäten: Sie sind frisch genug, um bei Hitze angenehm zu sein , aber warm und sinnlich genug, um nicht austauschbar zu wirken. Versace Eros oder Sol de Janeiro Cheirosa 62 sind gute Beispiele dafür.',
      'Hier unsere liebsten Date-Düfte für den Sommer, für Frauen und Männer, mit Tipps zur richtigen Dosierung.'
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
          'Dezent dosieren: Komplimente erntet, wer aus der Nähe gut riecht, nicht, wer den ganzen Raum überduftet. Ein bis zwei Sprühstösse genügen.',
          'Trag den Duft etwas vorher auf, damit sich die spritzige Kopfnote legt und der weichere Kern hervorkommt.',
          'Bei Hitze lieber leichter: Schwere, süsse Abenddüfte können beim Sommer-Date schnell aufdringlich wirken.'
        ]
      },
      {
        body: [
          'Du willst genau deinen Typ treffen? Mach unser Duft-Quiz. Es findet deine Lieblingsrichtung in unter einer Minute.'
        ]
      }
    ]
  },
  {
    slug: 'zara-parfum-dupes-welches-original',
    title: 'Zara Parfum Dupes: welches Original steckt dahinter?',
    description:
      'Viele Zara-Düfte erinnern stark an teure Designer-Parfums. Wir zeigen die bekanntesten Zara-Dupes und welches Original jeweils dahintersteckt.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Zara ist bekannt für überraschend gute Düfte zum kleinen Preis. Viele davon erinnern stark an teure Designer-Parfums. Kein Wunder: Ein Teil der bekanntesten Zara-Düfte (die Kollektion „Zara Emotions", 2019) wurde von der renommierten britischen Parfümeurin Jo Malone persönlich komponiert.',
      'Ehrlich gesagt: Ein Dupe ist nie zu 100 % identisch und hält oft etwas kürzer. Aber für den Alltag und zum Ausprobieren einer Duftrichtung sind die Zara-Düfte erstaunlich gut und kosten meist unter 20 Franken.',
      'Hier die bekanntesten Zara-Dupes und ihre teuren „Vorbilder". Die genaue Verfügbarkeit wechselt bei Zara saisonal.'
    ],
    sections: [
      {
        heading: 'Die bekanntesten Zara-Dupes und ihr Original',
        body: [
          'Zara Red Vanilla → erinnert an YSL Black Opium: süss-kaffeeartig mit Vanille, ein beliebter Damen-Abendduft.',
          'Zara Vibrant Leather → geht in die Richtung von Creed Aventus: fruchtig-rauchig, der Klassiker unter den „Komplimente-Düften".',
          'Zara Tobacco Collection (Rich Warm Addictive) → erinnert an Tom Ford Tobacco Vanille: würzig-süss, warm, perfekt für den Winter.',
          'Zara Gardenia → wird oft mit edlen Tuberose-/Gardenia-Düften verglichen: cremig-blumig und feminin.',
          'Zara Femme / Zara Woman → leichte, frische Alltagsdüfte, die an beliebte Damen-Klassiker angelehnt sind.',
          'Zara Man Silver / Zara for Men → frische, aquatische Herrendüfte in der Richtung bekannter Sommer-Klassiker.'
        ]
      },
      {
        heading: 'Lohnen sich Zara-Düfte wirklich?',
        body: [
          'Für den Preis: definitiv. Du bekommst eine Duftrichtung zum Ausprobieren, ohne gleich 100+ Franken auszugeben.',
          'Der Kompromiss liegt meist bei der Haltbarkeit und der Sillage (wie weit der Duft im Raum wahrnehmbar ist): Zara-Düfte halten oft ein paar Stunden weniger als das teure Original. Mit dem Auftragen auf eingecremte Haut und etwas auf die Kleidung holst du aber spürbar mehr heraus.',
          'Tipp: Viele Zara-Düfte sind als kleine 30-ml-Flakons oder im Doppelpack erhältlich, ideal zum Testen, bevor du dich für ein teures Original entscheidest.'
        ]
      },
      {
        body: [
          'Du willst wissen, welche Duftrichtung wirklich zu dir passt, egal ob günstig oder edel? Mach unser Duft-Quiz, und schau dir danach unseren Ratgeber „Günstige Alternativen zu teuren Parfüms" für weitere Dupe-Tipps aus unserem Katalog an.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte-maenner',
    title: 'Die besten Sommerdüfte für Männer 2026',
    description:
      'Frische, leichte Herrendüfte für den Sommer: aquatisch, zitrisch und alltagstauglich. Unsere Favoriten für heisse Tage, von günstig bis edel.',
    heroImage: '/ratgeber/sommerduefte-maenner-hero.jpg',
    intro: [
      'Im Sommer brauchen Herrendüfte vor allem eines: Frische. Schwere, süsse Düfte wirken bei Hitze schnell aufdringlich, während aquatische, zitrische und leicht würzige Düfte sauber und anziehend bleiben.',
      'Dazu kommt ein praktischer Grund: Bei Wärme verdunstet Alkohol schneller, der Duft öffnet sich stärker und trägt weiter. Was im Winter dezent wirkt, kann im Sommer den ganzen Raum füllen. Weniger sprühen ist oft die bessere Wahl.',
      'Die besten Sommerdüfte für Männer kombinieren Frische mit einem Hauch Charakter. Tagsüber reicht ein leichter Spritzer – für den Abend darf es eine Spur wärmer und würziger sein. Hier unsere Favoriten aus dem Katalog.'
    ],
    sections: [
      {
        heading: 'Frisch & aquatisch: die sicheren Sommer-Favoriten',
        perfumes: ['davidoff-cool-water', 'armani-acqua-di-gio-homme', 'versace-dylan-blue', 'allure-homme-sport', 'prada-luna-rossa-ocean']
      },
      {
        heading: 'Etwas mehr Charakter: anziehend für laue Abende',
        perfumes: ['versace-eros', 'ea-stronger-with-you', 'invictus']
      },
      {
        heading: 'Worauf du bei Sommerdüften für Männer achten solltest',
        body: [
          'Setz auf leichte Konzentrationen (Eau de Toilette) und frische Familien: aquatisch, zitrisch, grün. Sie wirken bei Hitze angenehmer als schwere, süsse Düfte.',
          'Dezent dosieren: Bei Wärme entfaltet sich ein Duft viel stärker. Zwei bis drei Sprühstösse reichen meist völlig.',
          'Frische Düfte verfliegen schneller. Ein kleiner Reisezerstäuber für die Tasche hilft, am Nachmittag kurz aufzufrischen.',
          'Für Büro und Tag gilt: lieber sauber und zurückhaltend. Die intensiveren Varianten passen besser zum Abend.'
        ]
      },
      {
        body: [
          'Unsicher, welche Richtung zu dir passt? Mach unser Duft-Quiz. Es findet deinen Sommer-Typ in unter einer Minute.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-trends-2026',
    title: 'Parfum-Trends 2026: diese Düfte sind jetzt angesagt',
    description:
      'Welche Duftrichtungen sind 2026 angesagt? Von gourmandigen Dessert-Düften über salzige Haut-Noten bis zum Aufstieg günstiger Nischen-Marken: die wichtigsten Trends.',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=80&fit=crop',
    intro: [
      'Düfte folgen Trends wie Mode. Manche kommen über Social Media (vor allem TikTok), andere über neue Lieblingsnoten. Hier die wichtigsten Parfum-Trends für 2026, einfach erklärt.',
      'Wichtig: Trend heisst nicht „besser". Der schönste Duft ist immer der, der zu dir passt. Trends sind aber eine gute Inspiration, Neues auszuprobieren.'
    ],
    sections: [
      {
        heading: '1. Gourmand bleibt König, jetzt als „Dessert-Duft"',
        body: [
          'Süsse, essbare Noten sind weiter extrem beliebt: Vanille, Karamell, Praline, und neu vermehrt Pistazie, Schokolade und „Dubai-Chocolate"-Anklänge.',
          'Diese Düfte wirken kuschelig und nahbar, perfekt für Herbst und Winter. Wer es nicht zu süss mag, greift zu Varianten mit einer salzigen oder holzigen Kante.'
        ]
      },
      {
        heading: '2. Salzige & „Haut"-Düfte (Skin Scents)',
        body: [
          'Leichte, salzig-warme Düfte, die riechen wie „frisch geduschte Haut in der Sonne", liegen voll im Trend. Noten wie Ambroxan, Moschus und ein Hauch Salz wirken sauber, modern und unaufdringlich.',
          'Ideal für alle, die einen Duft suchen, der nah an der Haut bleibt und nicht den ganzen Raum füllt.'
        ]
      },
      {
        heading: '3. Günstige Nischen- & Klon-Marken boomen',
        body: [
          'Marken wie Lattafa und Armaf haben gezeigt, dass guter Duft nicht teuer sein muss. 2026 greifen immer mehr Menschen bewusst zu günstigen Alternativen statt zum Designer-Original.',
          'Auch „Dupe-Kultur" ist längst kein Geheimnis mehr. Ähnlich riechen für einen Bruchteil des Preises ist Mainstream geworden.'
        ]
      },
      {
        heading: '4. Unisex statt strenger Schubladen',
        body: [
          'Die klare Trennung „für ihn / für sie" verschwimmt weiter. Viele der gefragtesten Düfte sind unisex, holzig-würzig, frisch oder gourmandig, ganz ohne Geschlechter-Etikett.',
          'Trag einfach, was dir gefällt. Das ist der grösste Trend von allen.'
        ]
      },
      {
        body: [
          'Neugierig, welcher Trend zu dir passt? Mach unser Duft-Quiz und entdecke deine Richtung. Wir zeigen dir passende Düfte aus jeder dieser Trend-Welten.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-im-handgepaeck-reise-tipps',
    title: 'Parfüm im Handgepäck: Was ist erlaubt? (Reise-Tipps)',
    description:
      'Flüssigkeiten im Handgepäck: Was gilt für Parfüm? Die 100-ml-Regel einfach erklärt, plus die besten kompakten Reisedüfte für unterwegs.',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&fit=crop',
    intro: [
      'Du willst deinen Lieblingsduft auf Reisen mitnehmen? Dann gilt die EU-Flüssigkeitsregel auch für Parfüm: Alles über 100 ml muss ins aufgegebene Gepäck. Hier was du wissen musst, und welche kompakten Düfte sich für Reisen besonders eignen.',
      'Wichtig: Die Regeln können sich ändern, und es gibt Unterschiede je nach Flughafen und Airline. Prüfe immer vorab die aktuellen Bestimmungen deiner Fluggesellschaft.'
    ],
    sections: [
      {
        heading: 'Die 100-ml-Regel: Was gilt für Parfüm?',
        body: [
          'Im Handgepäck dürfen Flüssigkeiten (auch Parfüm) nur in Behältern bis maximal 100 ml mitgenommen werden. Alle Behälter müssen zusammen in einen transparenten, wiederverschliessbaren Zip-Beutel passen (Fassungsvermögen 1 Liter, ein Beutel pro Person).',
          'Ein 200-ml-Flakon, der nur halbvoll ist, zählt als 200-ml-Behälter und ist nicht erlaubt. Massgeblich ist die Beschriftung des Behälters, nicht der Inhalt.',
          'Im aufgegebenen Gepäck gibt es keine Mengenbeschränkung. Dort darf auch der grosse Lieblingsflakon mit.',
          'Viele Marken bieten 30-ml- und 50-ml-Flakons an, die perfekt für Reisen geeignet sind. Reisezerstäuber (Atomizer) lassen sich zudem mit deinem Lieblingsduft befüllen, platzsparend und regelkonform.'
        ]
      },
      {
        heading: 'Kompakte Reisedüfte aus unserem Katalog',
        perfumes: ['davidoff-cool-water', 'prada-luna-rossa-ocean', 'lattafa-mayar', 'ariana-cloud', 'allure-homme-sport']
      },
      {
        heading: 'Tipps für unterwegs',
        body: [
          'Reisezerstäuber: Leere Flakon-Füller aus dem Drogeriemarkt oder von Muji lassen sich mit deinem Duft befüllen und passen bequem in die Tasche.',
          'Feste Parfüms (Solid Perfume): Als Stift oder Tiegel gibt es Düfte ohne Flüssigkeit. Von der 100-ml-Regel sind sie nicht betroffen. Das Angebot ist aber noch begrenzt.',
          'Tipp: Kaufe am Flughafen im Duty-Free erst nach dem Sicherheitscheck, dort gibt es auch grosse Flakons, die du im Handgepäck mitnehmen darfst.',
          'Trag den Duft lieber auf die Haut als auf die Kleidung: Im Flugzeug lüften sich Kleider kaum, auf der Haut ist der Duft zurückhaltender.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-und-hauttyp-was-passt-zu-meiner-haut',
    title: 'Parfüm und Hauttyp: Wie deine Haut den Duft verändert',
    description:
      'Warum riecht dasselbe Parfüm bei dir anders als bei Freunden? Dein Hauttyp, pH-Wert und Pflegeroutine beeinflussen, wie ein Duft auf dir wirkt. Das steckt dahinter.',
    heroImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&q=80&fit=crop',
    intro: [
      'Ein und dasselbe Parfüm kann auf verschiedenen Menschen völlig unterschiedlich riechen. Das liegt nicht an Einbildung, sondern an echten chemischen Prozessen auf der Haut.',
      'Hier die wichtigsten Faktoren und was du daraus für die Duft-Wahl mitnehmen kannst.'
    ],
    sections: [
      {
        heading: 'Warum riecht Parfüm bei jedem anders?',
        body: [
          'pH-Wert der Haut: Jeder Mensch hat einen leicht unterschiedlichen Haut-pH. Saure Haut (niedriger pH) kann frische, zitrische Noten schneller verflüchtigen lassen; alkalischere Haut hebt sie hervor.',
          'Hautfeuchtigkeit: Trockene Haut hält Düfte kürzer. Gut eingecremte Haut bietet den Duftstoffen eine bessere Oberfläche. Der Duft hält länger und entfaltet sich voller.',
          'Körperwärme: Wärmere Körperzonen (Handgelenk, Hals) verstärken die Projektion eines Dufts. Die natürliche Körpertemperatur beeinflusst, welche Noten sich in den Vordergrund schieben.',
          'Ernährung & Hormone: In kleinerem Ausmass beeinflusst auch das, was du isst, sowie Hormonschwankungen, wie ein Duft auf deiner Haut riecht. Dieser Effekt ist aber wissenschaftlich schwer messbar und individuell sehr verschieden.'
        ]
      },
      {
        heading: 'Tipps je nach Hauttyp',
        body: [
          'Trockene Haut: Creme oder Körperlotion vor dem Parfüm auftragen. Das gibt den Duftstoffen Halt. Reichere, wärmere Düfte (z. B. Vanille, Holz, Moschus) halten tendenziell besser als sehr frische Düfte.',
          'Fettige Haut: Düfte halten in der Regel besser und können intensiver wirken. Weniger auftragen und lieber leichtere Konzentrationen wählen.',
          'Empfindliche Haut: Auf Alkohol und Aldehyde kann empfindliche Haut reagieren. Parfüms mit Naturextrakten oder ohne aggressive Duftstoffe wählen; vor dem Kauf testen.'
        ]
      },
      {
        heading: 'Die wichtigste Konsequenz: immer auf der eigenen Haut testen',
        body: [
          'Eine Duftbeschreibung, eine Rezension oder ein Papierstreifen sagt dir nur, wie ein Parfüm grundsätzlich riecht. Wie es sich auf deiner Haut entwickelt, das weisst du erst nach 20–30 Minuten auf der Haut.',
          'Deshalb lohnen sich Proben: viele Händler geben Proben mit, oder du kannst kleine Abfüllungen (5–10 ml) über Parfümerie-Websites kaufen. So vermeidest du teure Fehlkäufe.'
        ]
      }
    ]
  },
  {
    slug: 'vegane-tierversuchsfreie-parfums',
    title: 'Vegane & tierversuchsfreie Parfüms',
    description:
      'Welche Parfüms sind vegan und tierversuchsfrei? Was steckt hinter Begriffen wie „cruelty free" und welche Duftstoffe können tierischen Ursprungs sein. Klar erklärt.',
    heroImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&q=80&fit=crop',
    intro: [
      'Viele Parfümkäufer fragen sich: Stecken in Parfüms tierische Inhaltsstoffe? Werden sie an Tieren getestet? Die Antwort ist komplizierter als man denkt, und oft schwerer zu überprüfen als bei Kosmetik.',
      'Hier ein ehrlicher Überblick, was die Begriffe bedeuten und was du beim Kauf beachten kannst.'
    ],
    sections: [
      {
        heading: 'Tierische Inhaltsstoffe in Parfüms',
        body: [
          'Klassische Parfümerie nutzte früher Rohstoffe wie Moschus (aus Moschustieren), Ambra (aus Pottwalen), Zibet (aus der Zibetkatze) und Castoreum (aus Bibern). Heute sind die meisten davon in der EU verboten oder nicht mehr zeitgemäss.',
          'Echter tierischer Moschus ist in Europa verboten. Was wir heute als „Moschus" in Parfüms kennen, sind synthetische Muskusverbindungen, also keine echten Tierstoffe.',
          'Ambra (Ambergris) ist legal, sehr selten und teuer. In günstigen Massenparfüms ist es praktisch nie enthalten. Synthetische Alternativen (z. B. Ambroxan) sind heute der Standard.',
          'Andere mögliche tierische Inhaltsstoffe: Lanolin (Wollfett), Honig oder Bienenwachs. Diese stecken eher in Körperpflegeprodukten als in reinen Parfüms, können aber vorkommen.'
        ]
      },
      {
        heading: 'Tierversuche: „Cruelty Free" im Parfümbereich',
        body: [
          'In der EU sind Tierversuche für Kosmetik und deren Inhaltsstoffe verboten. Das bedeutet aber nicht, dass ein in der EU verkauftes Parfüm automatisch weltweit ohne Tierversuche hergestellt wird.',
          'Für den Verkauf in China waren bis vor kurzem Tierversuche teils Pflicht (für importierte Kosmetik). Das hat sich für einige Produktkategorien geändert, aber die Situation ist im Wandel.',
          'Zertifizierungen wie PETA „Beauty Without Bunnies" oder „Leaping Bunny" geben Orientierung, sind aber freiwillig. Nicht zertifiziert heisst nicht zwingend, dass Tierversuche stattfinden.',
          'Die grossen Luxushäuser (Chanel, Dior, etc.) verkaufen in China und sind daher oft nicht „Leaping Bunny"-zertifiziert, aber das muss nicht bedeuten, dass sie aktiv Tierversuche in Auftrag geben.'
        ]
      },
      {
        heading: 'Düfte mit veganer und cruelty-free Ausrichtung',
        body: [
          'Einige kleinere Nischenmarken setzen bewusst auf vegane Inhaltsstoffe und verzichten auf Tierversuche. Sie kommunizieren das oft explizit.',
          'Unser Tipp: Schreib den Hersteller direkt an, wenn dir das Thema wichtig ist. Die meisten grossen Marken haben einen Kundenservice, der Auskunft geben kann.',
          'Für eine zuverlässige, aktuelle Liste veganer Parfümmarken eignen sich spezialisierte Seiten wie PETA.org (Beauty Without Bunnies-Datenbank) oder Leaping Bunny: dort kannst du konkrete Marken und Produkte prüfen.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-proben-abfuellungen-schweiz',
    title: 'Wo bekomme ich Parfüm-Proben & Abfüllungen in der Schweiz?',
    description:
      'Bevor du 150 Franken ausgibst: So kommst du günstig an Proben und Abfüllungen, in Schweizer Parfümerien, online und per Versand.',
    heroImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80&fit=crop',
    intro: [
      'Ein Parfüm riecht auf dem Papierstreifen anders als auf deiner Haut. Und nach 2 Stunden nochmals anders. Deshalb macht es Sinn, bevor du einen Flakon für 100–200 Franken kaufst, zuerst eine Probe zu testen.',
      'Hier die besten Wege, um an Parfüm-Proben und Abfüllungen zu kommen, in der Schweiz und online.'
    ],
    sections: [
      {
        heading: 'In der Parfümerie & Drogerie',
        body: [
          'Müller, Manor Beauty, Douglas und Marionnaud geben in der Regel kostenlose Probenstreifen aus Testdisplays mit. Beim Kauf anderer Produkte gibt es manchmal auch kleine Proben-Fläschchen, einfach nachfragen.',
          'In gehobenen Parfümerien (z. B. Osswald Zürich) kannst du Düfte auf der Haut testen und hast Zeit, sie zu beurteilen. Gutes Personal lässt dir Raum dafür.',
          'Empfehlung: Beschränke dich auf 2–3 Düfte pro Besuch. Zu viele Düfte gleichzeitig erschnuppern, überfordert die Nase schnell.'
        ]
      },
      {
        heading: 'Online: Abfüllungen kaufen',
        body: [
          'Über Plattformen wie Decant X (decantx.com), Parfumerie.ch oder spezialisierten Foren/Communities (Reddit r/fragrance) kannst du kleine Abfüllungen (2–10 ml) von bekannten und Nischendüften kaufen.',
          'Auf ebay.ch und ricardo.ch werden ebenfalls Proben und Abfüllungen angeboten. Qualität und Echtheit variieren, achte auf bewertete Verkäufer.',
          'Notino.ch bietet bei einigen Düften kleine Travelsize-Flakons (10–30 ml) zu günstigerem Preis als der grosse Flakon an, ein guter Einstieg ohne grossen Aufwand.'
        ]
      },
      {
        heading: 'Discovery Sets der Hersteller',
        body: [
          'Viele Nischenmarken bieten offizielle „Discovery Sets" an: 5–8 kleine Proben ihrer Kollektion in einem Set für rund 30–60 CHF. Der Betrag wird manchmal beim späteren Kauf angerechnet.',
          'Beispiele: Le Labo, Byredo, Maison Margiela Replica: diese Marken verkaufen ihre Discovery Sets direkt auf ihrer Website oder bei spezialisierten Parfümerien.',
          'Für günstigere Marken wie Lattafa oder Armaf gibt es oft keine offiziellen Kits. Hier helfen Abfüllungs-Plattformen oder die kleinen Flakons direkt kaufen.'
        ]
      },
      {
        body: [
          'Du weisst noch nicht, welche Duftrichtung überhaupt zu dir passt? Mach erst unser Duft-Quiz. Dann weisst du, welche Düfte du testen solltest, bevor du eine Probe kaufst.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-erdbeer-duefte',
    title: 'Die besten Erdbeer-Düfte: süß & fruchtig',
    description:
      'Parfüms, die herrlich nach reifen Erdbeeren duften: süß, fruchtig und sommerlich. Unsere besten Erdbeer-Düfte von günstig bis edel.',
    heroImage: '/ratgeber/erdbeer-duefte-hero.png',
    intro: [
      'Erdbeer-Düfte sind fruchtig, süss und sorgen sofort für gute Laune. Sie wirken jung und verspielt, mal frisch-spritztig, mal kombiniert mit Sahne, Vanille oder weissen Blüten. Sie gehören zu den beliebtesten und zugänglichsten Duftrichtungen überhaupt – perfekt für alle, die es unkompliziert und fröhlich mögen.',
      'In der Parfümwelt ist Erdbeere fast immer eine Kombination aus verschiedenen synthetischen Fruchtmolekülen. Echter Erdbeerextrakt ist zu flüchtig und schwierig zu verarbeiten. Das Ergebnis riecht aber verblüffend echt – oft sogar schöner und runder als die echte Frucht selbst. Die besten Erdbeer-Kompositionen verbinden die Süsse mit einer stabilen Basis, damit der Duft nicht sofort verfliegt.',
      'Hier unsere liebsten Erdbeer-Düfte aus dem Katalog – von frisch und leicht bis warm und cremig. Für Sommer, Dates und alle Momente, in denen du es fruchtig-süss und beschwingt magst.'
    ],
    sections: [
      {
        perfumes: [
          'burberry-her',
          'ysl-mon-paris',
          'lattafa-eclaire',
          'vs-bombshell'
        ]
      },
      {
        heading: 'Worauf du bei Erdbeer-Düften achten solltest',
        body: [
          'Fruchtige Erdbeer-Noten wirken jung, verspielt und sommerlich – ideal für den Alltag, Dates und warme Tage. Sie sind einsteigerfreundlich und brauchen keine grosse Gewöhnung.',
          'Achte auf die Basis: Erdbeere mit Vanille, Karamell oder Moschus (z. B. Lattafa Eclaire) wird wärmer und haltbarer, behält aber ihre Süsse. Erdbeere mit Blüten (z. B. YSL Mon Paris) bleibt eleganter und frischer – ideal für Büro und Alltag.',
          'Erdbeer-Noten sind präsent und intensiv. Ein bis zwei Sprühstösse reichen völlig aus. Wer es dezenter mag, dosiert sparsam – Erdbeere entfaltet sich schnell und gleichmässig auf der Haut.'
        ]
      },
      {
        body: [
          'Nicht sicher, ob fruchtig-süss wirklich dein Typ ist? Mach unser Duft-Quiz. Es findet deine Lieblingsrichtung in unter einer Minute.'
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

// Alle in einem Ratgeber verlinkten Duft-slugs (perfumes + pairings).
function guideDuftSlugs(guide: Guide): Set<string> {
  const set = new Set<string>();
  for (const section of guide.sections) {
    section.perfumes?.forEach((s) => set.add(s));
    section.pairings?.forEach((p) => {
      set.add(p.expensive);
      set.add(p.cheap);
    });
  }
  return set;
}

// Zu häufige Wörter im slug, die nicht für Verwandtschaft zählen sollen.
const RELATED_STOPWORDS = new Set([
  'die', 'der', 'das', 'und', 'zu', 'fuer', 'den', 'dem', 'ein', 'eine',
  'besten', 'parfum', 'parfums', 'duft', 'duefte', 'mit', 'im', 'am', 'auressa'
]);

function guideKeywords(guide: Guide): Set<string> {
  return new Set(
    guide.slug.split('-').filter((w) => w.length > 2 && !RELATED_STOPWORDS.has(w))
  );
}

// Verwandte Ratgeber für interne Verlinkung (gut für SEO und Verweildauer).
// Bewertung: Jaccard-Ähnlichkeit der verlinkten Düfte (so dominieren grosse
// Artikel mit vielen Düften nicht alles), gemeinsame slug-Stichwörter als
// zweites Signal; bei Gleichstand bleibt die Katalog-Reihenfolge erhalten.
export function relatedGuides(slug: string, count = 3): Guide[] {
  const current = getGuide(slug);
  if (!current) return [];
  const currentDuefte = guideDuftSlugs(current);
  const currentKeywords = guideKeywords(current);

  return guides
    .filter((g) => g.slug !== slug)
    .map((g, idx) => {
      const duefte = guideDuftSlugs(g);
      let shared = 0;
      for (const s of duefte) if (currentDuefte.has(s)) shared++;
      const union = currentDuefte.size + duefte.size - shared;
      const jaccard = union > 0 ? shared / union : 0;
      let sharedKeywords = 0;
      for (const w of guideKeywords(g)) if (currentKeywords.has(w)) sharedKeywords++;
      return { guide: g, jaccard, sharedKeywords, idx };
    })
    .sort(
      (a, b) =>
        b.jaccard - a.jaccard || b.sharedKeywords - a.sharedKeywords || a.idx - b.idx
    )
    .slice(0, count)
    .map((x) => x.guide);
}

// Kategorien für die Ratgeber-Übersicht (Gruppierung der Artikel).
// Reihenfolge der Kategorien und der slugs bestimmt die Anzeige.
// Artikel, die in keiner Kategorie stehen, landen automatisch unter „Weitere".
export type GuideCategory = { title: string; slugs: string[] };

export const guideCategories: GuideCategory[] = [
  {
    title: 'Nach Jahreszeit',
    slugs: [
      'die-besten-fruehlingsduefte',
      'die-besten-sommerduefte',
      'die-besten-sommerduefte-frauen',
      'die-besten-sommerduefte-maenner',
      'die-besten-herbstduefte',
      'die-besten-winterduefte'
    ]
  },
  {
    title: 'Nach Duftart',
    slugs: [
      'suesse-duefte-vanille-schokolade-karamell',
      'die-besten-vanille-duefte',
      'die-besten-erdbeer-duefte',
      'die-besten-oud-duefte',
      'die-besten-zitrus-duefte',
      'die-besten-holzigen-duefte',
      'die-besten-blumigen-duefte',
      'die-besten-frischen-aquatischen-duefte',
      'die-besten-moschus-pudrigen-duefte',
      'die-besten-unisex-duefte'
    ]
  },
  {
    title: 'Für Anlass & Typ',
    slugs: [
      'welcher-duft-zu-welchem-anlass',
      'die-besten-bueroduefte',
      'date-duefte-sommer',
      'die-besten-hochzeitsduefte-braut',
      'parfum-geschenk-die-besten-duefte-zum-verschenken',
      'maennerduefte-die-frauen-moegen',
      'damenduefte-die-maenner-lieben',
      'parfum-das-lange-haelt-beast-mode',
      'parfum-nach-sternzeichen'
    ]
  },
  {
    title: 'Günstig & Dupes',
    slugs: [
      'guenstige-alternativen-zu-teuren-dueften',
      'creed-aventus-guenstige-alternativen',
      'lattafa-dupes-welches-original',
      'zara-parfum-dupes-welches-original',
      'die-besten-duefte-unter-50-franken',
      'parfum-fuer-junge-leute-unter-60-franken'
    ]
  },
  {
    title: 'Marken & Besonderes',
    slugs: [
      'die-besten-lattafa-duefte',
      'die-besten-armaf-duefte',
      'die-besten-nischenduefte',
      'parfums-mit-schweizer-bezug'
    ]
  },
  {
    title: 'Wissen & Tipps',
    slugs: [
      'parfum-fuer-einsteiger-erster-signature-duft',
      'wie-lange-haelt-parfum-haltbarkeit',
      'edt-edp-parfum-unterschied',
      'parfum-inhaltsstoffe-allergene',
      'parfum-layering-duefte-kombinieren',
      'haeufige-parfum-fehler',
      'parfum-trends-2026',
      'parfum-und-hauttyp-was-passt-zu-meiner-haut',
      'vegane-tierversuchsfreie-parfums',
      'parfum-proben-abfuellungen-schweiz',
      'parfum-im-handgepaeck-reise-tipps'
    ]
  }
];
