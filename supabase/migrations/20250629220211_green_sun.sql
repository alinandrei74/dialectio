/*
  # Crear cursos desde inglés a otros idiomas

  1. Nuevos Cursos
    - English → Spanish (EN → ES)
    - English → French (EN → FR) 
    - English → Portuguese (EN → PT)
    - English → Italian (EN → IT)

  2. Estructura Completa
    - Cada curso con 3 partes (Básico, Intermedio, Avanzado)
    - Cada parte con 2 fases (Preparación y Conversación)
    - Múltiples unidades por fase
    - Ejercicios variados por unidad

  3. Contenido Educativo
    - Progresión lógica de dificultad
    - Temas relevantes y prácticos
    - Ejercicios diversos (múltiple opción, llenar espacios, traducción, audio, conversación)
*/

-- ============================================================================
-- CURSO: ENGLISH → SPANISH
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440001', 
 'Spanish for English Speakers', 
 'Learn Spanish from English with practical conversations and real-world scenarios. Master the fundamentals of Spanish grammar, vocabulary, and pronunciation.',
 'es', 'en', 18, 25, false);

-- Part 1: Básico
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'Spanish Basics', 1, 'Learn essential Spanish greetings, introductions, and basic conversation skills');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440011', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655441111', '550e8400-e29b-41d4-a716-446655440111', 'exercise', 'Greetings and Introductions', 1, NULL, NULL),
('550e8400-e29b-41d4-a716-446655441112', '550e8400-e29b-41d4-a716-446655440111', 'exercise', 'Numbers and Time', 2, NULL, NULL),
('550e8400-e29b-41d4-a716-446655441113', '550e8400-e29b-41d4-a716-446655440111', 'exercise', 'Family and Relationships', 3, NULL, NULL);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440011', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655441121', '550e8400-e29b-41d4-a716-446655440112', 'situation', 'Meeting Someone New', 1, 'Carlos', 'You are Carlos, a friendly Spanish teacher. Help the student practice basic introductions and greetings in Spanish. Keep the conversation simple and encouraging.'),
('550e8400-e29b-41d4-a716-446655441122', '550e8400-e29b-41d4-a716-446655440112', 'situation', 'At a Café', 2, 'María', 'You are María, a café owner in Madrid. Help the student practice ordering food and drinks in Spanish. Be patient and provide helpful corrections.');

-- Part 2: Intermedio
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 'Intermediate Spanish', 2, 'Expand your Spanish with travel, shopping, and daily activities');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440012', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655441211', '550e8400-e29b-41d4-a716-446655440121', 'exercise', 'Travel and Transportation', 1),
('550e8400-e29b-41d4-a716-446655441212', '550e8400-e29b-41d4-a716-446655440121', 'exercise', 'Shopping and Money', 2),
('550e8400-e29b-41d4-a716-446655441213', '550e8400-e29b-41d4-a716-446655440121', 'exercise', 'Past Tense Stories', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440012', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655441221', '550e8400-e29b-41d4-a716-446655440122', 'situation', 'At the Airport', 1, 'Diego', 'You are Diego, an airport employee in Barcelona. Help the student practice travel-related Spanish conversations.'),
('550e8400-e29b-41d4-a716-446655441222', '550e8400-e29b-41d4-a716-446655440122', 'situation', 'Shopping at the Market', 2, 'Ana', 'You are Ana, a market vendor in Mexico City. Help the student practice shopping and bargaining in Spanish.');

-- Part 3: Avanzado
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440001', 'Advanced Spanish', 3, 'Master complex Spanish grammar, culture, and professional communication');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440131', '550e8400-e29b-41d4-a716-446655440013', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655441311', '550e8400-e29b-41d4-a716-446655440131', 'exercise', 'Business Spanish', 1),
('550e8400-e29b-41d4-a716-446655441312', '550e8400-e29b-41d4-a716-446655440131', 'exercise', 'Spanish Culture and History', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440132', '550e8400-e29b-41d4-a716-446655440013', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655441321', '550e8400-e29b-41d4-a716-446655440132', 'situation', 'Job Interview', 1, 'Sr. Rodríguez', 'You are Sr. Rodríguez, a hiring manager in Madrid. Conduct a professional job interview in Spanish.'),
('550e8400-e29b-41d4-a716-446655441322', '550e8400-e29b-41d4-a716-446655440132', 'situation', 'Cultural Discussion', 2, 'Profesora López', 'You are Profesora López, a Spanish literature teacher. Discuss Spanish culture, traditions, and history.');

