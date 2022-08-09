import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RouterComponent from "./components/RouterComponent/RouterComponent";

import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers";

let store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RouterComponent />
        <StatusBar />
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
