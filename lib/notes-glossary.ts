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
  /** Bild der Duftnote (liegt in /public/notes). */
  image: string;
  /** Typische Duftfamilie. */
  family: string;
  /** Typische Wirkung. */
  effect: string;
  /** Welche Noten/Düfte passen dazu? */
  pairsWith: string;
  /** Zusätzliche Schreibweisen, um Katalog-Düfte zu dieser Note zu finden. */
  synonyms?: string[];
};

export const scentNotes: ScentNote[] = [
  {
    slug: 'bergamotte',
    image: '/notes/bergamotte.jpg',
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
      'Bergamotte harmoniert mit fast allem: mit Lavendel und weiteren Zitrusnoten für Frische, mit Vetiver und Zedernholz für holzige Tiefe und mit Jasmin und Rose für florale Eleganz.'
  },
  {
    slug: 'iris',
    image: '/notes/iris.jpg',
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
    image: '/notes/oud.jpg',
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
    image: '/notes/vanille.jpg',
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
      'Vanille passt zu Tonkabohne, Karamell und Kakao für süße Düfte, zu Tabak und Amber für warme orientalische und rundet holzige sowie florale Kompositionen weich ab.'
  },
  {
    slug: 'ambroxan',
    image: '/notes/ambroxan.jpg',
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
    image: '/notes/vetiver.jpg',
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
    image: '/notes/jasmin.jpg',
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
    image: '/notes/rose.jpg',
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
  },
  {
    slug: 'sandelholz',
    image: '/notes/sandelholz.jpg',
    name: 'Sandelholz',
    short: 'Cremig, warm und milchig-holzig – eine der edelsten und beruhigendsten Basisnoten.',
    metaTitle: 'Sandelholz in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Sandelholz in Parfums: Wie riecht die cremig-holzige Note, woher kommt sie und welche Düfte mit Sandelholz passen zu dir?',
    intro:
      'Sandelholz zählt zu den edelsten und vertrautesten Holznoten der Parfümerie und gibt vielen Düften ihre warme, cremige Tiefe.',
    smell:
      'Sandelholz riecht weich, cremig und leicht milchig, mit einer warmen, holzig-balsamischen und dezent süßen Facette. Es wirkt rund und beruhigend, niemals scharf oder kratzig.',
    origin:
      'Das wertvolle Öl stammt aus dem Kernholz des Sandelbaums, traditionell aus Mysore in Indien, heute auch nachhaltig aus Australien. Weil die Bäume viele Jahre wachsen müssen, ist echtes Sandelholz selten und kostbar; oft kommen hochwertige Sandelholz-Akkorde zum Einsatz.',
    family:
      'Sandelholz ist eine Kernnote der holzigen und orientalischen Duftfamilie und bildet in vielen Düften ein weiches, tragendes Fundament.',
    effect:
      'Sandelholz wirkt warm, sinnlich und ausgleichend. Es eignet sich ganzjährig, besonders für Herbst und Winter sowie für ruhige Abende, und sorgt für gute Haltbarkeit und einen hautnahen, einhüllenden Charakter.',
    pairsWith:
      'Sandelholz harmoniert mit Rose und Jasmin für florale Wärme, mit Vanille und Tonkabohne für cremige Süße sowie mit Zedernholz und Vetiver für holzige Tiefe.',
    synonyms: ['sandelholz', 'sandalwood', 'santal']
  },
  {
    slug: 'tonkabohne',
    image: '/notes/tonkabohne.jpg',
    name: 'Tonkabohne',
    short: 'Warm, süß und mandelig – eine gemütliche Basisnote zwischen Vanille und Karamell.',
    metaTitle: 'Tonkabohne in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Tonkabohne in Parfums: Wie riecht die warme, süße Note, woher kommt sie und welche Düfte mit Tonkabohne passen zu dir?',
    intro:
      'Die Tonkabohne ist eine der beliebtesten warmen Basisnoten und das gemütliche Herz vieler süßer und orientalischer Düfte.',
    smell:
      'Tonkabohne riecht warm und süß, mit Facetten von Vanille, Mandel, Karamell und Heu sowie einem leicht würzigen, mandelig-balsamischen Unterton. Der Eindruck ist behaglich und einhüllend.',
    origin:
      'Gewonnen wird sie aus dem Samen des südamerikanischen Tonkabaums. Der charakteristische Duft entsteht durch den Inhaltsstoff Cumarin, der den typisch warmen, heuartig-süßen Charakter ausmacht.',
    family:
      'Tonkabohne gehört zur gourmandigen und orientalischen Duftfamilie und rundet viele süße, holzige und würzige Kompositionen weich ab.',
    effect:
      'Tonkabohne wirkt gemütlich, sinnlich und tröstlich. Sie eignet sich besonders für Herbst und Winter sowie für gemütliche Abende und macht Düfte tragefreundlich und einladend.',
    pairsWith:
      'Tonkabohne passt zu Vanille und Karamell für süße Gourmands, zu Lavendel und Tabak für klassische Wärme sowie zu Sandelholz und Amber für eine weiche, orientalische Basis.',
    synonyms: ['tonkabohne', 'tonka', 'tonka bean']
  },
  {
    slug: 'patchouli',
    image: '/notes/patchouli.jpg',
    name: 'Patchouli',
    short: 'Erdig, dunkel und leicht süßlich – eine charaktervolle, langlebige Basisnote.',
    metaTitle: 'Patchouli in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Patchouli in Parfums: Wie riecht die erdig-holzige Note, woher kommt sie und welche Düfte mit Patchouli passen zu dir?',
    intro:
      'Patchouli ist eine unverwechselbare, charakterstarke Note, die modernen wie klassischen Düften Tiefe und Halt verleiht.',
    smell:
      'Patchouli riecht erdig und dunkel, mit holzigen, leicht süßlichen und kampferartigen Facetten. In moderner, „aufgeräumter" Form (oft als Patchouli-Herz) wirkt es schokoladig-samtig und weniger rustikal als das klassische Patchouli-Öl.',
    origin:
      'Gewonnen wird Patchouli aus den getrockneten und fermentierten Blättern einer tropischen Pflanze aus der Familie der Lippenblütler, vor allem aus Indonesien. Die Blätter werden destilliert; das Öl reift mit der Zeit nach und wird runder.',
    family:
      'Patchouli ist eine tragende Note der orientalischen, holzigen und Chypre-Duftfamilie und Bestandteil vieler moderner Damen- wie Herrendüfte.',
    effect:
      'Patchouli wirkt sinnlich, erdverbunden und souverän. Es sorgt für sehr gute Haltbarkeit, eignet sich besonders für Herbst und Winter sowie für den Abend und gibt Düften einen unverwechselbaren Charakter.',
    pairsWith:
      'Patchouli harmoniert mit Rose für moderne Chypre-Düfte, mit Vanille und Karamell für süße „Gourmand-Patchouli", mit Zitrus für Frische sowie mit Amber und Leder für Tiefe.',
    synonyms: ['patchouli', 'patchuli']
  },
  {
    slug: 'moschus',
    image: '/notes/moschus.jpg',
    name: 'Moschus',
    short: 'Weich, sauber und hautnah – die unsichtbare Basisnote, die Düfte zusammenhält.',
    metaTitle: 'Moschus in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Moschus in Parfums: Wie riecht die weiche, saubere Note, woher kommt sie und welche Düfte mit Moschus passen zu dir?',
    intro:
      'Moschus ist eine der wichtigsten Basisnoten der Parfümerie – oft kaum bewusst wahrgenommen, aber prägend für den weichen, „sauberen" Eindruck vieler Düfte.',
    smell:
      'Moschus riecht weich, warm und hautnah, je nach Art sauber-pudrig (weißer Moschus), cremig oder leicht animalisch-sinnlich. Er wirkt einhüllend und gibt Düften einen vertrauten Wäsche-frisch-Charakter.',
    origin:
      'Früher stammte Moschus von Tieren – das ist heute aus Tierschutzgründen verboten. Moderner Moschus wird ausschließlich synthetisch und tierfrei hergestellt; verschiedene Moschus-Moleküle erzeugen saubere, cremige oder fruchtige Nuancen.',
    family:
      'Moschus prägt die saubere, pudrige und ambrierte Duftfamilie und ist Bestandteil nahezu jeder modernen Duftbasis.',
    effect:
      'Moschus wirkt sanft, sinnlich und nahbar. Er verlängert die Haltbarkeit, verbindet die übrigen Noten zu einem harmonischen Ganzen und eignet sich ganzjährig sowie für jeden Anlass.',
    pairsWith:
      'Moschus harmoniert mit Zitrus und weißen Blüten für Frische, mit Vanille und Tonkabohne für Wärme sowie mit Sandelholz und Ambroxan für eine moderne, cremige Basis.',
    synonyms: ['moschus', 'musk', 'weisser moschus', 'white musk']
  },
  {
    slug: 'zedernholz',
    image: '/notes/zedernholz.jpg',
    name: 'Zedernholz',
    short: 'Trocken, klar und edel-holzig – eine der elegantesten und vielseitigsten Holznoten.',
    metaTitle: 'Zedernholz in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Zedernholz in Parfums: Wie riecht die trocken-holzige Note, woher kommt sie und welche Düfte mit Zedernholz passen zu dir?',
    intro:
      'Zedernholz ist eine klassische, elegante Holznote, die unzähligen Düften eine trockene, klare und edle Struktur gibt.',
    smell:
      'Zedernholz riecht trocken, klar und holzig, mit einer leicht harzigen, bleistiftartigen und manchmal sanft würzigen Facette. Es wirkt sauber und edel, nie schwer.',
    origin:
      'Verwendet wird das Holz verschiedener Zedern- und Wacholderarten, etwa der Atlas-Zeder aus Marokko oder der Virginia-Zeder aus Nordamerika. Das ätherische Öl wird aus dem Holz destilliert.',
    family:
      'Zedernholz gehört zur holzigen Duftfamilie und bildet das Grundgerüst vieler frischer, würziger und floraler Kompositionen – für Damen wie für Herren.',
    effect:
      'Zedernholz wirkt klar, gepflegt und souverän. Es eignet sich ganzjährig sowie für Tag und Büro und gibt Düften eine schlanke, trockene Holzstruktur mit guter Haltbarkeit.',
    pairsWith:
      'Zedernholz harmoniert mit Bergamotte und Zitrus im Auftakt, mit Iris und Rose für florale Eleganz sowie mit Vetiver, Sandelholz und Ambroxan für holzige Tiefe.',
    synonyms: ['zedernholz', 'zeder', 'cedar', 'cedarwood']
  },
  {
    slug: 'lavendel',
    image: '/notes/lavendel.jpg',
    name: 'Lavendel',
    short: 'Aromatisch, frisch-krautig und beruhigend – die klassische Herznote vieler Herrendüfte.',
    metaTitle: 'Lavendel in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Lavendel in Parfums: Wie riecht die aromatisch-frische Note, woher kommt sie und welche Düfte mit Lavendel passen zu dir?',
    intro:
      'Lavendel ist eine der klassischsten aromatischen Noten und das vertraute Herz vieler Fougère- und Herrendüfte.',
    smell:
      'Lavendel riecht frisch und krautig-aromatisch, mit einer blumigen, leicht kampferartigen und süßlichen Facette. Er wirkt sauber und beruhigend und kann je nach Komposition sportlich-frisch oder warm-süß ausfallen.',
    origin:
      'Gewonnen wird Lavendel aus den Blütenständen der Lavendelpflanze, klassisch aus der Provence in Südfrankreich. Die Blüten werden destilliert; besonders fein gilt der höher gelegene Feinlavendel (Lavandin und echter Lavendel).',
    family:
      'Lavendel ist die Signaturnote der aromatischen Fougère-Duftfamilie und Bestandteil zahlloser klassischer Herren- sowie moderner Unisex-Düfte.',
    effect:
      'Lavendel wirkt frisch, beruhigend und gepflegt. Er eignet sich besonders für Frühling und Sommer sowie für Tag und Büro und gibt Düften eine saubere, vertraute Eleganz.',
    pairsWith:
      'Lavendel harmoniert mit Bergamotte und Zitrus für Frische, mit Tonkabohne und Vanille für warme „Lavendel-Gourmands" sowie mit Vetiver, Eichenmoos und Zedernholz für klassische Fougère-Tiefe.',
    synonyms: ['lavendel', 'lavender']
  },
  {
    slug: 'amber',
    image: '/notes/amber.jpg',
    name: 'Amber',
    short: 'Warm, harzig und süß-pudrig – das goldene Herz unzähliger orientalischer Düfte.',
    metaTitle: 'Amber in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Amber in Parfums: Wie riecht die warme, harzig-süße Amber-Note, woher kommt sie und welche Düfte mit Amber passen zu dir?',
    intro:
      'Amber (auch Bernstein-Akkord) ist eine der prägendsten warmen Noten der Parfümerie und das goldene Fundament vieler orientalischer Düfte.',
    smell:
      'Amber riecht warm, harzig und süß-pudrig, mit balsamischen, leicht vanilligen und animalisch-weichen Facetten. Der Eindruck ist gemütlich, einhüllend und sinnlich.',
    origin:
      'Amber ist kein einzelner Rohstoff, sondern ein Akkord – klassisch komponiert aus Harzen wie Labdanum und Benzoe zusammen mit Vanille. (Nicht zu verwechseln mit Ambra/Ambergris vom Wal oder dem modernen Molekül Ambroxan.)',
    family:
      'Amber ist die namensgebende Note der ambrierten und orientalischen Duftfamilie und Grundlage vieler warmer, süßer Kompositionen.',
    effect:
      'Amber wirkt warm, behaglich und verführerisch. Es eignet sich besonders für Herbst und Winter sowie für den Abend, sorgt für gute Haltbarkeit und eine weiche, hautnahe Wärme.',
    pairsWith:
      'Amber harmoniert mit Vanille und Tonkabohne für süße Wärme, mit Weihrauch und Patchouli für orientalische Tiefe sowie mit Rose und Sandelholz für eine elegante Basis.',
    synonyms: ['amber', 'ambra', 'bernstein']
  },
  {
    slug: 'orangenbluete',
    image: '/notes/orangenbluete.jpg',
    name: 'Orangenblüte',
    short: 'Sonnig, weiß-blumig und honigsüß – die strahlende Blüte des Orangenbaums (auch Neroli).',
    metaTitle: 'Orangenblüte & Neroli in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Orangenblüte und Neroli in Parfums: Wie riecht die sonnige weiße Blütennote, woher kommt sie und welche Düfte mit Orangenblüte passen zu dir?',
    intro:
      'Orangenblüte ist eine sonnige, vielseitige Blütennote vom Bitterorangenbaum und steckt – eng verwandt mit Neroli – in vielen frischen wie sinnlichen Düften.',
    smell:
      'Orangenblüte riecht weiß-blumig, sonnig und leicht honigsüß, mit einer frischen zitrisch-grünen Facette. Als Neroli wirkt sie heller und frischer, als Orangenblüten-Absolue wärmer und sinnlicher.',
    origin:
      'Beide stammen von der Blüte des Bitterorangenbaums: Neroli wird durch Wasserdampf-Destillation gewonnen, das satter duftende Orangenblüten-Absolue durch Extraktion. Wichtige Anbaugebiete sind Tunesien, Marokko und Italien.',
    family:
      'Orangenblüte gehört zur floralen sowie zur frischen, zitrisch-floralen Duftfamilie und ist Bestandteil eleganter Eau de Colognes wie warmer Blütendüfte.',
    effect:
      'Orangenblüte wirkt strahlend, gepflegt und zugleich beruhigend. Sie eignet sich besonders für Frühling und Sommer sowie für Tag und Büro und gibt Düften eine sonnige Leichtigkeit.',
    pairsWith:
      'Orangenblüte harmoniert mit Bergamotte und Petitgrain für klassische Cologne-Frische, mit Jasmin und Tuberose für opulente Blüten sowie mit Moschus und Vanille für eine weiche Basis.',
    synonyms: ['orangenblüte', 'orangenblute', 'neroli', 'orange blossom', 'petitgrain']
  },
  {
    slug: 'leder',
    image: '/notes/leder.jpg',
    name: 'Leder',
    short: 'Rauchig, warm und animalisch – eine kraftvolle, charaktervolle Basisnote.',
    metaTitle: 'Leder in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Leder in Parfums: Wie riecht die rauchig-warme Ledernote, woher kommt sie und welche Düfte mit Leder passen zu dir?',
    intro:
      'Leder ist eine markante, charakterstarke Note, die Düften Tiefe, Wärme und einen edlen, leicht rebellischen Charakter verleiht.',
    smell:
      'Leder riecht warm und animalisch, je nach Komposition rauchig, teerig-dunkel oder weich und sämig wie feines Wildleder (Suède). Der Eindruck reicht von rau und kraftvoll bis vornehm und gepflegt.',
    origin:
      'Leder ist ein komponierter Akkord, kein einzelner Rohstoff. Erzeugt wird er aus rauchigen und harzigen Bausteinen wie Birkenteer, Styrax und Safran sowie modernen Leder-Molekülen, die den Geruch von gegerbtem Leder nachbilden.',
    family:
      'Leder prägt die Leder- und Chypre-Duftfamilie und ist Bestandteil vieler eleganter Herren- wie selbstbewusster Damen- und Unisex-Düfte.',
    effect:
      'Leder wirkt souverän, sinnlich und erwachsen. Es eignet sich besonders für Herbst und Winter sowie für den Abend und gibt Düften eine kraftvolle, langlebige Signatur.',
    pairsWith:
      'Leder harmoniert mit Safran und Rose für edle Leder-Akkorde, mit Tabak und Oud für dunkle Tiefe sowie mit Iris und Veilchen für eine weiche, pudrige Lederfacette.',
    synonyms: ['leder', 'leather', 'suède', 'wildleder']
  },
  {
    slug: 'pfeffer',
    image: '/notes/pfeffer.jpg',
    name: 'Pfeffer',
    short: 'Würzig, prickelnd und belebend – der spritzige Kick in modernen Düften.',
    metaTitle: 'Pfeffer in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Pfeffer in Parfums: Wie riecht die würzig-prickelnde Note, woher kommt sie und welche Düfte mit Pfeffer (auch rosa Pfeffer) passen zu dir?',
    intro:
      'Pfeffer ist eine der beliebtesten würzigen Noten und gibt vielen modernen Düften einen prickelnden, belebenden Auftakt.',
    smell:
      'Pfeffer riecht würzig, trocken und leicht prickelnd. Schwarzer Pfeffer wirkt warm und holzig-scharf, rosa Pfeffer dagegen heller, fruchtig und spritzig – beide bringen Lebendigkeit in eine Komposition.',
    origin:
      'Schwarzer Pfeffer wird aus den getrockneten Beeren der Pfefferpflanze destilliert. Rosa Pfeffer (Pink Pepper) stammt botanisch vom Schinus-Baum und riecht fruchtiger; beide werden gerne in der Kopf- und Herznote eingesetzt.',
    family:
      'Pfeffer gehört zur würzigen Duftfamilie und belebt frische, holzige und orientalische Kompositionen für Damen wie für Herren.',
    effect:
      'Pfeffer wirkt energiegeladen, modern und anregend. Er eignet sich ganzjährig und für viele Anlässe und gibt Düften gleich zu Beginn Spannung und Charakter.',
    pairsWith:
      'Pfeffer harmoniert mit Bergamotte und Zitrus für frische Würze, mit Rose und Geranie für moderne florale Würze sowie mit Zedernholz, Vetiver und Amber für eine holzig-warme Basis.',
    synonyms: ['pfeffer', 'pepper', 'rosa pfeffer', 'pink pfeffer', 'pink pepper', 'schwarzer pfeffer']
  },
  {
    slug: 'zimt',
    image: '/notes/zimt.jpg',
    name: 'Zimt',
    short: 'Warm, süß-würzig und gemütlich – das Gewürz für behagliche Herbst- und Winterdüfte.',
    metaTitle: 'Zimt in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Zimt in Parfums: Wie riecht die warme, süß-würzige Note, woher kommt sie und welche Düfte mit Zimt passen zu dir?',
    intro:
      'Zimt ist eine der wärmsten und gemütlichsten Gewürznoten und gibt vielen orientalischen und gourmandigen Düften ihren behaglichen Charakter.',
    smell:
      'Zimt riecht warm, süß und würzig, mit einer leicht holzigen, prickelnden und balsamischen Facette. Er wirkt einladend und gemütlich, in höherer Dosierung kräftig und feurig.',
    origin:
      'Gewonnen wird Zimt aus der getrockneten Rinde des Zimtbaums, vor allem aus Sri Lanka und Indonesien. Für Parfums werden Zimtrinde und Zimtblatt destilliert; das Öl wird oft mit anderen Gewürzen kombiniert.',
    family:
      'Zimt gehört zur würzigen und orientalischen Duftfamilie und prägt warme, süße sowie gourmandige Kompositionen.',
    effect:
      'Zimt wirkt warm, sinnlich und festlich. Er eignet sich besonders für Herbst und Winter sowie für gemütliche Abende und gibt Düften eine behagliche, gewürzige Tiefe.',
    pairsWith:
      'Zimt harmoniert mit Vanille und Tonkabohne für süße Wärme, mit Apfel und Nelke für würzig-fruchtige Akkorde sowie mit Amber, Weihrauch und Patchouli für orientalische Fülle.',
    synonyms: ['zimt', 'cinnamon', 'kassia']
  },
  {
    slug: 'tabak',
    image: '/notes/tabak.jpg',
    name: 'Tabak',
    short: 'Warm, süßlich-würzig und rauchig – eine sinnliche, nostalgische Basisnote.',
    metaTitle: 'Tabak in Parfums: Duft, Wirkung und passende Düfte | Auressa',
    metaDescription:
      'Tabak in Parfums: Wie riecht die warme, süßlich-rauchige Note, woher kommt sie und welche Düfte mit Tabak passen zu dir?',
    intro:
      'Tabak ist eine warme, charaktervolle Note, die vielen Düften eine sinnliche, gemütliche und leicht nostalgische Tiefe verleiht.',
    smell:
      'Tabak riecht warm und süßlich-würzig, mit honigartigen, heuigen und dezent rauchigen Facetten. Der Eindruck ist weich und einhüllend, niemals so scharf wie brennender Tabak, sondern eher wie edler, getrockneter Tabakblatt-Duft.',
    origin:
      'Verwendet werden Extrakte aus getrockneten und fermentierten Tabakblättern. Der typisch süße, heuartige Charakter geht – wie bei der Tonkabohne – auch auf Cumarin zurück; oft wird Tabak mit Vanille und Gewürzen abgerundet.',
    family:
      'Tabak gehört zur orientalischen und würzigen Duftfamilie und prägt warme, gemütliche Herbst- und Winterdüfte für Herren wie für Damen.',
    effect:
      'Tabak wirkt sinnlich, warm und souverän. Er eignet sich besonders für Herbst und Winter sowie für den Abend und gibt Düften eine gemütliche, langlebige Tiefe.',
    pairsWith:
      'Tabak harmoniert mit Vanille und Tonkabohne für süße Wärme, mit Honig und Zimt für würzige Fülle sowie mit Leder, Amber und Oud für dunkle, edle Tiefe.',
    synonyms: ['tabak', 'tobacco']
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