-- ============================================================================
-- CURSO: ENGLISH → FRENCH
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440002', 
 'French for English Speakers', 
 'Master French from English with immersive conversations and cultural insights. Learn French grammar, pronunciation, and real-world communication skills.',
 'fr', 'en', 18, 25, false);

-- Part 1: Débutant
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'French Fundamentals', 1, 'Master basic French greetings, pronunciation, and essential vocabulary');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440211', '550e8400-e29b-41d4-a716-446655440021', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655442111', '550e8400-e29b-41d4-a716-446655440211', 'exercise', 'French Pronunciation', 1),
('550e8400-e29b-41d4-a716-446655442112', '550e8400-e29b-41d4-a716-446655440211', 'exercise', 'Basic Greetings', 2),
('550e8400-e29b-41d4-a716-446655442113', '550e8400-e29b-41d4-a716-446655440211', 'exercise', 'Numbers and Dates', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440212', '550e8400-e29b-41d4-a716-446655440021', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655442121', '550e8400-e29b-41d4-a716-446655440212', 'situation', 'First Meeting', 1, 'Pierre', 'Vous êtes Pierre, un professeur de français sympathique. Aidez l''étudiant à pratiquer les salutations et présentations de base en français.'),
('550e8400-e29b-41d4-a716-446655442122', '550e8400-e29b-41d4-a716-446655440212', 'situation', 'At the Bakery', 2, 'Madame Dubois', 'Vous êtes Madame Dubois, propriétaire d''une boulangerie parisienne. Aidez l''étudiant à commander du pain et des pâtisseries en français.');

-- Part 2: Intermédiaire
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440002', 'Intermediate French', 2, 'Explore French culture through food, travel, and daily conversations');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440221', '550e8400-e29b-41d4-a716-446655440022', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655442211', '550e8400-e29b-41d4-a716-446655440221', 'exercise', 'French Cuisine', 1),
('550e8400-e29b-41d4-a716-446655442212', '550e8400-e29b-41d4-a716-446655440221', 'exercise', 'Directions and Transportation', 2),
('550e8400-e29b-41d4-a716-446655442213', '550e8400-e29b-41d4-a716-446655440221', 'exercise', 'Weather and Seasons', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440222', '550e8400-e29b-41d4-a716-446655440022', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655442221', '550e8400-e29b-41d4-a716-446655440222', 'situation', 'At the Restaurant', 1, 'Chef Antoine', 'Vous êtes Chef Antoine, propriétaire d''un restaurant français. Aidez l''étudiant à commander un repas en français.'),
('550e8400-e29b-41d4-a716-446655442222', '550e8400-e29b-41d4-a716-446655440222', 'situation', 'Tourist in Paris', 2, 'Guide Sylvie', 'Vous êtes Sylvie, guide touristique à Paris. Aidez l''étudiant à demander des directions et des informations touristiques.');

-- Part 3: Avancé
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440002', 'Advanced French', 3, 'Perfect your French with literature, business, and cultural discussions');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440231', '550e8400-e29b-41d4-a716-446655440023', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655442311', '550e8400-e29b-41d4-a716-446655440231', 'exercise', 'French Literature', 1),
('550e8400-e29b-41d4-a716-446655442312', '550e8400-e29b-41d4-a716-446655440231', 'exercise', 'Business French', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440232', '550e8400-e29b-41d4-a716-446655440023', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655442321', '550e8400-e29b-41d4-a716-446655440232', 'situation', 'Business Meeting', 1, 'Directeur Martin', 'Vous êtes Directeur Martin, chef d''entreprise française. Menez une réunion d''affaires professionnelle en français.'),
('550e8400-e29b-41d4-a716-446655442322', '550e8400-e29b-41d4-a716-446655440232', 'situation', 'Cultural Debate', 2, 'Professeur Moreau', 'Vous êtes Professeur Moreau, spécialiste de la culture française. Discutez de littérature, art et philosophie française.');

-- ============================================================================
-- CURSO: ENGLISH → PORTUGUESE
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440003', 
 'Portuguese for English Speakers', 
 'Learn Portuguese from English with focus on Brazilian and European variants. Master Portuguese grammar, pronunciation, and cultural nuances.',
 'pt', 'en', 18, 25, false);

