import React, {useContext, useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {Card} from 'native-base';
import HeaderCustom from '../components/common/HeaderCustom';
import {s, ScaledSheet} from 'react-native-size-matters';
import theme from '../theme';
import moment from 'moment';
import {FORMAT} from '../constants/format';

class NotificationDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {item} = this.props.route.params;
    return (
      <View style={styles.container}>
        <HeaderCustom title="Thông báo" onGoBack={this.goBack} />
        <Card style={styles.card}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.head}>
            <View>
              <Text>CAR TRANSPLANT</Text>
              <Text style={styles.subTitle}>cartransplantvn@gmail.com</Text>
            </View>
            <View>
              <Text style={styles.time}>
                {moment(item.createdDate).format(FORMAT.TIME_DATE)}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            {item.image ? (
              <Image style={styles.attachment} source={{uri: item.image}} />
            ) : null}
            <Text style={styles.textBody}>{item.message}</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 8,
    marginLeft: '16@s',
    marginTop: '30@vs',
    marginRight: '16@s',
    marginBottom: '30@vs',
    flex: 1,
  },
  notiTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleView: {
    backgroundColor: theme.grey_light,
    paddingVertical: '16@vs',
    marginTop: '16@vs',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14@ms',
  },
  head: {
    flexDirection: 'row',
    paddingVertical: '20@vs',
    paddingHorizontal: '16@s',
  },
  body: {
    paddingHorizontal: '16@s',
  },
  textBody: {
    fontSize: '14@ms',
    textAlign: 'justify',
    marginTop: '10@vs',
  },
  subTitle: {
    color: theme.grey_light,
    fontSize: '13@ms',
  },
  time: {
    color: theme.grey_dark_300,
    fontSize: '13@ms',
  },
  attachment: {
    height: '120@ms',
    width: '120@ms',
    alignSelf: 'center',
    marginBottom: '16@vs',
  },
});

export default NotificationDetailScreen;
