import React from 'react';
import {
  Dimensions, StyleSheet, ScrollView, Alert, Platform, TouchableOpacity, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// galio components
import {
  Text, Block, Button, Card, NavBar, Input, Icon, Accordion
} from 'galio-framework';
import theme from '../theme';

const {height,  width } = Dimensions.get('screen');

class Registros extends React.Component {
  render() {
    const { navigation } = this.props;

    const data = [
        { title: "07/12/2019 11:35 hrs", content: "Se han detectado 1 intruos"},
        { title: "07/12/2019 10:23 hrs", content: "Se han detectado 4 intruos" },
        { title: "07/12/2019 9:25 hrs", content: "Se han detectado 1 intruos" },
        { title: "07/12/2019 7:32 hrs", content: "Se han detectado 5 intruos"},
        { title: "07/12/2019 3:24 hrs", content: "Se han detectado 1 intruos" },
        { title: "07/12/2019 1:23 hrs", content: "Se han detectado 5 intruos" },
        { title: "06/12/2019 11:32 hrs", content: "Se han detectado 4 intruos"},
        { title: "06/12/2019 10:56 hrs", content: "Se han detectado 3 intruos" },
        { title: "06/12/2019 10:55 hrs", content: "Se han detectado 3 intruos" },
        { title: "06/12/2019 10:35 hrs", content: "Se han detectado 4 intruos"},
        { title: "06/12/2019 10:30 hrs", content: "Se han detectado 3 intruos" },
        { title: "06/12/2019 9:34 hrs", content: "Se han detectado 4 intruos" }
      ];

    return (
      <Block safe flex>
        <NavBar
          title="Registros"

          left={(
            <TouchableOpacity onPress={() => navigation.navigate('Configuration')}>
              <Icon 
                name="chevron-left"
                family="feather"
                size={40}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Accordion style={styles.card} 
        dataArray={data} />

        </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  button: {
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE / 2,
    backgroundColor: theme.COLORS.TRANSPARENT,
  },
  cardNoRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardAvatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  cardTitle: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  cardImageContainer: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  cardImageRadius: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  cardImage: {
    width: 'auto',
    height: theme.SIZES.BASE * 12.5,
  },
  cardRounded: {
    borderRadius: theme.SIZES.BASE * 0.5,
  },
  cardFull: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default Registros;
