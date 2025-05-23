import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Modal, Alert} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import axios from 'axios';

const AddFoodForm = () => {
  const [loading, setLoading] = useState(false);
  const dataCategory = [
    {id: 1, name: 'Breakfast'},
    {id: 2, name: 'Lunch'},
    {id: 3, name: 'Dinner'},
    {id: 4, name: 'Snack'},
    {id: 5, name: 'Beverage'},
    {id: 6, name: 'Dessert'},
  ];

  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    category: {},
    rating: '0',
    reviewCount: 0,
    cookTime: '',
    oldPrice: '',
    image: '',
  });

  const handleChange = (key, value) => {
    setFoodData({
      ...foodData,
      [key]: value,
    });
  };

  const navigation = useNavigation();

  // Function to handle food upload to API
  const handleUpload = async () => {
    // Check if required fields are filled
    if (!foodData.name || !foodData.price || Object.keys(foodData.category).length === 0) {
      Alert.alert('Validation Error', 'Please fill in all required fields (name, price, category)');
      return;
    }

    setLoading(true);
    try {
      // Prepare data according to schema
      const foodPayload = {
        name: foodData.name,
        description: foodData.description,
        price: parseFloat(foodData.price),
        oldPrice: foodData.oldPrice ? parseFloat(foodData.oldPrice) : null,
        category: foodData.category,
        image: foodData.image,
        rating: foodData.rating,
        reviewCount: parseInt(foodData.reviewCount) || 0,
        cookTime: foodData.cookTime,
        createdAt: new Date().toISOString(),
      };

      // Use POST method to add new food item
      const response = await axios.post('https://6828bc036075e87073a4c99a.mockapi.io/blog', foodPayload);
      
      // If status is 201 (Created) "Success"
      if (response.status === 201) {
        Alert.alert('Success', 'Food item added successfully!');
        // Go back to previous screen
        navigation.goBack();
      }
    } catch (e) {
      // Show error
      Alert.alert('Failed to Upload Food', `Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Add Food</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Food Name"
            value={foodData.name}
            onChangeText={text => handleChange('name', text)}
            placeholderTextColor={colors.brown(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed, {minHeight: 100}]}>
          <TextInput
            placeholder="Description"
            value={foodData.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor={colors.brown(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Price"
            value={foodData.price}
            onChangeText={text => handleChange('price', text)}
            placeholderTextColor={colors.brown(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Old Price (if on discount)"
            value={foodData.oldPrice}
            onChangeText={text => handleChange('oldPrice', text)}
            placeholderTextColor={colors.brown(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Cook Time (e.g. 15min)"
            value={foodData.cookTime}
            onChangeText={text => handleChange('cookTime', text)}
            placeholderTextColor={colors.brown(0.6)}
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Rating (0-5)"
            value={foodData.rating}
            onChangeText={text => handleChange('rating', text)}
            placeholderTextColor={colors.brown(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Review Count"
            value={String(foodData.reviewCount)}
            onChangeText={text => handleChange('reviewCount', parseInt(text) || 0)}
            placeholderTextColor={colors.brown(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Image URL"
            value={foodData.image}
            onChangeText={text => handleChange('image', text)}
            placeholderTextColor={colors.brown(0.6)}
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontType['Pjs-Regular'],
              color: colors.brown(0.6),
            }}>
            Category
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === foodData.category.id
                  ? colors.green()
                  : colors.grey(0.08);
              const color =
                item.id === foodData.category.id
                  ? colors.white()
                  : colors.brown();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Add Food</Text>
        </TouchableOpacity>
      </View>
      {/* Loading overlay */}
      <Modal visible={loading} animationType='none' transparent>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.green()} />
        </View>
      </Modal>
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
    height: 60,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.green(),
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.white(),
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
    flex: 1,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
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
    color: colors.brown(),
    padding: 0,
  },
});

const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  }
});