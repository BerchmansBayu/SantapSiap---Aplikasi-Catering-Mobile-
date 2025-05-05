import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, CartCheckout, FoodDetail, UserProfile, AddFoodForm,} from '../screens';
import {Home2, WalletCheck, Receipt21, ProfileCircle} from 'iconsax-react-native';
import { fontType, colors } from '../theme';
import SearchBar from '../components/SearchBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.green(),
        tabBarInactiveTintColor: colors.brown(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Home2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CartCheckout"
        component={CartCheckout}
        options={{
          tabBarLabel: 'CartCheckout',
          tabBarIcon: ({focused, color}) => (
            <WalletCheck
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{
          tabBarLabel: 'FoodDetail',
          tabBarIcon: ({focused, color}) => (
            <Receipt21
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: 'UserProfile',
          tabBarIcon: ({focused, color}) => (
            <ProfileCircle
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFoodForm"
        component={AddFoodForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen name="Search" component={SearchBar} />
    </Stack.Navigator>
  );
  
};

export default Router;