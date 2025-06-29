/*
  # Migración completa con datos de muestra para Dialectio

  1. Nuevas tablas y datos
    - Cursos completos (Francés, Portugués, Italiano desde Español)
    - Estructura completa: Partes → Fases → Unidades → Ejercicios
    - Ejercicios con contenido JSONB estructurado
    - Unidades de conversación con agentes IA

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para acceso público a contenido educativo
    - Políticas para datos privados de usuario

  3. Vista actualizada
    - Vista `lessons` actualizada para mapear units correctamente
*/

-- Limpiar datos existentes
TRUNCATE TABLE chat_turns CASCADE;
TRUNCATE TABLE chat_sessions CASCADE;
TRUNCATE TABLE attempts CASCADE;
TRUNCATE TABLE user_exercise_results CASCADE;
TRUNCATE TABLE exercises CASCADE;
TRUNCATE TABLE units CASCADE;
TRUNCATE TABLE phases CASCADE;
TRUNCATE TABLE parts CASCADE;
TRUNCATE TABLE user_progress CASCADE;
TRUNCATE TABLE courses CASCADE;

-- Insertar cursos
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Francés para Hispanohablantes', 'Aprende francés aprovechando tu conocimiento del español. Descubre las similitudes y diferencias entre estas lenguas romances.', 'fr', 'es', 12, 8, false),
('550e8400-e29b-41d4-a716-446655440002', 'Português para Hispanohablantes', 'Domina el portugués utilizando tu base en español. Explora la rica cultura lusófona mientras aprendes.', 'pt', 'es', 10, 6, false),
('550e8400-e29b-41d4-a716-446655440003', 'Italiano para Hispanohablantes', 'Sumérgete en el italiano partiendo del español. La lengua de Dante al alcance de los hispanohablantes.', 'it', 'es', 14, 10, true);

-- Insertar partes para Francés
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Primeros Pasos en Francés', 1, 'Introducción básica al francés: saludos, presentaciones y vocabulario esencial'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'La Vida Cotidiana', 2, 'Vocabulario y expresiones para situaciones del día a día'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'En la Ciudad', 3, 'Navegando por la ciudad: direcciones, transporte y lugares públicos');

-- Insertar partes para Portugués
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Fundamentos del Português', 1, 'Bases del portugués: pronunciación, saludos y expresiones básicas'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Cultura Brasileña', 2, 'Inmersión en la cultura y expresiones típicas de Brasil'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Negocios en Português', 3, 'Portugués profesional y de negocios');

-- Insertar partes para Italiano
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'Ciao Italia!', 1, 'Primeros pasos en italiano: saludos, familia y comida'),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Arte y Cultura', 2, 'El italiano a través del arte, la historia y la cultura'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'Viajando por Italia', 3, 'Italiano para viajeros: hoteles, restaurantes y turismo');

