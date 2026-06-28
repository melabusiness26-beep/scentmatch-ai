// Duftnoten-Lexikon: redaktionelle Daten für die /duftnoten-Seiten.
// Alle Texte sind eigenständig formuliert (keine externen Kopien) und rein
// informativ. Keine Produkt-, Preis- oder Bewertungsdaten.

export type ScentNote = {
  slug: string;
  name: string;
  /** Kurzbeschreibung für die Übersichtskarten. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Wie riecht die Note? */
  smell: string;
  /** Herkunft / Herstellung. */
  origin: string;
  /** Typische Duftfamilie. */
  family: string;
  /** Typische Wirkung. */
  effect: string;
  /** Welche Noten/Düfte passen dazu? */
  pairsWith: string;
  /** Zusätzliche Schreibweisen, um Katalog-Düfte zu dieser Note zu finden. */
  synonyms?: string[];
  /**
   * Optionales echtes Foto der Zutat (z. B. "/noten/oud.jpg" im public-Ordner
   * oder eine erlaubte, lizenzfreie Bild-URL). Ist kein Foto gesetzt, zeigt die
   * Seite automatisch die hauseigene Illustration – es bricht also nie etwas.
   */
  photo?: string;
};

export const scentNotes: ScentNote[] = [
  {
    slug: 'bergamotte',
    name: 'Bergamotte',
    short: 'Spritzige, leicht bittere Zitrusnote – der frische, elegante Auftakt vieler Parfums.',
    metaTitle: 'Bergamotte in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Was riecht Bergamotte in Parfums? Erfahre, wie die frische Zitrusnote wirkt, woher sie kommt und welche Düfte mit Bergamotte zu dir passen.',
    intro:
      'Bergamotte ist eine der beliebtesten Kopfnoten der Parfümerie und sorgt für einen frischen, eleganten ersten Eindruck.',
    smell:
      'Bergamotte riecht spritzig und zitrisch, mit einer feinen bitteren Kante und einem leicht blumig-erdigen Unterton. Anders als Zitrone wirkt sie weicher und edler – frisch, aber nicht scharf.',
    origin:
      'Gewonnen wird Bergamotte aus der Schale der Bergamott-Orange (Citrus bergamia), die vor allem in Kalabrien im Süden Italiens angebaut wird. Das ätherische Öl wird kalt aus der Fruchtschale gepresst.',
    family:
      'Bergamotte gehört zur frischen, zitrischen Duftfamilie und ist Teil vieler Eau de Colognes. Sie eröffnet aber auch würzige, holzige und florale Kompositionen.',
    effect:
      'Bergamotte wirkt frisch, sauber und aufhellend. Sie macht einen Duft leichter und zugänglicher und eignet sich besonders für Frühling und Sommer sowie für Tag und Büro.',
    pairsWith:
      'Bergamotte harmoniert mit fast allem: mit Lavendel und weiteren Zitrusnoten für Frische, mit Vetiver und Zedernholz für holzige Tiefe und mit Jasmin und Rose für florale Eleganz.',
    photo: '/noten/bergamotte.jpg'
  },
  {
    slug: 'iris',
    name: 'Iris',
    short: 'Pudrig, kühl und edel – eine der teuersten und elegantesten Noten der Parfümerie.',
    metaTitle: 'Iris in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Iris in Parfums: Wie riecht die edle, pudrige Note, woher kommt sie und welche Düfte mit Iris passen zu dir? Alles über die Iris-/Orris-Note.',
    intro:
      'Iris (oft als Orris bezeichnet) zählt zu den nobelsten und kostspieligsten Rohstoffen der Parfümerie.',
    smell:
      'Iris riecht pudrig, kühl und leicht erdig, mit einem cremig-veilchenartigen Charakter, der an feuchtes Wurzelholz erinnert. Der Eindruck ist ruhig, vornehm und unaufdringlich.',
    origin:
      'Verwendet wird nicht die Blüte, sondern das Wurzelstock (Rhizom) bestimmter Schwertlilien. Es muss mehrere Jahre reifen, bevor die wertvolle Iris-Butter (Orris) gewonnen wird – ein Grund für den hohen Preis.',
    family:
      'Iris prägt pudrige, holzige und gepuderte Kompositionen und gilt als Inbegriff stiller Eleganz.',
    effect:
      'Iris wirkt elegant, zurückhaltend und erwachsen. Sie verleiht Düften Tiefe und einen feinen, pudrigen Schleier und eignet sich ganzjährig, besonders für gehobene Anlässe.',
    pairsWith:
      'Iris passt wunderbar zu Veilchen, Ambroxan und Zedernholz sowie zu Vanille und Tonkabohne, die ihre kühle Art angenehm wärmen.'
  },
  {
    slug: 'oud',
    name: 'Oud',
    short: 'Dunkel, harzig und intensiv – das „flüssige Gold" der orientalischen Parfümerie.',
    metaTitle: 'Oud in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Oud (Agarholz) in Parfums: Wie riecht die intensive, harzige Note, woher kommt sie und welche Düfte mit Oud passen zu dir?',
    intro:
      'Oud (auch Agarholz) ist eine der intensivsten und teuersten Duftnoten überhaupt und prägt viele orientalische Düfte.',
    smell:
      'Oud riecht dunkel, warm und harzig, oft mit rauchigen, ledrigen und balsamischen Facetten. In kleinen Mengen wirkt es edel und holzig, in höherer Dosierung kraftvoll und durchdringend.',
    origin:
      'Oud entsteht, wenn der Aquilaria-Baum auf einen bestimmten Pilzbefall reagiert und ein dunkles, harzreiches Holz bildet. Da das selten ist, gehört echtes Oud zu den teuersten Rohstoffen; in modernen Düften kommen meist hochwertige Oud-Akkorde zum Einsatz.',
    family:
      'Oud ist das Herz der orientalisch-holzigen Duftfamilie und Grundlage vieler arabischer Parfums.',
    effect:
      'Oud wirkt luxuriös, warm und selbstbewusst. Es entfaltet sich am besten in kühleren Monaten und am Abend und sorgt für lange Haltbarkeit und kräftige Projektion.',
    pairsWith:
      'Oud harmoniert mit Rose (der klassische Rose-Oud-Akkord), mit Safran, Amber, Leder sowie süßen Noten wie Vanille und Dattel.',
    synonyms: ['oud', 'agarholz']
  },
  {
    slug: 'vanille',
    name: 'Vanille',
    short: 'Warm, süß und cremig – die wohl beliebteste Basisnote für gemütliche Düfte.',
    metaTitle: 'Vanille in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Vanille in Parfums: Wie riecht die warme, süße Note, woher kommt sie und welche Düfte mit Vanille passen zu dir?',
    intro:
      'Vanille ist eine der beliebtesten und vertrautesten Duftnoten und das Herzstück vieler süßer, gourmandiger Parfums.',
    smell:
      'Vanille riecht warm, süß und cremig, mit balsamischen und leicht rauchigen Facetten. Je nach Komposition wirkt sie pudrig-elegant oder dessertartig-gourmand.',
    origin:
      'Echte Vanille stammt aus der Schote einer Orchidee und wird vor allem auf Madagaskar angebaut. Weil natürliche Vanille teuer ist, kommen in Parfums häufig Vanillin und moderne Vanille-Akkorde zum Einsatz.',
    family:
      'Vanille gehört zur gourmandigen und orientalischen Duftfamilie und bildet oft das warme Fundament eines Dufts.',
    effect:
      'Vanille wirkt behaglich, sinnlich und einladend. Sie eignet sich besonders für Herbst und Winter sowie für gemütliche Abende und gilt als ausgesprochen tragefreundlich.',
    pairsWith:
      'Vanille passt zu Tonkabohne, Karamell und Kakao für süße Düfte, zu Tabak und Amber für warme orientalische und rundet holzige sowie florale Kompositionen weich ab.',
    photo: '/noten/vanille.jpg'
  },
  {
    slug: 'ambroxan',
    name: 'Ambroxan',
    short: 'Modern, mineralisch-warm und langlebig – hinter vielen heutigen „Clean"-Düften.',
    metaTitle: 'Ambroxan in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Ambroxan in Parfums: Wie riecht die moderne, langlebige Amber-Note, woher kommt sie und welche Düfte mit Ambroxan passen zu dir?',
    intro:
      'Ambroxan ist eine der prägendsten modernen Duftnoten und steckt hinter dem charakteristischen, langanhaltenden Schimmer vieler aktueller Parfums.',
    smell:
      'Ambroxan riecht warm, trocken und leicht mineralisch-salzig, mit einem ambrierten, holzig-moschusartigen Charakter. Es wirkt sauber, transparent und zugleich einhüllend.',
    origin:
      'Ambroxan ist ein Molekül, das ursprünglich dem seltenen Ambra nachempfunden wurde, heute aber nachhaltig und tierfrei synthetisch hergestellt wird – in gleichbleibender Qualität.',
    family:
      'Ambroxan prägt die moderne ambrierte, „holzig-clean" wirkende Duftfamilie und ist Basis vieler aktueller Unisex-Düfte.',
    effect:
      'Ambroxan wirkt elegant, modern und sehr langlebig. Es sorgt für gute Haltbarkeit und eine zugängliche, hautnahe Wärme, die ganzjährig funktioniert.',
    pairsWith:
      'Ambroxan harmoniert mit Zitrus und Bergamotte im Auftakt, mit Iris und Zedernholz sowie mit Vanille und Moschus in der Basis.',
    synonyms: ['ambroxan', 'amberholz']
  },
  {
    slug: 'vetiver',
    name: 'Vetiver',
    short: 'Erdig, grün und holzig – eine elegante, leicht rauchige Wurzelnote.',
    metaTitle: 'Vetiver in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Vetiver in Parfums: Wie riecht die erdig-holzige Wurzelnote, woher kommt sie und welche Düfte mit Vetiver passen zu dir?',
    intro:
      'Vetiver ist eine klassische, vielseitige Duftnote, die vielen holzigen und frischen Parfums Charakter und Tiefe verleiht.',
    smell:
      'Vetiver riecht erdig und grün, mit holzigen, leicht rauchigen und manchmal nussigen Facetten. Je nach Herkunft wirkt es frisch-grasig oder dunkel und geröstet.',
    origin:
      'Gewonnen wird Vetiver aus den Wurzeln eines tropischen Grases, das unter anderem auf Haiti, Java und in Indien angebaut wird. Die Wurzeln werden getrocknet und destilliert.',
    family:
      'Vetiver gehört zur holzigen und frisch-grünen Duftfamilie und ist Klassiker in eleganten Herren- wie in modernen Unisex-Düften.',
    effect:
      'Vetiver wirkt natürlich, souverän und gepflegt. Es eignet sich ganzjährig, besonders für Frühling und Sommer, und gibt Düften eine erdige, erwachsene Note.',
    pairsWith:
      'Vetiver passt zu Zitrus und Bergamotte für Frische, zu Zedernholz und Leder für Tiefe sowie zu Tonkabohne und Amber für eine wärmere Ausrichtung.'
  },
  {
    slug: 'jasmin',
    name: 'Jasmin',
    short: 'Üppig, weiß-blumig und sinnlich – eine der wichtigsten Blütennoten der Parfümerie.',
    metaTitle: 'Jasmin in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Jasmin in Parfums: Wie riecht die sinnliche weiße Blütennote, woher kommt sie und welche Düfte mit Jasmin passen zu dir?',
    intro:
      'Jasmin gilt als „König der Blüten" und ist eine der wichtigsten und edelsten floralen Noten der Parfümerie.',
    smell:
      'Jasmin riecht intensiv weiß-blumig, süß und sinnlich, mit einer warmen, leicht animalisch-indolischen Facette, die ihn lebendig und verführerisch macht.',
    origin:
      'Die Blüten werden von Hand gepflückt, meist früh am Morgen, wenn der Duft am stärksten ist. Wichtige Anbaugebiete sind Indien, Ägypten und das südfranzösische Grasse. Da sehr viele Blüten für wenig Öl nötig sind, ist Jasmin kostbar.',
    family:
      'Jasmin ist eine Kernnote der floralen Duftfamilie und Bestandteil unzähliger klassischer Damen- und moderner Unisex-Düfte.',
    effect:
      'Jasmin wirkt elegant, sinnlich und warm. Er eignet sich ganzjährig, besonders für Frühling und laue Abende, und gibt Düften Fülle und Strahlkraft.',
    pairsWith:
      'Jasmin harmoniert mit Rose und Tuberose für opulente Blütensträuße, mit Bergamotte für Frische und mit Sandelholz, Vanille und Moschus für eine warme Basis.'
  },
  {
    slug: 'rose',
    name: 'Rose',
    short: 'Vielschichtig, blumig und zeitlos – die berühmteste Blüte der Parfümerie.',
    metaTitle: 'Rose in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Rose in Parfums: Wie riecht die vielschichtige Blütennote, woher kommt sie und welche Düfte mit Rose passen zu dir?',
    intro:
      'Rose ist die wohl bekannteste Blütennote überhaupt und reicht von frisch-grün bis tief und marmeladig-süß.',
    smell:
      'Rose riecht blumig und vielschichtig: mal frisch und zitrisch-grün, mal samtig, honigartig und tief. Echte Rose hat zudem eine leicht würzige, fast pfeffrige Facette.',
    origin:
      'Zwei Rosenarten sind besonders wichtig: die Damaszener-Rose (vor allem aus Bulgarien und der Türkei) und die Mai-Rose (Centifolia) aus Grasse. Für ein einziges Gramm Rosenöl sind sehr viele Blüten nötig, was Rose wertvoll macht.',
    family:
      'Rose gehört zur floralen Duftfamilie, ist aber äußerst wandelbar und Bestandteil floraler, würziger, fruchtiger und orientalischer Düfte – für Damen wie für Herren.',
    effect:
      'Rose wirkt je nach Komposition romantisch und klassisch oder modern und kraftvoll. Sie funktioniert ganzjährig und passt zu fast jedem Anlass.',
    pairsWith:
      'Rose harmoniert mit Oud (der berühmte Rose-Oud-Akkord), mit Patchouli und Pfeffer für Würze, mit Litchi und Himbeere für eine fruchtige Note sowie mit Jasmin für volle Blütigkeit.'
  }
];

export function getScentNote(slug: string): ScentNote | undefined {
  return scentNotes.find((n) => n.slug === slug);
}

// Liefert für eine Duftnote (aus der perfumes-Tabelle) das passende Ziel:
// die Lexikon-Seite, falls die Note dort beschrieben ist, sonst die
// Katalog-Suche, die bereits nach Noten filtert.
export function noteHref(note: string): string {
  const n = note.toLowerCase().trim();
  const match = scentNotes.find(
    (s) => s.name.toLowerCase() === n || s.synonyms?.some((syn) => n.includes(syn))
  );
  if (match) return `/duftnoten/${match.slug}`;
  return `/duefte?q=${encodeURIComponent(note)}`;
}
