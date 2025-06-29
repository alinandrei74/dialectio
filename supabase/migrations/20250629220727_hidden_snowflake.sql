-- ============================================================================
-- CURSO: ENGLISH → SPANISH
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567001', 
 'Spanish for English Speakers', 
 'Learn Spanish from English with practical conversations and real-world scenarios. Master the fundamentals of Spanish grammar, vocabulary, and pronunciation.',
 'es', 'en', 18, 25, false);

-- Part 1: Básico
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'Spanish Basics', 1, 'Learn essential Spanish greetings, introductions, and basic conversation skills');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567011', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567111', 'exercise', 'Greetings and Introductions', 1, NULL, NULL),
('a1b2c3d4-e5f6-7890-abcd-ef1234561112', 'a1b2c3d4-e5f6-7890-abcd-ef1234567111', 'exercise', 'Numbers and Time', 2, NULL, NULL),
('a1b2c3d4-e5f6-7890-abcd-ef1234561113', 'a1b2c3d4-e5f6-7890-abcd-ef1234567111', 'exercise', 'Family and Relationships', 3, NULL, NULL);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567112', 'a1b2c3d4-e5f6-7890-abcd-ef1234567011', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561121', 'a1b2c3d4-e5f6-7890-abcd-ef1234567112', 'situation', 'Meeting Someone New', 1, 'Carlos', 'You are Carlos, a friendly Spanish teacher. Help the student practice basic introductions and greetings in Spanish. Keep the conversation simple and encouraging.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234561122', 'a1b2c3d4-e5f6-7890-abcd-ef1234567112', 'situation', 'At a Café', 2, 'María', 'You are María, a café owner in Madrid. Help the student practice ordering food and drinks in Spanish. Be patient and provide helpful corrections.');

-- Part 2: Intermedio
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'Intermediate Spanish', 2, 'Expand your Spanish with travel, shopping, and daily activities');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567121', 'a1b2c3d4-e5f6-7890-abcd-ef1234567012', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561211', 'a1b2c3d4-e5f6-7890-abcd-ef1234567121', 'exercise', 'Travel and Transportation', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234561212', 'a1b2c3d4-e5f6-7890-abcd-ef1234567121', 'exercise', 'Shopping and Money', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234561213', 'a1b2c3d4-e5f6-7890-abcd-ef1234567121', 'exercise', 'Past Tense Stories', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567122', 'a1b2c3d4-e5f6-7890-abcd-ef1234567012', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561221', 'a1b2c3d4-e5f6-7890-abcd-ef1234567122', 'situation', 'At the Airport', 1, 'Diego', 'You are Diego, an airport employee in Barcelona. Help the student practice travel-related Spanish conversations.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234561222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567122', 'situation', 'Shopping at the Market', 2, 'Ana', 'You are Ana, a market vendor in Mexico City. Help the student practice shopping and bargaining in Spanish.');

-- Part 3: Avanzado
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567001', 'Advanced Spanish', 3, 'Master complex Spanish grammar, culture, and professional communication');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567131', 'a1b2c3d4-e5f6-7890-abcd-ef1234567013', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561311', 'a1b2c3d4-e5f6-7890-abcd-ef1234567131', 'exercise', 'Business Spanish', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234561312', 'a1b2c3d4-e5f6-7890-abcd-ef1234567131', 'exercise', 'Spanish Culture and History', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567132', 'a1b2c3d4-e5f6-7890-abcd-ef1234567013', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234561321', 'a1b2c3d4-e5f6-7890-abcd-ef1234567132', 'situation', 'Job Interview', 1, 'Sr. Rodríguez', 'You are Sr. Rodríguez, a hiring manager in Madrid. Conduct a professional job interview in Spanish.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234561322', 'a1b2c3d4-e5f6-7890-abcd-ef1234567132', 'situation', 'Cultural Discussion', 2, 'Profesora López', 'You are Profesora López, a Spanish literature teacher. Discuss Spanish culture, traditions, and history.');

-- ============================================================================
-- CURSO: ENGLISH → FRENCH
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567002', 
 'French for English Speakers', 
 'Master French from English with immersive conversations and cultural insights. Learn French grammar, pronunciation, and real-world communication skills.',
 'fr', 'en', 18, 25, false);

