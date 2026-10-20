-- 43_auressa_laienfreundlich.sql
--
-- Replace old quiz_questions with 12 beginner-friendly (laienfreundlich) questions.
-- No technical jargon, concrete examples, emotional language, memorable phrasing.
-- All questions designed for users with zero fragrance knowledge.

-- First, delete old questions (if any exist from earlier versions)
DELETE FROM public.quiz_questions WHERE id <= 13;

-- Q1: Gender
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  1,
  1,
  '👥 Für wen suchen wir den perfekten Duft?',
  'gender',
  'Das hilft uns zu verstehen, welche Düfte zu dir passen könnten.',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (1, 'Für mich (Frau)', 'Women', 1, NOW()),
  (1, 'Für mich (Mann)', 'Men', 2, NOW()),
  (1, 'Für mich (beliebig)', 'Unisex', 3, NOW());

-- Q2: Anchor fragrance (optional)
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  2,
  2,
  '💝 Gibt es einen Duft, den du schon liebst?',
  'anchor',
  'Optional – wenn ja, helfen wir dir, ähnliche zu finden. Wenn nein, weiterhin!',
  NOW()
);

-- Q3: Family 1 – Moment/Context
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  3,
  3,
  '🎬 Stell dir vor – wo bist du gerade, wenn du dich am wohlsten fühlst?',
  'family',
  'Wir suchen einen Duft für deine Lieblingssituation – drinnen, draußen, in der Natur?',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (3, '☀️ Draußen in der Sonne – Bergluft, Natur', 'clean', 1, NOW()),
  (3, '🍰 Zuhause mit Kaffee & Kuchen – gemütlich & warm', 'gourmand', 2, NOW()),
  (3, '🌲 Im Wald oder in der Natur – Erde & Holz', 'woody', 3, NOW()),
  (3, '🌸 In einem Garten voller Blumen – romantisch', 'floral', 4, NOW());

-- Q4: Family 2 – Emotions/Feelings
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  4,
  4,
  '💭 Welches Gefühl soll dein Duft bei dir auslösen?',
  'family',
  'Manche Düfte machen dich selbstbewusst, andere entspannen dich – was ist dir wichtiger?',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (4, '✨ Frisch & energiegeladen – wie ein Bad im See', 'clean', 1, NOW()),
  (4, '😋 Glücklich & genießerisch – wie Dessert essen', 'gourmand', 2, NOW()),
  (4, '🛡️ Selbstsicher & kraftvoll – wie eine Rüstung', 'woody', 3, NOW()),
  (4, '😍 Weiblich & verführerisch – wie eine Blume', 'floral', 4, NOW());

-- Q5: Sweetness level
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  5,
  5,
  '🍯 Magst du eher süßliche oder frische Düfte?',
  'sweetness',
  'Spielt mit einem Schieberegler – links = sehr frisch, rechts = sehr süß.',
  NOW()
);

-- Q6: Loved note
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  6,
  6,
  '💚 Welche Duftnote macht dein Herz schneller schlagen?',
  'lovedNote',
  'Beispiele: Vanille (süß), Zitrus (frisch), Schokolade, Rosen, Moschus...',
  NOW()
);

-- Q7: Disliked note
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  7,
  7,
  '❌ Gibt es eine Duftnote, die du gar nicht magst?',
  'dislikedNote',
  'Wenn ja, schließen wir alle Düfte mit dieser Note aus – garantiert!',
  NOW()
);

-- Q8: Occasion
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  8,
  8,
  '🎯 Wann soll dein Duft am meisten glänzen?',
  'occasion',
  'Im Büro? Zum Feiern? Im Alltag? Wir finden den richtigen für dich.',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (8, '🏢 Im Büro – dezent & elegant', 'work', 1, NOW()),
  (8, '🎉 Zum Feiern – mutig & auffallend', 'party', 2, NOW()),
  (8, '👗 Frauenabend – verführerisch', 'date', 3, NOW()),
  (8, '🧘 Alltag – angenehm & zeitlos', 'daily', 4, NOW());

-- Q9: Season
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  9,
  9,
  '🌍 Für welche Jahreszeit suchst du den Duft?',
  'season',
  'Sommer braucht Frische, Winter braucht Wärme – wir berücksichtigen das.',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (9, '☀️ Sommer – leicht & erfrischend', 'Sommer', 1, NOW()),
  (9, '🌸 Frühling – blumig & luftig', 'Frühling', 2, NOW()),
  (9, '🍂 Herbst – warm & würzig', 'Herbst', 3, NOW()),
  (9, '❄️ Winter – gemütlich & intensiv', 'Winter', 4, NOW()),
  (9, '🌍 Das ganze Jahr – ein Klassiker', 'Ganzjährig', 5, NOW());

-- Q10: Sillage (projection)
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  10,
  10,
  '📢 Soll man deinen Duft von weitem riechen oder nur ganz nah?',
  'sillage',
  'Manche Düfte sind wie ein Flüstern (nah), andere wie ein Ruf (von weitem) – was magst du?',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (10, '🤐 Ganz nah – subtil & privat', 'Low', 1, NOW()),
  (10, '🔔 Ausgewogen – man merkt es schon', 'Moderate', 2, NOW()),
  (10, '📣 Von weitem – ich will auffallen!', 'High', 3, NOW());

-- Q11: Longevity (lasting power)
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  11,
  11,
  '⏰ Wie lange soll dein Duft halten?',
  'longevity',
  'Einige halten Stunden, andere den ganzen Tag – es kommt auf den Preis an.',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (11, '🕐 Ein paar Stunden – das reicht mir', 'Short', 1, NOW()),
  (11, '⏱️ Den Arbeitstag (6–8h)', 'Long', 2, NOW()),
  (11, '⏳ Den ganzen Tag & in die Nacht', 'Very Long', 3, NOW());

-- Q12: Budget
INSERT INTO public.quiz_questions (id, order_index, question_text, question_type, help_text, created_at)
VALUES (
  12,
  12,
  '💰 Wie viel möchtest du maximal ausgeben?',
  'budget',
  'Wir zeigen dir Düfte in deinem Budget – und auch günstige Alternativen!',
  NOW()
);

INSERT INTO public.quiz_answers (question_id, answer_text, value, display_order, created_at)
VALUES
  (12, '💸 Bis 30 CHF – Budget-Freundlich', 30, 1, NOW()),
  (12, '💰 Bis 60 CHF – Standard', 60, 2, NOW()),
  (12, '💎 Bis 120 CHF – Mittleres Segment', 120, 3, NOW()),
  (12, '👑 Über 120 CHF – Luxus', 500, 4, NOW());

-- Verify: Check that we have 12 questions now
SELECT COUNT(*) as total_questions FROM public.quiz_questions;
