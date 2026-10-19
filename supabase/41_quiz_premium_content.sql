-- AURESSA PREMIUM QUIZ: Verbesserte Inhalte + Emotionale Tiefe
-- Ersetzt die bisherigen Quiz-Fragen mit Premium-Texten und Kontext

delete from public.quiz_answers;
delete from public.quiz_questions;

-- ============ Q1: GENDER - Klar & Offen ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (1, '👥 Für wen suchen wir den Signature-Duft?',
  'Das hilft uns, wirklich passende Düfte zu zeigen – Duftchemie unterscheidet sich nach Hauttyp. Dein Duft wird für DICH gemacht.',
  'gender')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '👩 Für Damen', 'women', 1),
  (:'q_id', '👨 Für Herren', 'men', 2),
  (:'q_id', '✨ Egal – unisex/alle zeigen', 'unisex', 3);

-- ============ Q2: ANCHOR - Optional, aber kraftvoll ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (2, '💝 Gibt es einen Duft, den du schon liebst? (Optional)',
  'Der beste Shortcut! Wenn du uns deinen Liebling verrätst, finden wir gezielt Düfte, die ähnlich riechen – dein „mehr davon"-Moment.',
  'anchor')
returning id as q_id \gset

-- Keine Antworten nötig (Text-Input)

-- ============ Q3: FAMILY 1 - Moment-basiert ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (3, '🎬 Stell dir deinen Lieblings-Moment vor – wo bist du gerade?',
  'Jeder Moment hat einen Duft. Geh ganz nach Bauchgefühl – es gibt kein Richtig oder Falsch, nur DEIN Gefühl.',
  'family')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🌬️ Frisch geduscht, weißes Leinen, Fenster weit auf – CLEAN', 'clean', 1),
  (:'q_id', '🕯️ Kerzenlicht, Vanille, warme Decke – GOURMAND', 'gourmand', 2),
  (:'q_id', '🥃 Dunkle Bar, edles Holz, Leder – WOODY', 'woody', 3),
  (:'q_id', '🌸 Blumenmarkt Frühling, leichtes Kleid – FLORAL', 'floral', 4);

-- ============ Q4: FAMILY 2 - Gefühls-basiert ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (4, '💭 Wie soll sich dein Duft ANFÜHLEN? (emotionale Energie)',
  'Nicht logisch denken – fühlen! Was zieht dich sofort an? Was ist dein Lieblings-Gefühl?',
  'family')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '⚡ Leicht & frisch – wie klare Luft, Energie, Klarheit', 'clean', 1),
  (:'q_id', '🤗 Warm & weich – wie Umarmung, Komfort, Zuhause', 'gourmand', 2),
  (:'q_id', '🏔️ Kraftvoll & edel – elegant, tiefe, Selbstvertrauen', 'woody', 3),
  (:'q_id', '🦋 Zart & lebendig – romantisch, spielerisch, feingliedrig', 'floral', 4);

-- ============ Q5: FAMILY 3 - Style-Spiegel ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (5, '👗 Wie würde dein bester Freund deinen Stil beschreiben?',
  'Unser Stil ist nicht zufällig – er verrät, welcher Duft sich nach dir anfühlt. Dein Duft sollte zu DIR passen.',
  'family')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🌿 Natürlich, boho, zeitlos – minimalistisch, unkompliziert', 'clean', 1),
  (:'q_id', '🎨 Warmherzig, gemütlich, verspielt – verletzlich, echt', 'gourmand', 2),
  (:'q_id', '📚 Elegant, edel, intelligent – zurückhaltend, stark', 'woody', 3),
  (:'q_id', '✨ Romantisch, lebhaft, feminin – frei, ausdrucksvoll', 'floral', 4);

-- ============ Q6: SWEETNESS - Süße-Skala ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (6, '🍯 Wie süß darf dein Duft sein? (Süße-Skala)',
  'Von frisch-herb bis dessertartig – wir gewichten das perfekt für dich. Zu süß = ermüdend. Zu herb = langweilig.',
  'sweetness')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🍋 Lieber gar nicht süß – herb, frisch, grün', 'low', 1),
  (:'q_id', '🥐 Ein bisschen Süße – balanced, angenehm', 'medium', 2),
  (:'q_id', '🍰 Richtig süß & gourmandig – Dessert, Decadence', 'high', 3),
  (:'q_id', '❓ Egal – überrasch mich!', '', 4);

-- ============ Q7: LOVED NOTE - Herzens-Note ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (7, '💚 Eine Note, die dein HERZ höher schlagen lässt?',
  'Diese eine Note gewichten wir EXTRA stark bei deinem Match. Es ist deine Lieblings-Zutat – dein „OMG, DIESE Note!"-Moment.',
  'lovedNote')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🎲 Keine bestimmte – überrasch mich mit einer Entdeckung!', '', 1),
  (:'q_id', '🍊 Bergamotte – frisch, zitrusig, klassisch', 'bergamotte', 2),
  (:'q_id', '🌹 Jasmin – blumig, sinnlich, luxuriös', 'jasmin', 3),
  (:'q_id', '🥀 Rose – romantisch, elegant, zeitlos', 'rose', 4),
  (:'q_id', '🍫 Vanille – warm, süß, tröstend', 'vanille', 5),
  (:'q_id', '🌿 Patchouli – erdig, tiefe, bohemian', 'patchouli', 6),
  (:'q_id', '🌳 Sandelholz – cremig, weich, meditativ', 'sandelholz', 7),
  (:'q_id', '☁️ Moschus – sauber, hautehrlich, modern', 'moschus', 8);

