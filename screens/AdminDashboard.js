import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Mock API Service
const dashboardService = {
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalProjects: 15,
          activeProjects: 8,
          completedProjects: 4,
          pendingTasks: 23,
          totalBudget: 12500000,
          activeVendors: 12,
          safetyIncidents: 2,
          equipmentCount: 45,
          overdueDocuments: 5,
        });
      }, 1000);
    });
  },

  getRecentActivities: async () => {
    return [
      {
        id: 1,
        type: "project",
        message: 'New project "Sky Tower" assigned',
        time: "2 hours ago",
        user: "John Doe",
        priority: "high",
      },
      {
        id: 2,
        type: "document",
        message: "3 new documents uploaded",
        time: "5 hours ago",
        user: "Jane Smith",
        priority: "medium",
      },
      {
        id: 3,
        type: "vendor",
        message: "New vendor registration approved",
        time: "1 day ago",
        user: "Mike Johnson",
        priority: "low",
      },
      {
        id: 4,
        type: "safety",
        message: "Safety inspection completed",
        time: "1 day ago",
        user: "Safety Team",
        priority: "medium",
      },
    ];
  },

  getQuickActions: async () => {
    return [
      {
        id: 1,
        title: "Projects",
        icon: "folder-outline",
        screen: "ProjectManagement",
        color: "#003366",
        count: 15,
      },
      {
        id: 2,
        title: "Documents",
        icon: "document-outline",
        screen: "DocumentManagement",
        color: "#4CAF50",
        count: 23,
      },
      {
        id: 3,
        title: "Vendors",
        icon: "people-outline",
        screen: "VendorProcurement",
        color: "#FF9800",
        count: 12,
      },
      {
        id: 4,
        title: "Budget",
        icon: "cash-outline",
        screen: "BudgetFinancials",
        color: "#9C27B0",
        count: 8,
      },
      {
        id: 5,
        title: "Equipment",
        icon: "construct-outline",
        screen: "EquipmentInventory",
        color: "#607D8B",
        count: 45,
      },
      {
        id: 6,
        title: "Reports",
        icon: "bar-chart-outline",
        screen: "ReportsAnalytics",
        color: "#2196F3",
        count: 7,
      },
    ];
  },
};

