import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '~/theme';

type Props = {
    value: string;
    onChangeText: (s: string) => void;
    placeholder?: string;
    testID?: string;
};

export default function SearchBar({ value, onChangeText, placeholder = 'Search words…', testID }: Props) {
    return (
        <View style={styles.wrap}>
            <TextInput
                testID={testID}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.dim}
                style={styles.input}
                clearButtonMode="while-editing"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
    },
    input: {
        color: theme.colors.text,
        fontSize: 16,
    },
});