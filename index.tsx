import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    useWindowDimensions,
} from 'react-native';

export default function App() {
    const [num1, setNum1] = useState<string>('');
    const [num2, setNum2] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height; 


    const handleSum = () => {
        const a = parseFloat(num1.replace(',', '.'));
        const b = parseFloat(num2.replace(',', '.'));

        if (isNaN(a) || isNaN(b)) {
            alert('Введите корректные числа');
            return;
        }
        setResult(a + b);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[
                styles.container,
                isLandscape ? styles.landscape : styles.portrait,
            ]}>
                <Text style={styles.title}>Калькулятор</Text>

                {/* Локальная картинка */}
                <Image source={require('../assets/fixedgear.jpg')} style={styles.image} />

                <TextInput
                    style={styles.input}
                    placeholder="Первое число"
                    placeholderTextColor={'red'}
                    keyboardType="numeric"
                    value={num1}
                    onChangeText={setNum1}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Второе число"
                    placeholderTextColor={'red'}
                    keyboardType="numeric"
                    value={num2}
                    onChangeText={setNum2}
                />

                <Button title="Сложить" onPress={handleSum} />

                {result !== null && (
                    <Text style={styles.result}>Результат: {result}</Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        width: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 6,
        color: 'red',
    },
    result: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: '600',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    landscape: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});
