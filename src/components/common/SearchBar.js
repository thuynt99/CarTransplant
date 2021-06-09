import React, {useEffect, useState} from 'react';
import {Item, Icon, Input} from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import theme from '../../theme';
import {ScaledSheet} from 'react-native-size-matters';

const SearchInput = props => {
  const [text, setText] = useState('');

  const navigator = useNavigation();

  const {autoFocus, onSearchText} = props;
  return (
    <Item rounded style={styles.searchInput}>
      <Input
        placeholder="Nhập để tìm kiếm sách"
        autoFocus={autoFocus}
        onChangeText={text => {
          setText(text);
          onSearchText(text);
        }}
        value={text}
        autoCapitalize={'none'}
        onSubmitEditing={() => onSearchText(text)}
      />
      <TouchableOpacity
        onPress={() => {
          if (setText) {
            setText('');
            onSearchText('');
          }
        }}>
        <Icon name="close" type="AntDesign" />
      </TouchableOpacity>
    </Item>
  );
};

const styles = ScaledSheet.create({
  searchInput: {
    backgroundColor: theme.white,
    marginTop: '10@vs',
    paddingHorizontal: '16@s',
    alignSelf: 'center',
  },
});

export default SearchInput;
