/*
  # Crear lecciones detalladas para cada curso

  1. Lecciones estructuradas por curso
  2. Contenido específico para cada idioma objetivo
  3. Progresión lógica de aprendizaje
*/

-- ============================================================================
-- LECCIONES PARA ITALIANO DESDE ESPAÑOL
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes, created_at, updated_at) VALUES
-- Lección 1
('lesson-es-it-001', 'course-es-it-001', 'Ciao Italia! Primeros Pasos', 'Descubre las similitudes entre español e italiano. Aprende saludos básicos y frases de cortesía que te abrirán las puertas de Italia.', 'En esta lección exploraremos cómo el español y el italiano comparten raíces latinas. Veremos que muchas palabras son casi idénticas: "problema" = "problema", "importante" = "importante". Los saludos básicos: Ciao (informal), Buongiorno (formal mañana), Buonasera (formal tarde).', 1, 'vocabulary', 15, now(), now()),

-- Lección 2
('lesson-es-it-002', 'course-es-it-001', 'Mi chiamo... Presentaciones', 'Aprende a presentarte en italiano y a preguntar información básica sobre otras personas.', 'Domina las presentaciones: "Mi chiamo..." (Me llamo), "Come ti chiami?" (¿Cómo te llamas?), "Di dove sei?" (¿De dónde eres?). Países y nacionalidades: Spagna/spagnolo, Italia/italiano, Francia/francese.', 2, 'conversation', 18, now(), now()),

-- Lección 3
('lesson-es-it-003', 'course-es-it-001', 'I Numeri e il Tempo', 'Números del 1 al 100, días de la semana y expresiones de tiempo esenciales.', 'Números: uno, due, tre... Días: lunedì, martedì, mercoledì... Expresiones temporales: oggi (hoy), ieri (ayer), domani (mañana), questa settimana (esta semana).', 3, 'vocabulary', 20, now(), now()),

-- Lección 4
('lesson-es-it-004', 'course-es-it-001', 'La Famiglia Italiana', 'Vocabulario familiar y las relaciones familiares en la cultura italiana.', 'La famiglia: padre, madre, figlio/figlia, fratello/sorella, nonno/nonna. Diferencias culturales: la importancia de la familia extendida en Italia.', 4, 'vocabulary', 16, now(), now()),

-- Lección 5
('lesson-es-it-005', 'course-es-it-001', 'Al Ristorante', 'Ordena comida italiana como un local. Vocabulario gastronómico y frases útiles.', 'Comida italiana: pasta, pizza, risotto, gelato. Frases: "Vorrei..." (Quisiera), "Il conto, per favore" (La cuenta, por favor), "È delizioso!" (¡Está delicioso!).', 5, 'conversation', 22, now(), now()),

-- Lección 6
('lesson-es-it-006', 'course-es-it-001', 'Essere e Avere', 'Los verbos fundamentales "ser/estar" y "tener" en italiano.', 'Essere: io sono, tu sei, lui/lei è... Avere: io ho, tu hai, lui/lei ha... Diferencias con el español en el uso de estos verbos.', 6, 'grammar', 25, now(), now()),

-- Lección 7
('lesson-es-it-007', 'course-es-it-001', 'In Città', 'Navega por las ciudades italianas. Direcciones, lugares y transporte público.', 'Lugares: stazione (estación), piazza (plaza), museo, chiesa (iglesia). Direcciones: a destra (a la derecha), a sinistra (a la izquierda), dritto (derecho).', 7, 'vocabulary', 18, now(), now()),

-- Lección 8
('lesson-es-it-008', 'course-es-it-001', 'I Colori e la Moda', 'Colores, ropa y el estilo italiano. Aprende a describir apariencias.', 'Colori: rosso, blu, verde, giallo... Vestiti: camicia, pantaloni, scarpe, vestito. El estilo italiano y su importancia cultural.', 8, 'vocabulary', 17, now(), now()),

-- Lección 9
('lesson-es-it-009', 'course-es-it-001', 'Il Tempo Libero', 'Hobbies, deportes y actividades de tiempo libre en Italia.', 'Attività: leggere (leer), cucinare (cocinar), viaggiare (viajar). Deportes: calcio (fútbol), tennis, nuoto (natación). "Mi piace..." (Me gusta).', 9, 'conversation', 19, now(), now()),

-- Lección 10
('lesson-es-it-010', 'course-es-it-001', 'Fare Shopping', 'Compras en Italia: mercados, tiendas y regateo educado.', 'Shopping: negozio, mercato, prezzo (precio), sconto (descuento). Frases: "Quanto costa?" (¿Cuánto cuesta?), "È troppo caro" (Es muy caro).', 10, 'conversation', 21, now(), now()),

