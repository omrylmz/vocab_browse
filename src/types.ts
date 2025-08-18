export type PosTag = 'noun' | 'verb' | 'adj' | 'adv' | 'prep' | 'pron' | 'num' | 'conj' | 'det' | 'part';
export type Cefr = 'A1' | 'A2' | 'B1';

export interface Word {
    id: string;
    term: string;
    pos: PosTag;
    gender?: 'der' | 'die' | 'das';
    level: Cefr;
    frequency: number; // lower = more frequent
    translation: string;
    example: { de: string; en: string };
}
