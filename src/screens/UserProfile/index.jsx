import React, { useState } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TouchableOpacity,Switch,Pressable,} from 'react-native';
import { ArrowLeft,Edit2,User,Wallet,Location,Setting2,NoteText,Heart,Global,Sun1,LogoutCurve,} from 'iconsax-react-native';
import { fontType, colors } from '../../theme';

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    alert('Logged out successfully');
  };

  const handleBackPress = () => {
    alert('Back button pressed');
  };

  const EditButton = () => (
    <View style={styles.editButtonContainer}>
      <Edit2 size={20} color={colors.green()} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <ArrowLeft size={24} color={colors.white()} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <TouchableOpacity 
              style={styles.editProfileImageButton}
              onPress={() => alert('Edit profile image')}
            >
              <Edit2 size={16} color={colors.white()} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => alert('Edit profile details')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <ProfileSection title="Account">
            <ProfileOption
              icon={<User size={20} color={colors.green()} />}
              title="Personal Information"
              subtitle="Name, Email, Phone"
              onPress={() => alert('Navigate to Personal Info')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Wallet size={20} color={colors.green()} />}
              title="Payment Methods"
              subtitle={`${user.paymentMethods.length} Saved`}
              onPress={() => alert('Navigate to Payment Methods')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Location size={20} color={colors.green()} />}
              title="Saved Addresses"
              subtitle={`${user.savedAddresses.length} Addresses`}
              onPress={() => alert('Navigate to Saved Addresses')}
              rightElement={<EditButton />}
            />
          </ProfileSection>

          <ProfileSection title="Preferences">
            <ProfileOption
              icon={<NoteText size={20} color={colors.green()} />}
              title="Dietary Restrictions"
              subtitle={user.preferences.dietary.join(', ')}
              onPress={() => alert('Navigate to Dietary Restrictions')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Heart size={20} color={colors.green()} />}
              title="Allergen Information"
              subtitle={user.preferences.allergens.join(', ')}
              onPress={() => alert('Navigate to Allergen Information')}
              rightElement={<EditButton />}
            />
            <ProfileOption
              icon={<Global size={20} color={colors.green()} />}
              title="Favorite Cuisines"
              subtitle={user.preferences.favoriteCuisines.join(', ')}
              onPress={() => alert('Navigate to Favorite Cuisines')}
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
                  trackColor={{ false: colors.lightGrey(), true: colors.green(0.8) }}
                  thumbColor={darkMode ? colors.green() : colors.white()}
                />
              }
            />
            <ProfileOption
              icon={<Setting2 size={20} color={colors.green()} />}
              title="Language"
              subtitle="English"
              onPress={() => alert('Navigate to Language Settings')}
              rightElement={<EditButton />}
            />
          </ProfileSection>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogoutCurve size={20} color={colors.red()} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});