-- Lección 11
('lesson-es-it-011', 'course-es-it-001', 'Il Passato Prossimo', 'Habla sobre el pasado usando el tiempo más común en italiano.', 'Formación: avere/essere + participio passato. Ejemplos: "Ho mangiato" (He comido), "Sono andato" (He ido). Cuándo usar avere vs essere.', 11, 'grammar', 28, now(), now()),

-- Lección 12
('lesson-es-it-012', 'course-es-it-001', 'Le Stagioni e il Clima', 'Estaciones, clima y actividades estacionales en Italia.', 'Stagioni: primavera, estate, autunno, inverno. Tempo: sole, pioggia, neve, vento. Actividades por estación en diferentes regiones italianas.', 12, 'vocabulary', 16, now(), now()),

-- Lección 13
('lesson-es-it-013', 'course-es-it-001', 'In Viaggio', 'Viaja por Italia: trenes, hoteles y turismo.', 'Trasporti: treno, autobus, aereo, macchina. Hotel: prenotazione (reserva), camera (habitación), colazione (desayuno). Frases de viaje útiles.', 13, 'conversation', 23, now(), now()),

-- Lección 14
('lesson-es-it-014', 'course-es-it-001', 'La Cultura Italiana', 'Arte, historia y tradiciones que definen Italia.', 'Arte: Rinascimento, Leonardo, Michelangelo. Tradiciones: festa, sagra, carnevale. La importancia del patrimonio cultural italiano.', 14, 'culture', 20, now(), now()),

-- Lección 15
('lesson-es-it-015', 'course-es-it-001', 'Il Futuro', 'Planes futuros y el tiempo futuro en italiano.', 'Futuro semplice: andrò, farai, sarà... Expresiones: "Domani andrò..." (Mañana iré), "La prossima settimana..." (La próxima semana). Planes y aspiraciones.', 15, 'grammar', 26, now(), now()),

-- Lección 16
('lesson-es-it-016', 'course-es-it-001', 'Al Lavoro', 'Profesiones, trabajo y vida laboral en Italia.', 'Professioni: medico, insegnante, ingegnere, cuoco. Frases laborales: "Che lavoro fai?" (¿A qué te dedicas?), "Lavoro in..." (Trabajo en).', 16, 'vocabulary', 18, now(), now()),

-- Lección 17
('lesson-es-it-017', 'course-es-it-001', 'La Salute', 'Salud, cuerpo humano y emergencias médicas.', 'Corpo: testa, braccio, gamba, stomaco. Salute: medico, ospedale, farmacia. Emergencias: "Mi fa male..." (Me duele), "Ho bisogno di aiuto" (Necesito ayuda).', 17, 'vocabulary', 19, now(), now()),

-- Lección 18
('lesson-es-it-018', 'course-es-it-001', 'Esprimere Opinioni', 'Expresa opiniones, gustos y preferencias en italiano.', 'Opinioni: "Penso che..." (Pienso que), "Secondo me..." (En mi opinión). Gustos: "Mi piace/non mi piace", "Preferisco...". Argumentar y debatir educadamente.', 18, 'conversation', 24, now(), now()),

-- Lección 19
('lesson-es-it-019', 'course-es-it-001', 'Le Feste Italiane', 'Celebraciones, fiestas y tradiciones festivas italianas.', 'Feste: Natale, Pasqua, Ferragosto, Carnevale. Tradiciones regionales y nacionales. Vocabulario festivo y expresiones de celebración.', 19, 'culture', 17, now(), now()),

-- Lección 20
('lesson-es-it-020', 'course-es-it-001', 'Conversazione Libera', 'Practica conversacional avanzada y repaso general.', 'Conversación libre combinando todos los temas aprendidos. Situaciones reales: presentaciones formales, debates, storytelling. Preparación para conversaciones fluidas.', 20, 'practice', 30, now(), now());

-- ============================================================================
-- LECCIONES PARA FRANCÉS DESDE ESPAÑOL
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes, created_at, updated_at) VALUES
-- Lección 1
('lesson-es-fr-001', 'course-es-fr-001', 'Bonjour la France!', 'Primeros pasos en francés: saludos, cortesía y sonidos únicos del francés.', 'Saludos: Bonjour, Bonsoir, Salut. Cortesía: S\'il vous plaît, Merci, Excusez-moi. Introducción a la pronunciación francesa y las diferencias con el español.', 1, 'vocabulary', 16, now(), now()),

