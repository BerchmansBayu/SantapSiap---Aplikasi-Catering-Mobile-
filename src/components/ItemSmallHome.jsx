import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { fontType, colors } from '../theme';
import {useNavigation} from '@react-navigation/native';

const ItemSmall = ({food, onPress, isPressed}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('FoodDetail', {foodId: food.id})}>
      <Image style={styles.cardImage} source={{uri: food.image}} />
      <View style={styles.cardContent}>
        <Text style={styles.categoryText}>{food.category}</Text>
        <Text style={styles.cardTitle}>{food.name}</Text>
        <Text style={styles.cardText}>
          {food.price}{' '}
          <Text style={{textDecorationLine: 'line-through'}}>
            {food.oldPrice}
          </Text>
        </Text>
        <Pressable
          style={[styles.orderButton, isPressed && styles.orderButtonActive]}
          onPress={onPress}>
          <Text style={styles.orderText}>Order Now</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSmall;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.white(),
    borderRadius: 10,
    overflow: 'hidden',
    padding: 12,
    alignItems: 'center',
    shadowColor: '#777',
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
  orderButtonActive: {
    backgroundColor: colors.orange(),
  },
  orderText: {
    color: colors.white(),
    fontSize: 16,
  },
  categoryText: {
    fontSize: 12,
    color: colors.orange(),
    fontWeight: 'bold',
    marginBottom: 5,
  },
});