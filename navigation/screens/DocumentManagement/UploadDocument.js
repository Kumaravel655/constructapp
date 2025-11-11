import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function UploadDocument({ navigation }) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const fileData = result.assets[0];
        setFile(fileData);
        console.log("Selected file:", fileData);
      } else {
        console.log("User cancelled file picker");
      }
    } catch (err) {
      console.warn("File picker error:", err);
    }
  };

  const handleUpload = () => {
    if (!title || !project || !file) {
      Alert.alert("Missing info", "Please fill all fields and select a file.");
      return;
    }

    Alert.alert(
      "Document Uploaded",
      `Title : ${title}\nProject : ${project}\nFile : ${file.name}`
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>📁 Upload New Document</Text> */}

      <TextInput
        placeholder="Document Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Project Name"
        value={project}
        onChangeText={setProject}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.fileBtn} onPress={pickFile}>
        <Text style={styles.fileBtnText}>
          {file ? `Selected: ${file.name}` : "Choose File"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  fileBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 25,
  },
  fileBtnText: {
    color: "#003366",
    fontWeight: "600",
  },
  uploadBtn: {
    backgroundColor: "#003366",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  uploadText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
