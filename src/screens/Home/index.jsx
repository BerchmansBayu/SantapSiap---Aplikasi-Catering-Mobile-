import React, { useState } from 'react';
import {ScrollView,StyleSheet,Text,View,Image,TextInput,Pressable,} from 'react-native';
import {Element3,SearchNormal,HambergerMenu,ShoppingCart,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { ListHorizontal, ItemSmall } from '../../components';
import { foodItems } from '../../data'; // Import data makanan

export default function Home() {
  const [mealType, setMealType] = useState('Lunch');
  const [pressedOrder, setPressedOrder] = useState('');

  const handleOrder = (foodName) => {
    alert(`Order placed for ${foodName}`);
    setPressedOrder(foodName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Element3 color={colors.green()} variant="Linear" size={28} />
        <Text style={styles.title}>SantapSiap</Text>
        <HambergerMenu color={colors.white()} size={28} />
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="What do you want to eat?"
          placeholderTextColor={colors.brown()}
        />
        <Pressable style={styles.button}>
          <SearchNormal size={24} color={colors.white()} />
        </Pressable>
      </View>

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
            <Text style={styles.mealText}>Breakfast</Text>
          </Pressable>
          <Pressable
            style={
              mealType === 'Lunch' ? styles.selectedMealButton : styles.mealButton
            }
            onPress={() => setMealType('Lunch')}>
            <Text style={styles.selectedMealText}>Lunch</Text>
          </Pressable>
          <Pressable
            style={
              mealType === 'Dinner' ? styles.selectedMealButton : styles.mealButton
            }
            onPress={() => setMealType('Dinner')}>
            <Text style={styles.mealText}>Dinner</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView>
        <View style={styles.listHorizontal}>
          <ListHorizontal foodList={foodItems} />
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
      </ScrollView>
    </View>
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
  },
  title: {
    fontSize: 26,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  searchBar: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
    borderColor: colors.lightGrey(),
    borderWidth: 1,
    backgroundColor: colors.white(),
    borderRadius: 12,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.brown(),
  },
  button: {
    backgroundColor: colors.orange(),
    padding: 12,
    borderRadius: 10,
  },
  mealOptions: {
    padding: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.brown(),
  },
  mealButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  mealButton: {
    padding: 12,
    backgroundColor: colors.yellow(0.3),
    borderRadius: 10,
  },
  selectedMealButton: {
    padding: 12,
    backgroundColor: colors.orange(),
    borderRadius: 10,
  },
  selectedMealText: {
    color: colors.white(),
  },
  mealText: {
    color: colors.white(),
  },
  listHorizontal: {
    height: 250,
    
  },
  itemVertical: {
    paddingHorizontal: 16,
    marginTop: -16, // Mengurangi jarak vertikal ItemSmall
  },
});