-- Part 1: Débutant
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567021', 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'French Fundamentals', 1, 'Master basic French greetings, pronunciation, and essential vocabulary');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567211', 'a1b2c3d4-e5f6-7890-abcd-ef1234567021', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567211', 'exercise', 'French Pronunciation', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234562112', 'a1b2c3d4-e5f6-7890-abcd-ef1234567211', 'exercise', 'Basic Greetings', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234562113', 'a1b2c3d4-e5f6-7890-abcd-ef1234567211', 'exercise', 'Numbers and Dates', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567212', 'a1b2c3d4-e5f6-7890-abcd-ef1234567021', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562121', 'a1b2c3d4-e5f6-7890-abcd-ef1234567212', 'situation', 'First Meeting', 1, 'Pierre', 'Vous êtes Pierre, un professeur de français sympathique. Aidez l''étudiant à pratiquer les salutations et présentations de base en français.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234562122', 'a1b2c3d4-e5f6-7890-abcd-ef1234567212', 'situation', 'At the Bakery', 2, 'Madame Dubois', 'Vous êtes Madame Dubois, propriétaire d''une boulangerie parisienne. Aidez l''étudiant à commander du pain et des pâtisseries en français.');

-- Part 2: Intermédiaire
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567022', 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'Intermediate French', 2, 'Explore French culture through food, travel, and daily conversations');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567221', 'a1b2c3d4-e5f6-7890-abcd-ef1234567022', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562211', 'a1b2c3d4-e5f6-7890-abcd-ef1234567221', 'exercise', 'French Cuisine', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234562212', 'a1b2c3d4-e5f6-7890-abcd-ef1234567221', 'exercise', 'Directions and Transportation', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234562213', 'a1b2c3d4-e5f6-7890-abcd-ef1234567221', 'exercise', 'Weather and Seasons', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567022', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562221', 'a1b2c3d4-e5f6-7890-abcd-ef1234567222', 'situation', 'At the Restaurant', 1, 'Chef Antoine', 'Vous êtes Chef Antoine, propriétaire d''un restaurant français. Aidez l''étudiant à commander un repas en français.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234562222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567222', 'situation', 'Tourist in Paris', 2, 'Guide Sylvie', 'Vous êtes Sylvie, guide touristique à Paris. Aidez l''étudiant à demander des directions et des informations touristiques.');

-- Part 3: Avancé
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567023', 'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 'Advanced French', 3, 'Perfect your French with literature, business, and cultural discussions');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567231', 'a1b2c3d4-e5f6-7890-abcd-ef1234567023', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562311', 'a1b2c3d4-e5f6-7890-abcd-ef1234567231', 'exercise', 'French Literature', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234562312', 'a1b2c3d4-e5f6-7890-abcd-ef1234567231', 'exercise', 'Business French', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567232', 'a1b2c3d4-e5f6-7890-abcd-ef1234567023', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234562321', 'a1b2c3d4-e5f6-7890-abcd-ef1234567232', 'situation', 'Business Meeting', 1, 'Directeur Martin', 'Vous êtes Directeur Martin, chef d''entreprise française. Menez une réunion d''affaires professionnelle en français.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234562322', 'a1b2c3d4-e5f6-7890-abcd-ef1234567232', 'situation', 'Cultural Debate', 2, 'Professeur Moreau', 'Vous êtes Professeur Moreau, spécialiste de la culture française. Discutez de littérature, art et philosophie française.');

-- ============================================================================
-- CURSO: ENGLISH → PORTUGUESE
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567003', 
 'Portuguese for English Speakers', 
 'Learn Portuguese from English with focus on Brazilian and European variants. Master Portuguese grammar, pronunciation, and cultural nuances.',
 'pt', 'en', 18, 25, false);

-- Part 1: Básico
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567031', 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'Portuguese Basics', 1, 'Learn essential Portuguese greetings, pronunciation, and basic communication');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567311', 'a1b2c3d4-e5f6-7890-abcd-ef1234567031', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567311', 'exercise', 'Portuguese Sounds', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234563112', 'a1b2c3d4-e5f6-7890-abcd-ef1234567311', 'exercise', 'Basic Introductions', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234563113', 'a1b2c3d4-e5f6-7890-abcd-ef1234567311', 'exercise', 'Colors and Objects', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567312', 'a1b2c3d4-e5f6-7890-abcd-ef1234567031', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563121', 'a1b2c3d4-e5f6-7890-abcd-ef1234567312', 'situation', 'Meeting a Brazilian', 1, 'João', 'Você é João, um professor de português brasileiro amigável. Ajude o estudante a praticar cumprimentos e apresentações básicas em português.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234563122', 'a1b2c3d4-e5f6-7890-abcd-ef1234567312', 'situation', 'At the Beach', 2, 'Carla', 'Você é Carla, uma carioca na praia de Copacabana. Ajude o estudante a praticar conversas casuais em português brasileiro.');

