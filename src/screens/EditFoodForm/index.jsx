import React, {useEffect, useState} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Modal, Alert
} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import axios from 'axios';

const EditFoodForm = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const {foodId} = route.params;

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
    oldPrice: '',
    cookTime: '',
    rating: '0',
    reviewCount: 0,
    image: '',
    category: {},
  });

  const handleChange = (key, value) => {
    setFoodData({...foodData, [key]: value});
  };

  const getFoodData = async () => {
    try {
      const response = await axios.get(`https://6828bc036075e87073a4c99a.mockapi.io/blog/${foodId}`);
      const data = response.data;
      setFoodData({
        name: data.name,
        description: data.description,
        price: String(data.price),
        oldPrice: data.oldPrice ? String(data.oldPrice) : '',
        cookTime: data.cookTime,
        rating: String(data.rating),
        reviewCount: data.reviewCount,
        image: data.image,
        category: data.category,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch food data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoodData();
  }, [foodId]);

  const handleUpdate = async () => {
    if (!foodData.name || !foodData.price || Object.keys(foodData.category).length === 0) {
      Alert.alert('Validation Error', 'Please fill in all required fields (name, price, category)');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: foodData.name,
        description: foodData.description,
        price: parseFloat(foodData.price),
        oldPrice: foodData.oldPrice ? parseFloat(foodData.oldPrice) : null,
        category: foodData.category,
        image: foodData.image,
        rating: foodData.rating,
        reviewCount: parseInt(foodData.reviewCount) || 0,
        cookTime: foodData.cookTime,
      };

      const response = await axios.put(`https://6828bc036075e87073a4c99a.mockapi.io/blog/${foodId}`, payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Food updated successfully!');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Update Failed', `Error: ${e.message}`);
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
          <Text style={styles.title}>Edit Food</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10, gap: 10}}>
        {[
          {key: 'name', placeholder: 'Food Name', multiline: true, style: textInput.title},
          {key: 'description', placeholder: 'Description', multiline: true, style: [textInput.content, {minHeight: 100}]},
          {key: 'price', placeholder: 'Price', keyboardType: 'numeric'},
          {key: 'oldPrice', placeholder: 'Old Price (if discounted)', keyboardType: 'numeric'},
          {key: 'cookTime', placeholder: 'Cook Time (e.g. 15min)'},
          {key: 'rating', placeholder: 'Rating (0-5)', keyboardType: 'numeric'},
          {key: 'reviewCount', placeholder: 'Review Count', keyboardType: 'numeric'},
          {key: 'image', placeholder: 'Image URL'},
        ].map((field, i) => (
          <View key={i} style={textInput.borderDashed}>
            <TextInput
              placeholder={field.placeholder}
              value={String(foodData[field.key])}
              onChangeText={text => handleChange(field.key, field.key === 'reviewCount' ? parseInt(text) || 0 : text)}
              placeholderTextColor={colors.brown(0.6)}
              multiline={field.multiline}
              keyboardType={field.keyboardType}
              style={field.style || textInput.content}
            />
          </View>
        ))}

        <View style={textInput.borderDashed}>
          <Text style={{fontSize: 12, fontFamily: fontType['Pjs-Regular'], color: colors.brown(0.6)}}>
            Category
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const selected = item.id === foodData.category?.id;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChange('category', {id: item.id, name: item.name})}
                  style={[category.item, {backgroundColor: selected ? colors.green() : colors.grey(0.08)}]}>
                  <Text style={[category.name, {color: selected ? colors.white() : colors.brown()}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update Food</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={loading} animationType="none" transparent>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.green()} />
        </View>
      </Modal>
    </View>
  );
};

export default EditFoodForm;

// Copy style & textInput from AddFoodForm or import if shared
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white()},
  header: {
    paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center',
    height: 52, elevation: 8, paddingTop: 8, paddingBottom: 4,
    backgroundColor: colors.green(),
  },
  title: {
    fontFamily: fontType['Pjs-Bold'], fontSize: 16, color: colors.white(),
  },
  bottomBar: {
    backgroundColor: colors.white(), alignItems: 'flex-end',
    paddingHorizontal: 24, paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20, paddingVertical: 10, backgroundColor: colors.green(),
    borderRadius: 20, justifyContent: 'center', alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14, fontFamily: fontType['Pjs-SemiBold'], color: colors.white(),
  },
  loadingOverlay: {
    flex: 1, backgroundColor: colors.black(0.4),
    justifyContent: 'center', alignItems: 'center',
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed', borderWidth: 1, borderRadius: 5,
    padding: 10, borderColor: colors.brown(0.4),
  },
  title: {
    fontSize: 16, fontFamily: fontType['Pjs-SemiBold'], color: colors.black(), padding: 0,
  },
  content: {
    fontSize: 12, fontFamily: fontType['Pjs-Regular'], color: colors.black(), padding: 0,
  },
});

const category = StyleSheet.create({
  container: {
    flexWrap: 'wrap', flexDirection: 'row', gap: 10, marginTop: 10,
  },
  item: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 25,
  },
  name: {
    fontSize: 10, fontFamily: fontType['Pjs-Medium'],
  },
});
