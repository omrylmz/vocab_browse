import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '~/components/SearchBar';
import FilterChips from '~/components/FilterChips';
import WordCard from '~/components/WordCard';
import { useVocabStore } from '~/store/useVocabStore';
import { theme } from '~/theme';
import type { PosTag, Cefr } from '~/types';
import { useNavigation } from '@react-navigation/native';

const POS: { id: PosTag; label: string }[] = [
    { id: 'noun', label: 'Noun' },
    { id: 'verb', label: 'Verb' },
    { id: 'adj',  label: 'Adjective' },
    { id: 'adv',  label: 'Adverb' },
    { id: 'prep', label: 'Preposition' },
    { id: 'pron', label: 'Pronoun' },
    { id: 'conj', label: 'Conjunction' },
];

const LEVELS: { id: Cefr; label: string }[] = [
    { id: 'A1', label: 'A1' },
    { id: 'A2', label: 'A2' },
    { id: 'B1', label: 'B1' },
];

export default function BrowseScreen() {
    const nav = useNavigation<any>();
    const search = useVocabStore((s) => s.search);
    const setSearch = useVocabStore((s) => s.setSearch);
    const posFilters = useVocabStore((s) => s.posFilters);
    const levelFilters = useVocabStore((s) => s.levelFilters);
    const togglePos = useVocabStore((s) => s.togglePos);
    const toggleLevel = useVocabStore((s) => s.toggleLevel);
    const clearFilters = useVocabStore((s) => s.clearFilters);
    const sort = useVocabStore((s) => s.sort);
    const setSort = useVocabStore((s) => s.setSort);
    const words = useVocabStore((s) => s.words);
    const bulkAdd = useVocabStore((s) => s.bulkAddFilteredToLearning);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let out = words.filter((w) => {
            const posOk = posFilters.size ? posFilters.has(w.pos) : true;
            const levelOk = levelFilters.size ? levelFilters.has(w.level) : true;
            const searchOk =
                q.length === 0 ||
                w.term.toLowerCase().includes(q) ||
                w.translation.toLowerCase().includes(q) ||
                w.example.de.toLowerCase().includes(q);
            return posOk && levelOk && searchOk;
        });
        if (sort === 'freq') out = out.sort((a, b) => a.frequency - b.frequency || a.term.localeCompare(b.term));
        else out = out.sort((a, b) => a.term.localeCompare(b.term));
        return out;
    }, [words, search, posFilters, levelFilters, sort]);

    const filteredIds = filtered.map(w => w.id);

    return (
        <View style={styles.screen}>
            <Text style={styles.h1}>Browse</Text>
            <SearchBar value={search} onChangeText={setSearch} placeholder="Search German words, meanings, or examples…" />

            <FilterChips
                title="Word class"
                chips={POS.map((p) => ({ id: p.id, label: p.label, active: posFilters.has(p.id), onPress: () => togglePos(p.id) }))}
            />
            <FilterChips
                title="CEFR"
                chips={LEVELS.map((l) => ({ id: l.id, label: l.label, active: levelFilters.has(l.id), onPress: () => toggleLevel(l.id) }))}
            />

            <View style={styles.toolbar}>
                <Text style={styles.count}>{filtered.length} results</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Segmented
                        options={[{ id: 'freq', label: 'Frequency' }, { id: 'alpha', label: 'A–Z' }]}
                        value={sort}
                        onChange={(v) => setSort(v as any)}
                    />
                    <TouchableOpacity
                        onPress={clearFilters}
                        style={styles.clearBtn}
                        accessibilityLabel="Clear filters"
                    >
                        <Text style={styles.clearTxt}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bulkRow}>
                <TouchableOpacity
                    onPress={() => bulkAdd(filteredIds)}
                    accessibilityLabel="Add all filtered to Learning"
                    style={styles.bulkBtn}
                >
                    <Text style={styles.bulkTxt}>Add all to Learning</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filtered}
                contentContainerStyle={{ gap: 10, paddingBottom: 24 }}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                    <WordCard
                        item={item}
                        onPress={() => nav.navigate('WordDetail', { id: item.id })}
                    />
                )}
            />
        </View>
    );
}

function Segmented({
                       options,
                       value,
                       onChange,
                   }: {
    options: { id: string; label: string }[];
    value: string;
    onChange: (id: string) => void;
}) {
    return (
        <View style={styles.segWrap}>
            {options.map((o) => {
                const active = o.id === value;
                return (
                    <TouchableOpacity key={o.id} onPress={() => onChange(o.id)} style={[styles.seg, active && styles.segActive]}>
                        <Text style={[styles.segTxt, active && styles.segTxtActive]}>{o.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
    h1: { color: theme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: 12 },
    toolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    count: { color: theme.colors.dim },
    clearBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: theme.colors.border },
    clearTxt: { color: theme.colors.dim, fontSize: 12 },
    segWrap: {
        flexDirection: 'row', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden'
    },
    seg: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: theme.colors.bg },
    segActive: { backgroundColor: theme.colors.card },
    segTxt: { color: theme.colors.dim, fontSize: 12 },
    segTxtActive: { color: theme.colors.text, fontWeight: '600' },
    bulkRow: { marginBottom: 10, marginTop: 2 },
    bulkBtn: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.accent + '22',
        borderWidth: 1,
        borderColor: theme.colors.accent,
        paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10,
    },
    bulkTxt: { color: theme.colors.accent, fontWeight: '600' },
});
