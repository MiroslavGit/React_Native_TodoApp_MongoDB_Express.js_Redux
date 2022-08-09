import React, { useState } from "react";
import { useSelector } from "react-redux";

import * as secureStore from "expo-secure-store";
import { Actions } from "react-native-router-flux";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const serverDomain = useSelector((state) => state.serverDomain);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    if (!username.length || !password.length) {
      return;
    }

    try {
      fetch(serverDomain + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.message);
          return res.json();
        })
        .then(async (data) => {
          await secureStore.setItemAsync(
            "accessToken",
            `Bearer ${data.accessToken}`
          );
          Actions.main();
        })
        .catch((err) => {
          alert(err);
          return;
        });

      setUsername("");
      setPassword("");
    } catch (err) {
      alert("oops, something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/favicon.png")}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(e) => setUsername(e)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
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
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#eee",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ccc",
  },

  loginText: {
    fontWeight: "500",
  },
});
