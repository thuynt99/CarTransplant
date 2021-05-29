import {Body, Header, Icon, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import theme from '../../../theme';
import HeaderCustom from '../../common/HeaderCustom';

export default class SearchAddress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onPressAddress, goToMapScreen} = this.props;
    return (
      <View style={styles.container}>
        <HeaderCustom title="Chọn điểm" onGoBack={goToMapScreen} />
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image
              style={[styles.icon, styles.inputIcon]}
              source={{
                uri:
                  'https://img.icons8.com/fluent-systems-regular/48/000000/search-location.png',
              }}
            />
            <TextInput
              style={styles.inputs}
              ref={'txtPassword'}
              placeholder="Search"
              underlineColorAndroid="transparent"
              onChangeText={name_address =>
                this.props.onSearchAddress(name_address)
              }
            />
          </View>
        </View>
        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={this.props?.listAddress}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.notificationBox}
                onPress={() => {
                  onPressAddress(item);
                  goToMapScreen();
                }}>
                <Icon
                  name="location-pin"
                  type="Entypo"
                  style={{color: theme.primaryColor}}
                />
                <Text style={styles.description}>{item.display_name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  saveButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius: 30,
  },
  saveButtonText: {
    color: 'white',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    alignContent: 'center',
  },
  image: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: '14@ms',
    paddingHorizontal: 10,
  },
});
