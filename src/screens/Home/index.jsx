import React, { useState, useRef } from 'react';
import {Animated,StyleSheet,Text,View,TextInput,Pressable,TouchableWithoutFeedback,SafeAreaView,StatusBar,} from 'react-native';
import {Element3,SearchNormal,HambergerMenu,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { ListHorizontal, ItemSmall } from '../../components';
import { foodItems } from '../../data'; 
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [mealType, setMealType] = useState('Lunch');
  const [pressedOrder, setPressedOrder] = useState('');
  
  // Animated value
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animation configuration
  const diffClampY = Animated.diffClamp(scrollY, 0, 72);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 72],
    outputRange: [0, -72],
    extrapolate: 'clamp',
  });
  
  const recentY = diffClampY.interpolate({
    inputRange: [0, 72],
    outputRange: [0, -72],
    extrapolate: 'clamp',
  });

  const handleOrder = (foodName) => {
    alert(`Order placed for ${foodName}`);
    setPressedOrder(foodName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.green()} barStyle="light-content" />
      
      <Animated.View 
        style={[
          styles.header, 
          {transform: [{translateY: headerY}]}
        ]}>
        <Element3 color={colors.white()} variant="Linear" size={28} />
        <Text style={styles.title}>SantapSiap</Text>
        <HambergerMenu color={colors.white()} size={28} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.searchBarContainer,
          {transform: [{translateY: recentY}]}
        ]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
          <View style={styles.searchBar}>
            <SearchNormal size={20} color={colors.grey()} style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="What do you want to eat?"
              placeholderTextColor={colors.grey()}
              editable={false}
            />
            <View style={styles.button}>
              <SearchNormal size={20} color={colors.white()} />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.mealOptions}>
          <Text style={styles.mealTitle}>Today's Meal</Text>
          <View style={styles.mealButtons}>
            <Pressable
              style={
                mealType === 'Breakfast'
                  ? styles.selectedMealButton
                  : styles.mealButton
              }
              onPress={() => setMealType('Breakfast')}>
              <Text style={mealType === 'Breakfast' ? styles.selectedMealText : styles.mealText}>
                Breakfast
              </Text>
            </Pressable>
            <Pressable
              style={
                mealType === 'Lunch' ? styles.selectedMealButton : styles.mealButton
              }
              onPress={() => setMealType('Lunch')}>
              <Text style={mealType === 'Lunch' ? styles.selectedMealText : styles.mealText}>
                Lunch
              </Text>
            </Pressable>
            <Pressable
              style={
                mealType === 'Dinner' ? styles.selectedMealButton : styles.mealButton
              }
              onPress={() => setMealType('Dinner')}>
              <Text style={mealType === 'Dinner' ? styles.selectedMealText : styles.mealText}>
                Dinner
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={styles.scrollViewContent}>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Featured Meals</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
        
        <View style={styles.listHorizontalContainer}>
          <ListHorizontal foodList={foodItems.slice(0, 5)} />
        </View>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Popular Items</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
        
        <View style={styles.itemVertical}>
          {foodItems.map((food, index) => (
            <ItemSmall
              key={index}
              food={food}
              onPress={() => handleOrder(food.name)}
              isPressed={pressedOrder === food.name}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.green(),
    elevation: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    fontSize: 26,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  searchBarContainer: {
    position: 'absolute',
    backgroundColor: colors.white(),
    zIndex: 999,
    top: 60,
    left: 0,
    right: 0,
    elevation: 1000,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey(0.3),
  },
  searchBar: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: colors.lightGrey(0.5),
    borderWidth: 1,
    backgroundColor: colors.white(),
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: colors.black(0.2),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: colors.brown(),
    fontFamily: fontType['Pjs-Medium'],
  },
  button: {
    backgroundColor: colors.orange(),
    padding: 10,
    borderRadius: 10,
  },
  mealOptions: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginBottom: 8,
  },
  mealButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealButton: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.yellow(0.2),
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedMealButton: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.orange(),
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedMealText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
  },
  mealText: {
    color: colors.brown(),
    fontFamily: fontType['Pjs-Medium'],
  },
  scrollViewContent: {
    paddingTop: 168,
    paddingBottom: 20,
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.orange(),
  },
  listHorizontalContainer: {
    paddingVertical: 8,
    height: 280, 
  },
  itemVertical: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
});