-- Part 2: Intermediário
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567032', 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'Intermediate Portuguese', 2, 'Explore Brazilian and Portuguese culture through music, food, and travel');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567321', 'a1b2c3d4-e5f6-7890-abcd-ef1234567032', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563211', 'a1b2c3d4-e5f6-7890-abcd-ef1234567321', 'exercise', 'Brazilian Music', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234563212', 'a1b2c3d4-e5f6-7890-abcd-ef1234567321', 'exercise', 'Food and Cooking', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234563213', 'a1b2c3d4-e5f6-7890-abcd-ef1234567321', 'exercise', 'Travel in Brazil', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567322', 'a1b2c3d4-e5f6-7890-abcd-ef1234567032', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563221', 'a1b2c3d4-e5f6-7890-abcd-ef1234567322', 'situation', 'At a Churrascaria', 1, 'Chef Roberto', 'Você é Chef Roberto, dono de uma churrascaria em São Paulo. Ajude o estudante a pedir comida e conversar sobre culinária brasileira.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234563222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567322', 'situation', 'Carnival Preparation', 2, 'Lucia', 'Você é Lucia, organizadora do Carnaval no Rio. Ajude o estudante a aprender sobre tradições brasileiras e festivais.');

-- Part 3: Avançado
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567033', 'a1b2c3d4-e5f6-7890-abcd-ef1234567003', 'Advanced Portuguese', 3, 'Master Portuguese with business communication and cultural depth');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567331', 'a1b2c3d4-e5f6-7890-abcd-ef1234567033', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563311', 'a1b2c3d4-e5f6-7890-abcd-ef1234567331', 'exercise', 'Portuguese History', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234563312', 'a1b2c3d4-e5f6-7890-abcd-ef1234567331', 'exercise', 'Business Portuguese', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567332', 'a1b2c3d4-e5f6-7890-abcd-ef1234567033', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234563321', 'a1b2c3d4-e5f6-7890-abcd-ef1234567332', 'situation', 'Business in Brazil', 1, 'Dr. Silva', 'Você é Dr. Silva, executivo brasileiro. Conduza uma reunião de negócios profissional em português.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234563322', 'a1b2c3d4-e5f6-7890-abcd-ef1234567332', 'situation', 'Cultural Exchange', 2, 'Professora Santos', 'Você é Professora Santos, especialista em cultura luso-brasileira. Discuta história, literatura e tradições.');

-- ============================================================================
-- CURSO: ENGLISH → ITALIAN
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567004', 
 'Italian for English Speakers', 
 'Discover Italian from English through art, cuisine, and culture. Learn Italian grammar, pronunciation, and authentic communication.',
 'it', 'en', 18, 25, false);

-- Part 1: Base
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567041', 'a1b2c3d4-e5f6-7890-abcd-ef1234567004', 'Italian Fundamentals', 1, 'Master basic Italian pronunciation, greetings, and essential expressions');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567411', 'a1b2c3d4-e5f6-7890-abcd-ef1234567041', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567411', 'exercise', 'Italian Pronunciation', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234564112', 'a1b2c3d4-e5f6-7890-abcd-ef1234567411', 'exercise', 'Ciao and Greetings', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234564113', 'a1b2c3d4-e5f6-7890-abcd-ef1234567411', 'exercise', 'Italian Gestures', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567412', 'a1b2c3d4-e5f6-7890-abcd-ef1234567041', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564121', 'a1b2c3d4-e5f6-7890-abcd-ef1234567412', 'situation', 'Meeting in Rome', 1, 'Marco', 'Sei Marco, un insegnante di italiano romano amichevole. Aiuta lo studente a praticare saluti e presentazioni di base in italiano.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234564122', 'a1b2c3d4-e5f6-7890-abcd-ef1234567412', 'situation', 'At the Gelato Shop', 2, 'Giulia', 'Sei Giulia, proprietaria di una gelateria a Firenze. Aiuta lo studente a ordinare gelato e fare conversazione in italiano.');

