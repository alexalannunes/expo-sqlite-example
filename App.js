import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import Items from "./components/Items";
// import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("db.db", "1.0", "test", 2 * 1024 * 1024);

console.clear();

const id = () => (Math.random() * 10000) | 0;

// FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) => {
//   // Android: 17179869184
//   // iOS: 17179869184
//   console.log(freeDiskStorage);
// });

// console.log(`${FileSystem.documentDirectory}SQLite/db.db`);

export default function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch();

    return () => (mounted = false);
  }, []);

  // function create_table() {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS owes(id integer primary key not null, name text)"
  //     );
  //   });
  // }

  // function delete_table() {
  //   db.transaction((tx) => {
  //     tx.executeSql("DELETE FROM owes");
  //   });
  // }

  function fetch() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM owes ORDER BY name",
        [],
        (_, { rows: { _array } }) => {
          setData(_array);
        }
      );
    });
  }

  function add() {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO owes(id, name) VALUES(?,?)",
        [id(), value],
        (_, result) => {
          setValue("");
          fetch();
        }
      );
    });
  }

  function onDelete(id) {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM owes WHERE id = ?", [id], (_, result) => {
        fetch();
      });
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.header}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>ToDO</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {data.length}
          </Text>
        </View>
        {data &&
          data.map(({ id, name }) => (
            <Items key={id} id={id} name={name} onDelete={onDelete} />
          ))}

        <TextInput
          value={value}
          style={styles.input}
          placeholder="type here..."
          onChangeText={setValue}
        />
        <Button title="Add" onPress={add} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: "#fff",
  },
  input: {
    padding: 10,
    marginTop: 20,
    borderColor: "#08C",
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
});
