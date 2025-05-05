import { StyleSheet, View, TextInput, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SearchNormal1, Add } from 'iconsax-react-native';
import { fontType, colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.barContainer, { width: animatedWidth }]}>
        <View style={styles.bar}>
          <SearchNormal1 size="18" color={colors.grey(0.5)} />
          <TextInput
            style={styles.textinput}
            placeholder="What do you want to eat?"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            placeholderTextColor={colors.grey(0.5)}
            autoFocus={true}
          />
          {searchPhrase && (
            <TouchableOpacity onPress={() => setSearchPhrase('')}>
              <Add size="18" color={colors.grey(0.5)} style={{ transform: [{ rotate: '45deg' }] }} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    borderRadius: 10,
    flex: 1,
  },
  textinput: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
    lineHeight: 18,
    padding: 0,
    flex: 1,
  },
});