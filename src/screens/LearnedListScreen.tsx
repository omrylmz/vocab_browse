import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useVocabStore } from '~/store/useVocabStore';
import WordCard from '~/components/WordCard';
import { theme } from '~/theme';
import { useNavigation } from '@react-navigation/native';

export default function LearnedListScreen() {
    const nav = useNavigation<any>();
    const ids = useVocabStore((s) => s.learnedIds);
    const words = useVocabStore((s) => s.words);
    const list = useMemo(() => words.filter(w => ids.has(w.id)), [words, ids]);

    return (
        <View style={styles.screen}>
            <Text style={styles.h1}>Learned</Text>
            <Text style={styles.meta}>{list.length} words</Text>
            <FlatList
                data={list}
                contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 24 }}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                    <WordCard item={item} onPress={() => nav.navigate('WordDetail', { id: item.id })} />
                )}
                ListEmptyComponent={<Text style={styles.meta}>Mark words as learned from Browse or Learning.</Text>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
    h1: { color: theme.colors.text, fontSize: 28, fontWeight: '700' },
    meta: { color: theme.colors.dim, marginTop: 4 },
});
