import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const components = ({ id, name, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.badge} />
        <Text style={{ fontSize: 15 }}>{name}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onDelete(id)}>
        <Text style={{ fontSize: 18, color: "red" }}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "#dedede",
    marginRight: 20,
  },
});

export default components;
