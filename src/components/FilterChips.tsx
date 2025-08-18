import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '~/theme';

type Chip = { id: string; label: string; active: boolean; onPress: () => void };

export default function FilterChips({ chips, title }: { chips: Chip[]; title?: string }) {
    return (
        <View style={{ marginBottom: 8 }}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                {chips.map((c) => (
                    <TouchableOpacity
                        key={c.id}
                        onPress={c.onPress}
                        accessibilityRole="button"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        style={[styles.chip, c.active && styles.chipActive]}
                    >
                        <Text style={[styles.chipText, c.active && styles.chipTextActive]}>{c.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: { color: theme.colors.dim, marginBottom: 4, fontSize: 12 },
    row: { gap: 8 },
    chip: {
        borderRadius: theme.radius.md,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.bg,
    },
    chipActive: {
        backgroundColor: theme.colors.accent + '33',
        borderColor: theme.colors.accent,
    },
    chipText: { color: theme.colors.text, fontSize: 14 },
    chipTextActive: { color: theme.colors.accent },
});
