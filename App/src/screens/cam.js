import React, { Component } from 'react';
//var encodedData = undefined;
//import * as React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  PropTypes,
  Image,
  View,
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';
import {
    Block, Button, Input, NavBar, Text, Icon,
  } from 'galio-framework';
import theme from '../theme';

import Constants from 'expo-constants';
const { height, width } = Dimensions.get('window');


let encodedData =
  'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAEKWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIwMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwMCIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMDAiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjIwMCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iMzAwLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjMwMC4wIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMi0wNlQxODozMDoyOC0wNjowMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMi0wNlQxODozMDoyOC0wNjowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InByb2R1Y2VkIgog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';
var people = 0;
var info = "conexion no establecida";
var time = 0;

class Cam extends Component {
      constructor(props) {
        super(props);
        this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon = () => {
    const { navigation } = this.props;

  fetch('https://ef7e0e28.ngrok.io/vigia/api/client_livefeed')
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson.img[73511]);
          info = 'conexion establecida';
          encodedData = responseJson.img;
          people = responseJson.people;
          time = responseJson.datetime;
        });

    let data = encodedData;
    var content = <Image source={{uri: `data:image/gif;base64,${data}`}} 
    style={styles.borde} />
    var person = people + " Personas Detectadas";
    var fecha = "Fecha: "+ time.day + "/" + time.month + "/" + time.year + " "+ time.hour+":" + time.minute + " hrs";

    return(
    
        <Block safe flex style={{ backgroundColor: '#003C64', flex: 1 }}>
        <NavBar
          title="Live Cam"
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
        <KeyboardAvoidingView style={styles.header} behavior="height" enabled>
          <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
            <Text muted center size={theme.SIZES.FONT} style={{ paddingHorizontal: theme.SIZES.BASE}}>
              Aquí puedes ver lo que sucede frente a tu cámara en tiempo real
            </Text>
          </Block>
    <View>        
        {content}
        </View>

        <Block flex={2} center space="evenly">
            <Block flex middle>
              <Button style={{marginBottom: 20}}
                round
                disabled='true'
                color="#003C64"
              >{person}
              </Button>
              <Button
              style={{marginBottom: 20}}
                round
                disabled='true'
                color="#003C64"
              >
                {fecha}
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    )

  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

   return (
       this.renderIcon()
   );
 }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    borde: {
        width: 350, 
        height: 260,
        borderWidth: 5,
        borderColor: '#003C64',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: theme.SIZES.BASE * 0.3,
        paddingHorizontal: theme.SIZES.BASE,
        backgroundColor: theme.COLORS.WHITE,
      },
  })

export default Cam;
