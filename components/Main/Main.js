import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm/AddTodoForm";
import TodoList from "./TodoList/TodoList";
import { StyleSheet, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <AddTodoForm />
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
