// Markengeschichten für die Marken-Seiten.
// Regel: nur Angaben, die mehrere unabhängige Quellen übereinstimmend nennen (recherchiert
// am 1. November 2026). Widersprüchliche Angaben (z. B. das Jahr des ersten Hermès-Parfums
// oder das Gründungsjahr des Genfer Davidoff-Geschäfts) sind bewusst weggelassen.
// Angaben zu einzelnen Düften (Jahr, Parfümeur) stammen aus dem geprüften Auressa-Katalog.

export type BrandStory = {
  intro: string; // ein Satz für oben
  paragraphs: string[];
  sources: { label: string; url: string }[];
};

export const BRAND_STORIES: Record<string, BrandStory> = {
  hermes: {
    intro: 'Vom Pariser Sattler zum Luxushaus: Hermès steht seit 1837 für Handwerk – und seit Jahrzehnten auch für eigenständige Düfte.',
    paragraphs: [
      'Hermès wurde 1837 von Thierry Hermès in Paris gegründet – als Werkstatt für Pferdegeschirre. Aus dem Sattlerhandwerk wuchs über Generationen eines der bekanntesten Luxushäuser der Welt, das bis heute von der Gründerfamilie geprägt ist.',
      'Das erste Parfum des Hauses war Eau d’Hermès, komponiert von Edmond Roudnitska. 2004 holte Hermès mit Jean-Claude Ellena erstmals einen eigenen Hausparfümeur ins Haus; von ihm stammt auch Terre d’Hermès. Seit 2016 verantwortet Christine Nagel die Duftkreationen von Hermès, die bereits ab 2014 an Ellenas Seite arbeitete.',
      'Typisch für Hermès-Düfte ist eine reduzierte, eher leise Handschrift: wenige, klar gesetzte Noten statt Opulenz.'
    ],
    sources: [
      { label: 'Hermès – Six generations of artisans (offizielle Seite)', url: 'https://www.hermes.com/us/en/story/271366-six-generations-of-artisans/' },
      { label: 'Wikipedia: Hermès', url: 'https://en.wikipedia.org/wiki/Herm%C3%A8s' },
      { label: 'Wikipedia: Jean-Claude Ellena', url: 'https://en.wikipedia.org/wiki/Jean-Claude_Ellena' },
      { label: 'Wikipedia: Christine Nagel', url: 'https://en.wikipedia.org/wiki/Christine_Nagel' }
    ]
  },
  'hugo-boss': {
    intro: 'Aus Metzingen in die Welt: Hugo Boss ist ein bekanntes deutsches Modehaus – und bei Düften ein Klassiker für Herren.',
    paragraphs: [
      'Hugo Boss wurde 1924 von Hugo Ferdinand Boss in Metzingen gegründet, wo das Unternehmen bis heute seinen Sitz hat.',
      'Der erste Duft kam 1985 auf den Markt: Boss Number One. Die Düfte entstehen in Lizenz – lange bei Procter & Gamble, seit der Übernahme der P&G-Duftsparte 2016 bei Coty. Zu den bekanntesten zählt Boss Bottled von 1998, komponiert von Annick Ménardo.',
      'Hugo-Boss-Düfte gelten als alltagstauglich und gut erhältlich – oft ein sicherer Einstieg in die Welt der Herrendüfte.'
    ],
    sources: [
      { label: 'Wikipedia: Hugo Boss', url: 'https://en.wikipedia.org/wiki/Hugo_Boss' },
      { label: 'Parfumo: Geschichte der Duftmarke Hugo Boss', url: 'https://www.parfumo.com/Users/StinkSultan/Blog/Article/perfume-houses-history-blog-chapter-5-hugo-boss' },
      { label: 'Coty: Bestätigung der Übernahme von zehn P&G-Duftlizenzen (2016)', url: 'https://www.businesswire.com/news/home/20160112005443/en/Coty-Confirms-Transfer-Ten-PG-Fragrance-Lic' }
    ]
  },
  davidoff: {
    intro: 'Eine Marke mit Schweizer Wurzeln: Davidoff geht auf den Genfer Tabakhändler Zino Davidoff zurück.',
    paragraphs: [
      'Der Name Davidoff stammt von Zino Davidoff, dessen Familie nach Genf auswanderte und dort ein Tabakgeschäft führte. Zino Davidoff machte daraus eine international bekannte Marke für Zigarren und Tabakwaren. 1970 verkaufte er das Zigarrengeschäft an das Basler Familienunternehmen Oettinger.',
      'Düfte gibt es unter dem Namen Davidoff seit 1984; heute werden sie in Lizenz von Coty hergestellt. Der berühmteste ist Cool Water von 1988, komponiert von Pierre Bourdon – er gilt als einer der Düfte, die frische, aquatische Herrendüfte populär gemacht haben.',
      'Davidoff-Düfte sind meist preiswert und unkompliziert – ideal, wenn du einen frischen Alltagsduft suchst.'
    ],
    sources: [
      { label: 'Wikipedia: Zino Davidoff', url: 'https://en.wikipedia.org/wiki/Zino_Davidoff' },
      { label: 'swissinfo.ch: Davidoff feiert 100 Jahre', url: 'https://swissinfo.ch/eng/banking-fintech/davidoff-celebrates-cigar-centenary/5061306' },
      { label: 'Wikipedia: Cool Water (Parfum)', url: 'https://en.wikipedia.org/wiki/Cool_Water_(perfume)' },
      { label: 'Cosmetics Business: Coty über Cool Water und Pierre Bourdon', url: 'https://www.cosmeticsbusiness.com/coty-davidoff-cool-water-pierre-bourdon-documentary-film' }
    ]
  },
  'dolce-gabbana': {
    intro: 'Italienisches Lebensgefühl im Flakon: Dolce & Gabbana steht für Sonne, Mittelmeer und Glamour.',
    paragraphs: [
      'Dolce & Gabbana wurde 1985 von den Designern Domenico Dolce und Stefano Gabbana gegründet; das Modehaus hat seinen Sitz in Mailand.',
      'Die Düfte entstanden lange in Lizenz, zuletzt ab 2016 bei Shiseido. Seit dem 1. Januar 2023 führt Dolce & Gabbana sein Beauty- und Duftgeschäft mit der eigenen Gesellschaft Dolce&Gabbana Beauty selbst. Der bekannteste Duft ist Light Blue von 2001, komponiert von Olivier Cresp – ein Inbegriff des mediterranen Sommerdufts.',
      'Typisch sind zitrisch-frische, sonnige Düfte – besonders beliebt für den Sommer.'
    ],
    sources: [
      { label: 'Shiseido: Lizenzvereinbarung mit Dolce & Gabbana (2016, PDF)', url: 'https://corp.shiseido.com/en/emea/pdf/20160701.pdf' },
      { label: 'The National: Dolce & Gabbana produziert Beauty und Düfte selbst (2023)', url: 'https://thenationalnews.com/lifestyle/luxury/2023/03/12/dolce-gabbana-to-produce-its-own-make-up-skincare-and-fragrances' },
      { label: 'Wikipedia: Dolce & Gabbana', url: 'https://en.wikipedia.org/wiki/Dolce_%26_Gabbana' }
    ]
  }
};
