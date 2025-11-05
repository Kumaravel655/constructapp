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

export default function SubcontractorDashboard() {
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

  // Page content renderer
  const renderContent = () => {
    switch (activePage) {
      case "Assigned Tasks":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🧱 Assigned Tasks</Text>
            <Text style={styles.pageDesc}>
              View your assigned tasks, update their progress, and mark them as completed.
            </Text>
          </View>
        );

      case "Progress Reports":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📸 Progress Photos & Reports</Text>
            <Text style={styles.pageDesc}>
              Upload images, videos, and progress reports for ongoing work.
            </Text>
          </View>
        );

      case "Documents":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📂 Document Access</Text>
            <Text style={styles.pageDesc}>
              View approved blueprints, drawings, and specifications for your tasks.
            </Text>
          </View>
        );

      case "Time Logging":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🕒 Time Logging</Text>
            <Text style={styles.pageDesc}>
              Submit your working hours and time spent on assigned tasks.
            </Text>
          </View>
        );

      case "Communication":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>💬 Communication Center</Text>
            <Text style={styles.pageDesc}>
              Exchange messages related to specific tasks and project updates.
            </Text>
          </View>
        );

      case "Compliance":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📜 Compliance & Certifications</Text>
            <Text style={styles.pageDesc}>
              Upload necessary insurance documents, safety licenses, and certifications.
            </Text>
          </View>
        );

      case "Invoices":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>💰 Invoice Submission</Text>
            <Text style={styles.pageDesc}>
              Submit invoices for completed work and track approval statuses.
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
            <Text style={styles.welcome}>👷 Welcome, Subcontractor!</Text>
            <Text style={styles.subtitle}>
              Track your assigned tasks and manage site work updates easily.
            </Text>

            <FlatList
              data={[
                { title: "🧱 Assigned Tasks" },
                { title: "📸 Progress Reports" },
                { title: "📂 Documents" },
                { title: "🕒 Time Logging" },
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
            ? "Subcontractor Dashboard"
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

      {/* Side Menu */}
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
          onPress={() => handleMenuClick("Assigned Tasks")}
          style={styles.menuItem}
        >
          <Ionicons name="clipboard-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Assigned Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Progress Reports")}
          style={styles.menuItem}
        >
          <Ionicons name="camera-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Progress Photos & Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Documents")}
          style={styles.menuItem}
        >
          <Ionicons name="document-text-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Document Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Time Logging")}
          style={styles.menuItem}
        >
          <Ionicons name="time-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Time Logging</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Communication")}
          style={styles.menuItem}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Communication Center</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Compliance")}
          style={styles.menuItem}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Compliance / Certifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Invoices")}
          style={styles.menuItem}
        >
          <Ionicons name="cash-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Invoice Submission</Text>
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
