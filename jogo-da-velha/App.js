import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import Figura from './components/figura';
import { useState } from 'react';

let array = new Array(9).fill(0);

export default function App() {
  const [values, setValues] = useState({
    isCross: true,
    winMessage: "",
  });
  const [refresh, setRefresh] = useState(false);

  const resetGame = () => {
    setRefresh(true);
    array.fill(0);
    setValues({ isCross: true, winMessage: "" });
    setRefresh(false);
  }

  const changeMove = (number) => {
    if (array[number] === 0 && !values.winMessage) {
      array[number] = values.isCross;
      setValues({ isCross: !values.isCross });
      winGame(number);
    }
  }

  const winGame = (number) => {
    if (
      // Linhas
      (array[0] === array[number] && array[1] === array[number] && array[2] === array[number])
      || (array[3] === array[number] && array[4] === array[number] && array[5] === array[number])
      || (array[6] === array[number] && array[7] === array[number] && array[8] === array[number])
      // Colunas
      || (array[0] === array[number] && array[3] === array[number] && array[6] === array[number])
      || (array[1] === array[number] && array[4] === array[number] && array[7] === array[number])
      || (array[2] === array[number] && array[5] === array[number] && array[8] === array[number])
      //Diagonais
      || (array[0] === array[number] && array[4] === array[number] && array[8] === array[number])
      || (array[2] === array[number] && array[4] === array[number] && array[6] === array[number])
    ) {
      setValues({ ...values, winMessage: array[number] ? "X Venceu" : "O Venceu" });
    } else if (array.every((element) => element != 0)) {
      setValues({ ...values, winMessage: "Empate" });
    }
  }

  const getStyle = (number) => {
    switch (number) {
      case 0: return styles.p0
      case 1: return styles.p1
      case 2: return styles.p2
      case 3: return styles.p3
      case 5: return styles.p5
      case 6: return styles.p6
      case 7: return styles.p7
      case 8: return styles.p8
    };
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => resetGame()} />
      }
    >
      <Text style={styles.text}>Jogo da Velha</Text>
      <View style={styles.row}>
        <View style={[styles.box, getStyle(0)]}>
          <Figura vetor={array} posicao={0} clicado={() => changeMove(0)} />
        </View>
        <View style={[styles.box, getStyle(1)]}>
          <Figura vetor={array} posicao={1} clicado={() => changeMove(1)} />
        </View>
        <View style={[styles.box, getStyle(2)]}>
          <Figura vetor={array} posicao={2} clicado={() => changeMove(2)} />
        </View>
        <View style={[styles.box, getStyle(3)]}>
          <Figura vetor={array} posicao={3} clicado={() => changeMove(3)} />
        </View>
        <View style={styles.box}>
          <Figura vetor={array} posicao={4} clicado={() => changeMove(4)} />
        </View>
        <View style={[styles.box, getStyle(5)]}>
          <Figura vetor={array} posicao={5} clicado={() => changeMove(5)} />
        </View>
        <View style={[styles.box, getStyle(6)]}>
          <Figura vetor={array} posicao={6} clicado={() => changeMove(6)} />
        </View>
        <View style={[styles.box, getStyle(7)]}>
          <Figura vetor={array} posicao={7} clicado={() => changeMove(7)} />
        </View>
        <View style={[styles.box, getStyle(8)]}>
          <Figura vetor={array} posicao={8} clicado={() => changeMove(8)} />
        </View>
      </View>
      <Text style={styles.winMessage}>{values.winMessage}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#000'
  },
  winMessage: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  p0: {
    borderTopWidth: 0,
    borderLeftWidth: 0
  },
  p1: {
    borderTopWidth: 0,
  },
  p2: {
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  p3: {
    borderLeftWidth: 0,
  },
  p5: {
    borderRightWidth: 0
  },
  p6: {
    borderBottomWidth: 0,
    borderLeftWidth: 0
  },
  p7: {
    borderBottomWidth: 0,
  },
  p8: {
    borderBottomWidth: 0,
    borderRightWidth: 0
  }
});