-- Part 1: Básico
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440003', 'Portuguese Basics', 1, 'Learn essential Portuguese greetings, pronunciation, and basic communication');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440311', '550e8400-e29b-41d4-a716-446655440031', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655443111', '550e8400-e29b-41d4-a716-446655440311', 'exercise', 'Portuguese Sounds', 1),
('550e8400-e29b-41d4-a716-446655443112', '550e8400-e29b-41d4-a716-446655440311', 'exercise', 'Basic Introductions', 2),
('550e8400-e29b-41d4-a716-446655443113', '550e8400-e29b-41d4-a716-446655440311', 'exercise', 'Colors and Objects', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440312', '550e8400-e29b-41d4-a716-446655440031', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655443121', '550e8400-e29b-41d4-a716-446655440312', 'situation', 'Meeting a Brazilian', 1, 'João', 'Você é João, um professor de português brasileiro amigável. Ajude o estudante a praticar cumprimentos e apresentações básicas em português.'),
('550e8400-e29b-41d4-a716-446655443122', '550e8400-e29b-41d4-a716-446655440312', 'situation', 'At the Beach', 2, 'Carla', 'Você é Carla, uma carioca na praia de Copacabana. Ajude o estudante a praticar conversas casuais em português brasileiro.');

-- Part 2: Intermediário
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440003', 'Intermediate Portuguese', 2, 'Explore Brazilian and Portuguese culture through music, food, and travel');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440321', '550e8400-e29b-41d4-a716-446655440032', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655443211', '550e8400-e29b-41d4-a716-446655440321', 'exercise', 'Brazilian Music', 1),
('550e8400-e29b-41d4-a716-446655443212', '550e8400-e29b-41d4-a716-446655440321', 'exercise', 'Food and Cooking', 2),
('550e8400-e29b-41d4-a716-446655443213', '550e8400-e29b-41d4-a716-446655440321', 'exercise', 'Travel in Brazil', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440322', '550e8400-e29b-41d4-a716-446655440032', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655443221', '550e8400-e29b-41d4-a716-446655440322', 'situation', 'At a Churrascaria', 1, 'Chef Roberto', 'Você é Chef Roberto, dono de uma churrascaria em São Paulo. Ajude o estudante a pedir comida e conversar sobre culinária brasileira.'),
('550e8400-e29b-41d4-a716-446655443222', '550e8400-e29b-41d4-a716-446655440322', 'situation', 'Carnival Preparation', 2, 'Lucia', 'Você é Lucia, organizadora do Carnaval no Rio. Ajude o estudante a aprender sobre tradições brasileiras e festivais.');

-- Part 3: Avançado
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440003', 'Advanced Portuguese', 3, 'Master Portuguese with business communication and cultural depth');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440331', '550e8400-e29b-41d4-a716-446655440033', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655443311', '550e8400-e29b-41d4-a716-446655440331', 'exercise', 'Portuguese History', 1),
('550e8400-e29b-41d4-a716-446655443312', '550e8400-e29b-41d4-a716-446655440331', 'exercise', 'Business Portuguese', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440332', '550e8400-e29b-41d4-a716-446655440033', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655443321', '550e8400-e29b-41d4-a716-446655440332', 'situation', 'Business in Brazil', 1, 'Dr. Silva', 'Você é Dr. Silva, executivo brasileiro. Conduza uma reunião de negócios profissional em português.'),
('550e8400-e29b-41d4-a716-446655443322', '550e8400-e29b-41d4-a716-446655440332', 'situation', 'Cultural Exchange', 2, 'Professora Santos', 'Você é Professora Santos, especialista em cultura luso-brasileira. Discuta história, literatura e tradições.');

-- ============================================================================
-- CURSO: ENGLISH → ITALIAN
-- ============================================================================

INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440004', 
 'Italian for English Speakers', 
 'Discover Italian from English through art, cuisine, and culture. Learn Italian grammar, pronunciation, and authentic communication.',
 'it', 'en', 18, 25, false);

-- Part 1: Base
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440004', 'Italian Fundamentals', 1, 'Master basic Italian pronunciation, greetings, and essential expressions');

