-- AURESSA: Complete DB-Driven Quiz System
-- Füllt alle Quiz-Fragen und Antworten für das Duft-Matching-Quiz

-- ============ CREATE TABLES IF NOT EXISTS ============
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  position int not null,
  question_text text not null,
  hint_text text,
  question_type text not null,
  created_at timestamp default now()
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  quiz_question_id uuid not null references public.quiz_questions(id) on delete cascade,
  answer_label text not null,
  answer_value text not null,
  position int default 0,
  created_at timestamp default now()
);

-- ============ RLS POLICIES ============
alter table public.quiz_questions enable row level security;
alter table public.quiz_answers enable row level security;

drop policy if exists "Public read quiz_questions" on public.quiz_questions;
drop policy if exists "Public read quiz_answers" on public.quiz_answers;

create policy "Public read quiz_questions" on public.quiz_questions
  for select using (true);

create policy "Public read quiz_answers" on public.quiz_answers
  for select using (true);

-- Grant access to anon
grant select on public.quiz_questions to anon, authenticated;
grant select on public.quiz_answers to anon, authenticated;

-- ============ CLEAR EXISTING DATA ============
delete from public.quiz_answers;
delete from public.quiz_questions;

-- ============ INSERT QUIZ QUESTIONS WITH ANSWERS ============

-- Q1: Gender
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (1, 'Für wen suchen wir den perfekten Duft?', 'So zeigen wir dir nur, was wirklich passt. Kein Suchen im Heuhaufen.', 'gender')
returning id as q1_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q1_id', 'Für Damen', 'women', 1),
  (:'q1_id', 'Für Herren', 'men', 2),
  (:'q1_id', 'Egal, zeig mir alles', 'unisex', 3);

-- Q2: Anchor (optional)
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (2, 'Gibt es einen Duft, den du jetzt schon liebst? (optional)', 'Verrätst du uns deinen Liebling, finden wir gezielt Düfte, die ähnlich riechen – wie ein „mehr davon".', 'anchor')
returning id as q2_id
\gset

-- Q3: Family 1
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (3, 'Stell dir deinen Lieblingsmoment vor – welcher ist es?', 'Geh ganz nach Bauchgefühl. Es gibt kein Richtig oder Falsch.', 'family')
returning id as q3_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q3_id', 'Frisch geduscht, weisses Hemd, Fenster weit auf', 'clean', 1),
  (:'q3_id', 'Kerzenlicht, Vanille und eine warme Decke', 'gourmand', 2),
  (:'q3_id', 'Dunkle Bar, edles Holz, ein Hauch Leder', 'woody', 3),
  (:'q3_id', 'Blumenmarkt im Frühling, leichtes Kleid', 'floral', 4);

-- Q4: Family 2
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (4, 'Wie soll sich dein Duft anfühlen?', 'Geh nach Bauchgefühl – welches Gefühl zieht dich sofort an?', 'family')
returning id as q4_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q4_id', 'Leicht & frisch wie klare Luft', 'clean', 1),
  (:'q4_id', 'Warm & weich wie eine Umarmung', 'gourmand', 2),
  (:'q4_id', 'Kraftvoll & edel wie dunkles Holz', 'woody', 3),
  (:'q4_id', 'Zart & lebendig wie frische Blüten', 'floral', 4);

-- Q5: Family 3
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (5, 'Wie würden gute Freunde deinen Stil beschreiben?', 'Dein Stil verrät oft, welcher Duft sich richtig „nach dir" anfühlt.', 'family')
returning id as q5_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q5_id', 'Natürlich, frisch und unkompliziert', 'clean', 1),
  (:'q5_id', 'Warmherzig, gemütlich und verspielt', 'gourmand', 2),
  (:'q5_id', 'Elegant, edel und zurückhaltend', 'woody', 3),
  (:'q5_id', 'Romantisch, lebhaft und feminin', 'floral', 4);

-- Q6: Sweetness
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (6, 'Wie süss darf dein Duft sein?', 'Von frisch-herb bis dessertartig – wir gewichten das passend für dich.', 'sweetness')
returning id as q6_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q6_id', 'Lieber gar nicht süss', 'low', 1),
  (:'q6_id', 'Ein bisschen Süsse', 'medium', 2),
  (:'q6_id', 'Richtig süss & gourmandig', 'high', 3),
  (:'q6_id', 'Egal', '', 4);