-- Part 2: Intermedio
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567042', 'a1b2c3d4-e5f6-7890-abcd-ef1234567004', 'Intermediate Italian', 2, 'Explore Italian culture through art, food, and regional traditions');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567421', 'a1b2c3d4-e5f6-7890-abcd-ef1234567042', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564211', 'a1b2c3d4-e5f6-7890-abcd-ef1234567421', 'exercise', 'Italian Cuisine', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234564212', 'a1b2c3d4-e5f6-7890-abcd-ef1234567421', 'exercise', 'Art and Museums', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234564213', 'a1b2c3d4-e5f6-7890-abcd-ef1234567421', 'exercise', 'Italian Regions', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567422', 'a1b2c3d4-e5f6-7890-abcd-ef1234567042', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564221', 'a1b2c3d4-e5f6-7890-abcd-ef1234567422', 'situation', 'At the Trattoria', 1, 'Chef Giuseppe', 'Sei Chef Giuseppe, proprietario di una trattoria tradizionale a Bologna. Aiuta lo studente a ordinare cibo italiano autentico.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234564222', 'a1b2c3d4-e5f6-7890-abcd-ef1234567422', 'situation', 'Art Gallery Visit', 2, 'Dottoressa Rossi', 'Sei Dottoressa Rossi, guida d''arte agli Uffizi. Aiuta lo studente a discutere di arte rinascimentale italiana.');

-- Part 3: Avanzato
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567043', 'a1b2c3d4-e5f6-7890-abcd-ef1234567004', 'Advanced Italian', 3, 'Perfect your Italian with literature, business, and cultural sophistication');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567431', 'a1b2c3d4-e5f6-7890-abcd-ef1234567043', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564311', 'a1b2c3d4-e5f6-7890-abcd-ef1234567431', 'exercise', 'Italian Literature', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234564312', 'a1b2c3d4-e5f6-7890-abcd-ef1234567431', 'exercise', 'Business Italian', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567432', 'a1b2c3d4-e5f6-7890-abcd-ef1234567043', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234564321', 'a1b2c3d4-e5f6-7890-abcd-ef1234567432', 'situation', 'Business in Milan', 1, 'Dott. Bianchi', 'Sei Dott. Bianchi, dirigente d''azienda milanese. Conduci una riunione di lavoro professionale in italiano.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234564322', 'a1b2c3d4-e5f6-7890-abcd-ef1234567432', 'situation', 'Cultural Salon', 2, 'Professoressa Ferrari', 'Sei Professoressa Ferrari, esperta di cultura italiana. Discuti di letteratura, opera e tradizioni italiane.');

-- ============================================================================
-- EJERCICIOS PARA TODOS LOS CURSOS
-- ============================================================================

-- Ejercicios para English → Spanish (Greetings and Introductions)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234551111', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'Basic Greetings', 'Choose the correct Spanish greeting for each situation.', 'multiple_choice', '{
  "question": "How do you say \"Good morning\" in Spanish?",
  "options": ["Buenos días", "Buenas tardes", "Buenas noches", "Hola"],
  "correct_answer": "Buenos días",
  "explanation": "\"Buenos días\" is used to greet someone in the morning until around noon."
}', 10, 1),

('a1b2c3d4-e5f6-7890-abcd-ef1234551112', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'Introductions', 'Complete the sentence with the correct Spanish phrase.', 'fill_blank', '{
  "question": "My name is John = Me _____ John",
  "correct_answer": "llamo",
  "acceptable_answers": ["llamo"],
  "case_sensitive": false,
  "explanation": "\"Me llamo\" means \"My name is\" in Spanish."
}', 10, 2),

('a1b2c3d4-e5f6-7890-abcd-ef1234551113', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'a1b2c3d4-e5f6-7890-abcd-ef1234561111', 'Translate Greeting', 'Translate this English phrase to Spanish.', 'translation', '{
  "question": "Nice to meet you",
  "correct_answer": "Mucho gusto",
  "acceptable_answers": ["Mucho gusto", "Encantado", "Encantada", "Es un placer"],
  "source_language": "en",
  "target_language": "es",
  "explanation": "\"Mucho gusto\" is the most common way to say \"Nice to meet you\" in Spanish."
}', 15, 3);

