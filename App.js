import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { ToastProvider } from './src/components';
import { RoleProvider, useRole } from './src/RoleContext';
import BottomNav from './src/BottomNav';
import ProfileScreen from './src/ProfileScreen';

import { MemberHome, MemberCalendar, MemberCommunity, MemberProgress, MemberComplaints } from './src/MemberScreens';
import { AdminDashboard, AdminFaculty, AdminMembers, AdminCoaches } from './src/AdminScreens';
import { CoachToday, CoachTimetable, CoachClients } from './src/CoachScreens';
import { StaffHome, StaffComplaints, StaffRoster } from './src/StaffScreens';

import { C } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <RoleProvider>
          <StatusBar style="light" />
          <View style={s.root}>
            <LinearGradient
              colors={['#101a15', '#0a0e15']}
              style={StyleSheet.absoluteFillObject}
            />
            <Shell />
          </View>
        </RoleProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

function Shell() {
  const { profile } = useRole();
  const [activeTab, setActiveTab] = useState(getDefaultTab(profile.role));

  useEffect(() => {
    setActiveTab(getDefaultTab(profile.role));
  }, [profile.role]);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={{ flex: 1 }}>
        <Content role={profile.role} tab={activeTab} />
      </View>
      <BottomNav role={profile.role} active={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

function Content({ role, tab }) {
  if (role === 'member') {
    if (tab === 'home')       return <MemberHome />;
    if (tab === 'classes')    return <MemberCalendar />;
    if (tab === 'community')  return <MemberCommunity />;
    if (tab === 'progress')   return <MemberProgress />;
    if (tab === 'complaints') return <MemberComplaints />;
    if (tab === 'profile')    return <ProfileScreen />;
  }
  if (role === 'admin') {
    if (tab === 'dashboard') return <AdminDashboard />;
    if (tab === 'faculty')   return <AdminFaculty />;
    if (tab === 'members')   return <AdminMembers />;
    if (tab === 'coaches')   return <AdminCoaches />;
    if (tab === 'profile')   return <ProfileScreen />;
  }
  if (role === 'coach') {
    if (tab === 'today')     return <CoachToday />;
    if (tab === 'timetable') return <CoachTimetable />;
    if (tab === 'clients')   return <CoachClients />;
    if (tab === 'profile')   return <ProfileScreen />;
  }
  if (role === 'staff') {
    if (tab === 'home')       return <StaffHome />;
    if (tab === 'complaints') return <StaffComplaints />;
    if (tab === 'roster')     return <StaffRoster />;
    if (tab === 'profile')    return <ProfileScreen />;
  }
  return null;
}

function getDefaultTab(role) {
  if (role === 'member') return 'home';
  if (role === 'admin')  return 'dashboard';
  if (role === 'coach')  return 'today';
  if (role === 'staff')  return 'home';
  return 'home';
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  safe: { flex: 1 },
});