-- Lección 2
('lesson-es-fr-002', 'course-es-fr-001', 'Je me présente', 'Presentaciones personales y información básica en francés.', 'Presentaciones: "Je m\'appelle...", "Je suis...", "J\'ai... ans". Nacionalidades: français(e), espagnol(e), italien(ne). Diferencias de género en francés.', 2, 'conversation', 19, now(), now()),

-- Lección 3
('lesson-es-fr-003', 'course-es-fr-001', 'Les Nombres et le Temps', 'Sistema numérico francés y expresiones temporales básicas.', 'Números 1-100: un, deux, trois... Días: lundi, mardi, mercredi... Meses y estaciones. Particularidades del sistema numérico francés (70, 80, 90).', 3, 'vocabulary', 22, now(), now()),

-- Lección 4
('lesson-es-fr-004', 'course-es-fr-001', 'Ma Famille', 'La familia francesa: vocabulario y estructura familiar.', 'Famille: père, mère, fils/fille, frère/sœur. Adjetivos posesivos: mon, ma, mes. La estructura familiar francesa moderna.', 4, 'vocabulary', 17, now(), now()),

-- Lección 5
('lesson-es-fr-005', 'course-es-fr-001', 'Au Restaurant', 'Gastronomía francesa: ordenar comida y bebida.', 'Cuisine française: fromage, vin, pain, pâtisserie. Frases: "Je voudrais...", "L\'addition, s\'il vous plaît". Etiqueta en restaurantes franceses.', 5, 'conversation', 24, now(), now()),

-- Lección 6
('lesson-es-fr-006', 'course-es-fr-001', 'Être et Avoir', 'Verbos fundamentales y sus usos específicos en francés.', 'Être: je suis, tu es, il/elle est... Avoir: j\'ai, tu as, il/elle a... Expresiones idiomáticas con estos verbos.', 6, 'grammar', 26, now(), now()),

-- Lección 7
('lesson-es-fr-007', 'course-es-fr-001', 'Dans la Ville', 'Navegación urbana: direcciones y lugares públicos.', 'Lieux: gare, place, musée, église, mairie. Directions: à droite, à gauche, tout droit. Transporte público en Francia.', 7, 'vocabulary', 18, now(), now()),

-- Lección 8
('lesson-es-fr-008', 'course-es-fr-001', 'Les Couleurs et la Mode', 'Colores, ropa y el estilo francés.', 'Couleurs: rouge, bleu, vert, jaune... Vêtements: chemise, pantalon, chaussures, robe. La mode française y su influencia mundial.', 8, 'vocabulary', 17, now(), now()),

-- Lección 9
('lesson-es-fr-009', 'course-es-fr-001', 'Les Loisirs', 'Tiempo libre y actividades culturales francesas.', 'Activités: lire, cuisiner, voyager. Sports: football, tennis, natation. "J\'aime..." vs "Il me plaît...". Cultura del tiempo libre en Francia.', 9, 'conversation', 20, now(), now()),

-- Lección 10
('lesson-es-fr-010', 'course-es-fr-001', 'Faire les Courses', 'Compras en Francia: mercados, tiendas y comercio.', 'Shopping: magasin, marché, prix, réduction. Frases: "Combien ça coûte?", "C\'est trop cher". Cultura comercial francesa.', 10, 'conversation', 21, now(), now()),

-- Lección 11
('lesson-es-fr-011', 'course-es-fr-001', 'Le Passé Composé', 'Tiempo pasado más usado en francés conversacional.', 'Formation: avoir/être + participe passé. Exemples: "J\'ai mangé", "Je suis allé(e)". Accord du participe passé.', 11, 'grammar', 29, now(), now()),

-- Lección 12
('lesson-es-fr-012', 'course-es-fr-001', 'Les Saisons et le Climat', 'Estaciones y clima en las diferentes regiones francesas.', 'Saisons: printemps, été, automne, hiver. Météo: soleil, pluie, neige, vent. Diversidad climática de Francia.', 12, 'vocabulary', 16, now(), now()),

-- Lección 13
('lesson-es-fr-013', 'course-es-fr-001', 'En Voyage', 'Viajar por Francia: transporte y alojamiento.', 'Transport: train, bus, avion, voiture. Hôtel: réservation, chambre, petit-déjeuner. Sistema de transporte francés.', 13, 'conversation', 23, now(), now()),

-- Lección 14
('lesson-es-fr-014', 'course-es-fr-001', 'La Culture Française', 'Arte, literatura y patrimonio cultural francés.', 'Culture: littérature, cinéma, art, philosophie. Personnages célèbres. L\'exception culturelle française.', 14, 'culture', 21, now(), now()),

