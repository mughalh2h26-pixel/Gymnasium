import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from './theme';

const NAVS = {
  member: [
    { id: 'home',       label: 'Home',      icon: 'home-outline' },
    { id: 'classes',    label: 'Classes',   icon: 'calendar-outline' },
    { id: 'community',  label: 'Community', icon: 'chatbubbles-outline' },
    { id: 'progress',   label: 'Progress',  icon: 'trending-up-outline' },
    { id: 'complaints', label: 'Complaints',icon: 'alert-circle-outline' },
    { id: 'profile',    label: 'Profile',   icon: 'person-outline' },
  ],
  admin: [
    { id: 'dashboard',  label: 'Dashboard', icon: 'grid-outline' },
    { id: 'faculty',    label: 'Faculty',   icon: 'people-outline' },
    { id: 'members',    label: 'Members',   icon: 'card-outline' },
    { id: 'coaches',    label: 'Coaches',   icon: 'barbell-outline' },
    { id: 'profile',    label: 'Profile',   icon: 'person-outline' },
  ],
  coach: [
    { id: 'today',     label: 'Today',      icon: 'flash-outline' },
    { id: 'timetable', label: 'Timetable',  icon: 'calendar-outline' },
    { id: 'clients',   label: 'Clients',    icon: 'people-outline' },
    { id: 'profile',   label: 'Profile',    icon: 'person-outline' },
  ],
  staff: [
    { id: 'home',       label: 'Home',       icon: 'home-outline' },
    { id: 'complaints', label: 'Complaints', icon: 'alert-circle-outline' },
    { id: 'roster',     label: 'Roster',     icon: 'list-outline' },
    { id: 'profile',    label: 'Profile',    icon: 'person-outline' },
  ],
};

export default function BottomNav({ role, active, onChange }) {
  const items = NAVS[role] || NAVS.member;
  return (
    <View style={s.nav}>
      {items.map(item => {
        const isActive = active === item.id;
        return (
          <Pressable key={item.id} onPress={() => onChange(item.id)} style={s.tab}>
            <View style={[s.iconBox, isActive && s.iconBoxActive]}>
              <Ionicons name={item.icon} size={20} color={isActive ? C.lime : C.t3} />
            </View>
            <Text style={[s.label, isActive && { color: C.lime }]} numberOfLines={1}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    paddingHorizontal: 6, paddingTop: 8, paddingBottom: 12,
    borderTopWidth: 1, borderTopColor: C.border,
    backgroundColor: C.bg,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  iconBox: { width: '100%', maxWidth: 56, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  iconBoxActive: { backgroundColor: C.lime + '1c' },
  label: { color: C.t3, fontSize: 9.5, fontWeight: '900', letterSpacing: 0.2 },
});