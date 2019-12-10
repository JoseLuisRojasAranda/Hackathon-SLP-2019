import React from 'react';
import {
  Dimensions, StyleSheet, Platform, View,
} from 'react-native';
// galio components
import {
  Button, Icon, Block, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');
const BASE_SIZE = theme.SIZES.BASE;
const COLOR_WHITE = theme.COLORS.WHITE;





class Grid extends React.Component {
  
  render() {
    
const grids = [
  {
    title: 'Conectar',
    code: 'Connect',
    icon: 'cast',
    family: 'Material',
  },
  {
    title: 'Horarios de Vigilancia',
    code: 'horarios',
    icon: 'alarm',
    family: 'Material',
  },
  {
    title: 'Live Cam',
    code: 'cam',
    icon: 'videocam',
    family: 'Material',
  },
  {
    title: 'Historial',
    code: 'Registros',
    icon: 'security',
    family: 'Material',
  },
  {
    title: 'Notificaciones',
    code: 'notifications',
    icon: 'notifications',
    family: 'Material',
  },
  {
    title: 'Acerca de',
    code: 'about',
    icon: 'info',
    family: 'Material',
  },
];

    const chunk = (arr, size) => {
      const list = new Array(Math.ceil(arr.length / size)).fill()
        .map(() => arr.splice(0, size));
      return list;
    };

    const { navigation } =  this.props;
    return (
      <View style={{flex:1}}>
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE}}>
        <NavBar
          fix
          title="Configuración"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Block style={styles.grid}>
          {
            chunk(grids, 2).map((row, rowId) => (
              <Block row space="evenly" key={`row-${rowId}`}>
                {
                  row.map(grid => (
                    <Block shadow middle style={styles.block} key={`grid-${grid.title}}`}>
                      <Button color="transparent" style={styles.button}  onPress={() => navigation.navigate(grid.code)}>
                        <Block flex middle>
                        <Icon name={grid.icon} family={grid.family} size={BASE_SIZE * 1.875} color={'#003C64'} />
                          <Text size={BASE_SIZE * 0.88}>
                            {grid.title}
                            {' '}
                          </Text>
                        </Block>
                      </Button>
                    </Block>
                  ))
                }
              </Block>
            ))
          }
        </Block>
        </Block>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  grid: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  block: {
    backgroundColor: COLOR_WHITE,
    borderRadius: BASE_SIZE / 2,
    height: width * 0.35,
    width: width * 0.35,
    shadowOpacity: 0.4,
    elevation: BASE_SIZE / 2,
  },
  button: {
    width: 'auto',
    height: 'auto',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});

export default Grid;
