 
import LoginScreen from "../screens/LoginScreen";
import AdminDashboard from "../screens/AdminDashboard";
import EngineerDashboard from "../screens/EngineerDashboard";
import SubcontractorDashboard from "../screens/SubcontractorDashboard";  
import ProjectManagement from "./screens/ProjectManagement";
import TaskAssignment from "./screens/TaskAssignment";
import DocumentManagement from "./screens/DocumentManagement";
import BudgetFinancials from "./screens/BudgetFinancials";
import PurchaseOrders from "./screens/PurchaseOrders";
import VendorProcurement from "./screens/VendorProcurement";
import ReportsAnalytics from "./screens/ReportsAnalytics";
import UserManagement from "./screens/UserManagement";
import EquipmentInventory from "./screens/EquipmentInventory";
import SafetyCompliance from "./screens/SafetyCompliance";
import CommunicationCenter from "./screens/CommunicationCenter";
import Settings from "./screens/Settings";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#003366" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }} 
        />

        {/* Dashboards */}
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: "🏗️ Admin Dashboard" }}
        />
        <Stack.Screen
          name="EngineerDashboard"
          component={EngineerDashboard}
          options={{ title: "👷 Engineer Dashboard" }}
        />
        <Stack.Screen
          name="SubcontractorDashboard"
          component={SubcontractorDashboard}
          options={{ title: "🔧 Subcontractor Dashboard" }}
        />

        {/* Admin Pages */}
        <Stack.Screen
          name="ProjectManagement"
          component={ProjectManagement}
          options={{ title: "Project Management" }}
        />
        <Stack.Screen
          name="TaskAssignment"
          component={TaskAssignment}
          options={{ title: "Task Assignment" }}
        />
        <Stack.Screen
          name="DocumentManagement"
          component={DocumentManagement}
          options={{ title: "Document Management" }}
        />
        <Stack.Screen
          name="BudgetFinancials"
          component={BudgetFinancials}
          options={{ title: "Budget & Financials" }}
        />
        <Stack.Screen
          name="PurchaseOrders"
          component={PurchaseOrders}
          options={{ title: "Purchase Orders" }}
        />
        <Stack.Screen
          name="VendorProcurement"
          component={VendorProcurement}
          options={{ title: "Vendor & Procurement" }}
        />
        <Stack.Screen
          name="ReportsAnalytics"
          component={ReportsAnalytics}
          options={{ title: "Reports & Analytics" }}
        />
        <Stack.Screen
          name="UserManagement"
          component={UserManagement}
          options={{ title: "User Management" }}
        />
        <Stack.Screen
          name="EquipmentInventory"
          component={EquipmentInventory}
          options={{ title: "Equipment & Inventory" }}
        />
        <Stack.Screen
          name="SafetyCompliance"
          component={SafetyCompliance}
          options={{ title: "Safety & Compliance" }}
        />
        <Stack.Screen
          name="CommunicationCenter"
          component={CommunicationCenter}
          options={{ title: "Communication Center" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
