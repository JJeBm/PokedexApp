import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
    title: string;
    onBackPress?: () => void;
    isIOS?: boolean
};

const Header: React.FC<HeaderProps> = ({ title, onBackPress, isIOS = false }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.headerContainer}>
            {isIOS ? <View style={styles.backButton} /> : <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text>{"<-"}</Text>
            </TouchableOpacity>}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.backButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 0,
        flex: .15,
    },
    title: {
        flex: .7,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Header;
