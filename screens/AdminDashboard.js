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

export default function App() {
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

  // Dashboard sections content
  const renderContent = () => {
    switch (activePage) {
      case "Projects":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📂 Project Management</Text>
            <Text style={styles.pageDesc}>
              View, track, and manage all ongoing construction projects here.
            </Text>
          </View>
        );
        case "Documents":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📁 Document Management</Text>
            <Text style={styles.pageDesc}>
              Organize and access all project-related documents and files.
            </Text>
          </View>
        );  

      case "Vendors":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>👷‍♂️ Vendor Management</Text>
            <Text style={styles.pageDesc}>
              Manage vendor details, contracts, and procurement workflows.
            </Text>
          </View>
        );

        case "Communication":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📞 Communication Center</Text>
            <Text style={styles.pageDesc}
              >Centralize all project communications and messages.</Text>
            </View>
        );

        case "Equipment":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🛠️ Equipment & Inventory</Text>
            <Text style={styles.pageDesc}>
              Track and manage construction equipment and inventory.
            </Text>
          </View>
        );

        case "Purchase":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🛒 Purchase Orders</Text>
            <Text style={styles.pageDesc}>
              Create and manage purchase orders for materials and services.
            </Text>
          </View>
        );

        case "Safety":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>🦺 Safety & Compliance</Text>
            <Text style={styles.pageDesc}>
              Monitor safety protocols and compliance checklists.
            </Text>
          </View>
        );

        case "Users":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>👥 User Management</Text>
            <Text style={styles.pageDesc}> 
                Manage user roles, permissions, and access levels.
            </Text>
          </View>
        );

        case "Budgets":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>💰 Budget & Financials</Text>
            <Text style={styles.pageDesc}
              >Oversee project budgets, expenses, and financial reports.</Text>
            </View>
        );

      case "Reports":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>📊 Reports & Analytics</Text>
            <Text style={styles.pageDesc}>
              Analyze financial data, performance metrics, and project KPIs.
            </Text>
          </View>
        );
      case "Settings":
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>⚙️ Settings</Text>
            <Text style={styles.pageDesc}>
              Update admin preferences, user permissions, and system settings.
            </Text>
          </View>
        );
    
      case "Logout":
        const logoutUser = () => {
            navigation.navigate("Login"); 
          // Implement logout logic here
        }

        return (
            <View style={styles.pageContainer}>
                <Text style={styles.pageTitle}>🔒 Logged Out</Text>
                <Text style={styles.pageDesc}
                >want to be logout </Text>
                <TouchableOpacity style={styles.card} onPress={logoutUser}>
                    <Text style={styles.cardText}>Confirm Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => setActivePage("Dashboard")}>
                    <Text style={styles.cardText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            
        );
      default:
        return (
          <View style={styles.dashboardContainer}>
            <Text style={styles.welcome}>🏗️ Welcome, Admin!</Text>
            <Text style={styles.subtitle}>
              Manage your projects, vendors, and performance metrics.
            </Text>

            <FlatList
              data={[
                { title: "📂 Projects" },
                { title: "👷‍♂️ Vendors" },
                { title: "📊 Reports" },
                { title: "⚙️ Settings" },
              ]}
              numColumns={2}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => setActivePage(item.title.split(" ")[1])}
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
          {activePage === "Dashboard" ? "Admin Dashboard" : activePage}
        </Text>
      </View>

      {/* Main Dashboard Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Overlay to close menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Popup Side Menu */}
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
          onPress={() => handleMenuClick("Projects")}
          style={styles.menuItem}
        >
          <Ionicons name="folder-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => handleMenuClick("Equipment")}    
            style={styles.menuItem}
        >
            <Ionicons name="construct-outline" size={20} color="#003366" />
            <Text style={styles.menuText}>Equipment</Text>
        </TouchableOpacity>

        

        <TouchableOpacity
          onPress={() => handleMenuClick("Documents")}
          style={styles.menuItem}   
        >
          <Ionicons name="document-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Vendors")}
          style={styles.menuItem}
        >
          <Ionicons name="people-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Vendors</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => handleMenuClick("Communication")}    
            style={styles.menuItem}
        >
          <Ionicons name="call-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Communication</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Purchase")}
          style={styles.menuItem}
        >
          <Ionicons name="cart-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Purchase</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Safety")}
          style={styles.menuItem}
        >
            <Ionicons name="shield-checkmark-outline" size={20} color="#003366" />
            <Text style={styles.menuText}>Safety</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => handleMenuClick("Users")}
            style={styles.menuItem}
        >
            <Ionicons name="person-outline" size={20} color="#003366" />
            <Text style={styles.menuText}>Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Reports")}
          style={styles.menuItem}
        >
          <Ionicons name="bar-chart-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMenuClick("Settings")}
          style={styles.menuItem}
        >
          <Ionicons name="settings-outline" size={20} color="#003366" />
          <Text style={styles.menuText}>Settings</Text>
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcome: { fontSize: 24, fontWeight: "700", color: "#003366" },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
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
  pageDesc: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  menuText: { marginLeft: 10, fontSize: 16, color: "#003366" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