-- Part 1 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440411', '550e8400-e29b-41d4-a716-446655440041', 'preparation', 1);

-- Part 1 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655444111', '550e8400-e29b-41d4-a716-446655440411', 'exercise', 'Italian Pronunciation', 1),
('550e8400-e29b-41d4-a716-446655444112', '550e8400-e29b-41d4-a716-446655440411', 'exercise', 'Ciao and Greetings', 2),
('550e8400-e29b-41d4-a716-446655444113', '550e8400-e29b-41d4-a716-446655440411', 'exercise', 'Italian Gestures', 3);

-- Part 1 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440412', '550e8400-e29b-41d4-a716-446655440041', 'conversation', 2);

-- Part 1 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655444121', '550e8400-e29b-41d4-a716-446655440412', 'situation', 'Meeting in Rome', 1, 'Marco', 'Sei Marco, un insegnante di italiano romano amichevole. Aiuta lo studente a praticare saluti e presentazioni di base in italiano.'),
('550e8400-e29b-41d4-a716-446655444122', '550e8400-e29b-41d4-a716-446655440412', 'situation', 'At the Gelato Shop', 2, 'Giulia', 'Sei Giulia, proprietaria di una gelateria a Firenze. Aiuta lo studente a ordinare gelato e fare conversazione in italiano.');

-- Part 2: Intermedio
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440004', 'Intermediate Italian', 2, 'Explore Italian culture through art, food, and regional traditions');

-- Part 2 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440421', '550e8400-e29b-41d4-a716-446655440042', 'preparation', 1);

-- Part 2 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655444211', '550e8400-e29b-41d4-a716-446655440421', 'exercise', 'Italian Cuisine', 1),
('550e8400-e29b-41d4-a716-446655444212', '550e8400-e29b-41d4-a716-446655440421', 'exercise', 'Art and Museums', 2),
('550e8400-e29b-41d4-a716-446655444213', '550e8400-e29b-41d4-a716-446655440421', 'exercise', 'Italian Regions', 3);

-- Part 2 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440422', '550e8400-e29b-41d4-a716-446655440042', 'conversation', 2);

-- Part 2 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655444221', '550e8400-e29b-41d4-a716-446655440422', 'situation', 'At the Trattoria', 1, 'Chef Giuseppe', 'Sei Chef Giuseppe, proprietario di una trattoria tradizionale a Bologna. Aiuta lo studente a ordinare cibo italiano autentico.'),
('550e8400-e29b-41d4-a716-446655444222', '550e8400-e29b-41d4-a716-446655440422', 'situation', 'Art Gallery Visit', 2, 'Dottoressa Rossi', 'Sei Dottoressa Rossi, guida d''arte agli Uffizi. Aiuta lo studente a discutere di arte rinascimentale italiana.');

-- Part 3: Avanzato
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440004', 'Advanced Italian', 3, 'Perfect your Italian with literature, business, and cultural sophistication');

-- Part 3 - Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440431', '550e8400-e29b-41d4-a716-446655440043', 'preparation', 1);

-- Part 3 - Phase 1 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655444311', '550e8400-e29b-41d4-a716-446655440431', 'exercise', 'Italian Literature', 1),
('550e8400-e29b-41d4-a716-446655444312', '550e8400-e29b-41d4-a716-446655440431', 'exercise', 'Business Italian', 2);

-- Part 3 - Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440432', '550e8400-e29b-41d4-a716-446655440043', 'conversation', 2);

-- Part 3 - Phase 2 - Units
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655444321', '550e8400-e29b-41d4-a716-446655440432', 'situation', 'Business in Milan', 1, 'Dott. Bianchi', 'Sei Dott. Bianchi, dirigente d''azienda milanese. Conduci una riunione di lavoro professionale in italiano.'),
('550e8400-e29b-41d4-a716-446655444322', '550e8400-e29b-41d4-a716-446655440432', 'situation', 'Cultural Salon', 2, 'Professoressa Ferrari', 'Sei Professoressa Ferrari, esperta di cultura italiana. Discuti di letteratura, opera e tradizioni italiane.');

-- ============================================================================
-- EJERCICIOS PARA TODOS LOS CURSOS
-- ============================================================================

