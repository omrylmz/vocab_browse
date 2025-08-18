import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '~/theme';
import type { Word } from '~/types';
import { useVocabStore } from '~/store/useVocabStore';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    item: Word;
    onPress?: () => void;
};

export default function WordCard({ item, onPress }: Props) {
    const status = useVocabStore((s) => s.statusOf(item.id));
    const toggleLearning = useVocabStore((s) => s.toggleLearning);
    const toggleLearned = useVocabStore((s) => s.toggleLearned);

    const levelColor: Record<string, string> = { A1: theme.colors.good, A2: theme.colors.warn, B1: theme.colors.accentAlt };

    return (
        <TouchableOpacity onPress={onPress} style={styles.card} testID={`word-${item.id}`}>
            <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                    <Text style={styles.term}>{item.term}</Text>
                    <Text style={[styles.level, { color: levelColor[item.level] }]}>{item.level}</Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={styles.meta}>{item.pos.toUpperCase()}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.meta}>Freq {item.frequency}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.meta}>{item.translation}</Text>
                </View>
                <Text numberOfLines={1} style={styles.example}>"{item.example.de}"</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    accessibilityLabel="Toggle Learning"
                    onPress={() => toggleLearning(item.id)}
                    style={[styles.iconBtn, status === 'learning' && styles.iconBtnActive]}
                >
                    <MaterialIcons name="bookmark-add" size={22} color={status === 'learning' ? theme.colors.accent : theme.colors.dim} />
                </TouchableOpacity>

                <TouchableOpacity
                    accessibilityLabel="Toggle Learned"
                    onPress={() => toggleLearned(item.id)}
                    style={[styles.iconBtn, status === 'learned' && styles.iconBtnActive]}
                >
                    <MaterialIcons name="check-circle" size={22} color={status === 'learned' ? theme.colors.good : theme.colors.dim} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    term: { color: theme.colors.text, fontSize: 18, fontWeight: '600' },
    level: { fontWeight: '700' },
    metaRow: { flexDirection: 'row', gap: 6, marginTop: 2, alignItems: 'center' },
    meta: { color: theme.colors.dim, fontSize: 12 },
    dot: { color: theme.colors.dim, fontSize: 12 },
    example: { color: theme.colors.dim, marginTop: 6, fontStyle: 'italic' },
    actions: { flexDirection: 'row', gap: 8 },
    iconBtn: {
        borderWidth: 1, borderColor: theme.colors.border,
        padding: 8, borderRadius: theme.radius.md, backgroundColor: theme.colors.bg,
    },
    iconBtnActive: { borderColor: theme.colors.accent },
});
