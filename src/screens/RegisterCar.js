import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  View,
  Spinner,
  Center,
  NativeBaseProvider,
} from 'native-base';
import React, {Component} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../theme';
import {Text, TextInput, StyleSheet, Alert} from 'react-native';
import HeaderCustom from '../components/common/HeaderCustom';
import {Formik} from 'formik';
import RegisterCarSchema from '../validation/RegisterCarSchema';
import {connect} from 'react-redux';
import {getListMyCar, registerCar} from '../stores/cars/actions';
import {CAR_MANAGEMENT} from '../constants';

class RegisterCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {car} = nextProps;
    return {loading: car.loading};
  }
  onGoBack = () => {
    this.props.navigation.goBack();
  };
  onSubmit = values => {
    console.log('values', values);
    const body = {
      ...values,
      seat: parseInt(values.seat),
    };
    this.props.registerCar(JSON.stringify(body)).then(res => {
      console.log('res', res);
      if (res.status) {
        this.props.getListMyCar({
          limit: 20,
        });
        Alert.alert(
          'Thông báo',
          'Bạn đã thêm xe thành công!\n Đi đễn màn hình quản lý xe?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate(CAR_MANAGEMENT),
            },
          ],
        );
      } else {
        Alert.alert('Thông báo', 'Thêm xe thất bại!\n Bạn hãy thử lại', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
  };

  render() {
    const listInfoCar = [
      {
        id: 1,
        label: 'Thương hiệu xe',
        value: 'vehicleBrand',
      },
      {
        id: 2,
        label: 'Dòng xe',
        value: 'model',
      },
      {
        id: 3,
        label: 'Biển số xe',
        value: 'licensePlate',
      },
      {
        id: 4,
        label: 'Màu sắc',
        value: 'color',
      },
      {
        id: 5,
        label: 'Số chỗ',
        value: 'seat',
      },
    ];
    const {loading} = this.state;
    return (
      <Container>
        <HeaderCustom title="Thêm xe mới" onGoBack={this.onGoBack} />
        {loading && (
          <Spinner
            color={theme.primaryColor}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        )}
        <Content>
          <Formik
            initialValues={{}}
            validationSchema={RegisterCarSchema}
            onSubmit={values => this.onSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={styles.form}>
                  {listInfoCar.map(item => {
                    return (
                      <View key={item.id}>
                        <Text style={styles.inputTitle}>{item.label}</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange(item.value)}
                          onBlur={handleBlur(item.value)}
                          value={values[item.value]}
                          keyboardType={item.id === 5 ? 'numeric' : 'default'}
                        />
                        {errors[item.value] && touched[item.value] ? (
                          <Text style={styles.error}>{errors[item.value]}</Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
                <Button
                  full
                  style={{backgroundColor: theme.primaryColor}}
                  onPress={handleSubmit}>
                  <Text style={{color: theme.white}}>Hoàn tất</Text>
                </Button>
              </View>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  inputTitle: {
    color: theme.grey_dark_30,
    fontSize: '16@ms',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  error: {
    color: theme.primaryColor,
    fontSize: '13@ms',
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginVertical: '20@vs',
    marginHorizontal: '16@s',
  },
});
const mapStateToProps = state => ({
  car: state.car,
});

const mapDispatchToProps = dispatch => ({
  registerCar: params => dispatch(registerCar(params)),
  getListMyCar: params => dispatch(getListMyCar(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterCar);
