import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Animated, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { ArrowLeft, Star1, Heart, Minus, Add, ShoppingCart, Clock, Message, More, Share } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';

// Firestore imports
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from '@react-native-firebase/firestore';

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

const FoodDetail = ({ route }) => {
  const navigation = useNavigation();
  const { foodId } = route.params;

  // States
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Animated values
  const scrollY = useRef(new Animated.Value(0)).current;
  const actionSheetRef = useRef(null);

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

  // Fetch food data from Firestore
  const getFoodById = async () => {
    setLoading(true);
    try {
      const docRef = doc(getFirestore(), 'foods', foodId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setFood({ id: docSnap.id, ...docSnap.data() });
        setIsFavorite(docSnap.data().favorite ?? false);
      } else {
        setFood(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch food details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Use focus effect to refetch data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      getFoodById();
    }, [foodId])
  );

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Update favorite status in Firestore
  const toggleFavorite = async () => {
    if (!food) return;
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    try {
      const docRef = doc(getFirestore(), 'foods', foodId);
      await updateDoc(docRef, { favorite: newFavorite });
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorite status');
    }
  };

  const addToCart = () => {
    if (food) {
      Alert.alert('Success', `Added ${quantity} ${food.name} to cart!`);
    }
  };

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const navigateEdit = () => {
    navigation.navigate('EditFood', { foodId });
    closeActionSheet();
  };

  // Delete food from Firestore
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(getFirestore(), 'foods', foodId));
      closeActionSheet();
      Alert.alert('Success', 'Food deleted successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete food item');
    } finally {
      setLoading(false);
    }
  };

  // Sample data for reviews and recommended dishes
  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 4.8,
      comment: 'Absolutely delicious! The flavor is amazing and the portion size is perfect.',
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
      image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Simple-Italian-Salad_EXPS_FT20_25957_F_0624_1.jpg',
    },
    {
      name: 'Iced Tea',
      price: 'Rp8.000',
      image: 'https://images.everydayhealth.com/images/arthritis/rheumatoid-arthritis/iced-tea-recipes-for-rasymptom-relief-1440x810.jpg?sfvrsn=e2b90dc4_5',
    },
    {
      name: 'French Fries',
      price: 'Rp10.000',
      image: 'https://www.seriouseats.com/thmb/zTZa361CfNx6PaYwh5YVxKafCqE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__04__20180309-french-fries-vicky-wasik-15-5a9844742c2446c7a7be9fbd41b6e27d.jpg',
    },
  ];

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.green()} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!food) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Food not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Animated Header */}
      <Animated.View style={[
        styles.headerBar,
        { opacity: headerOpacity }
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.brown()} />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerTitle, { opacity: headerTitleOpacity }]}>
          {food.name}
        </Animated.Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <Share color={colors.brown()} variant="Linear" size={20} />
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={colors.brown()}
              variant="Linear"
              size={20}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
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
              <Text style={styles.categoryText}>{food.category || 'Food'}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Clock size={14} color={colors.white()} />
              <Text style={styles.timeText}>{food.cookTime || '25 min'}</Text>
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
                <Text style={styles.ratingText}>{food.rating || 4.8}</Text>
                <Text style={styles.reviewCount}>({food.reviewCount || 245} reviews)</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>Rp{food.price?.toLocaleString() || '25.000'}</Text>
              {food.oldPrice && (
                <Text style={styles.oldPrice}>Rp{food.oldPrice.toLocaleString()}</Text>
              )}
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {food.description || `Delicious ${food.name.toLowerCase()}, prepared with premium ingredients and our chef's special recipe that ensures perfect flavor and texture in every bite. Enjoy it hot and fresh for the best experience.`}
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
              Rp{(food.price * quantity).toLocaleString()}
            </Text>
          </View>
          <Pressable style={styles.addToCartButton} onPress={addToCart}>
            <ShoppingCart size={18} color={colors.white()} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>

      {/* Action Sheet for Edit/Delete */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={styles.actionSheetButton}
          onPress={navigateEdit}>
          <Text style={styles.actionSheetText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionSheetButton}
          onPress={handleDelete}>
          <Text style={styles.actionSheetText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionSheetButton}
          onPress={closeActionSheet}>
          <Text style={[styles.actionSheetText, { color: 'red' }]}>Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>

      {/* Loading Modal */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.green()} />
        </View>
      )}
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
    height: 90, // Increased height for better visual balance
    backgroundColor: colors.white(),
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Changed to space-between for better icon distribution
    paddingTop: 40,
    paddingHorizontal: 16, // Adjusted padding
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
    // Removed textAlign: 'center' as it's now handled by space-between
  },
  // Removed backButtonContainer and backButton as the headerBar handles back button
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350, // Slightly increased image height for more impact
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
    right: 16, // Adjusted right padding
    flexDirection: 'column',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 10,
  },
  contentContainer: {
    padding: 20, // Increased overall padding for content
    backgroundColor: colors.white(),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24, // Increased margin-bottom
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16, // Increased padding
  },
  foodName: {
    fontSize: 26, // Slightly increased font size
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
    fontSize: 24, // Slightly increased font size
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
    marginBottom: 28, // Increased margin-bottom for better separation
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // Increased margin-bottom
  },
  sectionTitle: {
    fontSize: 20, // Slightly increased font size
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginBottom: 0, // Removed extra margin as it's now handled by sectionHeader marginBottom
  },
  description: {
    fontSize: 15, // Slightly increased font size
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    lineHeight: 24, // Increased line height for readability
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28, // Increased margin-bottom
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey(0.15), // Slightly darker background
    borderRadius: 15, // More rounded corners
    padding: 6, // Increased padding
  },
  quantityButton: {
    backgroundColor: colors.white(),
    borderRadius: 12, // More rounded corners
    padding: 12, // Increased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Slightly increased elevation
  },
  quantityText: {
    fontSize: 20, // Increased font size
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    marginHorizontal: 25, // Increased horizontal margin
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12, // Increased gap
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: colors.lightGrey(0.1),
    padding: 18, // Increased padding
    borderRadius: 15, // More rounded corners
    borderWidth: 1,
    borderColor: colors.lightGrey(0.2), // Slightly darker border for definition
  },
  nutritionTitle: {
    fontSize: 13, // Slightly increased font size
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
  },
  nutritionValue: {
    fontSize: 17, // Slightly increased font size
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
    marginTop: 6, // Increased margin-top
  },
  reviewItem: {
    backgroundColor: colors.lightGrey(0.1),
    borderRadius: 15, // More rounded corners
    padding: 18, // Increased padding
    marginBottom: 16, // Increased margin-bottom
    borderWidth: 1,
    borderColor: colors.lightGrey(0.2), // Slightly darker border for definition
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // Increased margin-bottom
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40, // Slightly larger avatar
    height: 40,
    borderRadius: 20, // More rounded
    backgroundColor: colors.orange(),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Increased margin
  },
  avatarText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16, // Increased font size
  },
  reviewName: {
    fontSize: 15, // Slightly increased font size
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 164, 46, 0.15)', // Slightly darker background for rating
    paddingHorizontal: 10, // Increased horizontal padding
    paddingVertical: 5, // Increased vertical padding
    borderRadius: 8, // More rounded corners
  },
  reviewComment: {
    fontSize: 15, // Slightly increased font size
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    marginBottom: 10, // Increased margin-bottom
    lineHeight: 22,
  },
  reviewDate: {
    fontSize: 13, // Slightly increased font size
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  seeAllButton: {
    paddingVertical: 6, // Increased padding
  },
  seeAllText: {
    fontSize: 15, // Slightly increased font size
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.green(),
  },
  recommendedContainer: {
    flexDirection: 'row',
    gap: 16, // Increased gap between items
  },
  recommendedItem: {
    width: 140, // Slightly wider item
    borderRadius: 15, // More rounded corners
    backgroundColor: colors.white(),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, // Increased shadow for more depth
    shadowOpacity: 0.15, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    elevation: 4, // Increased elevation
    overflow: 'hidden',
  },
  recommendedImage: {
    width: '100%',
    height: 100, // Slightly taller image
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recommendedContent: {
    padding: 12, // Increased padding
  },
  recommendedName: {
    fontSize: 15, // Slightly increased font size
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    marginBottom: 6, // Increased margin-bottom
  },
  recommendedPrice: {
    fontSize: 13, // Slightly increased font size
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
    borderTopColor: colors.lightGrey(0.25), // Slightly darker border
    paddingVertical: 16, // Increased vertical padding
    paddingHorizontal: 20, // Increased horizontal padding
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
    fontSize: 13, // Slightly increased font size
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  totalPrice: {
    fontSize: 20, // Increased font size
    fontFamily: fontType['Pjs-Bold'],
    color: colors.brown(),
  },
  addToCartButton: {
    backgroundColor: colors.green(),
    borderRadius: 15, // More rounded corners
    paddingVertical: 14, // Increased vertical padding
    paddingHorizontal: 24, // Increased horizontal padding
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Increased gap
  },
  addToCartText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 17, // Increased font size
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.green(),
    fontSize: 16,
  },
  errorText: {
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.red(),
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.green(),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
  },
  actionSheetButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey(0.2),
    alignItems: 'center',
  },
  actionSheetText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
  },
});