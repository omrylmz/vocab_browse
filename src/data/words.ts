import { Word } from '~/types';

// A small, mixed set to demo sorting/filtering.
// frequency: lower = more frequent (for demo purposes only)
export const WORDS: Word[] = [
    { id: 'sein', term: 'sein', pos: 'verb', level: 'A1', frequency: 5, translation: 'to be', example: { de: 'Ich will sein, wer ich bin.', en: 'I want to be who I am.' }},
    { id: 'haben', term: 'haben', pos: 'verb', level: 'A1', frequency: 8, translation: 'to have', example: { de: 'Wir haben Zeit.', en: 'We have time.' }},
    { id: 'System', term: 'das System', gender: 'das', pos: 'noun', level: 'B1', frequency: 350, translation: 'system', example: { de: 'Das System ist komplex.', en: 'The system is complex.' }},
    { id: 'Haus', term: 'das Haus', gender: 'das', pos: 'noun', level: 'A1', frequency: 40, translation: 'house', example: { de: 'Das Haus ist groß.', en: 'The house is big.' }},
    { id: 'gehen', term: 'gehen', pos: 'verb', level: 'A1', frequency: 20, translation: 'to go', example: { de: 'Wir gehen nach Hause.', en: 'We are going home.' }},
    { id: 'kommen', term: 'kommen', pos: 'verb', level: 'A1', frequency: 22, translation: 'to come', example: { de: 'Kommst du mit?', en: 'Are you coming?' }},
    { id: 'Tag', term: 'der Tag', gender: 'der', pos: 'noun', level: 'A1', frequency: 15, translation: 'day', example: { de: 'Der Tag ist schön.', en: 'The day is nice.' }},
    { id: 'eben', term: 'eben', pos: 'adv', level: 'B1', frequency: 410, translation: 'just / exactly', example: { de: 'Das ist eben so.', en: 'That’s just how it is.' }},
    { id: 'machen', term: 'machen', pos: 'verb', level: 'A1', frequency: 18, translation: 'to do / make', example: { de: 'Was machst du?', en: 'What are you doing?' }},
    { id: 'sprechen', term: 'sprechen', pos: 'verb', level: 'A2', frequency: 55, translation: 'to speak', example: { de: 'Er spricht Deutsch.', en: 'He speaks German.' }},
    { id: 'neu', term: 'neu', pos: 'adj', level: 'A2', frequency: 120, translation: 'new', example: { de: 'Das ist neu.', en: 'That is new.' }},
    { id: 'alt', term: 'alt', pos: 'adj', level: 'A1', frequency: 130, translation: 'old', example: { de: 'Das Buch ist alt.', en: 'The book is old.' }},
    { id: 'weil', term: 'weil', pos: 'conj', level: 'A2', frequency: 70, translation: 'because', example: { de: 'Ich bleibe, weil es regnet.', en: 'I’m staying because it’s raining.' }},
    { id: 'unter', term: 'unter', pos: 'prep', level: 'A2', frequency: 90, translation: 'under / among', example: { de: 'Unter dem Tisch.', en: 'Under the table.' }},
    { id: 'wir', term: 'wir', pos: 'pron', level: 'A1', frequency: 14, translation: 'we', example: { de: 'Wir lernen Deutsch.', en: 'We learn German.' }},
    { id: 'und', term: 'und', pos: 'conj', level: 'A1', frequency: 1, translation: 'and', example: { de: 'Du und ich.', en: 'You and I.' }},
    { id: 'aber', term: 'aber', pos: 'conj', level: 'A1', frequency: 9, translation: 'but', example: { de: 'Ja, aber...', en: 'Yes, but...' }},
    { id: 'schreiben', term: 'schreiben', pos: 'verb', level: 'A2', frequency: 80, translation: 'to write', example: { de: 'Sie schreibt einen Brief.', en: 'She writes a letter.' }},
    { id: 'Zeit', term: 'die Zeit', gender: 'die', pos: 'noun', level: 'A2', frequency: 75, translation: 'time', example: { de: 'Hast du Zeit?', en: 'Do you have time?' }},
    { id: 'Wasser', term: 'das Wasser', gender: 'das', pos: 'noun', level: 'A1', frequency: 65, translation: 'water', example: { de: 'Ich trinke Wasser.', en: 'I drink water.' }},
    // …(add more; this is enough to exercise features)
];
