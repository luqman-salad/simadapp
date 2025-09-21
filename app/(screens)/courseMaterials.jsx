import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import useTheme from "../../hooks/usetheme";
import { Header } from "../../components/Headrer";

const materialTypes = ["Chapter", "Slides", "Assignment", "Homework"];

const CourseMaterialsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();
  const { courseId, courseTitle } = useLocalSearchParams();

  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null); // store picked file
  const [materials, setMaterials] = useState([]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.ms-powerpoint",
        ],
      });

      if (result.type === "success") {
        setFile(result); // only store file, wait for submit
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleSubmit = () => {
    if (!selectedType || !title.trim() || !file) {
      Alert.alert("Error", "Please fill in all fields and upload a file");
      return;
    }

    const newMaterial = {
      id: Date.now().toString(),
      type: selectedType,
      title,
      fileName: file.name,
      uri: file.uri,
    };

    setMaterials((prev) => [newMaterial, ...prev]);
    setTitle("");
    setSelectedType(null);
    setFile(null);

    Alert.alert("Success", "Material uploaded successfully!");
  };

  const renderMaterial = ({ item }) => (
    <View style={styles.materialCard}>
      <Ionicons name="document-outline" size={24} color={colors.primary} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.materialTitle}>{item.title}</Text>
        <Text style={styles.materialSubtitle}>
          {item.type} • {item.fileName}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.Wrapper}>
      <Header
        title="Course Materials"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />

      <View style={styles.container}>
        {/* Material Type Selection */}
        <Text style={styles.label}>Select Material Type</Text>
        <View style={styles.typeContainer}>
          {materialTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === type && { color: colors.white },
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Title Input */}
        <Text style={styles.label}>Material Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter material title"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        {/* Upload File Button */}
        <TouchableOpacity style={styles.uploadBtn} onPress={handlePickDocument}>
          <Ionicons name="cloud-upload-outline" size={22} color={colors.text} />
          <Text style={styles.uploadBtnText}>
            {file ? `File: ${file.name}` : "Upload File"}
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.uploadBtn, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Ionicons name="checkmark-done" size={22} color={colors.white} />
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>

        {/* Uploaded List */}
        <Text style={styles.sectionTitle}>Uploaded Materials</Text>
        <FlatList
          data={materials}
          keyExtractor={(item) => item.id}
          renderItem={renderMaterial}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No materials uploaded yet.</Text>
          }
        />
      </View>
    </View>
  );
};

export default CourseMaterialsScreen;

const createStyle = (colors) =>
  StyleSheet.create({
    Wrapper: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginTop: 15,
      marginBottom: 5,
    },
    typeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    typeButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    typeButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      marginBottom: 15,
    },
    uploadBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border
    },
    submitBtnText:{
      color: colors.white,
      fontWeight: "bold",
      fontSize: 16,
    },
    uploadBtnText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginVertical: 10,
    },
    materialCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    materialTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    materialSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    emptyText: {
      textAlign: "center",
      marginTop: 20,
      color: colors.textSecondary,
    },
  });
