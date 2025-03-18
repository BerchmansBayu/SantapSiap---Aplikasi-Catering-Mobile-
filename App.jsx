import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Element3, SearchNormal, HambergerMenu, ShoppingCart } from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

export default function App() {
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
          <Pressable style={styles.mealButton}><Text>Breakfast</Text></Pressable>
          <Pressable style={styles.selectedMealButton}><Text style={styles.selectedMealText}>Lunch</Text></Pressable>
          <Pressable style={styles.mealButton}><Text>Dinner</Text></Pressable>
        </View>
      </View>

      <ListFood />
    </View>
  );
}

// List of food items
const ListFood = () => {
  return (
    <ScrollView>
      <View style={styles.itemVertical}>
        {[{
          name: 'Chicken Biryani',
          price: 'Rp25.000',
          oldPrice: 'Rp35.000',
          image: 'https://c.ndtvimg.com/2019-07/3j3eg3a_chicken_625x300_05_July_19.jpg'
        }, {
          name: 'Rice With Curry',
          price: 'Rp15.000',
          oldPrice: 'Rp20.000',
          image: 'https://www.budgetbytes.com/wp-content/uploads/2017/12/Kimchi-Fried-Rice-V1.jpg'
        }].map((food, index) => (
          <View key={index} style={styles.cardItem}>
            <Image
              style={styles.cardImage}
              source={{ uri: food.image }} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{food.name}</Text>
              <Text style={styles.cardText}>{food.price} <Text style={{ textDecorationLine: 'line-through' }}>{food.oldPrice}</Text></Text>
              <Pressable style={styles.orderButton}><Text style={styles.orderText}>Order Now</Text></Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Style Definitions
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
  itemVertical: {
    padding: 16,
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.white(),
    borderRadius: 10, 
    overflow: 'hidden',
    padding: 12, 
    alignItems: 'center', 
    shadowColor: "#777",
    elevation: 5, 
  },

  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brown(),
  },
  cardText: {
    fontSize: 16,
    color: colors.green(),
  },
  orderButton: {
    backgroundColor: colors.green(),
    padding: 8,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  orderText: {
    color: colors.white(),
    fontSize: 16,
  },
});
