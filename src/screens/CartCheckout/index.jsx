import React, { useState } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TouchableOpacity,Pressable,} from 'react-native';
import {ArrowLeft,Trash, Add, Minus, Location, Clock, Wallet,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';



const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: item.image }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
    <View style={styles.itemActions}>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Trash size={18} color={colors.red()} />
      </TouchableOpacity>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
          <Minus size={16} color={colors.brown()} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
          <Add size={16} color={colors.brown()} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const SectionHeader = ({ title, actionText, onAction }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionText && (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.actionText}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const DeliveryOption = ({ title, subtitle, icon, isSelected, onSelect }) => (
    <TouchableOpacity
      style={[styles.optionCard, isSelected && styles.selectedOption]}
      onPress={onSelect}
    >
      <View style={styles.optionIcon}>{icon}</View>
      <View style={styles.optionDetails}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const CartScreen = () => {
    const navigation = useNavigation();

    // Mock cart data
    const [cartItems, setCartItems] = useState([
      {
        id: '1',
        name: 'Chicken Biryani',
        price: 'Rp25.000',
        oldPrice: 'Rp35.000',
        image: 'https://c.ndtvimg.com/2019-07/3j3eg3a_chicken_625x300_05_July_19.jpg',
        category: 'Breakfast',
        quantity: 2,
      },
      {
        id: '2',
        name: 'Rice With Curry',
        price: 'Rp15.000',
        oldPrice: 'Rp20.000',
        image: 'https://www.budgetbytes.com/wp-content/uploads/2017/12/Kimchi-Fried-Rice-V1.jpg',
        category: 'Dinner',
        quantity: 1,
      },
    ]);
  
    const [selectedAddress, setSelectedAddress] = useState('Home');
    const [selectedPayment, setSelectedPayment] = useState('Cash');
  
    const increaseQuantity = (id) => {
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
  
    const decreaseQuantity = (id) => {
      setCartItems(
        cartItems.map(item =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    };
  
    const removeItem = (id) => {
      setCartItems(cartItems.filter(item => item.id !== id));
    };
  
    const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('Rp', '').replace('.', ''));
        return total + price * item.quantity;
      }, 0);
    };
  
    const subtotal = calculateSubtotal();
    const deliveryFee = 5000;
    const tax = subtotal * 0.1;
    const total = subtotal + deliveryFee + tax;
  
    const formatPrice = (price) => {
      return `Rp${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    };
  
    const placeOrder = () => {
      alert('Your order has been placed successfully!');
    };
  
    const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={{ color: colors.darkGrey() }}>Remove</Text>
          </TouchableOpacity>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  
    const SectionHeader = ({ title, actionText, onAction }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {actionText && (
          <TouchableOpacity onPress={onAction}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
  <ArrowLeft size={24} color={colors.white()} />
</TouchableOpacity>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            <>
              <View style={styles.cartItemsContainer}>
                <SectionHeader title="Order Items" />
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </View>
  
              <View style={styles.divider} />
  
              <View style={styles.section}>
                <SectionHeader
                  title="Delivery Address"
                  actionText="Change"
                  onAction={() => {
                    alert('Change delivery address');
                  }}
                />
                <DeliveryOption
                  title="Home"
                  subtitle="123 Main Street, Jakarta"
                  icon={<Location size={24} color={colors.green()} />}
                  isSelected={selectedAddress === 'Home'}
                  onSelect={() => setSelectedAddress('Home')}
                />
              </View>
  
              <View style={styles.divider} />
  
              <View style={styles.section}>
                <SectionHeader
                  title="Payment Method"
                  actionText="Add"
                  onAction={() => {
                    alert('Add payment method');
                  }}
                />
                <View style={styles.paymentOptions}>
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      selectedPayment === 'Cash' && styles.selectedPaymentOption,
                    ]}
                    onPress={() => setSelectedPayment('Cash')}
                  >
                    <Wallet size={20} color={selectedPayment === 'Cash' ? colors.white() : colors.brown()} />
                    <Text style={[
                      styles.paymentOptionText,
                      selectedPayment === 'Cash' && styles.selectedPaymentOptionText,
                    ]}>
                      Cash
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      selectedPayment === 'Card' && styles.selectedPaymentOption,
                    ]}
                    onPress={() => setSelectedPayment('Card')}
                  >
                    <Wallet size={20} color={selectedPayment === 'Card' ? colors.white() : colors.brown()} />
                    <Text style={[
                      styles.paymentOptionText,
                      selectedPayment === 'Card' && styles.selectedPaymentOptionText,
                    ]}>
                      Card
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
  
              <View style={styles.divider} />
  
              <View style={styles.section}>
                <SectionHeader title="Order Summary" />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>{formatPrice(deliveryFee)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax (10%)</Text>
                  <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{formatPrice(total)}</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyCartContainer}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png',
                }}
                style={styles.emptyCartImage}
              />
              <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
              <Text style={styles.emptyCartSubtitle}>
                Looks like you haven't added anything to your cart yet
              </Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => alert('Browse Menu')}
              >
                <Text style={styles.browseButtonText}>Browse Menu</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
  
        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <Pressable style={styles.checkoutButton} onPress={placeOrder}>
              <Text style={styles.checkoutButtonText}>Place Order</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };
  
  export default CartScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white(),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.green(),
      padding: 16,
      height: 60,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white(),
    },
    cartItemsContainer: {
      padding: 16,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: colors.white(),
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
      shadowColor: colors.black(),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    itemDetails: {
      flex: 1,
      paddingHorizontal: 12,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.brown(),
      marginBottom: 4,
    },
    itemCategory: {
      fontSize: 12,
      color: colors.darkGrey(),
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.green(),
    },
    itemActions: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    removeButton: {
      padding: 4,
      marginBottom: 8,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightGrey(0.3),
      borderRadius: 6,
      padding: 2,
    },
    quantityButton: {
      backgroundColor: colors.white(),
      borderRadius: 4,
      padding: 4,
    },
    quantityText: {
      fontWeight: 'bold',
      paddingHorizontal: 8,
      fontSize: 14,
      color: colors.brown(),
    },
    section: {
      padding: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.brown(),
    },
    actionText: {
      color: colors.green(),
      fontWeight: 'bold',
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: colors.lightGrey(0.5),
    },
    optionCard: {
      flexDirection: 'row',
      backgroundColor: colors.white(),
      borderRadius: 10,
      padding: 12,
      shadowColor: colors.black(),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.lightGrey(0.5),
    },
    selectedOption: {
      borderColor: colors.green(),
      borderWidth: 2,
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.lightGrey(0.3),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    optionDetails: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.brown(),
      marginBottom: 4,
    },
    optionSubtitle: {
      fontSize: 12,
      color: colors.darkGrey(),
    },
    paymentOptions: {
      flexDirection: 'row',
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightGrey(0.3),
      borderRadius: 8,
      padding: 12,
      marginRight: 12,
      width: 100,
      justifyContent: 'center',
    },
    selectedPaymentOption: {
      backgroundColor: colors.green(),
    },
    paymentOptionText: {
      marginLeft: 8,
      fontWeight: 'bold',
      color: colors.brown(),
    },
    selectedPaymentOptionText: {
      color: colors.white(),
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    summaryLabel: {
      color: colors.darkGrey(),
    },
    summaryValue: {
      fontWeight: 'bold',
      color: colors.brown(),
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.brown(),
    },
    totalValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.green(),
    },
    footer: {
      padding: 16,
      backgroundColor: colors.white(),
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey(0.3),
    },
    checkoutButton: {
      backgroundColor: colors.green(),
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    checkoutButtonText: {
      color: colors.white(),
      fontWeight: 'bold',
      fontSize: 16,
    },
    emptyCartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      marginTop: 100,
    },
    emptyCartImage: {
      width: 100,
      height: 100,
      marginBottom: 16,
      opacity: 0.6,
    },
    emptyCartTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.brown(),
      marginBottom: 8,
    },
    emptyCartSubtitle: {
      fontSize: 16,
      color: colors.darkGrey(),
      textAlign: 'center',
      marginBottom: 24,
    },
    browseButton: {
      backgroundColor: colors.green(),
      borderRadius: 12,
      padding: 16,
      width: '80%',
      alignItems: 'center',
    },
    browseButtonText: {
      color: colors.white(),
      fontWeight: 'bold',
      fontSize: 16,
    },
  });