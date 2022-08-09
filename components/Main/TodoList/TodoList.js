import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTodos } from "../../../actions/todos";
import TodoItem from "./TodoItem";

import * as secureStore from "expo-secure-store";
import FilterSelector from "../FilterSelector/FilterSelector";

import { MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function TodoList() {
  const dispatch = useDispatch();
  const serverDomain = useSelector((state) => state.serverDomain);
  const filter = useSelector((state) => state.filter);
  const items = useSelector((state) => state.todos);

  let notStarted = [];
  let active = [];
  let ended = [];

  const getTodos = async () => {
    fetch(serverDomain + "/todo", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: await secureStore.getItemAsync("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(loadTodos(data)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  items.forEach((item) => {
    const newItem = <TodoItem item={item} />;
    switch (item.state) {
      case 0:
        notStarted.push(newItem);
        break;
      case 1:
        active.push(newItem);
        break;
      case 2:
        ended.push(newItem);
        break;
      default:
        console.log("Invalid todo status");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {("0" === filter || filter === "-1") && notStarted}
        {("1" === filter || filter === "-1") && active}
        {("2" === filter || filter === "-1") && ended}
      </ScrollView>
      <TouchableOpacity style={styles.refreshButton} onPress={getTodos}>
        <MaterialIcons name="refresh" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={Actions.login}>
        <MaterialIcons name="logout" size={30} color="black" />
      </TouchableOpacity>
      <FilterSelector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  refreshButton: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#eee",
    padding: 10,
    right: 20,
    bottom: 20,
  },

  logoutButton: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#eee",
    padding: 10,
    left: 20,
    bottom: 20,
  },
});
