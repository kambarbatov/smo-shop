import { StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screns/home'
import Basket from './screns/basket'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import HeaderSepet from './screns/headerBasket';



//logoİcon
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, }}
      source={require('./assets/logo.png')}
    />
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer independent={true}  >
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={({ navigation }) => ({
            // navigation prop'unu headerRight'a geçiriyoruz
            headerRight: () => <HeaderSepet navigation={navigation} />,
            title: "Sigara Sipariş",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: (props) => <LogoTitle {...props} />
          })}
        />
        <Stack.Screen name="basket" 
        options={()=>({
          title: "Sepet"
        })}
         component={Basket} />
        
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
