import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {

  const [numero, setNumero] = useState(0);
  const [botao, seBotao] = useState('VAI');
  const [ultimo, setUltimo] = useState(null);
  const [color, setColor] = useState('#00aeef')
  const [selectColor, setSeletcColor] = useState ([
    { key: 1, valor: "#00aeef",  nome:"Azul" },
    { key: 2, valor: "#C3C3C3", nome:"Cinza" },
    { key: 3, valor: "#FE641C", nome:"Laranja" },
    { key: 4, valor: "#9200FE", nome:"Roxo" },
    { key: 5, valor: "#1F8900", nome:"Verde" },
    { key: 6, valor: "#E50000", nome:"Vermelho" },
  ])

  let colorsItem = selectColor.map((item, key) =>{
    return <Picker.Item key={key} value={item.valor} label={item.nome} />
  })


  function vai() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;

      seBotao('VAI')
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;
        }

        if (mm === 60) {
          mm = 0;
          hh++;
        }

        if (hh === 24) {
          hh = 0;
        }
        let format =
          (hh < 10 ? '0' + hh : hh) + ' : ' +
          (mm < 10 ? '0' + mm : mm) + ' : ' +
          (ss < 10 ? '0' + ss : ss)

        setNumero(format)
      }, 1000);

      seBotao('PARAR');

    }
  }

  function limpar() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero)
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    seBotao('VAI')
  }

  return (
    <View style={[styles.container,{backgroundColor: color}]}>
      <View style={[styles.containerSelectColor, {backgroundColor: color}]}>
        <Text style={styles.textContainerSelect}>Cor de fundo </Text>
        <Picker
          selectedValue={color}
          onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
        >
         {colorsItem}
        </Picker>
      </View>
      <Image
        source={require('./src/images/crono.png')} 
      />
      <Text style={styles.timer}>{numero === 0 ? '00 : 00 : 00' : numero}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={[styles.btnTexto, {color: color}]}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={[styles.btnTexto, {color: color}]}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo ? 'Ultimo tempo: ' + ultimo : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },

  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 17,
    backgroundColor: '#fff',
    borderRadius: 9,
  },

  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },

  areaUltima: {
    marginTop: 40,
  },

  textoCorrida: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic',
  },

  containerSelectColor:{
    marginBottom: 60,
    backgroundColor: '#00aeef',
    padding: 5,
    width: '50%'
  },

  textContainerSelect:{
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }

});
