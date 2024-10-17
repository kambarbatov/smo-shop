
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, Component } from 'react';


const productCard = ({ data, addQuantity, addekQuantity }) => {

    const { id, isim, fiyat, adet, uri } = data || {};
    const [ekleText, setEkleText] = useState("Ekle")


    // AsyncStorage ile sepet
    const addToCartd = async (data) => {
        // Eğer ürünün miktarı 0 ise sepete ekleme
        if (data.adet <= 0) {
            console.log('Ürün miktarı 0, sepete eklenmedi:', data);
            return; // Fonksiyondan çık
        }

        try {
            // AsyncStorage'dan mevcut sepeti al
            let cart = await AsyncStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];

            // Sepetteki ürünün indeksini kontrol et
            const index = cart.findIndex(cartItem => cartItem.id === data.id);

            if (index !== -1) {
                // Eğer ürün zaten varsa, miktarını arttır
                cart[index].quantity += 1;
            } else {
                // Ürün sepette yoksa, yeni ürün olarak ekle
                cart.push({ ...data, quantity: 1 });
            }

            // Sepeti AsyncStorage'a kaydet
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            console.log('Ürün sepete eklendi:', data);
            setEkleText("Sepete Eklendi")
        } catch (error) {
            console.error('Sepete ürün eklerken hata:', error);
        }
    };

    return (
        <>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: uri }} />
                <Text style={styles.title}>{isim}</Text>
                <Text style={styles.price}>Fiyat: ${fiyat}</Text>
                <View style={styles.wrapperCardBottom}>
                    <TouchableOpacity onPress={addekQuantity} style={styles.button}>
                        <Text style={styles.iconMinus}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.price}> {adet} </Text>
                    <TouchableOpacity onPress={addQuantity} style={[styles.button, { borderColor: 'green' }]}>
                        <Text style={styles.iconPlus}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonAlt}>
                    <TouchableOpacity style={styles.button} onPress={() => addToCartd(data)}>
                        <Text style={styles.addToCartText}> {ekleText} </Text>
                    </TouchableOpacity>
                </View>
            </View></>
    );
};



export default productCard;

const styles = {
    card: {
        backgroundColor: '#fff',  // Kart arka plan rengi beyaz
        borderRadius: 10,  // Köşeleri yuvarlat
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#ddd',
        marginBottom: 20,  // Kartlar arasında daha fazla boşluk
        marginHorizontal: 10,  // Yatayda boşluk
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,  // Hafif gölge efekti
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        numberOfLines: 2,
        ellipsizeMode: 'tail',  // Uzun başlıkların sonunda "..." gösterilecek
    },
    price: {
        fontSize: 15,
        color: '#888',
        marginBottom: 12,
    },
    textAdet: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlus: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18,
    },
    iconMinus: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18,
    },
    wrapperCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonAlt: {
        marginTop: 10,
    }
};
