import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
    title: string;
    onBackPress?: () => void; // Acción personalizada opcional para el botón de atrás
};

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
    const navigation = useNavigation();

    // Función que maneja el botón de atrás
    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress(); // Si hay una acción personalizada, la ejecuta
        } else {
            navigation.goBack(); // Si no, usa la navegación predeterminada
        }
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text>{"<-"}</Text>
            </TouchableOpacity>
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
