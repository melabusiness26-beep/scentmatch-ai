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
    title: 'Parfüm-Dupes: Intelligente Alternatives für die Schweiz – Luxus muss nicht teuer sein',
    description:
      'Große Düfte muss nicht teuer kosten. Ein Dupe ist ein intelligenter Duft in ähnlicher Richtung zum Luxus-Original, aber für einen Bruchteil des Preises. Creed Aventus, Dior Sauvage, Baccarat Rouge – für alle gibt es großartige Alternativen. Hier unsere ehrlichsten Empfehlungen.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Ein „Dupe" ist nicht ein billiger Klon, sondern eine intelligente Alternative. Ein Duft in ähnlicher Richtung, von einer seriösen Marke, zu einem Bruchteil des Preises. Die Geschichte der Dupes ist eine Geschichte von Demokratisierung. Vor 15 Jahren war Creed Aventus ein Duft nur für diejenigen mit echtem Geld. Heute kannst du in ähnliche Richtung für CHF 25 statt CHF 250 sprühen. Das hat die arabischen Duft-Häuser wie Lattafa, Armaf und Al Haramain möglich gemacht. Sie haben verstanden, dass es möglich ist, großartige Düfte zu machen, ohne Marken-Luxe-Preismarke zu haben.',
      'Ein wichtiger Punkt: Ein Dupe ist nicht 100 Prozent identisch mit dem Original, und es muss auch nicht sein. Ein Dupe ist ein Respekt-Tribut, nicht ein Betrug. Es sagt: Ich mag die Richtung dieses Duftes, ich mag die Geschichte, aber ich spare gerne 200 Franken. Ein Dupe hält manchmal etwas kürzer, es hat eine leicht andere Haltbarkeit oder Projektion, aber als eigenständiger Duft ist es oft großartig. Die Qualität der arabischen Marken ist exponentiell besser geworden. Das sind keine minderwertigen Imitate mehr, sondern Düfte mit eigenem Charakter und echter Qualität.',
      'Hier sind unsere liebsten Dupe-Paare und die Strategie, wie du Dupes intelligent nutzt, ohne dich selbst zu belügen.'
    ],
    sections: [
      {
        heading: 'Die besten Dupe-Paare: Das Luxus-Original und die intelligente Alternative',
        body: [
          'Jede Paarung hier ist ehrlich. Das bedeutet nicht, dass der Dupe und das Original identisch riechen. Es bedeutet, dass sie in der gleichen Familie sind, ähnliche Stimmungen erzeugen, und dass ein Dupes absolut als eigenständiger, großartiger Duft funktioniert. Manche Dupes sind sogar in einigen Aspekten besser als das Original.'
        ],
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Creed Aventus ist die Legende. Club de Nuit Intense von Armaf wird oft als der beste Aventus-Dupe genannt, und zu Recht: fruchtig, mit Ananas und Birke, rauchig, würzig, langlebig. Es ist nicht identisch, aber es lebt in der gleichen Welt. Preisgefälle: CHF 250 vs. CHF 35.'
          },
          {
            expensive: 'dior-sauvage',
            cheap: 'lattafa-asad',
            note: 'Dior Sauvage ist der meistverkaufte Duft der Welt. Lattafa Asad ist die arabische Antwort: würzig, amber-warm, schwarzer Pfeffer, ähnliche Basis. Es ist nicht identisch (wärmer und würziger), aber es funktioniert eigenständig wunderbar. Preisgefälle: CHF 120 vs. CHF 30.'
          },
          {
            expensive: 'armani-acqua-di-gio-homme',
            cheap: 'davidoff-cool-water',
            note: 'Eine bekannte Alternative ist Davidoff Cool Water, die lange vor Dupes ein Klassiker war. Nicht identisch, aber gleiche frisch-aquatische Familie. Interessanterweise ist Cool Water jetzt sogar als eigenständiger Klassiker bekannt. Preisgefälle: CHF 100 vs. CHF 25.'
          },
          {
            expensive: 'ysl-black-opium',
            cheap: 'ariana-cloud',
            note: 'YSL Black Opium ist ein süßer Kaffee-Vanille-Gourmand für Damen. Ariana Grande Cloud geht nicht in exakt die gleiche Richtung, aber es ist ein großartiger süß-cremiger Gourmand für weniger Geld. Als eigenständiger Duft ist es fantastisch. Preisgefälle: CHF 130 vs. CHF 40.'
          },
          {
            expensive: 'tobacco-vanille',
            cheap: 'khamrah',
            note: 'Tom Ford Tobacco Vanille ist intensiv, würzig, teuer und männlich kodiert. Lattafa Khamrah ist die arabische Variante: Dattel, Zimt, orientalische Wärme, wunderbar. Nicht identisch, aber gleiche würzig-süße Energie. Preisgefälle: CHF 180 vs. CHF 30.'
          },
          {
            expensive: 'baccarat-rouge-540',
            cheap: 'lattafa-ana-abiyedh',
            note: 'Baccarat Rouge 540 ist eines der meistgesuchten Luxus-Düfte. Lattafa Ana Abiyedh Rouge ist die Antwort: warme Amber, Safran, Amberholz. Es ist nicht identisch, aber für den zehntel Preis ist es erstaunlich edel. Preisgefälle: CHF 400 vs. CHF 40.'
          }
        ]
      },
      {
        heading: 'Die Philosophie der Dupes: Intelligenz statt Illusion',
        body: [
          'Ein Dupe zu tragen ist nicht Betrug, es ist Intelligenz. Es bedeutet: Ich verstehe, dass Duft-Qualität nicht nur vom Namen kommt. Ein großartiger Duft von Lattafa kostet einen Bruchteil von Creed, weil Lattafa nicht Jahrzehnte Marketing zahlt. Das macht Lattafa nicht minderwertig, es macht es smart.',
          'Ein Dupe ist auch nicht „unsichtbar". Menschen, die beide kennen, werden sagen: Das riecht anders als das Original. Und ja, natürlich. Ein Dupe ist kein Betrug, weil es nicht behauptet, das Original zu sein. Es sagt: Ich bin in der gleichen Familie. Das ist vollkommen legitim.',
          'Die Etikette für Dupe-Nutzer ist einfach: Sei ehrlich. Wenn jemand fragt, was du trägst, sage nicht „Das ist Creed Aventus". Sage: Das ist Club de Nuit Intense, ein großartiger Duft in ähnlicher Richtung. Das ist elegant und ehrlich.'
        ]
      },
      {
        heading: 'Wie du Dupes richtig bewertest und testest',
        body: [
          'Teste immer auf der Haut vor dem Kauf. Ein Duft riecht auf dem Papierstreifen komplett anders als nach 20 Minuten auf deiner Haut. Gib dem Duft Zeit, sich auf deiner Körperwärme zu entwickeln. Das erste Urteil ist nicht das Endurteil.',
          'Vergleiche nicht nach einem Sprühstoss. Manche Dupes riechen beim ersten Sprühstoss anders als nach einer Stunde, wenn sich die mittleren Noten entwickeln. Trag den Duft einen ganzen Tag, bevor du entscheidest, ob er dir gefällt.',
          'Haltbarkeit und Projektion sind echte Parameter, nicht Fehler. Ein Dupe hält manchmal zwei Stunden weniger als das Original. Das ist ok, weil du für den zehnten Preis bezahlst. Wenn du Langlebigkeit brauchst, achte darauf, aber akzeptiere, dass Kompromisse normal sind.',
          'Qualität: Seriöse Dupe-Marken wie Lattafa, Armaf und Al Haramain machen keine minderwertigen Produkte. Die Flakons sind solide, der Duft riecht großartig, die Verpackung ist respektvoll. Das sind echte Alternativen, nicht billige Fälschungen.'
        ]
      },
      {
        heading: 'Wo du Dupes in der Schweiz kaufst',
        body: [
          'Die besten arabischen Dupes sind online bei Notino.ch, Parfumino oder Douglas erhältlich. Die Schweizer Preise sind oft noch attraktiver als die deutschen Preise, weil diese Marken auf den Schweizer Markt optimiert haben.',
          'Achte auf Authentizität. Kaufe nur bei etablierten, vertrauenswürdigen Online-Shops. Lattafa, Armaf und Al Haramain sind alle legitime, registrierte Marken mit echten Düften.',
          'Versand und Lieferzeit: Diese Shops bieten schnellen Versand in die Schweiz. Du wartest normalerweise nicht länger als eine Woche, manchmal sogar nur Tage.'
        ]
      },
      {
        heading: 'Der intelligente Weg: Dupes als Einstieg',
        body: [
          'Hier ist ein Geheimnis der Duft-Community: Viele Dupe-Nutzer sind nicht arme Menschen, die sich das Original nicht leisten können. Sie sind intelligente Menschen, die verstanden haben, dass Duft-Qualität von der Komposition kommt, nicht vom Namen. Sie vergleichen ein Club de Nuit Intense mit Creed Aventus und sagen: Der Dupe ist großartig für den Preis, und ich spare CHF 200 für weitere Experimente.',
          'Ein Dupe ist auch ein perfekter Einstieg. Du magst die Idee von Creed Aventus, aber du willst nicht CHF 250 auf einen Blind-Buy riskieren. Club de Nuit Intense ist CHF 35 und du wirst wissen, ob dir diese Duft-Familie gefällt. Das ist klug.',
          'Unser Tipp: Mach zuerst unser Duft-Quiz, um deine Richtung herauszufinden. Danach nutze Dupes, um diese Richtung günstig zu erkunden. Wenn dir eine Familie gefällt, investiere in das Original später, wenn du wirklich sicher bist. Das ist die intelligenteste Dupe-Strategie.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte',
    title: 'Die besten Sommerdüfte: Leichtigkeit, Frische & Eleganz für heiße Tage',
    description:
      'Der richtige Sommerduft ändert alles. Entdecke Düfte, die dich erfrischt, elegant und unbeschwert durch warme Tage bringen. Von frischen Klassikern über moderne Nischen-Favoriten bis zu überraschenden Geheimtipps: für Alltag, Strand, Date und festliche Aperitifs. Dein Sommer-Signature wartet.',
    heroImage: '/ratgeber/sommerduefte-hero.jpg',
    intro: [
      'Sommerdüfte sind kein Luxus, sondern eine Notwendigkeit. Bei 30 Grad Hitze wirkt ein schwerer Winterduft mit Oud und intensiver Amber schnell erdrückend, nicht nur für dich selbst, sondern auch für diejenigen in deiner Nähe. Die Geschichte der modernen Sommerdüfte beginnt Anfang der neunziger Jahre, als Designer erkannten, dass Frische eine eigene Kunstform ist: nicht einfach „kein Duft", sondern eine bewusste, sorgfältig komponierte Leichtigkeit. Ein guter Sommerduft soll dich erfrischt fühlen lassen, dein Selbstvertrauen stärken und gleichzeitig elegant wirken, egal ob du gerade aus dem See kommst oder im Büro sitzt.',
      'Die Intelligenz eines Sommerduftes liegt in seiner Balance. Eine großartige Sommerkompositon beginnt mit frischen, hellen Noten vorne (Zitrus, Bergamotte, aquatische Salzigkeit), hat aber eine subtile, angenehme Basis, damit der Duft nicht nach einer Minute verfliegt. Bei Hitze passiert etwas Magisches mit Düften: Sie entfalten sich schneller, intensiver und anders als bei kühlerem Wetter. Ein Duft, der im Frühling diskret ist, wird im Juli plötzlich präsent. Das zu verstehen ist der Schlüssel zur richtigen Dosierung und Wahl.',
      'Hier findest du unsere liebsten Sommerdüfte aus dem Katalog, sortiert nach Geschmack und Anlass. Einige sind zeitlose Klassiker, die es seit Jahrzehnten gibt. Andere sind moderne Nischen-Entdeckungen, die nur wenige kennen. Zusammen bilden sie eine Sommer-Kollektion, die für jeden Moment passt.'
    ],
    sections: [
      {
        heading: 'Die besten Sommerdüfte für alle – von klassisch bis nischiert',
        body: [
          'Ein großartiger Sommerduft funktioniert unabhängig vom Geschlecht. Manche der populärsten Sommer-Klassiker wurden ursprünglich für Männer konzipiert, werden aber gleich häufig von Frauen getragen. Das liegt daran, dass echte Frische universell ist. Die folgenden Düfte haben eines gemeinsam: Sie wirken erfrischend, elegant und nie aufdringlich, egal wie heiß es draußen ist.'
        ],
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
        heading: 'Die verschiedenen Sommer-Familien: Welche passt zu dir?',
        body: [
          'Aquatische Düfte wirken wie eine kühle Meeresbrise. Sie riechen nach Wasser, Salz und Frische, manchmal mit einem Hauch Moschus im Hintergrund. Diese Familie ist perfekt, wenn du es absolut hell und erfrischend magst, ohne süße oder holzige Noten. Klassiker wie Acqua di Gio oder Cool Water gehören hierher.',
          'Zitrus-Düfte sind die Klassiker unter den Sommerdüften. Sie basieren auf Zitrusnoten wie Bergamotte, Zitrone, Grapefruit oder Orange. Sie wirken belebend, natürlich und jung. Zitrus-Düfte halten oft nicht ganz so lange wie aquatische, aber ihr frischer Punch am Morgen ist unschlagbar.',
          'Frisch-Holzige oder Grüne Düfte kombinieren Frische mit subtilen holzigen oder grünen Noten (wie grüner Tee, Galbanum oder zedernartigen Elementen). Sie wirken etwas strukturierter als reine Aquatik oder Zitrus, aber immer noch leicht. Perfekt für diejenigen, die ein bisschen mehr Charakter mögen, ohne auf Frische zu verzichten.',
          'Frische Gourmands sind eine moderne Erfindung: Sie kombinieren frische Noten mit subtilen süßlichen Elementen, etwa Kokosnuss oder Vanille. Das klingt widersprüchlich, funktioniert im Sommer aber wunderbar, weil die Süße nicht überwältigend wirkt und die Frische dominiert.'
        ]
      },
      {
        heading: 'Die Kunst der Sommerdosierung und Länge',
        body: [
          'Bei Hitze ist weniger definitiv mehr. Bei 25 Grad oder höher wirkt jeder Duft intensiver als bei angenehmen 15 Grad. Ein Sprühstoss, den du im Frühling kaum riechen würdest, kann im Juli überraschend präsent sein. Die goldene Regel lautet: Beginne mit einem Sprühstoss und dosiere beim nächsten Mal höher, wenn du merkst, dass du mehr brauchst. Ein bis zwei Sprühstösse reichen im Sommer für die meisten Menschen völlig aus.',
          'Frische Düfte halten oft nicht so lange wie intensive Winterdüfte. Das ist völlig normal und kein Qualitätsmangel. Ein Sommerduft, der drei Stunden hält, ist perfekt dimensioniert. Leichte Eau de Toilette-Konzentrationen sind im Sommer oft die bessere Wahl als schwere Eau de Parfums, weil sie natürlicher verdunsten und die Hitze die Projektion eh verstärkt.',
          'Praktischer Tipp: Bewahre einen kleinen Zerstäuber mit deinem Lieblingsduft in der Tasche auf. Nach dem Schwimmen, nach dem Mittagessen oder wenn du merkst, dass der Duft verflogen ist, ein kurzer Sprühstoss erfrischt dich nicht nur olfaktorisch, sondern auch mental. Das ist Teil des Sommerlichkeit-Gefühls.'
        ]
      },
      {
        heading: 'Sommerdüfte für jeden Kontext',
        body: [
          'Im Alltag und beim Sport brauchst du einen Duft, der dich erfrischen kann, ohne unangenehm zu riechen, wenn du ins Schwitzen kommst. Aquatische und reine Zitrus-Düfte sind hier ideal. Sie vertragen sich mit Schweiß besser als süßliche oder holzige Düfte. Ein sportlicher Sommerduft sollte leicht sein und schnell verflogen, damit du ohne schlechtes Gewissen trainieren kannst.',
          'Am Strand ist Leichtigkeit das oberste Gebot. Die salzige, nach Sonne riechende Qualität aquatischer Düfte ist hier perfekt. Vermeide zu intensive oder zu süße Düfte, weil sie mit Sonnencreme und Meerwasser seltsam interagieren können. Reine, frische Düfte sind der beste Begleiter für Strandtage.',
          'Beim Date oder abends zum Ausgehen darfst du etwas Charakter wählen. Ein zitronig-warmer Duft oder ein frisch-blumiger funktioniert wunderbar. Etwas mit leichtem Moschus oder subtiler Vanille ist im Sommer nicht unangenehm, solange es die frische Komponente behält. Der Fokus bleibt auf Leichtigkeit und Eleganz.',
          'Bei festlichen Anlässen, Hochzeiten oder eleganten Aperitifs darfst du zu etwas Ausgefalleneren greifen. Ein frischer Duft mit mehr Struktur, etwa mit grünen oder aromatischen Noten, wirkt sophisticated. Vermeide aber schwere, warme Basisnoten, die bei Hitze erdrückend wirken.'
        ]
      },
      {
        heading: 'Sommerdüfte und Jahreszeiten überlappen: Wann ist Schluss mit Frische?',
        body: [
          'Es gibt keinen exakten Punkt, an dem du von Sommerdüften zu Herbstdüften wechseln musst. Das ist persönlich und kontextabhängig. Manche Menschen tragen Sommerdüfte bis Oktober, wenn es noch warm ist. Andere schalten Anfang September um, weil die Nächte kälter werden und sie psychologisch „Wechsel" brauchen. Die intelligente Strategie ist hybrid: Halten Sie Ihre liebsten Sommerdüfte noch eine Weile parat, nutzen Sie aber auch erste Herbst-Düfte mit leicht wärmerer Grundstimmung. So bleibt die Transition fließend und angenehm.'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Der richtige Duft für jeden Moment: Büro, Date, Abend – die Kunst der eleganten Wahl',
    description:
      'Der richtige Duft für den richtigen Moment ist kein Zufall – es ist eine bewusste Kunst. Entdecke, wie intelligente Anlass-Wahl deine Ausstrahlung sicher stärkt: vom dezenten Büro über sichere Dates bis zum intensiven Abend. Unser Ratgeber zeigt dir die psychologischen Regeln, praktischen Tipps und perfekten Düfte für Selbstvertrauen & zeitlose Eleganz.',
    heroImage: '/ratgeber/welcher-duft-zu-welchem-anlass-hero.png',
    intro: [
      'Dein Duft ist eine stille Sprache. Er sagt etwas über dich aus – nicht mit Worten, sondern durch den Eindruck, den du auf andere machst. Seit Jahrtausenden wissen Menschen: Ein Duft ändert die Wahrnehmung. Im Büro soll dein Duft professionelle Ruhe und Genauigkeit ausstrahlen – beim Date etwas Verführung, beim festlichen Abend volle Eleganz. Die gleiche Flasche im Grossraumbüro und beim Date wirkt völlig unterschiedlich, weil der Kontext deine Ausstrahlung formt. Dieser Ratgeber zeigt dir, wie du diese Psychologie bewusst nutzt – nicht, um andere zu manipulieren, sondern um dein authentisches Selbst elegant einzurahmen.',
      'Die Intelligenz der Anlass-Wahl liegt in der Subtilität. Es geht nicht um Regeln, sondern um ein Verständnis dafür, wie Düfte in verschiedenen Räumen, bei verschiedenen Temperaturen und in verschiedenen Nähe-Verhältnissen wirken. Ein würziger, warmer Duft, der beim Date wunderbar funktioniert, kann im Büro (besonders in der Nähe) zu intim wirken. Ein intensiver Abendduft mit Oud und Amber sieht tagsüber fehl am Platz aus. Aber die richtige Wahl – und die richtige Dosierung – gibt dir Selbstvertrauen und ein Gefühl von Eleganz, das man spürt.',
      'Hier findest du nicht nur Duftem­pfehlungen, sondern ein praktisches Regelwerk: Wie dosierst du intelligent? Welche Familien funktionieren wann? Wie navigierst du hybrid-Tage, an denen du vom Büro direkt zum Date gehst? Unser Katalog ist voll von perfekten Düften für jeden Anlass – hier zeigen wir dir, welche wirklich glänzen.'
    ],
    sections: [
      {
        heading: 'Für Alltag & Büro: dezent, professionell & zeitlos elegant',
        body: [
          'Ein Büro-Duft ist ein subtiles Statement. Er soll präsent sein – nicht unsichtbar – aber nie dominant. Die Psychologie ist klar: Kolleginnen und Kollegen sollen dich als professionell, sauber und kultiviert wahrnehmen, nicht von einer Duft-Wolke überrascht werden. Im Büro ist „weniger ist mehr" keine Metapher, sondern die Regel.',
          'Ideal sind frische bis holzige Familien mit leichten Konzentrationen (Eau de Toilette) oder sanften Eau de Parfums, die sich nicht sofort ins Raumklima drängen. Zitrus, aquatische Noten, grüne Aromen und edle Hölzer (Sandelholz, Zeder) funktionieren perfekt, weil sie wirken, ohne zu dominieren. Vermeide schwere Amber, intensive Oud, dominante Vanilla oder süsse Gourmands – diese brauchen mehr Platz und Dunkelheit um zu glänzen.',
          'Die Dosierung ist entscheidend: Im Büro reicht meist ein einzelner, gezielter Sprühstoss (etwa auf den Hals oder die Innenseiten der Unterarme, nicht mehrfach auf den ganzen Körper). Bei einer Präsentation oder einem wichtigen Termin spürt man, dass der Duft dich begleitet, ohne dich zu überwältigen. Nachmittags, wenn dein erstes Auftragen nachlässt, kannst du eine kleine Auffrischung machen – ein kleiner Sprühstoss genügt meist.',
          'Subtyp-Büro: Willst du bei Zoom-Calls oder in deinem eigenen Büro etwas intensiver wirken, darfst du zu einer volleren EdP greifen. In offenen Räumen oder Grossraumbüros: lieber EdT oder sparing mit EdP dosieren.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'terre-dhermes', 'boss-bottled', 'ysl-y-edp', 'le-labo-santal-33']
      },
      {
        heading: 'Für Dates: verführerisch, präsent & unvergesslich',
        body: [
          'Ein Date ist Nähe. Dein Duft ist nicht für den ganzen Raum, sondern für die Distanz zwischen dir und dieser einen Person. Das ändert alles. Ein Duft, der im Büro zu schwach wäre, ist beim Date plötzlich intensiv; ein Duft, der am Schreibtisch elegant ist, wirkt beim Date manchmal fade. Du brauchst etwas, das „Hallo, ich bin hier" sagt, ohne zu schreien.',
          'Ideal sind wärmere, sinnlichere Familien: leicht süssliche Noten (Vanille, Mandel), Blumiges (Rose, Jasmin, Orchidee), orientalische Amber-Mischungen oder auch mutige Düfte mit etwas Gewürz und Weihrauch. Der Trick: Ein Duft, der beim Date eine emotionale Reaktion auslöst – sei es ein Hauch von Verführung, Süsse oder eleganter Wärme. Der andere Mensch soll sich später denken: „Das war der Duft von dieser Person" – ein olfaktorisches Merkmal.',
          'Die Dosierung beim Date ist die Balance zwischen „merklich, aber nicht dominant" und „nah, aber respektvoll". Zwei Sprühstösse sind meist das Optimum – einer auf den Hals, einer auf die Innenseite des Unterarms, damit er subtil nach oben diffundiert, wenn ihr näher zusammenkommt. Die leichte Wärmung deiner Haut verstärkt den Duft natürlich, also sei nicht überraschend vom „mehr" das an die Nase kommt.',
          'Erste Dates vs. etablierte Beziehungen: Bei einem ersten Date darfst du etwas mutiger sein – ein bleibender Eindruck ist das Ziel. In einer etablierten Beziehung darf dein Duft „dein Duft" sein, den der andere Person liebt und erkennt. Oft ist es das gleiche Duft, das ihr teilt.'
        ],
        perfumes: ['ysl-black-opium', 'coco-mademoiselle', 'lancome-la-vie-est-belle', 'versace-eros', 'pdm-delina']
      },
      {
        heading: 'Für besondere Abende: mutig, intensiv & unverwechselbar',
        body: [
          'Abends bist du frei. Keine Büro-Etikette, keine Flächenrücksicht, keine „zu viel"-Sorgen. Ein Abendduft ist deine Gelegenheit, die grossen, tiefen, charaktervollen Düfte zu tragen – die, die du tagsüber nicht brauchen kannst, aber abends glänzen lassen wollen. Hier darf ein Duft mutig, dunkel, intensiv oder opulent sein.',
          'Ideal sind orientalische Düfte mit intensiven Basisnoten (Oud, Amber, Sandelholz, Musk), warme Gourmands mit Tiefe (Tobacco, Vanilla, würzige Gewürze) oder nischierte Kompositionen mit Charakter und Projektion. Eine gute Faustregel: Wenn es am Morgen im Büro zu schwer wäre, ist es abends genau richtig. Intensität ist nicht Fehler, sondern Feature.',
          'Dosierung am Abend: Hier kannst du grosszügiger sein. Zwei bis drei Sprühstösse sind völlig in Ordnung, besonders wenn du in geschlossenen Räumen (Restaurant, Club) bist, wo die Akustik den Duft in einem angenehmen Radius um dich verteilt. Die Körperwärme nach wenigen Minuten verstärkt intensive Abendduft noch – das ist beabsichtigt und schön. Behalte nur im Blick: In sehr engen Räumen oder bei sehr vielen Menschen genügen zwei Sprühstösse auch hier.',
          'Hybrid-Abende: Gehst du vom Büro direkt aus zum Abend, kannst du entweder deinen Büro-Duft behalten (er wird sich mit deiner Körperwärme bis dahin verändert haben, wird intensiver und wärmer) oder du macht eine komplette Wechsel und tauschst ihn gegen einen echten Abendduft. Ein kleines Duft-Tüchchen, das du im Büro sprühst und später wieder drüber wischst, oder ein komplett anderer Duft ist auch ok – abends darf es laut sein.'
        ],
        perfumes: ['creed-aventus', 'tobacco-vanille', 'mugler-angel', 'tom-ford-oud-wood', 'baccarat-rouge-540']
      },
      {
        heading: 'Die Intelligenz der Dosierung: das Regelwerk für jeden Moment',
        body: [
          'Dosierung ist nicht arbitrary – es ist die zentrale Fähigkeit, damit dein Duft brilliert. Hier das praktische Regelwerk:',
          '**Büro / Grossraum:** 1–1,5 Sprühstösse (ein Sprühstoss Hals, ggf. kleine Auffrischung am Nachmittag). Konzentrationen: EdT ideal, EdP sparing.',
          '**Date / Nähe:** 2 Sprühstösse (Hals + Innenseite Unterarm), EdT oder EdP beide ok. Die leichte Körperwärme macht den Rest.',
          '**Festlicher Abend / Restaurant:** 2–3 Sprühstösse, EdP ideal. Geschlossene Räume verstärken natürlich, also eher 2, wenn du unsicher bist.',
          '**Hybrid-Tag (Büro → Abend):** Entweder Büro-Duft behalten (wird durch Körperwärme intensiver) oder kompletter Wechsel. Ein tragbares Duft-Tüchchen für unterwegs hilft.',
          '**Warme Jahreszeit:** −1 Sprühstoss überall. Hitze verstärkt Düfte dramatisch – weniger ist mehr bei 25+ °C.',
          '**Kalte Jahreszeit:** +1 Sprühstoss möglich. Kälte schluckt Projektion – intensive Düfte brauchen etwas mehr Platz.',
          'Die goldene Regel: Beginne mit einem Sprühstoss weniger, als du denkst, brauchst zu sein. Deine Nase desensibilisiert sich (das heisst: du riechst deinen Duft nach 15 Minuten selbst nicht mehr), aber andere Menschen riechen ihn noch sehr deutlich. Starte dezent und dosiere beim nächsten Mal höher, wenn nötig.'
        ]
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süße Düfte: Vanille, Schokolade & Karamell – Wärme, Sinnlichkeit & Komfort',
    description:
      'Die verführerischsten Gourmand-Düfte: Vanille, Schokolade, Karamell und Tonkabohne. Süße Düfte sind Komfortkompositionen – kuschelig, sinnlich, unvergesslich. Von cremig-pudrig bis würzig-intensiv, perfekt für Herbst, Winter und für Momente, die nach Wärme rufen.',
    heroImage: '/ratgeber/suesse-duefte-hero.jpg',
    intro: [
      'Ein großartiger süßer Duft ist eines der vergnüglichsten Dinge, die du auf der Haut tragen kannst. Gourmand-Düfte, wie sie richtig heißen, riechen nach den besten Dingen des Lebens: Vanille aus Madagascar, dunkle Schokolade, Karamell-Salzigkeit, Tonkabohne, Kaffee, Dattel und manchmal sogar Praline. Sie wirken warm, einladend, nahbar und bleiben lange in Erinnerung. Historisch sind Gourmands eine relativ junge Erfindung in der Duft-Welt, aber sie haben sich schnell zu einer der beliebtesten Kategorien entwickelt, gerade weil sie universell funktionieren. Ein süßer Duft macht dich nicht nur riechen, sondern auch fühlen.',
      'Die Intelligenz eines Gourmand-Dufts liegt in seinem Gleichgewicht. Das Gegenteil eines guten süßen Dufts ist nicht „zu süß", sondern „billig süß" – ein unausgewogenes, eintöniges Zucker-Monolith. Ein wirklich großartiger süßer Duft hat Tiefe, Struktur und manchmal sogar eine würzige oder bittere Ecke, die die Süße anspruchsvoll macht. Vanille mit einer Note schwarzem Pfeffer, Schokolade mit Tabak, Karamell mit einer Prise Salz – diese Kontraste machen Gourmands zu Kunstform. Sie funktionieren am wunderschönsten im Herbst und Winter, wenn die Kälte sie zu ihrer vollen Tiefe entfaltet. Aber auch im Sommer gibt es leichte, cremig-pudrige Varianten, die nicht aufdringlich wirken.',
      'Hier findest du unsere liebsten Gourmand-Düfte aus dem Katalog, von erschwinglichen Schätzen bis zu Nischen-Juwelen, für jeden, der Süße liebt. Manche sind für alltägliche Momente, andere für spezielle Anlässe. Alle haben eines gemeinsam: Sie sind unvergessen.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten Gourmand-Düfte – von süß bis komplex',
        body: [
          'Ein Gourmand-Duft braucht Charakter, sonst wird er fade. Die folgenden acht Düfte repräsentieren die Bandbreite der Kategorie: von der reinen Süße bis zu würzigen, intensiven Varianten, die süße Noten mit dunkelerer Komponenten verbinden. Jeder ist langlebig, präsent und unvergessen.'
        ],
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
        heading: 'Die Gourmand-Familien: Welche Süße spricht dich an?',
        body: [
          'Reine Vanille-Düfte sind die Klassiker. Sie riechen nach hochwertigem Vanillepulver, manchmal mit einer cremigen, pudrigen Komponente. Diese Düfte sind zugänglich, anhaltend und wirken elegant, wenn sie nicht überzuckert sind. Kayali Vanilla 28 ist ein Paradebeispiel: süß, aber mit Tiefe. Vanille-Düfte funktionieren das ganze Jahr, sind aber im Winter am schönsten.',
          'Schokolade und Kaffee-Düfte kombinieren Süße mit einer dunklen, leicht bitteren Komponente. Das schafft Komplexität und verhindert, dass der Duft sich zu oberflächlich anfühlt. Montale Intense Café und Black Opium sind großartig, weil sie Süße mit erwachsener Raffinesse paaren. Diese Düfte wirken niemals kindlich.',
          'Würzige Gourmands verbinden Süße mit aromatischen Gewürzen wie Zimt, Nelke, schwarzem Pfeffer oder Kardamom. Khamrah beispielsweise verbindet Dattel-Süße mit orientalischen Gewürzen. Das Ergebnis ist edel, warmherzig und oft überraschend langlebig. Diese Düfte sind perfekt für diejenigen, die süß, aber gleichzeitig anspruchsvoll sein möchten.',
          'Cremig-pudrige Gourmands haben eine weiche, fast pudriger Basis mit Noten wie Iris, Mandelblüte oder Vanille. Sie wirken kuschelig und feminin im besten Sinne, ohne jemals infantil zu sein. Burberry Goddess und Lattafa Yara sind wunderbare Beispiele. Diese Düfte wirken besonders in der kühlen Jahreszeit wunderbar.'
        ]
      },
      {
        heading: 'Warum Süße im Winter funktioniert, im Sommer aber richtig dosiert sein muss',
        body: [
          'Im Winter sind süße Düfte dein Freund. Die Kälte macht sie nicht überwältigend, sondern elegant. Ein süßer Duft bei 15 Grad Außentemperatur wirkt tröstlich, nicht erdrückend. In geheizten Innenräumen entfaltet sich die Süße langsam und angenehm. Das ist, warum Gourmands so beliebt in der kalten Jahreszeit sind.',
          'Im Sommer brauchen süße Düfte intelligente Dosierung. Ein Duft, der im Winter wunderschön ist, kann im Juli in geschlossenen Räumen schnell zu intensiv wirken. Das heißt nicht, dass du Gourmands im Sommer nicht tragen darfst, aber wähle leichtere Varianten oder starte mit einem Sprühstoss statt zwei. Auf der Haut, anstatt auf mehreren Stellen, reduziert auch die Intensität.',
          'Trockene Haut und Gourmands: Süße Düfte wirken auf trockener Haut intensiver und halten gleichzeitig kürzer. Eine gute Feuchtigkeitspflege vorher verdoppelt die Haltbarkeit und macht den Duft angenehmer. Das ist besonders im Winter wichtig, wenn die Heizungsluft deine Haut austrocknet.'
        ]
      },
      {
        heading: 'Dosierung, Länge und Alltags-Tauglichkeit',
        body: [
          'Gourmand-Düfte sind präsent. Beginne mit nur einem Sprühstoss, besonders wenn du zum ersten Mal einen Gourmand trägst. Nach 15 Minuten wirst du sehen, wie präsent der Duft ist. Ein bis zwei Sprühstösse reichen für die meisten Kontexte völlig aus. Mehr brauchst du nicht, es sei denn, du bist draußen bei sehr kaltem Wetter.',
          'Längeres Tragen ist kein Problem – Gourmands halten lange. Ein guter Vanille-Duft bleibt sechs bis acht Stunden auf der Haut, manchmal länger. Das macht sie perfekt für den Alltag: einmal morgens auftragen und dich den ganzen Tag von diesem angenehmen, warmen Duft begleitet fühlen.',
          'Für alltags-Tauglichkeit: Wenn du Gourmands auch im Büro tragen möchtest, wähle eine Variante mit etwas Frische oder Holz, das die Süße ausgleicht. Ein reiner Schoko-Karamell-Duft könnte im geschlossenen Büroraum zu intensiv sein. Eine leichte, cremig-pudrige Variante oder ein würziger Gourmand funktioniert besser.'
        ]
      },
      {
        heading: 'Gourmands für verschiedene Momente',
        body: [
          'Morgens und im Alltag: Wähle eine leichtere oder cremig-pudrige Variante. Ein Duft mit etwas Frische oder Moschus wirkt weniger erdrückend in den Morgenstunden. Kayali Vanilla oder Burberry Goddess sind wunderbar für den Start in den Tag.',
          'Beim Date oder abends zum Ausgehen: Das ist deine Gelegenheit, zu deinem liebsten Gourmand zu greifen. Ein tiefes, würziges oder dunkles süßes Duft wirkt verführerisch und elegant. Tobacco Vanille oder Khamrah sind perfekt für diese Momente.',
          'Zu Hause, beim Entspannen: Ein cremiger, pudrig-süßer Duft ist wie eine Umarmung. Montale Intense Café oder Lattafa Yara schaffen eine Wohlfühl-Atmosphäre, die dich entspannen lässt.',
          'Bei festlichen Anlässen: Ein intensiver, komplexer Gourmand zeigt Sicherheit und Geschmack. Kilian Angels Share, mit seiner Rum-Vanille-Komponente, wirkt festlich und elegant.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: Tiefe, Wärme & Eleganz – für die dunkle Jahreszeit',
    description:
      'Winter ist die Saison der opulenten Düfte. Entdecke Oud, Amber, Weihrauch und Gewürze, die bei Kälte ihre volle Tiefe entfalten. Von zeitlosen Klassikern bis zu intensiven Nischen-Favoriten: Düfte, die dich wärmen, begleiten und in der dunklen Jahreszeit leuchten.',
    heroImage: '/ratgeber/winterduefte-hero.jpg',
    intro: [
      'Der Winter ändert alles. Düfte, die im Sommer erdrückend wirken würden, werden im Winter zu deinen besten Begleitern. Es gibt eine poetische Gerechtigkeit darin: Während die Tage kürzer werden und die Temperaturen fallen, brauchen wir Düfte, die uns umhüllen, trösten und wärmen. Ein großartiger Winterduft ist nicht einfach nur „stark", sondern tiefgründig. Er hat Schichten. Er erzählt eine Geschichte von Reichtum, Komfort und Eleganz. Die Geschichte der Winterdüfte reicht zurück bis zu orientalischen Harzen, Weihrauch und den kostbaren Aromen, die Karawanen über die Seidenstraße transportierten. Diese Düfte waren damals der Inbegriff von Luxus und Macht.',
      'Die moderne Winterduft-Philosophie versteckt sich hinter einer einfachen Einsicht: Bei Kälte braucht dein Körper und deine Nase andere Noten als im Sommer. Warme, tiefe Materialien wie Oud, Amber, Sandelholz, Vanille, Tabak und Gewürze entfalten sich langsam, wunderbar ausgewogen, statt aggressiv. Das ist nicht einfach ein Quantitätsunterschied, sondern ein Qualitätssprung. Ein Duft mit Oud, der im Juli absurd wirken würde, wird im Januar zur reinen Eleganz. Heizungsluft, deine wärmere Haut, die intimere Nähe in geschlossenen Räumen – alles spielt zusammen, um Winterdüfte in ihrem besten Licht zu zeigen.',
      'Hier findest du unsere liebsten Winterdüfte, vom absoluten Klassiker bis zur intensiven Nischen-Entdeckung. Manche sind zeitlos, andere sind für diejenigen, die es luxuriös und muttig mögen. Der Winter ist die Jahreszeit, in der du es dir leisten kannst, mutig zu sein.'
    ],
    sections: [
      {
        heading: 'Die großartigsten Winterdüfte – von klassisch bis intensiv',
        body: [
          'Ein winterlicher Duft braucht Struktur und Tiefe. Die folgenden acht Düfte haben alle eines gemeinsam: Sie funktonieren im Winter wunderbar, halten lange, und sie geben dir das Gefühl, etwas Besonderes zu tragen. Manche sind warme Umarmungen, andere sind dunkle, tiefe Erlebnisse. Alle sind unvergessen.'
        ],
        perfumes: [
          'tobacco-vanille',
          'tom-ford-oud-wood',
          'baccarat-rouge-540',
          'mugler-angel',
          'nasomatto-black-afgano',
          'initio-oud-greatness',
          'xerjoff-naxos',
          'khamrah'
        ]
      },
      {
        heading: 'Die Winterduft-Familien: Welche Tiefe spricht dich an?',
        body: [
          'Orientalische und ambierte Düfte basieren auf reichen Harzen, Weihrauch und süßlichen Noten. Sie riechen nach Luxus, Nähe und Wärme. Dies sind die Düfte, die dich umhüllen, wenn du in einem warmen Restaurant sitzt oder in einem kuschligen Café. Sie sind sinnlich, elegant und zeitlos.',
          'Oud und dunkle Holzdüfte sind für diejenigen, die es mutig und strukturiert mögen. Oud hat einen rauchigen, fast tabakartigen Charakter, der entweder süßlich oder würzig sein kann. Diese Düfte sind intensiv, langlebig und nie subtil. Sie sagen: Ich bin hier, höre meine Geschichte. Im Winter ist das nicht unangenehm, sondern erwünscht.',
          'Würzige und Tabak-Düfte kombinieren Wärme mit einem Hauch Bitterkeit. Noten wie Zimt, Nelke, schwarzer Pfeffer und Tabakblatt schaffen eine Komposition, die gleichzeitig tröstend und raffiniert wirkt. Sie wirken edel, nicht billig, und sind perfekt für formale Abende oder intimate Momente.',
          'Süßlich-warme Gourmands mit Vanille, Karamell und Tonka runden die Winter-Familie ab. Diese Düfte sind zugänglicher, alltags-tauglich und dennoch tiefgründig. Sie wirken nie kindlich im Winter, weil die Kälte den süßen Elementen Struktur und Eleganz gibt.'
        ]
      },
      {
        heading: 'Die Physik der Winterdüfte: Warum alles anders ist',
        body: [
          'Kalte Luft ändert, wie Düfte sich verhalten. Bei Minusgraden verdunsten flüchtige Kopfnoten langsamer, was bedeutet, dass die Herznoten länger dominieren. Das ist warum ein Winterduft auf der Haut viel länger hält als im Sommer. Ein Extrait, der im Juli unerträglich wäre, wird im Januar zur perfekten Wahl, weil die Kälte die Intensität moderiert. Heizungsluft in Innenräumen wird fast zum Verbündeten – warme Luft lässt den Duft sich langsam, präsent und angenehm entfalten.',
          'Deine Haut ist im Winter anders. Sie ist trockener, was Düfte schneller verdunsten lässt, aber auch kälter, was bedeutet, dass dein Körper weniger Wärme an den Duft abgibt. Das ist kein Problem, weil intensive Winterdüfte nicht auf Körperwärme angewiesen sind. Eine gute Feuchtigkeitscreme vorher verdoppelt die Haltbarkeit und macht den Duft noch wunderschöner. Trockenheit der Haut ist ein echter Feind – nicht nur für deine Haut, sondern auch für den Duft-Auftrag.',
          'Raumklima spielt eine Rolle. In einem kalten Freien wirkt ein Winterduft anders als in einem geheizten Innenraum. Bedenke das bei der Wahl: Wenn du viel unterwegs bist, wähle etwas mit Langlebigkeit. Wenn du viel drinnen bist (Restaurant, Büro, Zuhause), darfst du etwas mutigeres wählen.'
        ]
      },
      {
        heading: 'Winterdüfte richtig auftragen und dosieren',
        body: [
          'Im Winter brauchst du normalerweise nicht mehr Sprühstösse als im Sommer, aber höhere Konzentrationen. Ein bis zwei Sprühstösse einer Eau de Parfum ist ideal. Wenn du eine höhere Konzentration wie Extrait trägst, genügt ein einzelner Sprühstoss am Hals oder auf dem Nacken völlig. Du wirst überrascht sein, wie lange das hält.',
          'Auftrag-Strategie: Die beste Anwendung für Winterdüfte ist auf den Hals, den inneren Unterarm und evtl. den Nacken. Die warme Stelle am Hals gibt dem Duft einen langsamen, kontinuierlichen Ausstoff. Wenn du an einem kalten Tag draußen bist, braucht der Duft einen Moment, um sich zu entfalten, aber drinnen wird er wunderbar. Das ist normal und beabsichtigt.',
          'Eincremen hilft wirklich. Eine geruchsneutrale Bodylotion kurz vor dem Auftragen gibt dem Duft Haftung und Dauer. Trockene Heizungsluft im Winter entzieht der Haut Feuchtigkeit, was Düfte schneller verdunsten lässt. Mit einer kurzen Pflege-Routine bekommst du aus deinem Winterduft doppelte Langlebigkeit.',
          'Nachbrennung: Falls der Duft gegen Mittag oder Nachmittag nachlässt, ein einzelner zusätzlicher Sprühstoss reicht aus. Du brauchst nicht neu anzufangen – ein Schuss genügt, um den Duft bis zum Abend zu halten.'
        ]
      },
      {
        heading: 'Winterdüfte für verschiedene Kontexte und Tageszeiten',
        body: [
          'Im Alltag und im Büro wählst du eher Winterdüfte mit Struktur als mit purem Glanz. Etwas mit Oud oder einer würzigen Komponente wirkt sophisticiert, nicht aufdringlich. Vanille-basierte Düfte sind auch hervorragend, wenn sie nicht zu süß sind. Das Ziel ist, elegant und gesammelt zu wirken, nicht dominierend.',
          'Beim Date oder abends zum Ausgehen kannst du es voller machen. Ein reicher, ambient-starker Duft wirkt wunderbar verführerisch im Winter. Die Nähe, die Wärme des Restaurants, die intimere Atmosphäre erlauben es dir, mutig zu sein. Ein intensiver Oud-Duft oder ein sinnlicher Amber-Duft ist perfekt.',
          'Bei festlichen Gelegenheiten oder gehobenen Veranstaltungen (Empfänge, formale Dinners) ziehst du deine absoluten Geheimwaffen an. Das ist die Jahreszeit, um dich mit deinem liebsten intensiven Duft zu präsentieren. Ein opulenter Weihrauch-Duft oder ein tiefes Oud-Extrait sagt: Ich bin präsent, eleganz, ich habe Geschmack.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Unisex-Düfte: Keine Grenzen – Für deine Individualität, nicht für dein Geschlecht',
    description:
      'Düfte ohne Geschlechts-Etiketten: vielseitig, charaktervoll und zeitlos. Von Sandelholz bis Gypsy Water – unsere liebsten Kompositionen, die Grenzen sprengen und zu jedem passen, unabhängig vom Geschlecht.',
    heroImage: '/ratgeber/unisex-duefte-hero.png',
    intro: [
      'Die beste Duft-Logik ist die einfachste: Riecht es auf deiner Haut schön? Punkt. Für Hunderte von Jahren wurde Duft nach Geschlecht sortiert, männlich oder weiblich. Aber die Realität ist komplexer und viel schöner: Ein großartiger Duft kennt keine Geschlechts-Grenzen. Er funktioniert auf jeder Haut anders, je nach Körperchemie, Persönlichkeit und Lebenskontext. Die beste Duft-Philosophie ist die radikale Einfachheit: Du bist du, und dein Duft sollte das ausdrücken, nicht irgendwelche veralteten Marketing-Kategorien.',
      'Die Kultur der Unisex-Düfte ist eine Revolution der letzten 15 Jahre. Nischenhäuser wie Le Labo, Byredo und Maison Francis Kurkdjian haben das erkannt und bauen bewusst Düfte ohne Gender-Kodierung. Das heißt nicht „neutral" oder „langweilig", sondern das Gegenteil: Es ermöglicht Kompositionen, die komplexer, persönlicher und ehrlicher sind. Ein Duft, der nicht für „Damen" oder „Herren" gemacht werden muss, kann sich einfach auf das konzentrieren, was zählt: handwerkliche Qualität, Charakter und emotionale Resonanz.',
      'Hier findest du unsere liebsten Unisex-Düfte: Düfte, die Grenzen sprengen, die zu dir gehören, egal wer du bist. Manche sind warm und würzig, andere frisch und minimalistisch. Was sie alle teilen, ist dass sie absolute Individuen sind, keine Klischees. Sie laden dich ein, dein eigenes Abenteuer zu schreiben.'
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
        heading: 'Was macht einen Unisex-Duft wirklich aus?',
        body: [
          'Keine weiblichen oder männlichen Klischees: Unisex-Düfte verzichten bewusst auf die typische Codierung (süss-blumig = feminin, holzig-würzig = maskulin) und setzen auf ausgewogene, vielschichtige Kompositionen. Oft holzig, frisch, aromatisch oder leicht orientalisch – selten rein blumig, selten übermässig pudrig.',
          'Geschlechterlos ≠ charakterlos: Ganz im Gegenteil! Die besten Unisex-Düfte haben enorme Tiefe und Persönlichkeit. Sie wirken einfach nicht stereotyp, sondern originell, individuell und elegant.',
          'Unglaubliche Vielseitigkeit: Ein Flakon funktioniert für mehrere Menschen, die verschiedene Geschlechter haben. Das spart nicht nur Geld – es zeigt auch, wie universal gute Düfte sein können, wenn man die Codierung weglässt.'
        ]
      },
      {
        heading: 'Worauf du bei Unisex-Düften achten solltest',
        body: [
          'Ignoriere die Etikettierungen bewusst. Die „Damen-" und „Herren-"-Schilder sind oft willkürlich gesetzt (manchmal auch politisch motiviert). Entscheidend ist allein: Riecht es auf deiner Haut schön? Passt es zu deinem Leben?',
          'Teste auf deiner eigenen Haut. Durch die fehlende Geschlechts-Codierung entfalten sich Unisex-Düfte besonders individuell. Auf mancher Haut wirken sie holziger, auf anderer blumiger, auf einer dritten aromatischer. Das ist die Schönheit.',
          'Viele Unisex-Düfte sind intensiver als klassische Mainstream-Düfte. Starte mit einem Sprühstoss und beobachte, wie weit die Projektion reicht, bevor du nachdosierst. Qualität braucht oft weniger.',
          'Denk an Layering: Unisex-Düfte eignen sich wunderbar zum Schichten mit anderen Düften oder Body-Produkten. Sie sind neutrale, großartige Basis-Partner für Duft-Experimente.'
        ]
      },
      {
        heading: 'Unisex für jeden Moment',
        body: [
          'Alltag & Büro: Unisex-Düfte sind perfekt für professionelle Umgebungen, weil sie sich niemandem aufdrängen und universal angenehm wirken. Sie sagen nichts über dein Geschlecht – nur über deinen Geschmack.',
          'Abends & Abenteuer: Viele Unisex-Düfte (wie Baccarat Rouge 540) sind intensive, tiefe Düfte für besondere Momente. Sie funktionieren hervorragend für Dates, Partys, Momente, wo du leuchten möchtest.',
          'Jahreszeiten: Von frischen Unisex-Düften im Sommer (Gypsy Water) bis zu wärmeren im Winter (Santal 33, Tobacco Vanille) – diese Kategorie hat für jede Jahreszeit etwas.',
          'Sharing & Pairing: Das beste Merkmal: Teilen! Ein Duft für zwei Menschen funktioniert nur, wenn die Geschlechts-Codierung weg ist. Genau das ist der Punkt von Unisex.'
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
    title: 'Parfum als Geschenk: Der Weg zum perfekten Duft – Elegant, persönlich und unvergessen',
    description:
      'Parfum ist eines der wertvollsten Geschenke überhaupt – wenn es stimmt. Erfahre, wie du Sicherheit und Eleganz kombinierst und garantiert die richtige Wahl triffst. Unsere liebsten Geschenk-Klassiker für jeden Geschmack und jeden Anlass.',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80&fit=crop',
    intro: [
      'Ein Duft ist eines der persönlichsten Geschenke, die man machen kann. Körperwärme, Hautchemie, Lebensstil – sie verändern, wie ein Duft wirkt. Das macht ein Duft sowohl wertvoll als auch riskant als Geschenk. Die Kunst liegt in der Balance: Du willst etwas geben, das wirklich passt und geliebt wird, nicht etwas, das in einer Schublade endet, weil der Geschmack nicht stimmt. Ein durchdachtes Duft-Geschenk zeigt: Ich kenne dich, ich respektiere dich, ich schenke dir etwas, das zu dir gehört.',
      'Die sicherste Strategie ist bekannt: Klassische, vielseitige Düfte funktionieren fast immer besser als spekulativ ausgewählte Nischen-Kreationen. Ein eleganter Dior, Chanel oder Lancôme kommt bei fast jedem an, weil diese Marken über Jahrzehnte gelernt haben, Düfte zu schaffen, die nicht polarisieren, sondern verführen. Das klingt konservativ, ist aber smart: Wer würde ein Coco Mademoiselle Geschenk zurückweisen? Wer lehnt einen Dior Sauvage ab? Klassisch heißt hier nicht spießig, sondern zeitlos intelligent.',
      'Hier sind unsere liebsten Duft-Geschenke: Klassiker, die garantiert funktionieren, sortiert nach Persönlichkeit und Budget. Mit ein paar praktischen Tricks sparst du dir Fehlkäufe, und die beschenkte Person wird sich unvergessen fühlen.'
    ],
    sections: [
      {
        heading: 'Für Frauen: die sicheren Klassiker',
        body: [
          'Diese Düfte sind zeitlos elegant und funktionieren auf den meisten Frauen wunderbar. Sie sind nicht zu experimentell, aber auch nicht langweilig. Das ist die goldene Mitte des Duft-Schenkens: Eine Frau, die einen dieser Düfte trägt, wirkt gepflegt, kultiviert und elegant, ohne dass sie dich unter Druck setzt, genau ihren speziellen Nischen-Geschmack zu treffen.'
        ],
        perfumes: ['coco-mademoiselle', 'lancome-la-vie-est-belle', 'ysl-black-opium', 'ch-good-girl']
      },
      {
        heading: 'Für Männer: zeitlose Favoriten',
        body: [
          'Männer-Düfte sind eine Balance zwischen Professionalität und Charakter. Die folgenden Düfte funktionieren im Büro, beim Date und beim Abenteuer gleich gut. Sie sind nicht zu intensiv, nicht zu experimentell, sondern zuverlässig schön.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'le-male', 'ea-stronger-with-you', 'boss-bottled']
      },
      {
        heading: 'Wie du die richtige Wahl triffst – ohne Fehlkauf',
        body: [
          'Erste Frage: Kennt die Person, die du beschenken möchtest, bereits andere Düfte, die sie liebt? Das ist deine wertvollste Information. Frag im Gespräch oder beobachte: Trägt sie etwas? Mag sie es frisch und leicht oder warm und süßlich? Wenn sie bereits einen liebsten Duft hat, hast du zwei sichere Optionen: entweder verschenkst du eine zweite Flasche davon, oder du wählst einen Duft, der in die gleiche Kategorie passt. Ein Treffer fast garantiert.',
          'Zweite Frage: Welche Jahreszeit steht an? Im Sommer sind frische, leichte Düfte idealer, im Winter dürfen es wärmere sein. Ein winterlicher Duft im Juni wirkt fehl am Platz, auch wenn er schön ist. Passe das Geschenk an die kommende Jahreszeit an, damit die beschenkte Person es sofort tragen kann.',
          'Dritte Frage: Was ist dein Budget? Ein Eau de Parfum in einer bekannten Marke zwischen 70 und 150 CHF ist oft eine gute Wahl. Es ist edel genug, um besonders zu wirken, aber nicht so teuer, dass die Person nervös wird, es zu tragen. Luxus-Nische (200+ CHF) ist nur für Leute mit bekanntem speziellen Geschmack geeignet.'
        ]
      },
      {
        heading: 'Praktische Tipps für das perfekte Duft-Geschenk',
        body: [
          'Eau de Parfum statt Eau de Toilette: Als Geschenk wirkt Eau de Parfum automatisch edler, hält länger und zeigt, dass du es ernst gemeint hast. Der Preisunterschied zu EdT ist oft nur 10 bis 20 Franken, aber der wahrgenommene Luxus ist deutlich höher.',
          'Verpackung ist wichtig: Ein schön verpackter Duft wird sofort als Geschenk wahrgenommen, nicht als „zufälliger Kauf". Die meisten guten Düfte kommen bereits in hochwertiger Verpackung, aber eine zusätzliche Schleife, eine kleine Karte oder eine personalisierte Nachricht macht den Unterschied.',
          'Mach es persönlich: Schreib eine kurze Notiz, warum du diesen Duft gewählt hast. Es muss nicht lang sein: „Dieser Duft erinnert mich an dich – elegant, warm und immer angenehm" macht einen großen Eindruck.',
          'Fallback-Plan für totale Unsicherheit: Wenn du dir absolut nicht sicher bist, verschenk stattdessen einen edlen Duft-Gutschein oder mach einen Gutschein für eine Beratung in einer guten Parfümerie. Das klingt unkreativ, aber es ist besser, einen Gutschein zu geben, als einen Duft zu kaufen, der endet in der Schublade.'
        ]
      },
      {
        heading: 'Sonderfälle und spezielle Situationen',
        body: [
          'Ein Duft zum Jahrestag: Hier darfst du etwas mutiger sein. Ein Duft, den die Person schon hat und liebt, oder einen neuen in ihrer Lieblings-Familie, wird zu einem romantischen Geschenk, das tägliche Nähe bedeutet. Jedes Mal, wenn sie den Duft trägt, denkt sie an dich.',
          'Ein Duft als Willkommensgeschenk: Wenn du jemanden gerade kennengelernt hast (neue Partnerin, neuer Freund), wähle einen sicheren Klassiker. Es darf nicht zu intim wirken, aber es sollte zeigen, dass du Geschmack hast. Ein Chanel, Dior oder Jo Malone funktioniert hier immer.',
          'Ein Duft als Abschied oder Andenken: Wenn jemand wegzieht oder ihr euch trennt, kann ein Duft zum Erinnerungsstück werden. Wähle einen, der zeitlos ist und lange hält, damit die Person dich riechen kann, wenn sie den Duft trägt.',
          'Duft-Sets für Neulinge: Einige Marken verkaufen Sets mit mehreren kleinen Flakons. Das ist ideal, wenn du jemanden beschenken möchtest, der noch nicht so viele Düfte kennt – die Person kann ausprobieren, ohne dich unter Druck zu setzen.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen lieben: Eleganz, Wärme & echte Komplimente – nicht Lärm',
    description:
      'Welche Herrendüfte ziehen an? Unsere Liste der echten „Kompliment-Klassiker" für Männer: elegant, einladend und unvergessen. Die Düfte, die Frauen wirklich mag und lange erinnert.',
    heroImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80&fit=crop',
    intro: [
      'Es gibt Düfte, die sammeln Komplimente wie ein Magnet. Ein Mann trägt sie einmal, und Stunden später fragen Frauen in seiner Nähe: „Was riechst du?" Das sind nicht die lautesten Düfte, nicht die intensivsten, sondern Düfte, die eine bestimmte psychologische Wirkung haben: Sie wirken nahbar, vertrauenswürdig und sinnlich zugleich. Sie sagen ohne Worte: Hier ist jemand, der auf sich selbst achtet, der nicht aggressiv ist, sondern einladend. Das ist Anziehung auf chemischer Ebene.',
      'Die Psychologie dahinter ist klar: Frauen werden tendenziell zu Düften hingezogen, die Wärme, Sauberkeit und Nähe ausstrahlen. Ein intensiver Oud-Duft kann elegant sein, wirkt aber oft zu dominant. Ein reiner Zitrus-Duft wirkt manchmal zu kühl. Die besten Männerdüfte für Frauen treffen eine bestimmte Balance: Sie haben eine warme Basis (Vanille, Amber, Moschus), aber vorne genug Frische (Zitrus, aromatische Noten) zum Balancieren. Das ist die Formel.',
      'Hier sind unsere liebsten Männerdüfte, die bei Frauen garantiert gut ankommen. Das heißt nicht, dass der Mann den Duft für Frauen trägt, sondern dass er mit diesem Duft selbstbewusst wirkt und dadurch natürlich anziehend ist. Ein Duft ist immer eine Erweiterung der Persönlichkeit, nicht ein Manipulationsmittel.'
    ],
    sections: [
      {
        heading: 'Die Klassiker, die garantiert funktionieren',
        body: [
          'Diese Düfte sind nicht neu, nicht trendig, aber zeitlos erfolgreich. Sie funktionieren bei fast jeder Frau, weil sie Charakter mit Eleganz verbinden. Sie wirken nicht aufdringlich, sondern einladend.'
        ],
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
        heading: 'Warum Frauen diese Düfte auf Männern lieben',
        body: [
          'Die erfolgreichsten Männerdüfte haben ein psychologisches Muster. Sie beginnen mit Frische oder Frucht (macht den Duft nicht zu schwer), haben eine warme, süßliche oder würzige Herznote (wirkt sinnlich und sauber zugleich), und enden mit einer warmen Basis (Vanille, Amber, Moschus). Ein Duft, der mit dieser Formel gut gemacht ist, wirkt auf Frauen fast magisch anziehend.',
          'Warme, würzige Noten wie Zimt, schwarzer Pfeffer und Ambroxan werden oft als besonders „männlich" und anziehend wahrgenommen. Aber nicht, weil sie aggressiv sind, sondern weil sie Wärme ausstrahlen. Ein würziger Duft auf einem Mann, der sich selbst kennt, wirkt selbstbewusst und elegant.',
          'Süße Noten wie Vanille, Tonka oder Dattel gelten überraschenderweise nicht als weiblich oder unmännlich. Ein Mann, der einen Duft mit subtiler Vanille trägt, wirkt nicht unmännlich, sondern nachdenklich und sinnlich. Frauen finden das sehr anziehend.',
          'Saubere, frische Düfte mit Zitrus und Moschus werden als besonders gepflegt wahrgenommen. Sie wirken wie frisch geduscht, energetisch und modern. Ein Duft, der nach sauberer Haut riecht, wirkt auf Frauen irresistibel anziehend.',
          'Dosierung ist alles: Ein Kompliment entsteht, wenn eine Frau dich riechen kann, wenn sie näher kommt, aber nicht, wenn du vorbeigehen. Das ist Subtilität mit Wirkung. Ein Duft, der aus zwei Metern entfernt bereits projektion, kann auch aggressiv wirken.'
        ]
      },
      {
        heading: 'Das Geheimnis: Es geht nicht um Lärm',
        body: [
          'Viele Männer machen den Fehler, zu denken, dass ein intensiver, projektionsstarker Duft besser ankommt. Das ist falsch. Ein sehr intensiver Duft kann aufdringlich wirken, besonders in Innenräumen. Die größten Kompliment-Magneten sind Düfte, die elegant dosiert wirken, nicht wie eine Duftwolke, sondern wie ein Versprechen. Ein Duft, der nur aus der Nähe wahrnehmbar ist, wirkt sinnlich und intelligent. Ein Duft, der den ganzen Raum erfüllt, wirkt dominanz-bedürftig.',
          'Das bedeutet: Der beste Männerduft ist ein Duft, den der Mann morgens aufträgt, und den Frauen den ganzen Tag über wahrnehmen, aber nicht als aufdringlich erleben. Das ist Balance.'
        ]
      },
      {
        heading: 'Für verschiedene Typen',
        body: [
          'Der klassisch-elegante Mann: Dior Sauvage oder Boss Bottled. Diese Düfte wirken zeitlos elegant, nicht rebellisch, sondern kultiviert. Sie funktionieren im Büro und beim Date gleich gut.',
          'Der kreative, künstlerische Typ: Fahrenheit oder Le Male. Diese haben mehr Charakter, mehr Persönlichkeit. Sie wirken auf Frauen, die Individualität schätzen, besonders anziehend.',
          'Der warme, süßliche Typ: One Million oder Versace Eros. Diese Düfte sind nicht aggressiv, sondern einladend und warm. Sie wirken auf Frauen, die Sinnlichkeit schätzen, magisch anziehend.',
          'Der moderne Typ: Stronger with You hat diese moderne, balancierte Formel, die zeitgenössische Männer anzieht. Nicht zu konservativ, nicht zu experimentell.'
        ]
      },
      {
        body: [
          'Wichtig: Ein Duft muss zu dir passen, nicht zu Frauen, die du beeindrucken möchtest. Der beste Duft ist der, in dem du dich selbstbewusst fühlst. Das ist deine authentische Anziehung – deutlich kraftvoller als jeder Trick. Mach das Quiz, um deine eigene Duftrichtung zu finden und trage sie mit Selbstvertrauen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Vanille-Düfte: Wärme, Komfort & Sinnlichkeit – Das Herz der süßen Düfte',
    description:
      'Vanille ist die universelle Sprache der Behaglichkeit. Entdecke reine cremige Vanille-Düfte bis zu würzigen Varianten mit Tabak und Gewürzen. Von kuschelWeich bis elegant-trocken: Dein perfekter Vanille-Signature.',
    heroImage: '/ratgeber/vanille-duefte-hero.jpg',
    intro: [
      'Vanille ist nicht einfach nur eine Note, sie ist eine Emotion. Die beste Vanille in der Parfümwelt kommt aus Madagascar, ist kostbar und wird seit Jahrhunderten in Luxus-Kompositionen genutzt. Ein großartiger Vanille-Duft riecht warm, umhüllend, einladend – wie ein Zuhause auf der Haut. Vanille hat die Kraft, Menschen sofort zu beruhigen und glücklich zu machen. Das ist kein Zufall: Vanille wurde lange Zeit in der Medizin verwendet, weil sie tatsächlich entspannend wirkt.',
      'Die Intelligenz eines Vanille-Dufts liegt nicht in der reinen Vanille, sondern in ihrer Begleitung. Ein Vanille-Duft, der pur ist, wirkt schnell eintönig und eine-dimensional. Die besten Vanille-Kompositionen paaren Vanille mit Komplizen: Holz für Eleganz und Trockenheit, Gewürzen für Würze und Tiefe, Kaffeenoten für Sophistication oder Blumigen für romantische Weiblichkeit. Das schafft Tiefe und macht den Duft unvergessen.',
      'Hier findest du unsere liebsten Vanille-Düfte: von dessertartig-kuschelig bis würzig-edel. Alle sind langlebig, alle sind tröstlich, alle sind auf ihre Weise wunderschön.'
    ],
    sections: [
      {
        heading: 'Die schönsten Vanille-Düfte – von cremig bis würzig',
        body: [
          'Ein großartiger Vanille-Duft braucht Charakter. Die folgenden acht Düfte zeigen die ganze Bandbreite: von reiner Vanille über Vanille mit Gewürzen bis zu Vanille mit Holz und edlen Basisnoten.'
        ],
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
        heading: 'Die Vanille-Familien: Welche Variante ist deine?',
        body: [
          'Rein cremige Vanille ist das Klassischste. Ein Duft, der primär nach hochwertiger Vanille riecht, manchmal mit pudrigen oder cremigen Zusätzen. Das wirkt kuschelig, süß und dessertartig. Ideal für diejenigen, die Vanille lieben und Einfachheit schätzen.',
          'Würzige Vanille mit Tabak, Zimt oder Dattel ist die erwachsenere Variante. Tabak und Vanille kombiniert wirkt edel, rauchig-warm, fast barbarisch. Das ist für diejenigen, die Vanille lieben, aber auch Struktur und Tiefe brauchen.',
          'Vanille mit Holz oder floralen Elementen schafft Balance. Ein Hauch Iris oder Rose mit Vanille wirkt elegant und weniger eintönig. Mit Sandelholz oder Zeder wird Vanille trocken und zeitlos. Perfekt für Alltag und Büro.',
          'Vanille mit Kaffee oder schokoladen Elementen ist die gourmande Variante. Das wirkt fast essbar, verführerisch und einladend. Perfekt für Abende und intime Momente.'
        ]
      },
      {
        heading: 'Vanille das ganze Jahr: Saison-Anpassungen',
        body: [
          'Vanille ist Winter und Herbst die Königin, aber sie funktioniert das ganze Jahr. Im Sommer wähle eine leichtere Vanille oder eine Vanille mit Frische-Elementen, die nicht so schwer wirkt. Ein Hauch Zitrus mit Vanille wirkt im Sommer erfrischend statt schwer.',
          'Im Frühjahr und Herbst ist Vanille perfekt in ihrer reinen Form. Ein cremig-pudrig Vanille-Duft wirkt in diesen Übergangsjahreszeiten elegant und tröstlich. Du wechselst langsam von Frische zu Wärme.',
          'Im Winter ist Vanille am wunderschönsten. Hier darfst du zu volleren, würzigeren oder süßeren Varianten greifen. Ein Vanille mit Tabak oder Gewürzen brilliert im Winter wie sonst nirgends.'
        ]
      },
      {
        heading: 'Vanille-Düfte richtig dosieren und tragen',
        body: [
          'Vanille wirkt intensiv, besonders auf trockener Haut. Eine gute Feuchtigkeitspflege vorher verdoppelt die Haltbarkeit und macht den Duft angenehmer. Im Winter, wenn die Heizungsluft austrocknet, ist Hautpflege essentiell.',
          'Ein bis zwei Sprühstösse sind normalerweise ideal. Vanille braucht nicht viel, um präsent zu sein. Ein Sprühstoss am Hals, evtl. einen auf den Unterarm – mehr ist selten nötig.',
          'Vanille-Düfte halten lange. Das ist einer ihrer großen Vorteile. Ein qualitativ hochwertiger Vanille-Duft hält oft acht bis zehn Stunden auf der Haut, manchmal sogar länger. Das ist, weil Vanille eine Basis-Note ist, nicht flüchtig, sondern haftend.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Oud-Düfte: Das flüssige Gold der Parfümerie – Von Einsteigerfreundlich bis Luxus-Extrait',
    description:
      'Oud ist das Herz orientalischer Eleganz: warm, zeitlos, langanhaltend und faszinierend. Entdecke die besten Oud-Kompositionen von günstigen Schätzen bis zu exklusiven Meisterwerken – wann und wie du Oud richtig trägst.',
    heroImage: '/ratgeber/oud-duefte-hero.png',
    intro: [
      'Oud ist das flüssige Gold der Parfümerie. Es ist das Harz des indischen Adlerholzbaums, und echtes, gereiftes Oud kostet mehr als sein Gewicht in Gold. Aber es ist nicht nur teuer, weil es selten ist, sondern weil es magisch wirkt. Ein Duft mit echtem Oud riecht warm, tiefgründig, leicht rauchig und unglaublich langanhaltend. Oud hinterlässt ein Aroma auf der Haut, das 12 bis 24 Stunden dauert, manchmal noch länger. Es ist eines der wenigen Düfte, die sich noch Tage später im Gedächtnis befinden.',
      'Die gute Nachricht: Echtes, natürliches Oud ist für die meisten Menschen unerschwinglich, aber gute synthetische Oud-Akkorde sind kostengünstig und arbeiten perfekt. Moderne Oud-Düfte verwenden Moleküle wie Iso E Super und spezielle Oud-Synthesen, die das Original täuschend echt nachbilden. Das ist nicht eine Täuschung, sondern eine Lösung. Ein synthetisches Oud in einem guten Duft ist oft sogar prägnanter und angenehmer zu tragen als echtes, weil es balancierter ist. Die Duft-Industrie hat verstanden, dass Qualität nicht nur davon kommt, ob etwas echt ist, sondern wie es komponiert wird.',
      'Hier findest du unsere liebsten Oud-Düfte: einsteigerfreundlich, warm, meisterlich komponiert. Vom erschwinglichen Schatz bis zum Luxus-Extrait, für jeden Weg in die Welt des Ouds.'
    ],
    sections: [
      {
        heading: 'Die besten Oud-Düfte: Vom Einstieg bis zur Sammler-Rarität',
        body: [
          'Diese Auswahl zeigt die volle Bandbreite der Oud-Welt. Von einsteigerfreundlich und süßlich bis zu reinen, intensiven Kompositionen, jeder dieser Düfte ist ein Meisterwerk.'
        ],
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
        heading: 'Oud für Einsteiger: Richtig beginnen ohne Überwältigung',
        body: [
          'Der erste Oud ist ein Abenteuer. Reines, rauchig-medizinisches Oud kann anfangs intensiv wirken, fast antiseptisch oder kampferartig. Das ist normal und kein Fehler – deine Nase gewöhnt sich daran und nach 15 bis 30 Minuten wird der Duft weicher und runder. Gib ihm Zeit. Viele Oud-Liebhaber sagen: Der erste Eindruck war Schock, aber nach einer Minute war es Liebe.',
          'Wenn du Oud zum ersten Mal erlebst, wähle eine süßlich-warme Variante: Oud mit Rose, Safran, Vanille oder Amber. Diese sind zugänglicher, weil die süßen Begleiter die intensive Rauchigkeit des Ouds balancieren. Lattafa Badee Amethyst oder Montale Arabians Tonka sind perfekt für den Anfang – sie zeigen dir Oud in seiner wärmsten, verführendsten Form.',
          'Günstige Oud-Düfte von Lattafa, Montale oder Mancera sind perfekt zum Ausprobieren. So lernst du, ob dir die Richtung überhaupt gefällt, bevor du 200 Franken für einen Tom Ford investierst. Ein Oud-Duft, der 30 Franken kostet, kann derselben psychologischen Effekt haben wie einer für 300 Franken, wenn er gut komponiert ist.'
        ]
      },
      {
        heading: 'Die verschiedenen Oud-Typen: Welcher passt zu dir?',
        body: [
          'Süßlich-warmer Oud mit Vanille und Amber: Das ist der einladendste Oud. Er wirkt warm, tröstet wie eine Umarmung, und ist perfekt für Anfänger. Der Oud ist präsent, aber nicht aggressiv. Lattafa Badee Amethyst ist ein Klassiker in dieser Kategorie.',
          'Würziger Oud mit Tabak und Gewürzen: Das ist reifer, männlich kodiert, und hat mehr Charakter. Ein rauchiger Oud mit schwarzem Pfeffer oder Zimt wirkt geheimnisvoll und intellektuell. Mancera Red Tobacco geht in diese Richtung.',
          'Blumiger Oud mit Rose und Safran: Das ist einer der elegantesten Ouds. Rose und Oud kombiniert wirken orientalisch-romantisch. Shaghaf Oud hat diese Kombination perfekt gemacht. Für alle, die Oud wollen, aber nicht auf Eleganz verzichten mögen.',
          'Reiner, intensiver Oud: Das ist für Sammler und Oud-Liebhaber. Ein Duft wie Tom Ford Oud Wood oder Initio Oud Greatness ist tiefe Rauchigkeit, fast medizinisch, sehr langlebig. Das ist nicht zum Anfangen, sondern zum Verstehen.'
        ]
      },
      {
        heading: 'Oud richtig dosieren und tragen',
        body: [
          'Oud ist intensiv. Ein einzelner Sprühstoss auf die Brust oder der Nacken genügt für den ganzen Tag. Zwei Sprühstösse sind Maximum, es sei denn, du bist draußen im Freien in kaltem Wetter und willst Projektion. Ein zu intensiver Oud in einem geschlossenen Raum oder im Büro wirkt schnell erdrückend und dominierend. In diesen Kontexten: ein Sprühstoss, nicht mehr.',
          'Die beste Zeit für Oud ist der Herbst und Winter. Die Kälte und die beheizte Innenluft helfen Oud, sich zu entfalten, ohne aufdringlich zu wirken. Im Sommer wirkt Oud oft zu schwer und cloying. Wenn du Oud im Sommer tragen möchtest, wähle einen mit leichterer Basis oder kombiniere ihn mit frischen Noten wie Rose oder Zitrus.',
          'Oud ist am schönsten am Abend oder zu besonderen Anlässen. Im Alltag oder im Büro, wenn du subtil wirken möchtest, ist ein anderer Duft besser. Oud ist für Momente, in denen du präsent sein darfst, nicht subtil.',
          'Eine gute Hautpflege vorher ist wichtig: Oud braucht Haftung. Eine gute Bodylotion gibt dem Duft die richtige Basis, damit er lange und schön hält, nicht zu schnell verdunstend.'
        ]
      },
      {
        heading: 'Oud-Düfte lagern, behandeln und vertiefen',
        body: [
          'Oud ist kostbar und empfindlich gegenüber Hitze, Licht und Luft. Lagere deine Flasche immer dunkel und kühl, idealerweise in der Originalverpackung. Im Badezimmer ist der schlechteste Ort – Temperaturwechsel und Feuchtigkeit lassen Oud schneller kippen. Ein Schrank im kühlen Schlafzimmer ist ideal.',
          'Echte Oud-Liebhaber sagen: Oud wird mit der Zeit besser. Wenn du einen neuen Oud kaufst, gib ihm ein paar Wochen, um sich zu settlen. Der Duft kann sich auf der Haut mit der Zeit verändern, wird manchmal runder, manchmal intensiver. Das ist nicht gut oder schlecht, sondern Tiefe.',
          'Wenn du in echte Oud-Extraits investierst (Tom Ford, Initio, Penhaligons), wissen Sie, dass echte Oud-Düfte extrem langlebig sind. Ein Duft, den du 2-3 Mal pro Woche trägst, hält dir Monate bis Jahre. Das ist eine langfristige Investition, aber eine, die sich lohnt.',
          'Wichtig: Der Unterschied zwischen günstigen und teuren Oud-Düften liegt nicht immer darin, wie viel echter Oud drin ist, sondern in der Komposition. Ein 30-Franken-Oud von Lattafa kann derselbe psychologische Effekt haben wie ein 300-Franken-Tom Ford, wenn er gut gestaltet ist. Teste immer zuerst.'
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
    title: 'Frauendüfte, die Männer lieben: Wärme, Verführung & Eleganz – Die Klassiker der Anziehung',
    description:
      'Welche Frauendüfte ziehen auf Männer an? Unsere Liste der echten „Anziehungs-Klassiker": süß, sinnlich und zeitlos. Düfte, die im Gedächtnis bleiben und echte Komplimente bringen.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fit=crop',
    intro: [
      'Es gibt Frauendüfte, die scheinen auf Männer wie ein Magnet zu wirken. Lange nachdem die Frau vorbei ist, erinnert sich ein Mann noch an den Duft, und er wirkt unbewusst attraktiv auf ihn ein. Aber nicht wegen eines Tricks oder einer Manipulation, sondern weil gute Düfte die Psychologie verstehen. Die erfolgreichsten Frauendüfte kombinieren warmth, Sinnlichkeit und leichte Rätselhaftigkeit. Sie riechen nicht nach „Mädchen", sondern nach einer reifen, intelligenten Frau, die weiß, was sie will.',
      'Was diese Düfte alle gemeinsam haben: Sie beginnen oft mit leichtem Fruchtig oder Blüte (macht den Duft nicht zu schwer), haben eine sinnliche Herznote (warme Blüten wie Rose, Orchidee oder exotische Frucht), und enden mit einer warmen, subtil süßlich-sinnlichen Basis (Vanille, Moschus, Amber). Ein Duft, der dieses Dreieck schafft, wirkt magisch anziehend, weil er Eleganz mit Verführung verbindet.',
      'Hier sind die Klassiker, die bei Männern garantiert gut ankommen. Das ist nicht «für Männer geschrieben», sondern eine Beobachtung dessen, was psychologisch funktioniert. Eine Frau, die sich in einem dieser Düfte wohlfühlt, trägt ihn mit echtem Selbstvertrauen – und das ist die eigentliche Anziehung.'
    ],
    sections: [
      {
        heading: 'Die größten Anziehungs-Klassiker',
        body: [
          'Diese Düfte sind nicht neu und nicht trendig, aber zeitlos anziehend auf Männer. Sie funktionieren, weil sie ein psychologisches Muster erfüllen, das tief sitzt: Sie wirken elegant, sinnlich und nahbar zugleich. Eine Frau, die einen dieser Düfte trägt, wird wahrgenommen als selbstbewusst, kultiviert und sinnlich intelligent.'
        ],
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
        heading: 'Die psychologische Formel: Warum Männer diese Düfte anziehend finden',
        body: [
          'Süße und Wärme gelten unbewusst als Zeichen von Femininität und Sinnlichkeit. Noten wie Vanille, Tonka und Karamell wirken auf der unbewussten Ebene vertrauenswürdig und einladend. Sie sind nicht aggressiv, sondern zieht. Das ist auch, warum viele traditionelle Verführungs-Düfte süße Basis-Noten haben.',
          'Blumige Noten wie Rose, Jasmin und Orchidee werden mit Romantik und Weiblichkeit assoziiert. Sie wirken nicht hart, sondern elegant-weich. Eine Rose mit Vanille ist die klassische «Verführungs-Formel» in der Parfümerie – und sie funktioniert auch heute noch, weil Männer diese Kombination psychologisch als attraktiv wahrnehmen.',
          'Amber und Moschus wirken nach gepflegter, warmer Haut. Sie riechen nach Nähe und Zärtlichkeit, nicht nach chemikalischen Dingen. Das ist, warum pudrige, moschus-artige Frauendüfte auf Männer hypnotisierend wirken.',
          'Das Geheimnis ist Balance: Der Duft darf nicht zu aufdringlich sein, nicht zu laut. Ein Frauenduft, der sehr intensiv ist, kann überwältigend wirken. Die besten Anziehungs-Düfte sind solche, die nur aus der Nähe zu riechen sind, die aber dann intensiv wirken. Das schafft Anziehung auf unbewusster Ebene.',
          'Süßlichkeit ohne Infantilität: Ein guter süßer Frauenduft ist niemals niedlich oder mädchenhaft. Er ist reif, sinnlich und intelligent. Das ist der Unterschied zwischen «verspielte Süße» (wirkt jung) und «sinnliche Süße» (wirkt reif). Die guten Düfte haben diese Reife.'
        ]
      },
      {
        heading: 'Für verschiedene Kontexte und Ziele',
        body: [
          'Für das erste Date: Ein Duft, der nicht zu dominant ist, aber sinnlich wirkt. YSL Black Opium oder Lancôme La Vie Est Belle haben diese Balance perfekt. Sie wirken sexy ohne aufdringlich zu sein.',
          'Für etablierte Beziehungen: Ein Duft, den der Partner kennt und liebt, wird zu eurem «gemeinsamen Duft». Coco Mademoiselle oder Mon Paris werden zu Düften, die sofort mit dir verbunden sind. Das ist Langzeit-Anziehung.',
          'Für alltägliche Anziehung: Ein pudrig-moschusartiger Duft wie Lattafa Yara oder Gisada Ambassadora wirkt im Alltag, beim Einkaufen oder im Büro, immer noch subtil anziehend. Es ist nicht aufdringlich, aber man bemerkt es.',
          'Für intensive Momente: Ein sehr sinnlicher, warmer Duft wie Black Opium mit mehr Dosierung wirkt am Abend oder in intimen Kontexten magisch anziehend. Hier darf der Duft sinnlich und full-bodied sein.',
          'Wichtig in allen Kontexten: Dosierung und Selbstvertrauen sind wichtiger als der Duft selbst. Eine Frau, die sich in einem Duft wohlfühlt und ihn mit Selbstvertrauen trägt, wird immer attraktiver wirken als eine Frau, die sich unwohl fühlt, aber einen «anziehenden» Duft trägt.'
        ]
      },
      {
        body: [
          'Das wichtigste Geheimnis: Es geht nicht darum, für Männer zu fallen oder dich zu manipulieren. Es geht darum, einen Duft zu tragen, der du liebst, in dem du dich selbstbewusst und elegant fühlst. Diese echte Sicherheit ist die größte Anziehung. Mach das Quiz und finde deine eigene Lieblingsrichtung. Dann trage sie mit voller Überzeugung – das ist was wirklich anziehend ist.'
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
    title: 'Die besten Frühlingsdüfte: Aufbruch, Grüne Noten & Blüten-Eleganz',
    description:
      'Der Frühling braucht Leichtigkeit. Entdecke blumig-frische Düfte mit grünen Noten, zarten Blüten und Zitrus. Von zart bis mutig, für Alltag und besondere Momente. Deine Frühlings-Signatur wartet.',
    heroImage: '/ratgeber/die-besten-fruehlingsduefte.jpg',
    intro: [
      'Der Frühling ist ein Neuanfang, und dein Duft sollte das spiegeln. Die schweren, dunklen Winterdüfte kommen jetzt in den Schrank. Der Frühling ruft nach Leichtigkeit, nach Düften, die wie eine Brise riechen, wie die erste grüne Knospe, wie Zitrus und Blüten in der Sonne. Ein großartiger Frühlingsduft macht dich nicht nur riechen, sondern fühlen: energetisch, erwacht, hoffnungsvoll. Die Psychologie ist klar: Im Frühling sehnen wir uns nach Helligkeit und Bewegung, und ein frischer, lebendiger Duft unterstützt diesen mentalen Übergang.',
      'Die Intelligenz eines Frühlingsduft liegt in seiner Balance zwischen Frische und Struktur. Es reicht nicht, einfach nur Zitrus zu nehmen. Ein wirklich großartiger Frühlingsduft hat Tiefe: vielleicht grüne aromatische Noten, ein Hauch Blüte im Herz, und eine dezente, wärmende Basis, die den Duft zusammenhält, wenn die Sonne untergeht. Der Frühling ist die Jahreszeit, in der Düfte am schnellsten verflogen, aber auch wo sie am schönsten funktionieren, weil deine Nase frischer ist.',
      'Hier findest du unsere liebsten Frühlingsdüfte: blumig, grün, zart, manchmal mit einem Hauch Frucht. Manche sind zeitlose Klassiker, andere sind moderne Entdeckungen. Alle funktionieren wunderbar in dieser magischen Jahreszeit.'
    ],
    sections: [
      {
        heading: 'Die schönsten Frühlingsdüfte – von zart bis mutig',
        body: [
          'Ein großartiger Frühlingsduft braucht Charakter. Die folgenden Düfte repräsentieren die Bandbreite: von zarten, pudrig-blumigen bis zu grünen, strukturierten Kompositionen. Alle sind leicht, alle funktionieren im Frühling wunderbar.'
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
        heading: 'Frühlings-Duft-Familien: Welche Energie passt zu dir?',
        body: [
          'Blumig-zarte Düfte riechen nach Blüten im frühesten Stadium: Pfirsich-Blüte, Kirsche-Blüte, Magnolie. Sie sind feminin, weich und manchmal mit pudrig-weiße Basis. Diese Düfte wirken romantisch und sanft. Perfekt, wenn du es zart magst.',
          'Grüne und aromatische Düfte sind modern und strukturiert. Sie riechen nach grünen Blättern, manchmal Galbanum, manchmal grüner Tee. Sie wirken frisch, weniger süß als blumige, und unglaublich erfrischend. Diese Familie ist für diejenigen, die Leichtigkeit mit Charakter wollen.',
          'Zitrus-Blüten-Kombinationen sind die klassische Frühlingsformel. Ein Hauch Zitrus, dazu zartes Blüten-Herz, dezente Basis. Das ist der Inbegriff von Frühling: hell, hell, hell, aber mit etwas Struktur.',
          'Fruchtig-blumige Düfte kombinieren Blüten mit Frucht-Akkorden wie Pfirsich, Apfel oder Birne. Sie wirken jung, verspielt und energetisch. Perfekt für aktive, freche Frühlings-Momente.'
        ]
      },
      {
        heading: 'Frühlingsdüfte für verschiedene Kontexte',
        body: [
          'Alltag & Büro: Eine zarte oder grüne Frühlingskomposition ist ideal. Sie wirkt frisch, ohne dich zu dominieren. Ein bis zwei Sprühstösse reichen, weil der Frühling auch der Jahreszeit ist, wo Düfte schneller evaporieren.',
          'Date im Freien: Ein fruchtig-blumiger Duft mit ein bisschen mehr Charakter funktioniert hervorragend. Die frische Luft, die Sonne, deine erwachte Haut nach dem Winter – alles spielt zusammen. Vermeide schwere oder warme Düfte, die wirken im Frühling fehl am Platz.',
          'Abends & bei Kühle: Wenn es nach Sonnenuntergang noch kühl wird, ein Hauch wärmere Basis (subtiles Moschus oder sanftes Holz) gibt dem Frühlingsduft Halt. Das ist die Schönheit des Übergangssasons: Das gleiche Duft funktioniert vom Tag ins Abend.',
          'Sport & Outdoor: Aquatische oder grüne Frühjahrs-Düfte sind hier ideal. Sauber, leicht, präsent, aber nicht aufdringlich. Dein Körper wird warm, der Duft wird sich mit der Aktivität verändern – das ist Teil des Erlebnisses.'
        ]
      },
      {
        heading: 'Haltbarkeit und Dosierung im Frühling',
        body: [
          'Frühjahrs-Düfte halten oft nicht ganz so lange wie Winter- oder sogar Sommerdüfte. Das ist ok, weil sie für diese Jahreszeit dimensioniert sind. Ein Frühlingsduft, der vier bis fünf Stunden hält, ist perfekt. Die leichte, frische Formel evaporiert schneller.',
          'Dosierung: Der Frühling verlangt nach weniger als der Sommer. Ein Sprühstoss am Hals und vielleicht eine kleine Auffrischung am Nachmittag. Die milde Temperatur und deine regenerierte Haut (nach dem Winter) verstärken den Duft natürlich.',
          'Praktischer Tipp: Ein tragbarer Zerstäuber mit deinem Frühjahrs-Liebling ist ideal. Nach dem Training, nach dem Lunch, wenn dich die Nase ruft – ein schneller Sprühstoss holt dich ins Jetzt zurück.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-bueroduefte',
    title: 'Die besten Büro-Düfte: Subtilität, Eleganz & Respekt – Professionelle Ausstrahlung',
    description:
      'Der perfekte Büro-Duft ist ein stilles Statement. Subtil, elegant und respektvoll – dein Duft sollte dich begleiten, nicht den Raum dominieren. Entdecke Düfte, die deine professionelle Ausstrahlung stärken, ohne zu aufdringlich zu wirken.',
    heroImage: '/images/guides/bueroduefte-hero.jpg',
    intro: [
      'Ein Büro-Duft ist nicht weniger wichtig als ein Abendduft, nur anders. Im Büro ist ein Duft ein subtiles Statement über deine Kultur und Aufmerksamkeit. Es ist eine Form der Eleganz, einen Duft zu tragen, der nicht dominiert. Ein großartiger Büro-Duft begleitet dich den ganzen Tag, ist für andere wahrnehmbar, wenn sie näher kommen, aber drängt sich nicht in den Vordergrund. Das ist schwieriger zu componieren als man denkt, weil Subtilität auch Charakter erfordert. Ein langweiliger Duft ist nicht subtil, er ist einfach schwach.',
      'Die Psychologie ist clear: Im Grossraumbüro teilst du einen kleinen Luftraum mit vielen Menschen, manche mit empfindlicheren Nasen, manche mit Allergiefaktoren. Ein intensiver, schwerer oder sehr süßer Duft kann schnell zum Thema werden, nicht zum positiven. Ein kluger Büro-Duft hingegen sagt: Ich bin hier, ich habe Geschmack, ich respektiere deine Nähe. Das schafft Vertrauen und Eleganz.',
      'Hier findest du unsere besten Büro-Düfte, sorgfältig ausgewählt für ihre Balance zwischen Präsenz und Subtilität. Sie sind für Menschen, die verstehen, dass manchmal weniger wirklich mehr ist.'
    ],
    sections: [
      {
        heading: 'Die besten Büro-Düfte – Eleganz im Alltag',
        body: [
          'Ein großartiger Büro-Duft funktioniert ohne Kompromisse. Er ist präsent genug, dass dich die Person neben dir wahrnimmt, aber nicht so intensiv, dass deine Kolleginnen und Kollegen nach einer Stunde einen Kopfschmerz haben. Die folgenden Düfte sind ideal für professionelle Kontexte, weil sie kultivierte Eleganz ausstrahlen.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'ysl-y-edp', 'boss-bottled', 'le-labo-santal-33', 'jo-malone-wood-sage-sea-salt', 'coco-mademoiselle', 'narciso-for-her', 'dior-homme']
      },
      {
        heading: 'Die Büro-Duft-Familien: Welche Subtilität passt zu dir?',
        body: [
          'Frische und aquatische Düfte sind die klassische Wahl für das Büro. Sie wirken sauber, angenehm und niemals erdrückend. Ein zitronig-frischer Duft oder ein aquatischer mit Salzigkeit sagt: Ich bin präsent, ich bin gepflegt, ich respektiere den gemeinsamen Luftraum. Diese Familie funktioniert das ganze Jahr.',
          'Holzige Düfte mit Struktur sind eine elegante Wahl für diejenigen, die ein bisschen mehr Charakter mögen. Sandelholz, Zeder, Vetiver oder grüne, aromatische Noten wirken sophisticiert und professionell. Sie haben genug Substanz, um interessant zu sein, ohne aufdringlich zu werden.',
          'Leicht blumige Düfte, besonders mit grünen oder aromatischen Elementen, funktionieren wunderbar im Büro. Eine leichte Rose mit Zitrus oder eine grüne Blume wirkt elegant und feminin, ohne saccharin zu sein. Das Wichtigste ist, dass es keine schwere, süßliche Blüte ist, sondern etwas mit Struktur.',
          'Saubere, minimalistische Düfte sind die Königskategorie für Büro. Ein Duft, der wie hochwertige Haut-Konsistenz riecht, oder wie reines Weiß aussieht, ist perfekt. Diese Düfte sind so subtil, dass sie fast wie eine Hautpflege-Komposition wirken, aber mit feinen Duft-Noten darunter.'
        ]
      },
      {
        heading: 'Was NICHT ins Büro gehört',
        body: [
          'Intensive Gourmands mit dominanter Vanille, Karamell oder Schokolade sind im geschlossenen Büroraum oft zu überwältigend, besonders wenn du unter mehreren Menschen sitzt. Ein süßer Duft, der im Winter zu Hause wunderbar ist, kann im Büro schnell zu viel sein.',
          'Schwere Oud- und Amber-Düfte, besonders die mit großer Projektion, gehören in den Abend, nicht an den Schreibtisch. Ein reicher, rauchiger Oud im 9-to-5 ist einfach fehl am Platz.',
          'Ultra-intensive Beast-Mode-Düfte sind im Büro ein No-Go. Du brauchst nicht eine Duft-Wolke, um professionell zu wirken. Im Gegenteil, Subtilität wirkt intelligenter.',
          'Exotische, stark-anisattige oder sehr ungewöhnliche Düfte können ablenkend wirken. Dein Büro-Duft sollte elegant und uncontroversial sein. Speichere dein experimentelles Duft-Abenteuer für Abende und Wochenenden.'
        ]
      },
      {
        heading: 'Die Kunst der Büro-Dosierung und des Auftrags',
        body: [
          'Im Büro brauchst du deutlich weniger als zuhause. Ein einzelner, gezielter Sprühstoss am Hals ist meist ideal. Bei manchen Düften genügt sogar ein halber Sprühstoss oder ein Duft-Tröpfchen auf der Kleidung. Das Ziel ist, dass andere dich wahrnehmen, wenn sie näher kommen, nicht dass dein Duft dich voraus ankündigt.',
          'Trag den Duft lieber auf die Kleidung als auf die Haut. Ein Sprühstoss auf einem Hemd oder einer Jacke statt auf der Haut wirkt deutlich subtiler und länger, weil die Kleidung den Duft langsamer verdunsten lässt als deine Haut. Das ist ein Profi-Trick.',
          'Morgens reicht ein einzelner Sprühstoss aus. Falls der Duft gegen Mittag nachlässt, ein leichtes Auffrischen im Bad, aber nicht mehr als ein kleiner Sprühstoss. Im Büro bedeutet „nachzulegen" nicht, neu anzufangen.',
          'Im Sommer halte dich an ein Sprühstoss, maximal. Die Hitze und die Nähe zu anderen Menschen verlangen Zurückhaltung. Im Winter darfst du eventuell ein bisschen mehr machen, aber nicht exzessiv.'
        ]
      },
      {
        heading: 'Büro-Kontexte: Schreibtisch vs. offenes Büro vs. Meetings',
        body: [
          'Wenn du ein eigenes Büro oder einen geschlossenen Schreibtisch hast, darfst du etwas intensiver wählen. Ein schöner holziger oder blumiger Duft mit etwas mehr Charakter funktioniert, weil der Raum klein ist und dein Duft nicht andere beeinflusst.',
          'Im Grossraumbüro oder Open Space ist Subtilität essentiell. Dein Duft sollte fast unsichtbar sein für Menschen, die zwei Meter entfernt sind. Ein Sprühstoss ist hier nicht zu wenig, es ist genau richtig.',
          'Bei Meetings, besonders mit Kunden oder in formalen Kontexten, wähle einen Duft, der ruhig und professionell wirkt. Nichts Kontrovers, nichts Experimentelles. Ein klassischer, zeitloser Duft sagt: Ich bin zuverlässig und kultiviert.',
          'Beim Homeoffice kannst du entspannter sein, aber etabliere eine Routine. Ein Duft zum Starten des Arbeitstages schafft Ritual und mentale Grenzziehung zwischen Privat- und Arbeitsmodus.'
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
        perfumes: ['le-labo-santal-33', 'viktor-rolf-spicebomb', 'chanel-bleu-de-chanel', 'tom-ford-oud-wood', 'byredo-gypsy-water', 'club-de-nuit-intense', 'dior-homme', 'terre-dhermes']
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
    title: 'Die besten pudrigen & Moschus-Düfte: elegant, hautnah & zeitlos – seit Jahrhunderten beliebt',
    description:
      'Pudrige & Moschus-Düfte mit Iris, Veilchen und sauberer Haut-Wärme: elegant, sinnlich und universell. Von klassisch bis modern – unsere liebsten weichen Meisterwerke für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/pudrige-moschus-duefte-hero.png',
    intro: [
      'Pudrige und moschusartige Düfte sind das Gegenteil von lauter Präsenz – sie sind die Kunst der Subtilität. Sie riechen nach gepflegter Eleganz, nach frisch geduschter Haut, nach Iris und Veilchen, die dich sanft umhüllen wie eine Seide-Handschuhe. Diese Düfte haben eine lange Geschichte: Pudernoten existieren seit der Renaissance, als Puder und Parfüm noch Luxus-Privilegien waren. Heute sind sie moderner denn je – nicht altmodisch, sondern zeitlos elegant.',
      'Moderne pudrige Düfte sind nicht die süßlich-schweren Fruchtbomben von früher. Sie kombinieren Iris- und Veilchennoten (die klassischen „Puder-Noten") mit sauberem Moschus, leichtem Holz oder sogar frischen Zitrus-Akzenten. Das Ergebnis ist eine wunderbare Balance: elegant aus der Nähe, dezent aus der Ferne, und nirgendwo aufdringlich. Sie passen zu jedem Moment, von der Büroarbeit bis zum Dinner.',
      'Hier unsere liebsten pudrigen und Moschus-Düfte – eine Auswahl für alle, die Eleganz, Subtilität und zeitlose Schönheit schätzen, mit Klassikern und modernen Entdeckungen.'
    ],
    sections: [
      {
        perfumes: ['narciso-for-her', 'coco-mademoiselle', 'chanel-no-5', 'lancome-idole', 'ysl-libre', 'prada-paradoxe', 'lattafa-mayar', 'malle-musc-ravageur']
      },
      {
        heading: 'Die Familien: Pudrig vs. Moschus – wo ist der Unterschied?',
        body: [
          'Pudrig (Powdery): weiche, leicht „make-up-artige" Noten wie Iris, Veilchen, Heliotrop und Tonka. Sie riechen elegant, ein wenig nostalgisch, wie ein Traum aus klassischen Zeiten. Iris ist besonders edel – teuer, komplex und unglaublich subtil. Pudrige Düfte sind eher für Damen, aber moderne Unisex-Versionen brechen diese Regel.',
          'Moschus (Musk): sauber-weiche Basisnoten, die nach gepflegter, warmer Haut riechen, fast wie frisch geduschte Skin. Synthetischer Moschus ist vielseitig und funktioniert in fast jedem Duft – Herren-, Damen- und Unisex-Düften. Er macht jeden Duft weicher und faszinierender.',
          'Die Magie: Viele Klassiker kombinieren beides. Das ergibt den perfekten Mix – die elegante Nostalgie des Pudrigen + die moderne Sauberkeit des Moschus = zeitlos schön und immer passend.'
        ]
      },
      {
        heading: 'Worauf du bei pudrigen & Moschus-Düften achten solltest',
        body: [
          'Sie bleiben nah an der Haut – das ist kein Fehler, sondern Absicht und wirkt eleganter als laute Präsenz. Das ist der Luxus dieser Kategorie: Subtilität statt Aufdringlichkeit.',
          'Haltbarkeit: Modern pudrige Düfte halten oft gut, weil die Basis-Noten (Moschus, Holz, Vanille) langlebig sind. Reine Iris-Düfte können flüchtiger sein – das ist normal und charmant.',
          'Anwendung: Da diese Düfte hautnah wirken, brauchst du möglicherweise mehr Sprühstösse als bei schweren Düften. Trag sie auf Hals, Handgelenk und Dekolleté auf – überall, wo deine Haut warm ist.',
          'Qualität: Gute pudrige Düfte sind komplex. Lass dich Zeit beim Kennenlernen – die erste Stunde ist anders als die sechste.'
        ]
      },
      {
        heading: 'Pudrig & Moschus für jeden Moment',
        body: [
          'Büro & Alltag: Diese Düfte sind perfekt für lange Arbeitstage. Sie sind nie zu intensiv, nie störend. Sie wirken gepflegt und elegant ohne Anstrengung.',
          'Date & Abend: Ein pudrig-moschusartiger Duft ist einladend und verführerisch ohne aggressiv zu sein. Die Nähe ist das Point – wenn jemand dich umarmt, wird er verliebt.',
          'Jahreszeiten: Pudrige Düfte funktionieren überall. Im Sommer wirken sie erfrischend (wegen der leichten Moschus-Note), im Winter warm und einladend.',
          'Schichtenspiel: Pudrig-Moschus-Düfte sind wunderbar zum Layering. Kombinier sie mit einem frischen oder würzigen Duft – die Pudernote macht alles weicher und eleganter.'
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
