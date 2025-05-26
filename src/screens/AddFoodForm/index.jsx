import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,Alert,} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import {addDoc, collection, getFirestore} from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import notifee from '@notifee/react-native'; // <--- Tambahkan ini

const CATEGORY_LIST = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Dessert',
  'Beverage',
];

const AddFoodForm = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // State for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('0');
  const [reviewCount, setReviewCount] = useState(0);
  const [cookTime, setCookTime] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fungsi untuk menampilkan notifikasi
  async function onDisplayNotification() {
    // Request permission (hanya perlu sekali, bisa dipindah ke root app)
    await notifee.requestPermission();

    // Create a channel (Android)
    const channelId = await notifee.createChannel({
      id: 'food',
      name: 'Food Notification',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Food Added',
      body: 'New food item has been added successfully!',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // pastikan ada icon ini di android/app/src/main/res
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const handleUpload = async () => {
    if (!name || !description || !price || !category || !cookTime || !imageUrl) {
      Alert.alert('Error', 'Please fill all required fields and input image URL.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(getFirestore(), 'foods'), {
        name: name,
        description: description,
        price: parseFloat(price),
        category: category,
        rating: parseFloat(rating),
        reviewCount: parseInt(reviewCount),
        cookTime: cookTime,
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        image: imageUrl,
      });
      setLoading(false);

      // Tampilkan notifikasi setelah berhasil tambah data
      await onDisplayNotification();

      Alert.alert('Success', 'Food item added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding document: ', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to add food item.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Food</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10}}>
        <View style={styles.form}>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Food Name</Text>
            <TextInput
              placeholder="Enter food name"
              value={name}
              onChangeText={setName}
              style={textInput.content}
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Description</Text>
            <TextInput
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
              style={textInput.content}
              multiline
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Price</Text>
            <TextInput
              placeholder="Enter price (e.g., 10.99)"
              value={price}
              onChangeText={setPrice}
              style={textInput.content}
              keyboardType="numeric"
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Category</Text>
            <View style={styles.categoryContainer}>
              {CATEGORY_LIST.map((cat, idx) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Rating</Text>
            <TextInput
              placeholder="Enter rating (0-5)"
              value={rating}
              onChangeText={setRating}
              style={textInput.content}
              keyboardType="numeric"
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Review Count</Text>
            <TextInput
              placeholder="Enter number of reviews"
              value={String(reviewCount)}
              onChangeText={text => setReviewCount(Number(text))}
              style={textInput.content}
              keyboardType="numeric"
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Cook Time</Text>
            <TextInput
              placeholder="e.g., 30 minutes"
              value={cookTime}
              onChangeText={setCookTime}
              style={textInput.content}
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Old Price (Optional)</Text>
            <TextInput
              placeholder="Enter old price if any"
              value={oldPrice}
              onChangeText={setOldPrice}
              style={textInput.content}
              keyboardType="numeric"
            />
          </View>
          <View style={textInput.borderDashed}>
            <Text style={textInput.title}>Image URL</Text>
            <TextInput
              placeholder="Paste image URL here"
              value={imageUrl}
              onChangeText={setImageUrl}
              style={textInput.content}
            />
            {imageUrl ? (
              <FastImage
                style={{width: '100%', height: 150, borderRadius: 5, marginTop: 10}}
                source={{uri: imageUrl}}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Add Food</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.white()} />
          <Text style={{color: colors.white(), marginTop: 10}}>Adding Food...</Text>
        </View>
      )}
    </View>
  );
};
export default AddFoodForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    zIndex: 1000,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
    marginLeft: 10,
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.green(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.grey(0.08),
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: colors.green(),
  },
  categoryText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.brown(),
  },
  categoryTextActive: {
    color: colors.white(),
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
    marginTop: 5,
  },
});