-- Lección 15
('lesson-es-fr-015', 'course-es-fr-001', 'Le Futur', 'Tiempo futuro y expresión de planes.', 'Futur simple: j\'irai, tu feras, il/elle sera... Expressions: "Demain j\'irai...", "La semaine prochaine...". Projets d\'avenir.', 15, 'grammar', 27, now(), now()),

-- Lección 16
('lesson-es-fr-016', 'course-es-fr-001', 'Au Travail', 'Mundo laboral y profesiones en Francia.', 'Professions: médecin, professeur, ingénieur, chef. Phrases: "Quel est votre métier?", "Je travaille dans...". Vie professionnelle française.', 16, 'vocabulary', 18, now(), now()),

-- Lección 17
('lesson-es-fr-017', 'course-es-fr-001', 'La Santé', 'Salud, cuerpo humano y sistema médico francés.', 'Corps: tête, bras, jambe, estomac. Santé: médecin, hôpital, pharmacie. Système de santé français.', 17, 'vocabulary', 19, now(), now()),

-- Lección 18
('lesson-es-fr-018', 'course-es-fr-001', 'Exprimer des Opinions', 'Expresión de opiniones y debate en francés.', 'Opinions: "Je pense que...", "À mon avis...". Goûts: "J\'aime/je n\'aime pas", "Je préfère...". L\'art du débat français.', 18, 'conversation', 25, now(), now()),

-- Lección 19
('lesson-es-fr-019', 'course-es-fr-001', 'Les Fêtes Françaises', 'Celebraciones y tradiciones festivas francesas.', 'Fêtes: Noël, Pâques, 14 juillet, Toussaint. Traditions régionales. Vocabulaire festif et expressions de célébration.', 19, 'culture', 17, now(), now()),

-- Lección 20
('lesson-es-fr-020', 'course-es-fr-001', 'Conversation Avancée', 'Conversación avanzada y síntesis del aprendizaje.', 'Conversation libre intégrant tous les sujets. Situations réelles: présentations formelles, débats, narration. Préparation aux conversations fluides.', 20, 'practice', 32, now(), now()),

-- Lección 21
('lesson-es-fr-021', 'course-es-fr-001', 'Le Subjonctif', 'Introducción al modo subjuntivo francés.', 'Formation et usage du subjonctif. Expressions: "Il faut que...", "Je doute que...". Différences avec l\'espagnol.', 21, 'grammar', 28, now(), now()),

-- Lección 22
('lesson-es-fr-022', 'course-es-fr-001', 'Projet Final', 'Proyecto final: presentación integral en francés.', 'Projet de présentation combinant vocabulaire, grammaire et culture. Simulation de situations réelles complexes.', 22, 'practice', 35, now(), now());

-- ============================================================================
-- LECCIONES PARA PORTUGUÉS DESDE ESPAÑOL
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes, created_at, updated_at) VALUES
-- Lección 1
('lesson-es-pt-001', 'course-es-pt-001', 'Olá Brasil!', 'Primeros pasos en portugués: similitudes y diferencias con el español.', 'Cumprimentos: Olá, Oi, Bom dia, Boa tarde. Diferencias de pronunciación: ão, nh, lh. Falsos amigos comunes entre español y portugués.', 1, 'vocabulary', 14, now(), now()),

-- Lección 2
('lesson-es-pt-002', 'course-es-pt-001', 'Eu me chamo...', 'Presentaciones y información personal en portugués.', 'Apresentações: "Eu me chamo...", "Eu sou...", "Eu tenho... anos". Nacionalidades: brasileiro(a), português/portuguesa, espanhol(a).', 2, 'conversation', 17, now(), now()),

-- Lección 3
('lesson-es-pt-003', 'course-es-pt-001', 'Números e Tempo', 'Sistema numérico y expresiones temporales.', 'Números 1-100: um, dois, três... Dias: segunda-feira, terça-feira... Meses e estações. Particularidades del portugués brasileño vs europeo.', 3, 'vocabulary', 18, now(), now()),

-- Lección 4
('lesson-es-pt-004', 'course-es-pt-001', 'Minha Família', 'Familia y relaciones en la cultura lusófona.', 'Família: pai, mãe, filho/filha, irmão/irmã. Possessivos: meu, minha, meus, minhas. Estrutura familiar no Brasil e Portugal.', 4, 'vocabulary', 16, now(), now()),

-- Lección 5
('lesson-es-pt-005', 'course-es-pt-001', 'No Restaurante', 'Gastronomía lusófona: comida brasileña y portuguesa.', 'Comida: feijoada, pastéis de nata, açaí, bacalhau. Frases: "Eu gostaria de...", "A conta, por favor". Cultura gastronômica.', 5, 'conversation', 20, now(), now()),

