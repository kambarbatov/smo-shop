import { View, Dimensions, FlatList, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import ProductCard from './productCart';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';
import { addQuantity, reduceQuantity } from '../redux/smoSlice'
import data from '../data';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {

    /* // const listCart = useSelector((state) => state.cart.listCart);
      const dispatch = useDispatch();
  
      // Arama metni ve filtrelenmiş ürünler için state
      const [searchText, setSearchText] = useState('');
      const [filteredCart, setFilteredCart] = useState(listCart);
  
      useEffect(() => {
          // Arama metnine göre ürünleri filtrele
          const filteredData = listCart.filter((item) =>
              item.isim.toLowerCase().includes(searchText.toLowerCase())
          );
          setFilteredCart(filteredData);
      }, [searchText, listCart]);
  
  
      /*const handleAddQuantity = (item) => {
          dispatch(addQuantity(item));
      };
  
      const handleReduceQuantity = (item) => {
          dispatch(reduceQuantity(item));
      };*/


    // Ekran boyutunu almak için Dimensions API
    const { width } = Dimensions.get('window');


    const [listCart, setListCart] = useState(data);  // Tüm ürünler
    const [filteredCart, setFilteredCart] = useState(data);  // Filtrelenmiş ürünler
    const [searchText, setSearchText] = useState('');  // Arama çubuğundaki metin


    // Arama çubuğuna göre filtreleme
    const handleSearch = (text) => {
        setSearchText(text);
        if (text === '') {
            setFilteredCart(listCart);  // Arama boşsa tüm listeyi göster
        } else {
            const filteredData = listCart.filter(item =>
                item.isim.toLowerCase().includes(text.toLowerCase())  // Arama metni isimde varsa filtrele
            );
            setFilteredCart(filteredData);  // Filtrelenmiş veriyi ayarla
        }
    };

    const handleAddQuantity = (item) => {
        const updatedCart = listCart.map(data => {
            if (data.id === item.id) {
                return { ...data, adet: data.adet + 1 };
            } else {
                return data;
            }
        });
        setListCart(updatedCart);
        setFilteredCart(updatedCart);  // Filtrelenmiş listeyi de güncelle
    };

    const handleReduceQuantity = (item) => {
        const updatedCart = listCart.map(data => {
            if (data.id === item.id) {
                return { ...data, adet: data.adet > 0 ? data.adet - 1 : 0 };
            } else {
                return data;
            }
        });
        setListCart(updatedCart);
        setFilteredCart(updatedCart);  // Filtrelenmiş listeyi de güncelle
    };

    const XButton = () => {
        setSearchText('')
        setFilteredCart(data)
    }


    return (
        <>

            {/* Arama çubuğu */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Ürün Ara"
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholderTextColor="#888"
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={XButton}>
                        <Ionicons name="close" size={20} color="#888" style={styles.clearIcon} />
                    </TouchableOpacity>
                )}
            </View>
            {/* Ürün listesi */}
            <View style={styles.card}>
                <FlatList
                    style={styles.fla}
                    numColumns={width > 768 ? 3 : 2}
                    data={filteredCart}
                    renderItem={({ item }) => (
                        <ProductCard
                            data={item}
                            addQuantity={() => handleAddQuantity(item)}
                            addekQuantity={() => handleReduceQuantity(item)}
                        />
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    fla: {
        flex: 1,
    },
    card: {
        flex: 1,
        margin: 5, // Kartlar arasında boşluk
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        alignSelf: 'stretch',

    },
    cardContainer: {
        flex: 1,
        margin: 10,  // Kartlar arasında boşluk
        // Flexbox kullanarak her kolonun eşit şekilde yayılmasını sağlıyoruz
        justifyContent: 'space-between',
    },
    searchContainer: {
        flexDirection: 'row',  // İkonlar ve TextInput yan yana
        alignItems: 'center',
        backgroundColor: '#f1f1f1',  // Arka plan rengi
        borderRadius: 20,  // Yuvarlatılmış köşeler
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 15,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,  // Gölge efekti
    },
    searchIcon: {
        marginRight: 10,  // Arama ikonuyla TextInput arasında boşluk
    },
    searchInput: {
        flex: 1,  // TextInput tüm alanı kullanır
        fontSize: 16,
        color: '#333',
    },
    clearIcon: {
        marginLeft: 10,  // Çarpı ikonuyla TextInput arasında boşluk
    },
});