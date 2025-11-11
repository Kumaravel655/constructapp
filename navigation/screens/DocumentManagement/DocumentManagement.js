import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import dummyData from "../tempJSON/dummy.json";

export default function DocumentManagement({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.dataList}
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DocumentCard data={item} />}
      />

      <TouchableOpacity
        style={styles.addDocumentBtn}
        onPress={() => {
          navigation.navigate("UploadDocument");
        }}
      >
        <Text style={styles.addDocumentText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function DocumentCard({ data }) {
  let cardStyle = [styles.documentCard];
  if (data.status === "Approved") cardStyle.push(styles.documentApproved);
  else if (data.status === "Rejected") cardStyle.push(styles.documentRejected);

  return (
    <View style={cardStyle}>
      <Text style={styles.documentTitle}>{data.title}</Text>
      <Text style={styles.documentText}>Project: {data.project}</Text>
      <Text style={styles.documentText}>Uploader: {data.uploader}</Text>
      <Text style={styles.documentText}>Upload Date: {data.uploadDate}</Text>
      <Text style={styles.statusText}>Status: {data.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
    alignItems: "center",
  },

  dataList: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  documentCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#003366", // default (pending)
  },

  documentApproved: {
    borderLeftColor: "#00b300ff",
  },

  documentRejected: {
    borderLeftColor: "#b30000ff", // red
  },

  documentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 6,
  },

  documentText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 1,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
    color: "#007AFF",
  },

  addDocumentBtn: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#003366",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  addDocumentText: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 3,
  },
});
