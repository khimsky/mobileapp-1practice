import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    useWindowDimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

export default function App() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const [num1, setNum1] = useState<string>('');
    const [num2, setNum2] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleSum = () => {
        const a = parseFloat(num1.replace(',', '.'));
        const b = parseFloat(num2.replace(',', '.'));
        if (isNaN(a) || isNaN(b)) {
            alert('Введите корректные числа');
            return;
        }
        setResult(Number((a + b)));
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={[styles.container, isLandscape ? styles.containerLandscape : {}]}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* Левая — картинка */}
                    <View style={[styles.left, isLandscape ? styles.leftLandscape : styles.leftPortrait]}>
                        <Image
                            source={require('../assets/fixedgear.jpg')}
                            style={[styles.image, isLandscape ? styles.imageLandscape : styles.imagePortrait]}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Правая — инпуты и кнопка */}
                    <View style={[styles.right, isLandscape ? styles.rightLandscape : styles.rightPortrait]}>
                        <Text style={styles.title}>Калькулятор</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Первое число"
                            placeholderTextColor="#999"
                            keyboardType="decimal-pad"
                            value={num1}
                            onChangeText={setNum1}
                            returnKeyType="next"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Второе число"
                            placeholderTextColor="#999"
                            keyboardType="decimal-pad"
                            value={num2}
                            onChangeText={setNum2}
                            returnKeyType="done"
                            onSubmitEditing={handleSum}
                        />

                        <View style={styles.buttonWrap}>
                            <Button title="Сложить" onPress={handleSum} />
                        </View>

                        {result !== null && <Text style={styles.result}>Результат: {result}</Text>}

                        {/* Отладочная строка, можно убрать */}
                        <Text style={styles.debug}>w:{Math.round(width)} h:{Math.round(height)} {isLandscape ? 'landscape' : 'portrait'}</Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        // НЕ ставь alignItems:'center' на родителе, если хочешь row-раскладку корректно
    },
    containerLandscape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    /* левая часть (картинка) */
    left: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftPortrait: {
        marginBottom: 12,
    },
    leftLandscape: {
        width: '40%',
    },

    image: {
        borderRadius: 10,
        backgroundColor: '#eee',
    },
    imagePortrait: {
        width: 220,
        height: 220,
    },
    imageLandscape: {
        width: 180,
        height: 180,
    },

    /* правая часть (форма) */
    right: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightPortrait: {
        width: '100%',
    },
    rightLandscape: {
        width: '50%',
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#bbb',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        color: 'black',
    },
    buttonWrap: {
        width: '85%',
        marginTop: 8,
    },
    result: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: '600',
    },
    debug: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
    },
});
