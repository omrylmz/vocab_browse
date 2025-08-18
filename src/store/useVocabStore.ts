import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORDS } from '~/data/words';
import type { Word, PosTag, Cefr } from '~/types';

type SortMode = 'freq' | 'alpha';
type Status = 'none' | 'learning' | 'learned';

interface VocabState {
    words: Word[];

    search: string;
    posFilters: Set<PosTag>;
    levelFilters: Set<Cefr>;
    sort: SortMode;

    learningIds: Set<string>;
    learnedIds: Set<string>;

    setSearch: (s: string) => void;
    togglePos: (p: PosTag) => void;
    toggleLevel: (l: Cefr) => void;
    clearFilters: () => void;
    setSort: (m: SortMode) => void;

    statusOf: (id: string) => Status;
    addLearning: (id: string) => void;
    removeLearning: (id: string) => void;
    addLearned: (id: string) => void;
    removeLearned: (id: string) => void;
    toggleLearning: (id: string) => void;
    toggleLearned: (id: string) => void;

    bulkAddFilteredToLearning: (ids: string[]) => void;
    markAllFilteredLearned: (ids: string[]) => void;
    resetAll: () => void;
}

const serializeSet = <T,>(s: Set<T>) => Array.from(s);
const deserializeSet = <T,>(a: T[]) => new Set(a);

export const useVocabStore = create<VocabState>()(
    persist(
        (set, get) => ({
            words: WORDS,

            search: '',
            posFilters: new Set(),
            levelFilters: new Set(),
            sort: 'freq',

            learningIds: new Set(),
            learnedIds: new Set(),

            setSearch: (s) => set({ search: s }),
            togglePos: (p) => {
                const next = new Set(get().posFilters);
                next.has(p) ? next.delete(p) : next.add(p);
                set({ posFilters: next });
            },
            toggleLevel: (l) => {
                const next = new Set(get().levelFilters);
                next.has(l) ? next.delete(l) : next.add(l);
                set({ levelFilters: next });
            },
            clearFilters: () => set({ posFilters: new Set(), levelFilters: new Set(), search: '' }),
            setSort: (m) => set({ sort: m }),

            statusOf: (id) => {
                const { learningIds, learnedIds } = get();
                if (learnedIds.has(id)) return 'learned';
                if (learningIds.has(id)) return 'learning';
                return 'none';
            },
            addLearning: (id) =>
                set((st) => ({
                    learningIds: new Set(st.learningIds).add(id),
                    learnedIds: (() => {
                        const n = new Set(st.learnedIds);
                        n.delete(id);
                        return n;
                    })(),
                })),
            removeLearning: (id) =>
                set((st) => {
                    const next = new Set(st.learningIds);
                    next.delete(id);
                    return { learningIds: next };
                }),
            addLearned: (id) =>
                set((st) => ({
                    learnedIds: new Set(st.learnedIds).add(id),
                    learningIds: (() => {
                        const n = new Set(st.learningIds);
                        n.delete(id);
                        return n;
                    })(),
                })),
            removeLearned: (id) =>
                set((st) => {
                    const next = new Set(st.learnedIds);
                    next.delete(id);
                    return { learnedIds: next };
                }),
            toggleLearning: (id) => {
                const status = get().statusOf(id);
                if (status === 'learning') get().removeLearning(id);
                else get().addLearning(id);
            },
            toggleLearned: (id) => {
                const status = get().statusOf(id);
                if (status === 'learned') get().removeLearned(id);
                else get().addLearned(id);
            },

            bulkAddFilteredToLearning: (ids) => {
                const add = new Set(get().learningIds);
                ids.forEach((id) => {
                    add.add(id);
                    // remove from learned if present
                    get().learnedIds.delete(id);
                });
                set({ learningIds: add, learnedIds: new Set(get().learnedIds) });
            },

            markAllFilteredLearned: (ids) => {
                const add = new Set(get().learnedIds);
                ids.forEach((id) => {
                    add.add(id);
                    get().learningIds.delete(id);
                });
                set({ learnedIds: add, learningIds: new Set(get().learningIds) });
            },

            resetAll: () => set({
                learningIds: new Set(),
                learnedIds: new Set(),
            }),
        }),
        {
            name: 'vocab-store',
            storage: createJSONStorage(() => AsyncStorage),
            // Serialize Sets since AsyncStorage stores JSON
            partialize: (state) => ({
                search: state.search,
                posFilters: serializeSet(state.posFilters),
                levelFilters: serializeSet(state.levelFilters),
                sort: state.sort,
                learningIds: serializeSet(state.learningIds),
                learnedIds: serializeSet(state.learnedIds),
                words: state.words,
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                // turn arrays back into Sets
                // @ts-expect-error - runtime patch
                if (Array.isArray(state.posFilters)) state.posFilters = deserializeSet(state.posFilters);
                // @ts-expect-error
                if (Array.isArray(state.levelFilters)) state.levelFilters = deserializeSet(state.levelFilters);
                // @ts-expect-error
                if (Array.isArray(state.learningIds)) state.learningIds = deserializeSet(state.learningIds);
                // @ts-expect-error
                if (Array.isArray(state.learnedIds)) state.learnedIds = deserializeSet(state.learnedIds);
            },
        }
    )
);
