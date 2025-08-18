import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useVocabStore } from '~/store/useVocabStore';
import { theme } from '~/theme';
import { MaterialIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'WordDetail'>;

export default function WordDetailScreen({ route, navigation }: Props) {
    const { id } = route.params as { id: string };
    const word = useVocabStore((s) => s.words.find(w => w.id === id));
    const status = useVocabStore((s) => s.statusOf(id));
    const toggleLearning = useVocabStore((s) => s.toggleLearning);
    const toggleLearned = useVocabStore((s) => s.toggleLearned);

    const levelColor: Record<string,string> = { A1: theme.colors.good, A2: theme.colors.warn, B1: theme.colors.accentAlt };

    if (!word) {
        return (
            <View style={styles.screen}>
                <Text style={styles.miss}>Word not found.</Text>
            </View>
        );
    }

    const title = useMemo(() => word.term, [word.term]);

    React.useLayoutEffect(() => {
        navigation.setOptions({ title });
    }, [navigation, title]);

    return (
        <View style={styles.screen}>
            <View style={styles.headerCard}>
                <Text style={styles.term}>{word.term}</Text>
                <View style={styles.row}>
                    <Text style={styles.meta}>{word.pos.toUpperCase()}</Text>
                    {word.gender ? (<Text style={styles.meta}>• {word.gender}</Text>) : null}
                    <Text style={[styles.meta, { color: levelColor[word.level] }]}>• {word.level}</Text>
                    <Text style={styles.meta}>• Freq {word.frequency}</Text>
                </View>
                <Text style={styles.translation}>{word.translation}</Text>

                <View style={styles.actionRow}>
                    <Action
                        label={status === 'learning' ? 'In Learning' : 'Add to Learning'}
                        icon="bookmark-add"
                        active={status === 'learning'}
                        onPress={() => toggleLearning(word.id)}
                    />
                    <Action
                        label={status === 'learned' ? 'Marked Learned' : 'Mark Learned'}
                        icon="check-circle"
                        active={status === 'learned'}
                        onPress={() => toggleLearned(word.id)}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.blockTitle}>Example</Text>
                <Text style={styles.de}>"{word.example.de}"</Text>
                <Text style={styles.en}>{word.example.en}</Text>
            </View>

            <Text style={styles.hint}>Tip: Long-press words in Browse to quickly change status.</Text>
        </View>
    );
}

function Action({ label, icon, active, onPress }:{
    label: string; icon: keyof typeof MaterialIcons.glyphMap; active?: boolean; onPress: () => void;
}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.actionBtn, active && styles.actionActive]}>
            <MaterialIcons name={icon} size={22} color={active ? theme.colors.accent : theme.colors.dim} />
            <Text style={[styles.actionTxt, active && styles.actionTxtActive]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16, gap: 12 },
    headerCard: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 16, gap: 6 },
    term: { color: theme.colors.text, fontSize: 26, fontWeight: '800' },
    row: { flexDirection: 'row', gap: 8 },
    meta: { color: theme.colors.dim },
    translation: { color: theme.colors.text, marginTop: 6, fontSize: 18, fontWeight: '600' },
    card: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 16, gap: 6 },
    blockTitle: { color: theme.colors.dim, fontWeight: '700', marginBottom: 4 },
    de: { color: theme.colors.text, fontStyle: 'italic' },
    en: { color: theme.colors.dim },
    actionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
    actionBtn: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', gap: 8, alignItems: 'center' },
    actionTxt: { color: theme.colors.dim, fontWeight: '600' },
    actionActive: { borderColor: theme.colors.accent + 'AA', backgroundColor: theme.colors.accent + '1A' },
    actionTxtActive: { color: theme.colors.accent },
    hint: { color: theme.colors.dim, fontSize: 12, textAlign: 'center', marginTop: 4 },
    miss: { color: theme.colors.text },
});
