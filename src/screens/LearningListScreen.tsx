import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useVocabStore } from '~/store/useVocabStore';
import WordCard from '~/components/WordCard';
import { theme } from '~/theme';
import { useNavigation } from '@react-navigation/native';

export default function LearningListScreen() {
    const nav = useNavigation<any>();
    const ids = useVocabStore((s) => s.learningIds);
    const words = useVocabStore((s) => s.words);

    const list = useMemo(() => words.filter(w => ids.has(w.id)), [words, ids]);

    return (
        <View style={styles.screen}>
            <Text style={styles.h1}>Learning</Text>
            <Text style={styles.meta}>{list.length} words</Text>
            <FlatList
                data={list}
                contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 24 }}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                    <WordCard item={item} onPress={() => nav.navigate('WordDetail', { id: item.id })} />
                )}
                ListEmptyComponent={<Text style={styles.meta}>No words yet. Add from Browse.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
    h1: { color: theme.colors.text, fontSize: 28, fontWeight: '700' },
    meta: { color: theme.colors.dim, marginTop: 4 },
});