-- ============ Q8: DISLIKED NOTE - No-Go ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (8, '❌ Und eine Note, die für dich gar nicht geht?',
  'Manchmal reicht EINE No-Go-Note, um einen Duft zu verderben. Wir filtern die raus – versprochen!',
  'dislikedNote')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '✅ Keine – ich bin offen für (fast) alles!', '', 1),
  (:'q_id', '⚫ Zu herb / bitter – mag ich nicht', 'bitter', 2),
  (:'q_id', '🍬 Zu süß / Bonbon-artig – ermüdend', 'candylike', 3),
  (:'q_id', '😵 Zu schwer / Kopfweh – auch kurz unangenehm', 'heavy', 4),
  (:'q_id', '🧪 Zu künstlich / Chemie-artig – mag Natur-Feel', 'synthetic', 5);

-- ============ Q9: OCCASION - Lebensmomente ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (9, '🎯 Wann soll dein Duft am meisten GLÄNZEN? (Hauptanlass)',
  'Manche Düfte sind Alltags-Treuer, andere sind Abend-Drama. Wo soll er dich begleiten?',
  'occasion')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '💼 Im Alltag & Büro – treuer Begleiter, subtil, professionell', 'daily', 1),
  (:'q_id', '💕 Bei Dates & zum Verlieben – verführerisch, unvergesslich', 'date', 2),
  (:'q_id', '🎉 Abends & Ausgehen – Drama, Präsenz, Selbstvertrauen', 'evening', 3),
  (:'q_id', '🌟 Überall – Signature-Duft für jeden Moment', 'any', 4);

-- ============ Q10: SEASON - Jahreszeit-Magie ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (10, '🌍 Für welche Jahreszeit suchst du ihn? (oder überall?)',
  'Düfte verändern sich mit dem Wetter. Frische im Sommer, Wärme im Winter. Oder einer für ganzjährig?',
  'season')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🌷 Frühling – Neubeginn, frisch, blumig', 'Frühling', 1),
  (:'q_id', '☀️ Sommer – leicht, zitrusig, erfrischend', 'Sommer', 2),
  (:'q_id', '🍂 Herbst & Winter – warm, würzig, gemütlich', 'Herbst/Winter', 3),
  (:'q_id', '🌙 Das ganze Jahr – mein Signature-Duft', 'Ganzjährig', 4);

-- ============ Q11: SILLAGE - Duft-Präsenz ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (11, '📢 Wie PRÄSENT soll dein Duft sein? (Duft-Radius)',
  'Sillage = wie weit dein Duft im Raum wahrnehmbar ist. Dezent = nur für dich. Auffällig = alle riechen dich kommen!',
  'sillage')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '🤫 Dezent – nur wer mir SEHR nah kommt, riecht es', 'low', 1),
  (:'q_id', '👥 Ausgewogen – angenehm präsent, aber nicht aufdringlich', 'medium', 2),
  (:'q_id', '🌪️ Auffällig – ich hinterlasse EINDRUCK, alle riechen mich', 'high', 3);

-- ============ Q12: LONGEVITY - Haltbarkeit ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (12, '⏰ Wie lange soll dein Duft HALTEN? (Haltbarkeit)',
  'Manche Düfte sind flüchtig & subtil (2-3h), andere begleiten dich den ganzen Tag (8-12h) oder sogar länger.',
  'longevity')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '⚡ Ein paar Stunden reichen – quick refresh, subtil', 'low', 1),
  (:'q_id', '💪 Solide durch den Tag – 6-8 Stunden zuverlässig', 'medium', 2),
  (:'q_id', '🚀 Möglichst lange – 10-12h+, echter Stayer', 'high', 3),
  (:'q_id', '❓ Egal – Hauptsache der Duft passt!', '', 4);

-- ============ Q13: BUDGET - Investition ============
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (13, '💰 Was darf dein neuer Liebling kosten? (Budget)',
  'Wir zeigen dir die BESTEN Treffer in deinem Rahmen – vom Budget-Geheimtipp bis Premium-Luxus. Dein Budget ist OK!',
  'budget')
returning id as q_id \gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position) values
  (:'q_id', '💵 Bis CHF 80 – Smart Shopping, gutes Preis-Leistungs', '80', 1),
  (:'q_id', '💶 CHF 80–150 – Mid-Luxury, beste Qualität', '150', 2),
  (:'q_id', '💎 Auch Premium (über CHF 150) – Investment-Piece, Niche', 'premium', 3),
  (:'q_id', '✨ Budget ist mir egal – MUST HAVE über alles', 'any', 4);

-- ============ VERIFY ============
select 'Quiz Premium Content Loaded! 🎯' as status, count(*) as total_questions from public.quiz_questions;