-- Q7: Loved Note
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (7, 'Eine Note, die dein Herz höher schlagen lässt?', 'Diese Note gewichten wir bei deinem Match besonders stark.', 'lovedNote')
returning id as q7_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q7_id', 'Keine bestimmte, überrasch mich', '', 1),
  (:'q7_id', 'Bergamotte', 'bergamotte', 2),
  (:'q7_id', 'Vanille', 'vanille', 3),
  (:'q7_id', 'Jasmin', 'jasmin', 4),
  (:'q7_id', 'Rose', 'rose', 5),
  (:'q7_id', 'Moschus', 'moschus', 6),
  (:'q7_id', 'Patchouli', 'patchouli', 7),
  (:'q7_id', 'Sandelholz', 'sandelholz', 8);

-- Q8: Disliked Note
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (8, 'Und etwas, das für dich gar nicht geht?', 'Düfte mit dieser Note rutschen in deinem Ranking nach unten.', 'dislikedNote')
returning id as q8_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q8_id', 'Keine – ich bin offen für alles', '', 1),
  (:'q8_id', 'Zu herb / bitter', 'bitter', 2),
  (:'q8_id', 'Zu süss / Bonbon-artig', 'candylike', 3),
  (:'q8_id', 'Zu schwer / Kopfweh', 'heavy', 4),
  (:'q8_id', 'Zu Chemie-artig', 'synthetic', 5);

-- Q9: Occasion
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (9, 'Wann soll dein Duft am meisten glänzen?', 'So treffen wir Charakter und Intensität noch besser.', 'occasion')
returning id as q9_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q9_id', 'Im Alltag & Büro', 'daily', 1),
  (:'q9_id', 'Bei Dates & zum Verlieben', 'date', 2),
  (:'q9_id', 'Abends & zum Ausgehen', 'evening', 3),
  (:'q9_id', 'Eigentlich überall', 'any', 4);

-- Q10: Season
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (10, 'Für welche Jahreszeit suchst du ihn?', 'Viele Düfte entfalten sich je nach Wetter ganz anders.', 'season')
returning id as q10_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q10_id', 'Frühling', 'Frühling', 1),
  (:'q10_id', 'Sommer', 'Sommer', 2),
  (:'q10_id', 'Herbst & Winter', 'Herbst/Winter', 3),
  (:'q10_id', 'Das ganze Jahr', 'Ganzjährig', 4);

-- Q11: Sillage
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (11, 'Wie präsent soll dein Duft sein?', 'Also: wie weit dein Duft im Raum wahrnehmbar sein soll.', 'sillage')
returning id as q11_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q11_id', 'Dezent, nur wer mir nah kommt', 'low', 1),
  (:'q11_id', 'Ausgewogen, angenehm präsent', 'medium', 2),
  (:'q11_id', 'Auffällig, ich hinterlasse Eindruck', 'high', 3);

-- Q12: Longevity
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (12, 'Wie lange soll dein Duft halten?', 'Manche Düfte begleiten dich ein paar Stunden, andere den ganzen Tag.', 'longevity')
returning id as q12_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q12_id', 'Ein paar Stunden reichen', 'low', 1),
  (:'q12_id', 'Solide durch den Tag', 'medium', 2),
  (:'q12_id', 'Möglichst lange', 'high', 3),
  (:'q12_id', 'Egal', '', 4);

-- Q13: Budget
insert into public.quiz_questions (position, question_text, hint_text, question_type)
values (13, 'Was darf dein neuer Liebling kosten?', 'Wir zeigen dir die besten Treffer in deinem Rahmen – ohne dich einzuengen.', 'budget')
returning id as q13_id
\gset

insert into public.quiz_answers (quiz_question_id, answer_label, answer_value, position)
values
  (:'q13_id', 'Bis CHF 80', '80', 1),
  (:'q13_id', 'CHF 80–150', '150', 2),
  (:'q13_id', 'Auch Premium (über CHF 150)', 'premium', 3),
  (:'q13_id', 'Budget ist mir egal', 'any', 4);

-- ============ VERIFY DATA ============
select 'Quiz System Ready' as status, count(*) as total_questions from public.quiz_questions;
select count(*) as total_answers from public.quiz_answers;
