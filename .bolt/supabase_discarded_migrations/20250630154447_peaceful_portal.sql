/*
  # Insert sample blog posts

  This migration adds three sample blog posts to demonstrate the blog functionality.
  These posts are in English and cover language learning topics.
*/

-- First, we need to ensure we have a user to assign as author
-- We'll use the first user from the profiles table, or create a sample one if none exists

DO $$
DECLARE
    sample_author_id uuid;
BEGIN
    -- Try to get an existing user
    SELECT id INTO sample_author_id FROM profiles LIMIT 1;
    
    -- If no users exist, we'll create a sample author profile
    -- Note: In a real scenario, you'd want to use an actual user ID
    IF sample_author_id IS NULL THEN
        -- Create a sample user in auth.users first (this would normally be done through Supabase Auth)
        -- For this example, we'll just use a placeholder UUID
        sample_author_id := gen_random_uuid();
        
        -- Insert a sample profile (you may need to adjust this based on your actual user setup)
        INSERT INTO profiles (id, username, full_name, email, initial_language)
        VALUES (
            sample_author_id,
            'admin',
            'Dialectio Team',
            'admin@dialectio.xyz',
            'en'
        );
    END IF;

    -- Insert sample blog posts
    INSERT INTO blog_posts (
        title,
        slug,
        author_id,
        content,
        excerpt,
        image_url,
        published_at,
        is_published
    ) VALUES
    (
        'The Science Behind Learning Romance Languages',
        'science-behind-learning-romance-languages',
        sample_author_id,
        'Learning Romance languages like Spanish, French, Italian, and Portuguese can be incredibly rewarding, but what does science tell us about the most effective methods?

Recent research in cognitive linguistics has revealed fascinating insights about how our brains process related languages. When you already know one Romance language, your brain creates neural pathways that make learning others significantly easier.

## The Cognitive Advantage

Studies show that speakers of one Romance language can recognize up to 60% of vocabulary in related languages without any formal training. This phenomenon, called "linguistic transfer," is the foundation of our teaching methodology at Dialectio.

## Memory and Pattern Recognition

Neuroscientists have discovered that the brain stores language patterns in interconnected networks. When learning a new Romance language, these existing networks activate, creating what researchers call "positive transfer." This means your Spanish knowledge actually accelerates your French learning!

## The Role of Cognates

Cognates - words that share common origins - are your secret weapon. Words like "hospital" (Spanish), "hôpital" (French), "ospedale" (Italian), and "hospital" (Portuguese) all stem from the same Latin root. Recognizing these patterns dramatically reduces the vocabulary burden.

## Practical Applications

Our research-backed approach focuses on:
- Highlighting linguistic similarities
- Building on existing knowledge
- Using comparative exercises
- Emphasizing pattern recognition

The result? Students typically achieve conversational fluency 40% faster than traditional methods.

Ready to experience the science of accelerated language learning? Start your journey with Dialectio today!',
        'Discover how cognitive science and linguistics research can accelerate your Romance language learning journey. Learn why knowing one Romance language makes others easier to master.',
        'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        NOW() - INTERVAL '7 days',
        true
    ),
    (
        'From Spanish to Italian: A Learner''s Journey',
        'from-spanish-to-italian-learners-journey',
        sample_author_id,
        'Six months ago, I spoke only Spanish and English. Today, I''m having conversations in Italian, and the journey has been nothing short of amazing. Here''s how I did it using the Dialectio method.

## Starting Point: Spanish Fluency

As a native Spanish speaker, I thought learning Italian would be straightforward. I was both right and wrong. While the similarities helped enormously, I also discovered unexpected challenges that traditional courses don''t prepare you for.

## Week 1-2: The Honeymoon Phase

The first two weeks felt like magic. I could understand about 70% of written Italian immediately. Words like "casa" (house), "agua/acqua" (water), and "tiempo/tempo" (time) were practically identical. I felt like a language genius!

## Week 3-4: The Reality Check

Then came the false friends - words that look similar but mean different things. "Rato" means "a while" in Spanish but "rat" in Italian. "Salada" means "salty" in Spanish but "salad" in Italian. These tricky differences humbled me quickly.

## Month 2: Finding My Rhythm

This is where Dialectio''s comparative approach really shone. Instead of treating Italian as a completely new language, the platform showed me systematic patterns:

- Spanish "ción" becomes Italian "zione" (nación → nazione)
- Spanish "dad" becomes Italian "tà" (ciudad → città)
- Spanish "ue" often becomes Italian "uo" (fuego → fuoco)

## Month 3-4: Conversation Breakthrough

By month three, I was ready for conversations. The AI tutor feature was incredible - it understood my Spanish-influenced mistakes and corrected them naturally. Instead of saying "Io sono molto contento" (Spanish structure), I learned to say "Sono molto contento" (Italian structure).

## Month 5-6: Cultural Immersion

The final phase involved diving into Italian culture through the platform''s cultural lessons. Learning about Italian gestures, regional differences, and social customs made my conversations more natural and authentic.

## Key Lessons Learned

1. **Embrace the similarities** - They''re your foundation
2. **Watch out for false friends** - They''re trickier than completely new words
3. **Practice pronunciation daily** - Italian rhythm is different from Spanish
4. **Use your Spanish strategically** - Don''t fight it, leverage it
5. **Be patient with grammar** - Some structures are surprisingly different

## Results

Today, I can:
- Hold 30-minute conversations in Italian
- Read Italian news articles with 90% comprehension
- Watch Italian movies with subtitles
- Write emails and messages confidently

The journey from Spanish to Italian taught me that language learning isn''t just about memorizing words - it''s about understanding patterns, embracing similarities, and celebrating differences.

If you''re a Spanish speaker considering Italian, or any Romance language learner looking to expand, I can''t recommend the Dialectio approach enough. It turns your existing knowledge into a superpower!',
        'Follow one learner''s six-month journey from Spanish fluency to Italian conversation. Discover the challenges, breakthroughs, and strategies that made the difference.',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
        NOW() - INTERVAL '3 days',
        true
    ),
    (
        '5 Common Mistakes When Learning Multiple Romance Languages',
        'common-mistakes-learning-multiple-romance-languages',
        sample_author_id,
        'Learning multiple Romance languages simultaneously can be incredibly rewarding, but it''s also full of potential pitfalls. After teaching thousands of students, we''ve identified the five most common mistakes - and how to avoid them.

## Mistake #1: Mixing Up Similar Words (Language Interference)

**The Problem:** Students often confuse similar words between languages. Saying "Je suis muy contento" (mixing French and Spanish) or "Io sono molto content" (mixing Italian and English).

**The Solution:** Create clear mental compartments for each language. Practice "language switching" exercises where you consciously transition between languages. Use visual cues or physical movements to signal language changes.

**Dialectio Tip:** Our platform uses color-coding and distinct visual themes for each language to help your brain maintain separation.

## Mistake #2: Assuming Everything Transfers Directly

**The Problem:** Just because "hospital" exists in all Romance languages doesn''t mean all words transfer. Students often assume grammar rules transfer directly too.

**The Solution:** Learn to identify what transfers and what doesn''t. Create comparison charts for:
- Verb conjugations
- Gendered nouns
- Sentence structure
- Pronunciation rules

**Example:** Spanish "estar" vs. French "être" vs. Italian "essere" - all mean "to be" but have completely different conjugation patterns.

## Mistake #3: Neglecting Pronunciation Differences

**The Problem:** Students focus so much on vocabulary similarities that they ignore crucial pronunciation differences. This leads to speaking Spanish with French pronunciation or Italian with Portuguese rhythm.

**The Solution:** Dedicate specific time to pronunciation practice for each language. Record yourself speaking and compare with native speakers. Pay attention to:
- Vowel sounds
- Rhythm and stress patterns
- Consonant differences
- Intonation

## Mistake #4: Learning Too Many Languages at Once

**The Problem:** Enthusiasm leads students to start Spanish, French, and Italian simultaneously. This creates confusion and slows progress in all languages.

**The Solution:** Follow the "1+1" rule - master one Romance language before adding another, or focus on one primary language while maintaining a secondary one. 

**Recommended Progression:**
1. Achieve B2 level in your first Romance language
2. Add a second language while maintaining the first
3. Reach B1 in the second before considering a third

## Mistake #5: Ignoring Cultural Context

**The Problem:** Students learn vocabulary and grammar but ignore cultural nuances. This leads to technically correct but culturally inappropriate communication.

**The Solution:** Study culture alongside language. Learn about:
- Formal vs. informal address systems
- Regional variations
- Cultural gestures and body language
- Social customs and etiquette

**Example:** The Spanish "tú" vs. "usted" distinction works differently than the French "tu" vs. "vous" system, even though they seem similar.

## The Dialectio Advantage

Our platform is specifically designed to help you avoid these common mistakes:

- **Smart Comparison Tools:** Side-by-side grammar and vocabulary comparisons
- **Interference Detection:** AI that identifies when you''re mixing languages
- **Progressive Learning:** Structured pathways that build on your existing knowledge
- **Cultural Integration:** Lessons that combine language with cultural context
- **Pronunciation Training:** Advanced speech recognition for each language

## Success Strategies

1. **Set Clear Goals:** Define what "fluent" means for each language
2. **Create Separate Study Spaces:** Use different locations or times for different languages
3. **Practice Code-Switching:** Deliberately practice switching between languages
4. **Use Native Content:** Consume media in each target language
5. **Find Language Partners:** Practice with native speakers of each language

## Final Thoughts

Learning multiple Romance languages is like conducting an orchestra - each language is an instrument that contributes to a beautiful symphony. The key is learning to play each instrument well individually before attempting to conduct them all together.

Remember: mistakes are part of the learning process. The goal isn''t to avoid all errors but to learn from them and develop strategies to minimize interference while maximizing the benefits of linguistic transfer.

Ready to master multiple Romance languages without the common pitfalls? Join thousands of successful learners on Dialectio and turn your language learning dreams into reality!',
        'Avoid the most common pitfalls when learning multiple Romance languages. Learn from the mistakes of thousands of students and discover proven strategies for success.',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        NOW() - INTERVAL '1 day',
        true
    );

END $$;