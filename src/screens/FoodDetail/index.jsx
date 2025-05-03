import React, { useState } from 'react';
import {StyleSheet,Text,View,Image,ScrollView,TouchableOpacity,Pressable,} from 'react-native';
import {ArrowLeft,Star1,Heart,Minus,Add,ShoppingCart,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme'; // sesuaikan path jika perlu
import { useNavigation } from '@react-navigation/native';

const NutritionItem = ({ title, value }) => (
  <View style={styles.nutritionItem}>
    <Text style={styles.nutritionTitle}>{title}</Text>
    <Text style={styles.nutritionValue}>{value}</Text>
  </View>
);

const ReviewItem = ({ name, rating, comment, date }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <View style={styles.reviewUser}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.reviewName}>{name}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Star1 size={16} color={colors.orange()} variant="Bold" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    </View>
    <Text style={styles.reviewComment}>{comment}</Text>
    <Text style={styles.reviewDate}>{date}</Text>
  </View>
);

const RecommendedItem = ({ item }) => (
  <View style={styles.recommendedItem}>
    <Image source={{ uri: item.image }} style={styles.recommendedImage} />
    <Text style={styles.recommendedName}>{item.name}</Text>
    <Text style={styles.recommendedPrice}>{item.price}</Text>
  </View>
);

const FoodDetail = () => {
  const navigation = useNavigation();

  // Dummy food (tanpa route)
  const food = {
    name: 'Chicken Biryani',
    category: 'Lunch',
    price: 'Rp25.000',
    oldPrice: 'Rp35.000',
    image:
      'https://c.ndtvimg.com/2019-07/3j3eg3a_chicken_625x300_05_July_19.jpg',
  };

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const addToCart = () => {
    alert(`Added ${quantity} ${food.name} to cart!`);
  };

  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 4.8,
      comment:
        'Absolutely delicious! The flavor is amazing and the portion size is perfect.',
      date: '2 days ago',
    },
    {
      name: 'Michael Tang',
      rating: 4.5,
      comment: 'Very tasty and fresh. Would definitely order again.',
      date: '1 week ago',
    },
  ];

  const recommendedDishes = [
    {
      name: 'Fresh Salad',
      price: 'Rp12.000',
      image:
        'https://www.tasteofhome.com/wp-content/uploads/2018/01/Simple-Italian-Salad_EXPS_FT20_25957_F_0624_1.jpg',
    },
    {
      name: 'Iced Tea',
      price: 'Rp8.000',
      image:
        'https://images.everydayhealth.com/images/arthritis/rheumatoid-arthritis/iced-tea-recipes-for-rasymptom-relief-1440x810.jpg?sfvrsn=e2b90dc4_5',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
  <ArrowLeft size={24} color={colors.white()} />
</TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}>
            <Heart
              size={24}
              color={colors.white()}
              variant={isFavorite ? 'Bold' : 'Linear'}
            />
          </TouchableOpacity>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{food.category}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.foodName}>{food.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>{food.price}</Text>
              <Text style={styles.oldPrice}>{food.oldPrice}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Delicious {food.name.toLowerCase()} prepared with premium
              ingredients. Our chef's special recipe ensures perfect flavor and
              texture. Enjoy it hot and fresh for the best experience.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Information</Text>
            <View style={styles.nutritionContainer}>
              <NutritionItem title="Calories" value="320 kcal" />
              <NutritionItem title="Protein" value="15g" />
              <NutritionItem title="Carbs" value="42g" />
              <NutritionItem title="Fat" value="12g" />
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}>
                <Minus size={20} color={colors.brown()} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}>
                <Add size={20} color={colors.brown()} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {reviews.map((review, index) => (
              <ReviewItem key={index} {...review} />
            ))}
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All Reviews</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended Side Dishes</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendedContainer}>
              {recommendedDishes.map((dish, index) => (
                <RecommendedItem key={index} item={dish} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.addToCartButton} onPress={addToCart}>
          <ShoppingCart size={20} color={colors.white()} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.black(0.5),
    borderRadius: 8,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.black(0.5),
    borderRadius: 8,
    padding: 8,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: colors.orange(),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: colors.white(),
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentContainer: {
    padding: 16,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.brown(),
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.green(),
  },
  oldPrice: {
    fontSize: 16,
    color: colors.lightGrey(),
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brown(),
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.lightGrey(),
    lineHeight: 22,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: colors.lightGrey(0.3),
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  nutritionTitle: {
    fontSize: 12,
    color: colors.darkGrey(),
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.brown(),
    marginTop: 4,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey(0.3),
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: colors.white(),
    borderRadius: 6,
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.brown(),
    marginHorizontal: 16,
  },
  reviewItem: {
    backgroundColor: colors.lightGrey(0.2),
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.orange(),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: colors.white(),
    fontWeight: 'bold',
  },
  reviewName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.brown(),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange(),
  },
  reviewComment: {
    fontSize: 14,
    color: colors.darkGrey(),
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.lightGrey(0.7),
  },
  seeAllButton: {
    alignItems: 'center',
    padding: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.green(),
    fontWeight: 'bold',
  },
  recommendedContainer: {
    flexDirection: 'row',
  },
  recommendedItem: {
    width: 120,
    marginRight: 12,
  },
  recommendedImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendedName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.brown(),
  },
  recommendedPrice: {
    fontSize: 12,
    color: colors.green(),
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white(),
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey(0.3),
  },
  addToCartButton: {
    backgroundColor: colors.green(),
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white(),
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});