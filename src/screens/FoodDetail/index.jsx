import React, { useState, useRef } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,Pressable, Animated, StatusBar,} from 'react-native';
import {ArrowLeft,Star1,Heart,Minus,Add,ShoppingCart,Clock,Message,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
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
  <TouchableOpacity style={styles.recommendedItem}>
    <Image source={{ uri: item.image }} style={styles.recommendedImage} />
    <View style={styles.recommendedContent}>
      <Text style={styles.recommendedName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.recommendedPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const FoodDetail = () => {
  const navigation = useNavigation();
  
  // Animated values
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animation configuration
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });
  
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [150, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Dummy food (tanpa route)
  const food = {
    name: 'Chicken Biryani',
    category: 'Lunch',
    price: 'Rp25.000',
    oldPrice: 'Rp35.000',
    rating: 4.8,
    reviewCount: 245,
    cookTime: '25 min',
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
    {
      name: 'French Fries',
      price: 'Rp10.000',
      image:
        'https://www.seriouseats.com/thmb/zTZa361CfNx6PaYwh5YVxKafCqE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__04__20180309-french-fries-vicky-wasik-15-5a9844742c2446c7a7be9fbd41b6e27d.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.headerBar,
        { opacity: headerOpacity }
      ]}>
        <Animated.Text style={[styles.headerTitle, { opacity: headerTitleOpacity }]}>
          {food.name}
        </Animated.Text>
      </Animated.View>
      
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.brown()} />
        </TouchableOpacity>
      </View>
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Image Section */}
        <Animated.View 
          style={[
            styles.imageContainer,
            { transform: [{ scale: imageScale }] }
          ]}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
          <View style={styles.imageOverlay} />
          
          <View style={styles.badgeContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{food.category}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Clock size={14} color={colors.white()} />
              <Text style={styles.timeText}>{food.cookTime}</Text>
            </View>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleFavorite}>
              <Heart
                size={20}
                color={colors.white()}
                variant={isFavorite ? 'Bold' : 'Linear'}
              />
            </TouchableOpacity>
          
          </View>
        </Animated.View>

        <View style={styles.contentContainer}>
          {/* Food Title and Price Section */}
          <View style={styles.headerSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.foodName}>{food.name}</Text>
              <View style={styles.ratingRow}>
                <Star1 size={18} color={colors.orange()} variant="Bold" />
                <Text style={styles.ratingText}>{food.rating}</Text>
                <Text style={styles.reviewCount}>({food.reviewCount} reviews)</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>{food.price}</Text>
              <Text style={styles.oldPrice}>{food.oldPrice}</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Delicious {food.name.toLowerCase()}, a fragrant rice dish made with layers of basmati rice, spices, and marinated chicken. Prepared with premium ingredients and our chef's special recipe that ensures perfect flavor and texture in every bite. Enjoy it hot and fresh for the best experience.
            </Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}>
                <Minus size={18} color={colors.brown()} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}>
                <Add size={18} color={colors.brown()} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nutrition Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Information</Text>
            <View style={styles.nutritionContainer}>
              <NutritionItem title="Calories" value="320 kcal" />
              <NutritionItem title="Protein" value="15g" />
              <NutritionItem title="Carbs" value="42g" />
              <NutritionItem title="Fat" value="12g" />
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {reviews.map((review, index) => (
              <ReviewItem key={index} {...review} />
            ))}
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Might Also Like</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recommendedContainer}>
              {recommendedDishes.map((dish, index) => (
                <RecommendedItem key={index} item={dish} />
              ))}
            </View>
          </View>
          
          {/* Space for footer */}
          <View style={{ height: 70 }} />
        </View>
      </Animated.ScrollView>

      {/* Footer Add to Cart */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>
              {`Rp${(parseFloat(food.price.replace('Rp', '').replace('.', '')) * quantity).toLocaleString()}`}
            </Text>
          </View>
          <Pressable style={styles.addToCartButton} onPress={addToCart}>
            <ShoppingCart size={18} color={colors.white()} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
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
  scrollContent: {
    paddingBottom: 16,
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: colors.white(),
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    textAlign: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 20,
  },
  backButton: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: colors.orange(),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  timeBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
  },
  actionButtonsContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
    flexDirection: 'column',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 10,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: colors.white(),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  foodName: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.orange(),
    marginLeft: 4,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.green(),
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    lineHeight: 22,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey(0.1),
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: colors.white(),
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    marginHorizontal: 20,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: colors.lightGrey(0.1),
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey(0.1),
  },
  nutritionTitle: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
  },
  nutritionValue: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginTop: 4,
  },
  reviewItem: {
    backgroundColor: colors.lightGrey(0.1),
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey(0.1),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.orange(),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
  },
  reviewName: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 164, 46, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  seeAllButton: {
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.green(),
  },
  recommendedContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  recommendedItem: {
    width: 130,
    borderRadius: 12,
    backgroundColor: colors.white(),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  recommendedImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recommendedContent: {
    padding: 10,
  },
  recommendedName: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    marginBottom: 4,
  },
  recommendedPrice: {
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.green(),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white(),
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey(0.2),
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
  },
  addToCartButton: {
    backgroundColor: colors.green(),
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
  },
});