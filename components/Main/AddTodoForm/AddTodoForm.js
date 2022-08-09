import React, { useState } from "react";
import { addTodo } from "../../../actions/todos";

import { useSelector, useDispatch } from "react-redux";
import * as secureStore from "expo-secure-store";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

export default function AddTodoForm() {
  const serverDomain = useSelector((state) => state.serverDomain);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.length) {
      return;
    }

    fetch(serverDomain + "/todo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: await secureStore.getItemAsync("accessToken"),
      },
      body: JSON.stringify({
        text: inputText,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(addTodo(data));
      });
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="New todo"
          placeholderTextColor="#003f5c"
          value={inputText}
          onChangeText={(e) => setInputText(e)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.addBtn}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 30,
    marginTop: 70,
  },

  inputView: {
    backgroundColor: "#eee",
    width: "80%",
    height: 50,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },

  textInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
    padding: 10,
  },

  addBtn: {
    width: "20%",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },

  addText: {
    fontWeight: "500",
  },
});