-- Ejercicios para English → French (French Pronunciation)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234552111', 'a1b2c3d4-e5f6-7890-abcd-ef1234562111', 'a1b2c3d4-e5f6-7890-abcd-ef1234562111', 'French Sounds', 'Listen and identify the correct French pronunciation.', 'audio', '{
  "question": "Which word means \"hello\" in French?",
  "audio_url": "https://example.com/audio/bonjour.mp3",
  "correct_answer": "bonjour",
  "acceptable_answers": ["bonjour", "bon jour"],
  "transcript": "bonjour",
  "explanation": "\"Bonjour\" is the standard French greeting meaning \"hello\" or \"good day\"."
}', 10, 1),

('a1b2c3d4-e5f6-7890-abcd-ef1234552112', 'a1b2c3d4-e5f6-7890-abcd-ef1234562111', 'a1b2c3d4-e5f6-7890-abcd-ef1234562111', 'French Accents', 'Choose the word with the correct accent marks.', 'multiple_choice', '{
  "question": "Which is the correct spelling of \"café\" (coffee)?",
  "options": ["cafe", "café", "cafè", "cafê"],
  "correct_answer": "café",
  "explanation": "In French, \"café\" has an acute accent (é) on the final e."
}', 10, 2);

-- Ejercicios para English → Portuguese (Portuguese Sounds)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234553111', 'a1b2c3d4-e5f6-7890-abcd-ef1234563111', 'a1b2c3d4-e5f6-7890-abcd-ef1234563111', 'Portuguese Pronunciation', 'Select the correct Portuguese pronunciation.', 'multiple_choice', '{
  "question": "How do you pronounce \"ão\" in Portuguese?",
  "options": ["ah-oh", "ow (like cow)", "an", "on"],
  "correct_answer": "ow (like cow)",
  "explanation": "The Portuguese \"ão\" is pronounced like \"ow\" in English \"cow\"."
}', 10, 1),

('a1b2c3d4-e5f6-7890-abcd-ef1234553112', 'a1b2c3d4-e5f6-7890-abcd-ef1234563111', 'a1b2c3d4-e5f6-7890-abcd-ef1234563111', 'Basic Portuguese', 'Complete the Portuguese greeting.', 'fill_blank', '{
  "question": "Good morning = Bom _____",
  "correct_answer": "dia",
  "acceptable_answers": ["dia"],
  "case_sensitive": false,
  "explanation": "\"Bom dia\" means \"good morning\" in Portuguese."
}', 10, 2);

-- Ejercicios para English → Italian (Italian Pronunciation)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234554111', 'a1b2c3d4-e5f6-7890-abcd-ef1234564111', 'a1b2c3d4-e5f6-7890-abcd-ef1234564111', 'Italian Sounds', 'Choose the correct Italian pronunciation rule.', 'multiple_choice', '{
  "question": "How is \"gn\" pronounced in Italian (like in \"gnocchi\")?",
  "options": ["g-n (separate)", "ny (like canyon)", "ng (like sing)", "silent"],
  "correct_answer": "ny (like canyon)",
  "explanation": "In Italian, \"gn\" is pronounced like \"ny\" in English \"canyon\"."
}', 10, 1),

('a1b2c3d4-e5f6-7890-abcd-ef1234554112', 'a1b2c3d4-e5f6-7890-abcd-ef1234564111', 'a1b2c3d4-e5f6-7890-abcd-ef1234564111', 'Italian Greeting', 'Translate this greeting to Italian.', 'translation', '{
  "question": "Hello (informal)",
  "correct_answer": "Ciao",
  "acceptable_answers": ["Ciao", "ciao"],
  "source_language": "en",
  "target_language": "it",
  "explanation": "\"Ciao\" is the informal way to say hello (and goodbye) in Italian."
}', 10, 2);

-- Actualizar el total de lecciones para cada curso
UPDATE courses SET total_lessons = (
  SELECT COUNT(DISTINCT u.id)
  FROM parts p
  JOIN phases ph ON ph.part_id = p.id
  JOIN units u ON u.phase_id = ph.id
  WHERE p.course_id = courses.id
) WHERE id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567002', 
  'a1b2c3d4-e5f6-7890-abcd-ef1234567003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567004'
);