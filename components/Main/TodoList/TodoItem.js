import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodoState } from "../../../actions/todos";

import * as secureStore from "expo-secure-store";
import Swipeable from "react-native-swipeable";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function TodoItem(props) {
  const dispatch = useDispatch();
  const serverDomain = useSelector((state) => state.serverDomain);
  const item = props.item;
  let itemClass;

  switch (item.state) {
    case 1:
      itemClass = styles.active;
      break;
    case 2:
      itemClass = styles.ended;
      break;
    default:
      itemClass = styles.notStarted;
  }

  const handleUpdate = async (itemId, newState) => {
    fetch(serverDomain + "/todo/" + itemId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: await secureStore.getItemAsync("accessToken"),
      },
      body: JSON.stringify({
        newState: newState,
      }),
    })
      .then((res) => res.json())
      .then(() => dispatch(updateTodoState(itemId, newState)))
      .catch((err) => alert(err));
  };

  const handleDelete = async (itemId) => {
    fetch(serverDomain + "/todo/" + itemId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: await secureStore.getItemAsync("accessToken"),
      },
    })
      .then((res) => res.json())
      .then(() => dispatch(deleteTodo(itemId)))
      .catch((err) => console.error(err));
  };

  const deleteButton = [
    <TouchableOpacity
      style={[styles.todoButton, styles.deleteButton]}
      onPress={() => handleDelete(item._id)}
    >
      <MaterialIcons name="delete" size={30} color="black" />
    </TouchableOpacity>,
  ];

  return (
    <View style={[styles.todoContainer, itemClass]} key={item._id}>
      <Swipeable rightButtons={deleteButton} rightButtonWidth={100}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.todoText}>{item.text}</Text>
          <View style={styles.todoButtonsContainer}>
            {item.state !== 2 && (
              <TouchableOpacity
                style={styles.todoButton}
                onPress={() => handleUpdate(item._id, 2)}
              >
                <MaterialIcons name="done" size={25} color="black" />
              </TouchableOpacity>
            )}
            {item.state !== 1 && (
              <TouchableOpacity
                style={styles.todoButton}
                onPress={() => handleUpdate(item._id, 1)}
              >
                <MaterialCommunityIcons
                  name="progress-check"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            )}
            {item.state !== 0 && (
              <TouchableOpacity
                style={styles.todoButton}
                onPress={() => handleUpdate(item._id, 0)}
              >
                <MaterialIcons name="close" size={25} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  notStarted: {
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#fff940",
  },
  ended: {
    backgroundColor: "#40ff73",
  },

  todoContainer: {
    flexDirection: "row",
    minWidth: "100%",
    minHeight: 60,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  todoButtonsContainer: {
    flexDirection: "row",
    maxWidth: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  todoButton: {
    padding: 10,
    paddingTop: 17.5,
    minHeight: 60,
  },

  deleteButton: {
    padding: 0,
    paddingTop: 0,
    paddingLeft: 35,
    backgroundColor: "#ff1f1f",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },

  todoText: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
});
