import React, { useState } from 'react';
import {StyleSheet,Text,View,FlatList,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart } from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import { fontType, colors } from '../theme';

const ItemHorizontal = ({ item, isBookmarked, onBookmark }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('FoodDetail', { foodId: item.id })}
      activeOpacity={0.9}>
      <Text style={styles.popularMeal}>Popular Meal</Text>
      <FastImage
        style={styles.cardImage}
        source={{
          uri: item.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
          <View style={styles.cardIcon}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation(); // Mencegah navigasi saat icon ditekan
                onBookmark(item.name);
              }}>
              <Heart
                color={colors.white()}
                variant={isBookmarked ? 'Bold' : 'Linear'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

const ListHorizontal = ({ foodList }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const handleBookmark = (name) => {
    if (bookmarkedItems.includes(name)) {
      setBookmarkedItems(bookmarkedItems.filter((item) => item !== name));
    } else {
      setBookmarkedItems([...bookmarkedItems, name]);
    }
  };

  const renderItem = ({ item }) => {
    const isBookmarked = bookmarkedItems.includes(item.name);
    return (
      <ItemHorizontal
        item={item}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />
    );
  };

  return (
    <FlatList
      data={foodList}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
    />
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white(),
  },
  cardPrice: {
    fontSize: 12,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    marginTop: -8,
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    width: 30, // contoh ukuran persegi
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
  popularMeal: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.orange(),
    color: colors.white(),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
});