-- Ejercicios para English → Spanish (Greetings and Introductions)
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655551111', '550e8400-e29b-41d4-a716-446655441111', 'Basic Greetings', 'Choose the correct Spanish greeting for each situation.', 'multiple_choice', '{
  "question": "How do you say \"Good morning\" in Spanish?",
  "options": ["Buenos días", "Buenas tardes", "Buenas noches", "Hola"],
  "correct_answer": "Buenos días",
  "explanation": "\"Buenos días\" is used to greet someone in the morning until around noon."
}', 10, 1),

('550e8400-e29b-41d4-a716-446655551112', '550e8400-e29b-41d4-a716-446655441111', 'Introductions', 'Complete the sentence with the correct Spanish phrase.', 'fill_blank', '{
  "question": "My name is John = Me _____ John",
  "correct_answer": "llamo",
  "acceptable_answers": ["llamo"],
  "case_sensitive": false,
  "explanation": "\"Me llamo\" means \"My name is\" in Spanish."
}', 10, 2),

('550e8400-e29b-41d4-a716-446655551113', '550e8400-e29b-41d4-a716-446655441111', 'Translate Greeting', 'Translate this English phrase to Spanish.', 'translation', '{
  "question": "Nice to meet you",
  "correct_answer": "Mucho gusto",
  "acceptable_answers": ["Mucho gusto", "Encantado", "Encantada", "Es un placer"],
  "source_language": "en",
  "target_language": "es",
  "explanation": "\"Mucho gusto\" is the most common way to say \"Nice to meet you\" in Spanish."
}', 15, 3);

-- Ejercicios para English → French (French Pronunciation)
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655552111', '550e8400-e29b-41d4-a716-446655442111', 'French Sounds', 'Listen and identify the correct French pronunciation.', 'audio', '{
  "question": "Which word means \"hello\" in French?",
  "audio_url": "https://example.com/audio/bonjour.mp3",
  "correct_answer": "bonjour",
  "acceptable_answers": ["bonjour", "bon jour"],
  "transcript": "bonjour",
  "explanation": "\"Bonjour\" is the standard French greeting meaning \"hello\" or \"good day\"."
}', 10, 1),

('550e8400-e29b-41d4-a716-446655552112', '550e8400-e29b-41d4-a716-446655442111', 'French Accents', 'Choose the word with the correct accent marks.', 'multiple_choice', '{
  "question": "Which is the correct spelling of \"café\" (coffee)?",
  "options": ["cafe", "café", "cafè", "cafê"],
  "correct_answer": "café",
  "explanation": "In French, \"café\" has an acute accent (é) on the final e."
}', 10, 2);

-- Ejercicios para English → Portuguese (Portuguese Sounds)
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655553111', '550e8400-e29b-41d4-a716-446655443111', 'Portuguese Pronunciation', 'Select the correct Portuguese pronunciation.', 'multiple_choice', '{
  "question": "How do you pronounce \"ão\" in Portuguese?",
  "options": ["ah-oh", "ow (like cow)", "an", "on"],
  "correct_answer": "ow (like cow)",
  "explanation": "The Portuguese \"ão\" is pronounced like \"ow\" in English \"cow\"."
}', 10, 1),

('550e8400-e29b-41d4-a716-446655553112', '550e8400-e29b-41d4-a716-446655443111', 'Basic Portuguese', 'Complete the Portuguese greeting.', 'fill_blank', '{
  "question": "Good morning = Bom _____",
  "correct_answer": "dia",
  "acceptable_answers": ["dia"],
  "case_sensitive": false,
  "explanation": "\"Bom dia\" means \"good morning\" in Portuguese."
}', 10, 2);

-- Ejercicios para English → Italian (Italian Pronunciation)
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655554111', '550e8400-e29b-41d4-a716-446655444111', 'Italian Sounds', 'Choose the correct Italian pronunciation rule.', 'multiple_choice', '{
  "question": "How is \"gn\" pronounced in Italian (like in \"gnocchi\")?",
  "options": ["g-n (separate)", "ny (like canyon)", "ng (like sing)", "silent"],
  "correct_answer": "ny (like canyon)",
  "explanation": "In Italian, \"gn\" is pronounced like \"ny\" in English \"canyon\"."
}', 10, 1),

('550e8400-e29b-41d4-a716-446655554112', '550e8400-e29b-41d4-a716-446655444111', 'Italian Greeting', 'Translate this greeting to Italian.', 'translation', '{
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
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002', 
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004'
);