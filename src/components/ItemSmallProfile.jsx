import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native';
import { fontType, colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Trash } from 'iconsax-react-native';

const ItemSmall = ({ item, onDelete }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('FoodDetail', { foodId: item?.id })}>
      {item?.image ? (
        <Image
          style={styles.cardImage}
          source={{ uri: item.image }}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        {item?.category?.name && (
          <Text style={styles.categoryText}>{item.category.name}</Text>
        )}
        {item?.name && (
          <Text style={styles.cardTitle}>{item.name}</Text>
        )}
        {item?.price && (
          <Text style={styles.cardText}>
            ${item.price}{' '}
            {item.oldPrice && (
              <Text style={{ textDecorationLine: 'line-through', color: colors.darkGrey() }}>
                ${item.oldPrice}
              </Text>
            )}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.orderButton}
            onPress={() => console.log('Order pressed')}>
            <Text style={styles.orderText}>Order Now</Text>
          </Pressable>
          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(item.id)}>
              <Trash size={16} color={colors.red()} />
            </TouchableOpacity>
          )}
        </View>
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
  placeholderImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: colors.lightGrey(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.darkGrey(),
    fontSize: 12,
    textAlign: 'center',
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.brown(),
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: colors.green(),
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.orange(),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderButton: {
    backgroundColor: colors.green(),
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
  },
  orderText: {
    color: colors.white(),
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: colors.red(0.1),
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red(0.3),
  },
});