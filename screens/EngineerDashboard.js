import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SiteEngineerDashboard() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnim] = useState(new Animated.Value(-width * 0.6));
  const [activePage, setActivePage] = useState("Dashboard");
  const navigation = useNavigation();

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnim, {
        toValue: -width * 0.6,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMenuClick = (page) => {
    toggleMenu();
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case "Project Details":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🏗️ Project Details</Text>
            <Text style={styles.pageDesc}>
              View site details, track milestones, and upload site reports.
            </Text>
          </View>
        );

      case "Task Management":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🧱 Task Management</Text>
            <Text style={styles.pageDesc}>
              View, update progress, mark completion, or escalate issues.
            </Text>
          </View>
        );

      case "Document Management":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📁 Document Management</Text>
            <Text style={styles.pageDesc}>
              Upload logs, review blueprints, and handle RFIs efficiently.
            </Text>
          </View>
        );

      case "Equipment & Inventory":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🛠️ Equipment & Inventory</Text>
            <Text style={styles.pageDesc}>
              Update equipment usage and request additional resources.
            </Text>
          </View>
        );

      case "Subcontractor Assignment":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>👷‍♀️ Subcontractor Tasks</Text>
            <Text style={styles.pageDesc}>
              Assign tasks to subcontractors and track their progress.
            </Text>
          </View>
        );

      case "Attendance":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🕒 Attendance & Timesheet</Text>
            <Text style={styles.pageDesc}>
              Submit your daily and team attendance reports.
            </Text>
          </View>
        );

      case "Safety":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🦺 Safety Management</Text>
            <Text style={styles.pageDesc}>
              Log incidents and access important safety documentation.
            </Text>
          </View>
        );

      case "Communication":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>💬 Communication Center</Text>
            <Text style={styles.pageDesc}>
              Submit RFIs, send messages, and record meeting minutes.
            </Text>
          </View>
        );

      case "Logout":
        const logoutUser = () => navigation.navigate("Login");
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🔒 Logout</Text>
            <Text style={styles.pageDesc}>
              Are you sure you want to log out?
            </Text>
            <TouchableOpacity style={styles.card} onPress={logoutUser}>
              <Text style={styles.cardText}>Confirm Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => setActivePage("Dashboard")}
            >
              <Text style={styles.cardText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return (
          <View style={styles.dashboardContainer}>
            <Text style={styles.welcome}>👷‍♂️ Welcome, Site Engineer!</Text>
            <Text style={styles.subtitle}>
              Monitor assigned projects and manage your site operations.
            </Text>
            <FlatList
              data={[
                { title: "📂 Project Details" },
                { title: "🧱 Task Management" },
                { title: "📁 Document Management" },
                { title: "🛠️ Equipment & Inventory" },
              ]}
              numColumns={2}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    setActivePage(item.title.replace(/^[^ ]+\s/, ""))
                  }
                >
                  <Text style={styles.cardText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.cardContainer}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activePage === "Dashboard"
            ? "Site Engineer Dashboard"
            : activePage}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Overlay */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Sidebar Menu */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}
      >
        <Text style={styles.menuTitle}>Menu</Text>

        <TouchableOpacity
          onPress={() => handleMenuClick("Dashboard")}
          style={styles.menuItem}
        >
          <Ionicons name="home-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Project Details")}
          style={styles.menuItem}
        >
          <Ionicons name="business-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Project Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Task Management")}
          style={styles.menuItem}
        >
          <Ionicons name="clipboard-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Task Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Document Management")}
          style={styles.menuItem}
        >
          <Ionicons name="document-text-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Document Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Equipment & Inventory")}
          style={styles.menuItem}
        >
          <Ionicons name="construct-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Equipment & Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Subcontractor Assignment")}
          style={styles.menuItem}
        >
          <Ionicons name="people-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Subcontractor Task Assignment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Attendance")}
          style={styles.menuItem}
        >
          <Ionicons name="time-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Attendance / Timesheet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Safety")}
          style={styles.menuItem}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Safety Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Communication")}
          style={styles.menuItem}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Communication Center</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Logout")}
          style={styles.menuItem}
        >
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fc" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003366",
    padding: 15,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcome: { fontSize: 24, fontWeight: "700", color: "#003366" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8, textAlign: "center" },
  cardContainer: { paddingTop: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 15,
    margin: 10,
    elevation: 3,
    width: width / 2.4,
    alignItems: "center",
  },
  cardText: { fontSize: 16, color: "#003366", fontWeight: "600" },
  pageContainer: { padding: 20, alignItems: "center" },
  pageTitle: { fontSize: 22, fontWeight: "bold", color: "#003366" },
  pageDesc: { fontSize: 16, color: "#555", marginTop: 10, textAlign: "center" },
  sideMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.6,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  menuItem: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  menuText: { marginLeft: 10, fontSize: 16, color: "#003366" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
