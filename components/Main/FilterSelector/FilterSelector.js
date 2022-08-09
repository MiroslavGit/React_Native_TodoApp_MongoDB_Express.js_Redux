import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../actions/filter";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";

export default function FilterSelector() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const displayAnim = useRef(new Animated.Value(show ? 20 : -60)).current;

  useEffect(() => {
    Animated.spring(displayAnim, {
      toValue: show ? 20 : -60,
      duration: 200,
    }).start();
  }, [show]);

  const handleFilter = (newFilter) => {
    dispatch(setFilter(newFilter === filter ? "-1" : newFilter));
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.filterButtonsContainer, { right: displayAnim }]}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: filter === "2" ? "#ccc" : "#eee" },
          ]}
          onPress={() => handleFilter("2")}
        >
          <MaterialIcons name="done" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === "1" ? "#ccc" : "#eee",
            },
          ]}
          onPress={() => handleFilter("1")}
        >
          <MaterialCommunityIcons
            name="progress-check"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: filter === "0" ? "#ccc" : "#eee" },
          ]}
          onPress={() => handleFilter("0")}
        >
          <MaterialIcons name="close" size={30} color="black" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[
          styles.filterDropdownButton,
          { backgroundColor: show ? "#ccc" : "#eee" },
        ]}
        onPress={() => setShow(!show)}
      >
        <MaterialIcons name="filter-alt" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },

  filterDropdownButton: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#eee",
    padding: 10,
    right: 20,
    bottom: 80,
  },

  filterButtonsContainer: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#eee",
    padding: 0,
    bottom: 140,
  },

  filterButton: {
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 10,
  },
});