-- Insertar fases para cada parte (preparación y conversación)
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
-- Francés - Primeros Pasos
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'conversation', 2),
-- Francés - Vida Cotidiana
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 'conversation', 2),
-- Francés - En la Ciudad
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440003', 'conversation', 2),
-- Portugués - Fundamentos
('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440004', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440004', 'conversation', 2),
-- Portugués - Cultura Brasileña
('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440005', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440005', 'conversation', 2),
-- Portugués - Negocios
('750e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440006', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440006', 'conversation', 2),
-- Italiano - Ciao Italia
('750e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440007', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440007', 'conversation', 2),
-- Italiano - Arte y Cultura
('750e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440008', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440008', 'conversation', 2),
-- Italiano - Viajando
('750e8400-e29b-41d4-a716-446655440017', '650e8400-e29b-41d4-a716-446655440009', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440009', 'conversation', 2);

-- Insertar unidades de ejercicios (preparation)
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
-- Francés - Primeros Pasos - Preparación
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Saludos Básicos', 1),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Presentaciones', 2),
-- Francés - Vida Cotidiana - Preparación
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'En el Supermercado', 1),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'La Familia', 2),
-- Francés - En la Ciudad - Preparación
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Direcciones', 1),
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Transporte Público', 2),
-- Portugués - Fundamentos - Preparación
('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Primeiras Palavras', 1),
('850e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Números e Cores', 2),
-- Portugués - Cultura Brasileña - Preparación
('850e8400-e29b-41d4-a716-446655440009', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Música Brasileira', 1),
('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Comida Típica', 2),
-- Portugués - Negocios - Preparación
('850e8400-e29b-41d4-a716-446655440011', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Reuniões de Trabalho', 1),
('850e8400-e29b-41d4-a716-446655440012', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Emails Profissionais', 2),
-- Italiano - Ciao Italia - Preparación
('850e8400-e29b-41d4-a716-446655440013', '750e8400-e29b-41d4-a716-446655440013', 'exercise', 'Saluti Italiani', 1),
('850e8400-e29b-41d4-a716-446655440014', '750e8400-e29b-41d4-a716-446655440013', 'exercise', 'La Famiglia', 2),
-- Italiano - Arte y Cultura - Preparación
('850e8400-e29b-41d4-a716-446655440015', '750e8400-e29b-41d4-a716-446655440015', 'exercise', 'Musei e Arte', 1),
('850e8400-e29b-41d4-a716-446655440016', '750e8400-e29b-41d4-a716-446655440015', 'exercise', 'Storia Italiana', 2),
-- Italiano - Viajando - Preparación
('850e8400-e29b-41d4-a716-446655440017', '750e8400-e29b-41d4-a716-446655440017', 'exercise', 'In Albergo', 1),
('850e8400-e29b-41d4-a716-446655440018', '750e8400-e29b-41d4-a716-446655440017', 'exercise', 'Al Ristorante', 2);

-- Insertar unidades de situaciones (conversation)
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
-- Francés - Primeros Pasos - Conversación
('850e8400-e29b-41d4-a716-446655440101', '750e8400-e29b-41d4-a716-446655440002', 'situation', 'Encuentro Casual', 1, 'Marie', 'Eres Marie, una francesa amigable que conoce a alguien por primera vez en un café de París. Sé natural y ayuda al estudiante a practicar saludos y presentaciones básicas.'),
-- Francés - Vida Cotidiana - Conversación
('850e8400-e29b-41d4-a716-446655440102', '750e8400-e29b-41d4-a716-446655440004', 'situation', 'En el Mercado', 1, 'Pierre', 'Eres Pierre, un vendedor en un mercado francés. Ayuda al estudiante a practicar compras y vocabulario de comida en francés.'),
-- Francés - En la Ciudad - Conversación
('850e8400-e29b-41d4-a716-446655440103', '750e8400-e29b-41d4-a716-446655440006', 'situation', 'Pidiendo Direcciones', 1, 'Sophie', 'Eres Sophie, una parisina que ayuda a turistas. El estudiante te preguntará direcciones y tú le ayudarás de manera amigable.'),
-- Portugués - Fundamentos - Conversación
('850e8400-e29b-41d4-a716-446655440104', '750e8400-e29b-41d4-a716-446655440008', 'situation', 'Primeiro Encontro', 1, 'João', 'Você é João, um brasileiro simpático que está conhecendo alguém pela primeira vez. Ajude o estudante a praticar cumprimentos e apresentações básicas em português.'),
-- Portugués - Cultura Brasileña - Conversación
('850e8400-e29b-41d4-a716-446655440105', '750e8400-e29b-41d4-a716-446655440010', 'situation', 'Festival de Música', 1, 'Ana', 'Você é Ana, uma brasileira apaixonada por música. Converse sobre música brasileira e cultura com o estudante.'),
-- Portugués - Negocios - Conversación
('850e8400-e29b-41d4-a716-446655440106', '750e8400-e29b-41d4-a716-446655440012', 'situation', 'Reunião de Negócios', 1, 'Carlos', 'Você é Carlos, um empresário brasileiro. Conduza uma reunião de negócios formal em português.'),
-- Italiano - Ciao Italia - Conversación
('850e8400-e29b-41d4-a716-446655440107', '750e8400-e29b-41d4-a716-446655440014', 'situation', 'Incontro in Piazza', 1, 'Marco', 'Sei Marco, un italiano cordiale che incontra qualcuno per la prima volta in una piazza di Roma. Aiuta lo studente a praticare saluti e presentazioni.'),
-- Italiano - Arte y Cultura - Conversación
('850e8400-e29b-41d4-a716-446655440108', '750e8400-e29b-41d4-a716-446655440016', 'situation', 'Visita al Museo', 1, 'Giulia', 'Sei Giulia, una guida turistica italiana. Conduci una visita guidata in un museo e parla di arte italiana.'),
-- Italiano - Viajando - Conversación
('850e8400-e29b-41d4-a716-446655440109', '750e8400-e29b-41d4-a716-446655440018', 'situation', 'Check-in Hotel', 1, 'Roberto', 'Sei Roberto, un receptionist di hotel italiano. Aiuta il cliente con il check-in e fornisci informazioni turistiche.');

-- Insertar ejercicios con contenido JSONB estructurado (usando $$ para evitar problemas de escape)
INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
-- Francés - Saludos Básicos
('850e8400-e29b-41d4-a716-446655440001', 'Saludo Formal', 'Elige la forma correcta de saludar formalmente en francés', 'multiple_choice', $${
  "question": "¿Cómo se dice \"Buenos días\" formalmente en francés?",
  "options": ["Bonjour", "Salut", "Bonsoir", "Coucou"],
  "correct_answer": "Bonjour",
  "explanation": "\"Bonjour\" es el saludo formal estándar en francés para \"Buenos días\".",
  "hints": ["Se usa en situaciones formales", "Similar al español \"buen día\""]
}$$, 10, 1),

('850e8400-e29b-41d4-a716-446655440001', 'Completar Saludo', 'Completa la frase de saludo', 'fill_blank', $${
  "question": "Complete: \"_____ madame, comment allez-vous?\"",
  "correct_answer": "Bonjour",
  "acceptable_answers": ["bonjour"],
  "case_sensitive": false,
  "explanation": "\"Bonjour madame\" es una forma muy cortés de saludar a una señora.",
  "hints": ["Es un saludo formal", "Se usa durante el día"]
}$$, 10, 2),

-- Francés - Presentaciones
('850e8400-e29b-41d4-a716-446655440002', 'Traducir Presentación', 'Traduce esta presentación al francés', 'translation', $${
  "question": "Me llamo María y soy de España",
  "correct_answer": "Je m'appelle María et je suis d'Espagne",
  "acceptable_answers": ["Je m'appelle María et je viens d'Espagne", "Mon nom est María et je suis d'Espagne"],
  "source_language": "es",
  "target_language": "fr",
  "explanation": "En francés usamos \"Je m'appelle\" para \"me llamo\" y \"je suis de\" para \"soy de\".",
  "hints": ["\"Je m'appelle\" = me llamo", "\"et\" = y", "\"je suis de\" = soy de"]
}$$, 15, 1),

('850e8400-e29b-41d4-a716-446655440002', 'Respuesta Formal', 'Elige la respuesta correcta', 'multiple_choice', $${
  "question": "Si alguien te pregunta \"Comment vous appelez-vous?\", ¿cómo respondes?",
  "options": ["Je m'appelle...", "Je suis...", "J'ai...", "Je vais..."],
  "correct_answer": "Je m'appelle...",
  "explanation": "\"Comment vous appelez-vous?\" significa \"¿Cómo se llama?\" y se responde con \"Je m'appelle...\"",
  "hints": ["Es una pregunta sobre el nombre", "La respuesta debe incluir tu nombre"]
}$$, 10, 2),

-- Francés - En el Supermercado
('850e8400-e29b-41d4-a716-446655440003', 'Vocabulario de Comida', 'Traduce al francés', 'translation', $${
  "question": "Quiero comprar pan y leche",
  "correct_answer": "Je veux acheter du pain et du lait",
  "acceptable_answers": ["Je voudrais acheter du pain et du lait", "J'aimerais acheter du pain et du lait"],
  "source_language": "es",
  "target_language": "fr",
  "explanation": "\"Je veux\" = quiero, \"acheter\" = comprar, \"du pain\" = pan, \"du lait\" = leche",
  "hints": ["\"Je veux\" = quiero", "\"acheter\" = comprar", "\"du\" se usa con sustantivos masculinos"]
}$$, 15, 1),

-- Portugués - Primeiras Palavras
('850e8400-e29b-41d4-a716-446655440007', 'Saudação Básica', 'Escolha a saudação correta em português', 'multiple_choice', $${
  "question": "Como se diz \"Hola\" em português?",
  "options": ["Olá", "Oi", "Bom dia", "Todas as anteriores"],
  "correct_answer": "Todas as anteriores",
  "explanation": "Em português, \"Olá\", \"Oi\" e \"Bom dia\" são todas formas válidas de cumprimentar.",
  "hints": ["Há várias formas de cumprimentar", "Depende do contexto e formalidade"]
}$$, 10, 1),

('850e8400-e29b-41d4-a716-446655440007', 'Completar Frase', 'Complete a frase em português', 'fill_blank', $${
  "question": "Meu nome é _____ e eu sou do Brasil.",
  "correct_answer": "João",
  "acceptable_answers": ["joão", "Maria", "maria", "Ana", "ana", "Pedro", "pedro"],
  "case_sensitive": false,
  "explanation": "Qualquer nome próprio é válido nesta frase de apresentação.",
  "hints": ["Use qualquer nome próprio", "A estrutura é similar ao espanhol"]
}$$, 10, 2),

-- Portugués - Números e Cores
('850e8400-e29b-41d4-a716-446655440008', 'Números Básicos', 'Traduzca al portugués', 'translation', $${
  "question": "Tengo veinte años",
  "correct_answer": "Eu tenho vinte anos",
  "acceptable_answers": ["Tenho vinte anos"],
  "source_language": "es",
  "target_language": "pt",
  "explanation": "\"Eu tenho\" = tengo, \"vinte\" = veinte, \"anos\" = años",
  "hints": ["\"Tenho\" = tengo", "\"vinte\" = veinte", "\"anos\" = años"]
}$$, 15, 1),

-- Italiano - Saluti Italiani
('850e8400-e29b-41d4-a716-446655440013', 'Saluto Informale', 'Scegli il saluto informale corretto', 'multiple_choice', $${
  "question": "Come si dice \"Hola\" informalmente in italiano?",
  "options": ["Ciao", "Buongiorno", "Salve", "Arrivederci"],
  "correct_answer": "Ciao",
  "explanation": "\"Ciao\" è il saluto informale più comune in italiano, equivalente a \"Hola\" in spagnolo.",
  "hints": ["È molto informale", "Si usa con amici e famiglia"]
}$$, 10, 1),

('850e8400-e29b-41d4-a716-446655440013', 'Traduzione Presentazione', 'Traduci in italiano', 'translation', $${
  "question": "Hola, me llamo Marco y soy italiano",
  "correct_answer": "Ciao, mi chiamo Marco e sono italiano",
  "acceptable_answers": ["Ciao, il mio nome è Marco e sono italiano"],
  "source_language": "es",
  "target_language": "it",
  "explanation": "\"Mi chiamo\" è l'equivalente di \"me llamo\" in italiano.",
  "hints": ["\"Mi chiamo\" = me llamo", "\"e\" = y", "\"sono\" = soy"]
}$$, 15, 2),

-- Italiano - La Famiglia
('850e8400-e29b-41d4-a716-446655440014', 'Membri della Famiglia', 'Completa la frase', 'fill_blank', $${
  "question": "Mia _____ si chiama Anna e mio _____ si chiama Giuseppe.",
  "correct_answer": "madre, padre",
  "acceptable_answers": ["mamma, papà", "madre, papà", "mamma, padre"],
  "case_sensitive": false,
  "explanation": "\"Madre\" = madre, \"padre\" = padre. También se puede usar \"mamma\" e \"papà\".",
  "hints": ["Piensa en los padres", "Hay formas formales e informales"]
}$$, 15, 1);

-- Actualizar la vista lessons para mapear correctamente a units
DROP VIEW IF EXISTS lessons;
CREATE VIEW lessons AS
SELECT 
  u.id,
  (SELECT course_id FROM parts WHERE id = ph.part_id) as course_id,
  u.title,
  COALESCE(pt.synopsis, 'Práctica de ' || u.title) as description,
  COALESCE(u.agent_prompt, 'Contenido de práctica para ' || u.title) as content,
  (pt.part_order - 1) * 10 + ph.phase_order * 5 + u.unit_order as lesson_order,
  CASE 
    WHEN u.kind = 'exercise' THEN 'practice'
    WHEN u.kind = 'situation' THEN 'conversation'
    ELSE 'vocabulary'
  END as lesson_type,
  15 as estimated_minutes,
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON u.phase_id = ph.id
JOIN parts pt ON ph.part_id = pt.id
ORDER BY pt.course_id, pt.part_order, ph.phase_order, u.unit_order;

-- Verificar y actualizar políticas RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para acceso público a contenido educativo
DROP POLICY IF EXISTS "Anyone can read courses" ON courses;
CREATE POLICY "Anyone can read courses" ON courses FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read parts" ON parts;
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read phases" ON phases;
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read units" ON units;
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read exercises" ON exercises;
CREATE POLICY "Anyone can read exercises" ON exercises FOR SELECT TO public USING (true);

-- Políticas para datos de usuario
DROP POLICY IF EXISTS "Users can insert own attempts" ON attempts;
CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own attempts" ON attempts;
CREATE POLICY "Users can read own attempts" ON attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chat sessions" ON chat_sessions;
CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own chat sessions" ON chat_sessions;
CREATE POLICY "Users can read own chat sessions" ON chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own chat sessions" ON chat_sessions;
CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chat turns" ON chat_turns;
CREATE POLICY "Users can insert own chat turns" ON chat_turns FOR INSERT TO authenticated WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_sessions cs 
    WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can read own chat turns" ON chat_turns;
CREATE POLICY "Users can read own chat turns" ON chat_turns FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM chat_sessions cs 
    WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);