export default function AdminDashboard() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnim] = useState(new Animated.Value(-width * 0.7));
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadDashboardData();
    }
  }, [isFocused]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [stats, activities, actions] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getRecentActivities(),
        dashboardService.getQuickActions(),
      ]);
      setDashboardData(stats);
      setRecentActivities(activities);
      setQuickActions(actions);
    } catch (error) {
      Alert.alert("Error", "Failed to load dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnim, {
        toValue: -width * 0.7,
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

  const handleMenuClick = (screenName) => {
    toggleMenu();
    if (screenName === "Logout") {
      handleLogout();
    } else if (screenName !== "AdminDashboard") {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => navigation.navigate("Login") },
      ]
    );
  };

  const renderStatCard = (title, value, icon, color, subtitle = "") => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
          {subtitle ? <Text style={styles.statSubtitle}>{subtitle}</Text> : null}
        </View>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
      </View>
    </View>
  );

  const renderQuickAction = ({ item }) => (
    <TouchableOpacity 
      style={styles.quickActionCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.actionHeader}>
        <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={20} color="#fff" />
        </View>
        {item.count > 0 && (
          <View style={styles.actionBadge}>
            <Text style={styles.badgeText}>{item.count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.actionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity style={styles.activityItem}>
      <View style={[styles.activityIcon, 
        { backgroundColor: item.priority === 'high' ? '#FF6B6B20' : 
                         item.priority === 'medium' ? '#FFD93D20' : '#6BCF7F20' }]}>
        <Ionicons 
          name={
            item.type === 'project' ? 'folder-outline' :
            item.type === 'document' ? 'document-outline' :
            item.type === 'vendor' ? 'people-outline' :
            item.type === 'safety' ? 'shield-checkmark-outline' : 'notifications-outline'
          } 
          size={18} 
          color={
            item.priority === 'high' ? '#FF6B6B' : 
            item.priority === 'medium' ? '#FFA726' : '#4CAF50'
          } 
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityMessage}>{item.message}</Text>
        <View style={styles.activityMeta}>
          <Text style={styles.activityUser}>By {item.user}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDashboardContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      );
    }

    return (
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>🏗️ Welcome, Admin!</Text>
          <Text style={styles.welcomeSubtitle}>
            Here's what's happening with your projects today.
          </Text>
        </View>

        {/* Statistics Grid */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            {renderStatCard(
              "Total Projects", 
              dashboardData?.totalProjects.toString(), 
              "business-outline", 
              "#003366"
            )}
            {renderStatCard(
              "Active Projects", 
              dashboardData?.activeProjects.toString(), 
              "construct-outline", 
              "#4CAF50"
            )}
          </View>
          <View style={styles.statsRow}>
            {renderStatCard(
              "Pending Tasks", 
              dashboardData?.pendingTasks.toString(), 
              "time-outline", 
              "#FF9800"
            )}
            {renderStatCard(
              "Active Vendors", 
              dashboardData?.activeVendors.toString(), 
              "people-outline", 
              "#607D8B"
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={quickActions}
          renderItem={renderQuickAction}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.quickActionsGrid}
        />

        {/* Recent Activities */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesSection}>
          <FlatList
            data={recentActivities}
            renderItem={renderActivityItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Alerts Section */}
        {(dashboardData?.safetyIncidents > 0 || dashboardData?.overdueDocuments > 0) && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>Alerts & Notifications</Text>
            {dashboardData.safetyIncidents > 0 && (
              <View style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <Ionicons name="warning-outline" size={20} color="#FF6B35" />
                  <Text style={styles.alertTitle}>Safety Alert</Text>
                </View>
                <Text style={styles.alertText}>
                  {dashboardData.safetyIncidents} safety incident(s) require your attention.
                </Text>
                <TouchableOpacity 
                  style={styles.alertButton}
                  onPress={() => navigation.navigate("SafetyCompliance")}
                >
                  <Text style={styles.alertButtonText}>Review Now</Text>
                </TouchableOpacity>
              </View>
            )}
            {dashboardData.overdueDocuments > 0 && (
              <View style={[styles.alertCard, { backgroundColor: '#E3F2FD' }]}>
                <View style={styles.alertHeader}>
                  <Ionicons name="document-outline" size={20} color="#2196F3" />
                  <Text style={[styles.alertTitle, { color: '#2196F3' }]}>Document Alert</Text>
                </View>
                <Text style={[styles.alertText, { color: '#1976D2' }]}>
                  {dashboardData.overdueDocuments} document(s) are overdue for review.
                </Text>
                <TouchableOpacity 
                  style={[styles.alertButton, { backgroundColor: '#2196F3' }]}
                  onPress={() => navigation.navigate("DocumentManagement")}
                >
                  <Text style={styles.alertButtonText}>Check Documents</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate("CommunicationCenter")}
        >
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {renderDashboardContent()}

      {/* Overlay to close menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Side Menu */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}
      >
        <View style={styles.menuHeader}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={28} color="#003366" />
          </View>
          <Text style={styles.userName}>Admin User</Text>
          <Text style={styles.userRole}>Administrator</Text>
        </View>

        <ScrollView style={styles.menuItems} showsVerticalScrollIndicator={false}>
          <Text style={styles.menuCategory}>MAIN</Text>
          {[
            { name: "AdminDashboard", label: "Dashboard", icon: "home-outline" },
            { name: "ProjectManagement", label: "Projects", icon: "folder-outline" },
            { name: "TaskAssignment", label: "Task Assignment", icon: "list-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleMenuClick(item.name)}
              style={styles.menuItem}
            >
              <Ionicons name={item.icon} size={20} color="#003366" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.menuCategory}>MANAGEMENT</Text>
          {[
            { name: "DocumentManagement", label: "Documents", icon: "document-outline" },
            { name: "VendorProcurement", label: "Vendors", icon: "people-outline" },
            { name: "EquipmentInventory", label: "Equipment", icon: "construct-outline" },
            { name: "UserManagement", label: "Users", icon: "person-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleMenuClick(item.name)}
              style={styles.menuItem}
            >
              <Ionicons name={item.icon} size={20} color="#003366" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.menuCategory}>FINANCE & REPORTS</Text>
          {[
            { name: "BudgetFinancials", label: "Budget", icon: "cash-outline" },
            { name: "PurchaseOrders", label: "Purchase Orders", icon: "cart-outline" },
            { name: "ReportsAnalytics", label: "Reports", icon: "bar-chart-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleMenuClick(item.name)}
              style={styles.menuItem}
            >
              <Ionicons name={item.icon} size={20} color="#003366" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.menuCategory}>OTHER</Text>
          {[
            { name: "SafetyCompliance", label: "Safety", icon: "shield-checkmark-outline" },
            { name: "CommunicationCenter", label: "Communication", icon: "chatbubble-outline" },
            { name: "Settings", label: "Settings", icon: "settings-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleMenuClick(item.name)}
              style={styles.menuItem}
            >
              <Ionicons name={item.icon} size={20} color="#003366" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => handleMenuClick("Logout")}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8fafc" 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#003366",
    padding: 16,
    paddingTop: 50,
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: { 
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  seeAllText: {
    color: '#003366',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: "#4a5568",
    fontWeight: '600',
  },
  statSubtitle: {
    fontSize: 12,
    color: "#718096",
    marginTop: 2,
  },
  statIcon: {
    padding: 8,
    borderRadius: 8,
  },
  quickActionsGrid: {
    paddingBottom: 8,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 4,
    alignItems: 'center',
    flex: 1,
    maxWidth: '33%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionHeader: {
    position: 'relative',
    marginBottom: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
  },
  activitiesSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityUser: {
    fontSize: 12,
    color: '#718096',
  },
  activityTime: {
    fontSize: 12,
    color: '#a0aec0',
  },
  alertsSection: {
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C53030',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#744210',
    marginBottom: 12,
    lineHeight: 20,
  },
  alertButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sideMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    paddingTop: 60,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a365d',
  },
  userRole: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#718096',
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuText: { 
    marginLeft: 12, 
    fontSize: 14, 
    color: "#2d3748",
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});