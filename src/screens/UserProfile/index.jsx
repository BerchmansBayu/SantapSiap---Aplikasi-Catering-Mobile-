import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Modal
} from 'react-native';
import {
  Edit,
  Edit2,
  User,
  Wallet,
  Location,
  Setting2,
  NoteText,
  Heart,
  Global,
  Sun1,
  LogoutCurve,
  Trash
} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ItemSmallProfile from '../../components/ItemSmallProfile';
import axios from 'axios';

const ProfileOption = ({ icon, title, subtitle, onPress, rightElement }) => (
  <TouchableOpacity style={styles.profileOption} onPress={onPress}>
    <View style={styles.optionIconContainer}>{icon}</View>
    <View style={styles.optionContent}>
      <Text style={styles.optionTitle}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement}
  </TouchableOpacity>
);

const ProfileSection = ({ title, children }) => (
  <View style={styles.profileSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigation = useNavigation();

  // Mock user data
  const user = {
    name: 'Bayu Jaya',
    email: 'bayu.keren@example.com',
    phone: '+62 812 3456 7890',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    savedAddresses: [
      {
        id: '1',
        title: 'Home',
        address: '123 Main Street, Jakarta',
      },
      {
        id: '2',
        title: 'Work',
        address: '456 Office Building, Jakarta',
      },
    ],
    paymentMethods: [
      {
        id: '1',
        type: 'Cash',
      },
      {
        id: '2',
        type: 'Credit Card',
        last4: '4242',
      },
    ],
    preferences: {
      dietary: ['Vegetarian'],
      allergens: ['Nuts', 'Shellfish'],
      favoriteCuisines: ['Italian', 'Japanese', 'Indonesian'],
    },
  };

  // Fetch food data from API
  const getFoodData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://6828bc036075e87073a4c99a.mockapi.io/blog');
      console.log('API Response:', response.data); // Debug log
      setFoodData(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
      Alert.alert('Error', 'Failed to fetch food data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete food item
  const handleDeleteFood = (id) => {
    Alert.alert(
      'Delete Food Item',
      'Are you sure you want to delete this food item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => confirmDeleteFood(id),
        },
      ]
    );
  };

  // Confirm and process food deletion
  const confirmDeleteFood = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`https://6828bc036075e87073a4c99a.mockapi.io/blog/${id}`);
      
      if (response.status === 200) {
        // Remove the deleted item from state
        setFoodData(prevData => prevData.filter(item => item.id !== id));
        Alert.alert('Success', 'Food item deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      Alert.alert('Error', 'Failed to delete food item. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFoodData().then(() => setRefreshing(false));
  }, []);

  // Use focus effect to reload data when screen is focused
  useFocusEffect(
    useCallback(() => {
      getFoodData();
    }, [])
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been successfully logged out');
  };

  const EditButton = () => (
    <View style={styles.editButtonContainer}>
      <Edit2 size={20} color={colors.green()} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editProfileImageButton}
              onPress={() => Alert.alert('Edit Profile', 'Edit profile image')}>
              <Edit2 size={16} color={colors.white()} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => Alert.alert('Edit Profile', 'Edit profile details')}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          {/* My Food Items Section */}
          <View style={styles.foodSection}>
            <Text style={styles.sectionTitle}>My Food Items</Text>
            
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.green()} />
                <Text style={styles.loadingText}>Loading food items...</Text>
              </View>
            ) : foodData.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No food items yet</Text>
                <TouchableOpacity 
                  style={styles.addFoodButton}
                  onPress={() => navigation.navigate('AddFoodForm')}
                >
                  <Text style={styles.addFoodButtonText}>Add New Food Item</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.foodList}>
                {foodData.map((item) => (
                  <ItemSmallProfile
                    key={item.id} 
                    item={item} 
                    onDelete={handleDeleteFood}
                  />
                ))}
              </View>
            )}
          </View>

          <ProfileSection title="Account">
            <ProfileOption
              icon={<User size={20} color={colors.green()} />}
              title="Personal Information"
              subtitle="Name, Email, Phone"
              onPress={() => Alert.alert('Personal Info', 'Navigate to Personal Info')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Wallet size={20} color={colors.green()} />}
              title="Payment Methods"
              subtitle={`${user.paymentMethods.length} Saved`}
              onPress={() => Alert.alert('Payment Methods', 'Navigate to Payment Methods')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Location size={20} color={colors.green()} />}
              title="Saved Addresses"
              subtitle={`${user.savedAddresses.length} Addresses`}
              onPress={() => Alert.alert('Saved Addresses', 'Navigate to Saved Addresses')}
              rightElement={<EditButton />}
            />
          </ProfileSection>

          <ProfileSection title="Preferences">
            <ProfileOption
              icon={<NoteText size={20} color={colors.green()} />}
              title="Dietary Restrictions"
              subtitle={user.preferences.dietary.join(', ')}
              onPress={() => Alert.alert('Dietary Restrictions', 'Navigate to Dietary Restrictions')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Heart size={20} color={colors.green()} />}
              title="Allergen Information"
              subtitle={user.preferences.allergens.join(', ')}
              onPress={() => Alert.alert('Allergen Information', 'Navigate to Allergen Information')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Global size={20} color={colors.green()} />}
              title="Favorite Cuisines"
              subtitle={user.preferences.favoriteCuisines.join(', ')}
              onPress={() => Alert.alert('Favorite Cuisines', 'Navigate to Favorite Cuisines')}
              rightElement={<EditButton />}
            />
          </ProfileSection>

          <ProfileSection title="Settings">
            <ProfileOption
              icon={<Sun1 size={20} color={colors.green()} />}
              title="Dark Mode"
              onPress={toggleDarkMode}
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{
                    false: colors.lightGrey(),
                    true: colors.green(0.8),
                  }}
                  thumbColor={darkMode ? colors.green() : colors.white()}
                />
              }
            />
            <ProfileOption
              icon={<Setting2 size={20} color={colors.green()} />}
              title="Language"
              subtitle="English"
              onPress={() => Alert.alert('Language', 'Navigate to Language Settings')}
              rightElement={<EditButton />}
            />
          </ProfileSection>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogoutCurve size={20} color={colors.red()} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFoodForm')}>
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>

      {/* Loading overlay for deletion */}
      <Modal visible={deleteLoading} animationType='none' transparent>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.green()} />
          <Text style={styles.loadingOverlayText}>Deleting...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white(),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey(0.5),
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editProfileImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.green(),
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white(),
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.brown(),
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.darkGrey(),
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: colors.green(0.1),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.green(),
  },
  editProfileButtonText: {
    color: colors.green(),
    fontWeight: 'bold',
  },
  profileContent: {
    padding: 16,
  },
  foodSection: {
    marginBottom: 24,
  },
  foodList: {
    marginTop: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: colors.darkGrey(),
    fontSize: 14,
  },
  profileSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.brown(),
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.lightGrey(0.5),
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey(0.5),
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGrey(0.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.brown(),
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.darkGrey(),
    marginTop: 2,
  },
  editButtonContainer: {
    padding: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.lightGrey(0.2),
    borderRadius: 12,
    marginTop: 16,
  },
  logoutText: {
    color: colors.red(),
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  floatingButton: {
    backgroundColor: colors.green(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.green(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlayText: {
    color: colors.white(),
    marginTop: 10,
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightGrey(0.1),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey(0.5),
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.darkGrey(),
    marginBottom: 12,
  },
  addFoodButton: {
    backgroundColor: colors.green(),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addFoodButtonText: {
    color: colors.white(),
    fontWeight: 'bold',
  },
});