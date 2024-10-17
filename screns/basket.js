import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Basket = () => {
  const [cartItems, setCartItems] = useState([]);

  // Sepet verilerini çekmek için bir fonksiyon
  const getCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart !== null) {
        setCartItems(JSON.parse(cart));
      } else {
        setCartItems([]); // Eğer sepet boşsa, state'i boş bir array yap
      }
    } catch (error) {
      console.error('Sepet verilerini çekerken hata:', error);
    }
  };

  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Sepeti kaydederken hata:', error);
    }
  };

  // Ürün adedini artır
  const increaseQuantity = (itemId) => {
    let updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, adet: item.adet + 1 }; // Ürün adedini artır
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartItems(updatedCart); // Güncellenen sepeti kaydet
  };

  // Ürün adedini azalt
  const decreaseQuantity = (itemId) => {
    let updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.adet > 1) {
        return { ...item, adet: item.adet - 1 }; // Ürün adedini azalt
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartItems(updatedCart); // Güncellenen sepeti kaydet
  };

  const removeItemFromCart = async (itemId) => {
    try {
      let updatedCart = cartItems.filter(item => item.id !== itemId); // Ürünü diziden çıkar
      setCartItems(updatedCart); // State'i güncelle
      saveCartItems(updatedCart); // Güncellenen sepeti AsyncStorage'a kaydet
      console.log('Ürün sepetten silindi:', itemId);
    } catch (error) {
      console.error('Ürünü sepetten silerken hata:', error);
    }
  };

  // Sepeti temizle ve listeyi güncelle
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      console.log('Sepet temizlendi.');
      setCartItems([]); // Listeyi boşalt
    } catch (error) {
      console.error('Sepeti temizlerken hata:', error);
    }
  };

  // Sayfa yüklendiğinde sepet verilerini al
  useEffect(() => {
    getCartItems();
  }, []);


  const what = () => {
    // Sepetteki ürünlerin isim ve adet bilgisini toplayalım
    let message = 'Sepetinizdeki Ürünler:\n';
    cartItems.forEach(item => {
      console.log(item)
      message += `${item.isim} - Adet: ${item.adet}\n`; // Her ürün için isim ve adet bilgisini ekle
    });

    // WhatsApp URL'sini hazırlayalım
    let url = 'whatsapp://send?text=' + encodeURIComponent(message);

    // WhatsApp'ı açalım
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Açıldı');
      })
      .catch(() => {
        alert('Cihazınızda WhatsApp yüklü olduğundan emin olun');
      });
  };



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.uri }} />
      <Text style={styles.title}>{item.isim}</Text>
      <Text style={styles.price}>Fiyat: ${item.fiyat}</Text>
      <View style={styles.wrapperCardBottom}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
          <Text style={{ fontWeight: '600' }}>-</Text>
        </TouchableOpacity>
        <Text style={{ paddingHorizontal: 12 }}> {item.adet} </Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={[styles.button, { borderColor: 'green' }]}>
          <Text style={styles.iconPlus}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.sil} onPress={() => removeItemFromCart(item.id)}>
        <Text>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={clearCart} >
        <Text style={styles.ts}>Tümünü Sil</Text>
      </TouchableOpacity>
      <Text style={styles.sepet}>Sepetiniz</Text>
      <FlatList
        numColumns={2}
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View>
        <TouchableOpacity style={styles.paylas} onPress={what}>
          <Text>Paylaş</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};


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
    width: '100%',  // Resmi tam genişlikte göster
    height: 150,  // Resmin yüksekliği
    borderRadius: 10,  // Resmin köşelerini yuvarla
    marginBottom: 10,  // Resim ile metin arasında boşluk
  },
  title: {
    fontSize: 18,  // Daha büyük ve belirgin yazı
    fontWeight: 'bold',
    marginBottom: 5,  // Başlık ve fiyat arasında boşluk
  },
  price: {
    fontSize: 16,
    color: '#888',  // Fiyatı gri tonlarında yap
    marginBottom: 10,  // Fiyat ile alt bölüm arasında boşluk
  },
  button: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 35,  // Butonun genişliğini arttır
    height: 35,  // Yükseklik de arttır
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',  // Hafif gri arka plan
    marginHorizontal: 5,  // Butonlar arasında boşluk
  },
  iconPlus: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,  // "+" simgesini büyüt
  },
  wrapperCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Alt bölümü eşit boşluklarla dağıt
    marginTop: 10,  // Üst kısımdan boşluk
  },
  ts: {
    marginTop: 10,
    fontSize: 18,
    marginBottom: 20,
    color: 'red',  // "Tümünü Sil" butonuna vurgu yap
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sepet: {
    fontSize: 24,  // "Sepetiniz" başlığı büyütüldü
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  sil: {
    backgroundColor: 'red',  // Kırmızı arka plan
    padding: 10,  // Butona iç boşluk ekle
    borderRadius: 5,  // Köşeleri yuvarla
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,  // Üst kısımdan boşluk
  },
  paylas: {
    backgroundColor: 'green',  // Kırmızı arka plan
    padding: 10,  // Butona iç boşluk ekle
    borderRadius: 5,  // Köşeleri yuvarla
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,  // Üst kısımdan boşluk
  }

};

export default Basket;