-- Lección 6
('lesson-es-pt-006', 'course-es-pt-001', 'Ser e Estar', 'Diferencias entre ser y estar en portugués vs español.', 'Ser: eu sou, tu és, ele/ela é... Estar: eu estou, tu estás... Usos específicos diferentes del español.', 6, 'grammar', 23, now(), now()),

-- Lección 7
('lesson-es-pt-007', 'course-es-pt-001', 'Na Cidade', 'Navegación urbana en ciudades lusófonas.', 'Lugares: estação, praça, museu, igreja. Direções: à direita, à esquerda, em frente. Transporte público no Brasil.', 7, 'vocabulary', 17, now(), now()),

-- Lección 8
('lesson-es-pt-008', 'course-es-pt-001', 'Cores e Roupas', 'Colores, ropa y estilo brasileño/portugués.', 'Cores: vermelho, azul, verde, amarelo... Roupas: camisa, calça, sapatos, vestido. Moda brasileira e portuguesa.', 8, 'vocabulary', 15, now(), now()),

-- Lección 9
('lesson-es-pt-009', 'course-es-pt-001', 'Tempo Livre', 'Ocio y entretenimiento en el mundo lusófono.', 'Atividades: ler, cozinhar, viajar. Esportes: futebol, vôlei, surf. "Eu gosto de..." Cultura do lazer no Brasil.', 9, 'conversation', 18, now(), now()),

-- Lección 10
('lesson-es-pt-010', 'course-es-pt-001', 'Fazendo Compras', 'Compras en Brasil y Portugal.', 'Shopping: loja, mercado, preço, desconto. Frases: "Quanto custa?", "Está muito caro". Cultura comercial lusófona.', 10, 'conversation', 19, now(), now()),

-- Lección 11
('lesson-es-pt-011', 'course-es-pt-001', 'Pretérito Perfeito', 'Tiempo pasado en portugués.', 'Formação: verbos regulares e irregulares. Exemplos: "Eu comi", "Eu fui". Diferenças com o espanhol no uso dos tempos.', 11, 'grammar', 25, now(), now()),

-- Lección 12
('lesson-es-pt-012', 'course-es-pt-001', 'Estações e Clima', 'Estaciones y clima en Brasil y Portugal.', 'Estações: primavera, verão, outono, inverno. Tempo: sol, chuva, neve (raro), vento. Diversidade climática do Brasil.', 12, 'vocabulary', 15, now(), now()),

-- Lección 13
('lesson-es-pt-013', 'course-es-pt-001', 'Viajando', 'Viajar por el mundo lusófono.', 'Transporte: trem, ônibus, avião, carro. Hotel: reserva, quarto, café da manhã. Turismo no Brasil e Portugal.', 13, 'conversation', 21, now(), now()),

-- Lección 14
('lesson-es-pt-014', 'course-es-pt-001', 'Cultura Lusófona', 'Cultura brasileña, portuguesa y de países lusófonos.', 'Cultura: música (samba, fado), literatura, cinema. Países lusófonos: Brasil, Portugal, Angola, Moçambique...', 14, 'culture', 19, now(), now()),

-- Lección 15
('lesson-es-pt-015', 'course-es-pt-001', 'Futuro', 'Tiempo futuro y planes en portugués.', 'Futuro simples: eu irei, tu irás... Expressões: "Amanhã eu vou...", "Na próxima semana...". Planos e aspirações.', 15, 'grammar', 24, now(), now()),

-- Lección 16
('lesson-es-pt-016', 'course-es-pt-001', 'No Trabalho', 'Mundo laboral en países lusófonos.', 'Profissões: médico, professor, engenheiro, cozinheiro. Frases: "Qual é sua profissão?", "Eu trabalho em...".', 16, 'vocabulary', 17, now(), now()),

-- Lección 17
('lesson-es-pt-017', 'course-es-pt-001', 'Saúde', 'Salud y sistema médico lusófono.', 'Corpo: cabeça, braço, perna, estômago. Saúde: médico, hospital, farmácia. Sistema de saúde brasileiro.', 17, 'vocabulary', 18, now(), now()),

-- Lección 18
('lesson-es-pt-018', 'course-es-pt-001', 'Conversação Final', 'Conversación avanzada y síntesis del aprendizaje.', 'Conversação livre integrando todos os tópicos. Situações reais: apresentações, debates, storytelling em português.', 18, 'practice', 28, now(), now());