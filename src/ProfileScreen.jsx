import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './theme';
import { Card, Chip, Avatar, SectionTitle, ScreenHeader, useToast } from './components';
import { useRole } from './RoleContext';
import { PROFILES } from './mock';

export default function ProfileScreen() {
  const { profile, setProfile } = useRole();
  const toast = useToast();

  const details = getDetails(profile.role);

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader kicker={profile.role.toUpperCase() + ' ACCOUNT'} title="Profile" />

      {/* Hero */}
      <Card style={s.hero}>
        <Avatar initials={profile.ini} size={56} gradient={profile.role === 'member'} tone={profile.tone} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={s.name}>{profile.name}</Text>
          <Text style={s.sub}>{profile.sub}</Text>
        </View>
        <Chip label="ACTIVE" tone="lime" />
      </Card>

      {/* Role switcher */}
      <SectionTitle>Prototype profiles</SectionTitle>
      <Text style={s.note}>
        Switch sample accounts to preview the native screens available for each role.
      </Text>

      <View style={{ gap: 8 }}>
        {PROFILES.map(p => {
          const isActive = p.id === profile.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => { setProfile(p); toast(`Switched to ${p.name} · ${p.tag}`); }}
              style={[s.profileRow, isActive && s.profileRowActive]}
            >
              <Avatar initials={p.ini} size={40} tone={p.tone} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.profileName}>{p.name}</Text>
                <Text style={s.profileSub}>{p.sub}</Text>
              </View>
              <Chip label={p.tag} tone={p.tone} />
            </Pressable>
          );
        })}
      </View>

      {/* Account details */}
      <SectionTitle>Account details</SectionTitle>
      <Card style={{ padding: 0 }}>
        {details.map((d, i) => (
          <View key={i} style={[s.row, i < details.length - 1 && s.rowBorder]}>
            <Text style={s.rowLabel}>{d.label}</Text>
            <Text style={s.rowValue}>{d.value}</Text>
          </View>
        ))}
      </Card>

      {/* Preferences */}
      <SectionTitle>Preferences</SectionTitle>
      <Card style={{ padding: 0 }}>
        {[
          { l: 'Push notifications', v: 'On', icon: 'notifications-outline' },
          { l: 'WhatsApp updates',    v: 'On', icon: 'logo-whatsapp' },
          { l: 'Language',            v: 'English', icon: 'globe-outline' },
          { l: 'Dark mode',           v: 'Always', icon: 'moon-outline' },
        ].map((d, i, arr) => (
          <Pressable key={i} onPress={() => toast(`${d.l} — setting opened`)} style={[s.row, i < arr.length - 1 && s.rowBorder]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Ionicons name={d.icon} size={18} color={C.t2} />
              <Text style={s.rowLabel}>{d.l}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={s.rowValue}>{d.v}</Text>
              <Ionicons name="chevron-forward" size={16} color={C.t3} />
            </View>
          </Pressable>
        ))}
      </Card>

      <Pressable onPress={() => toast('Sign out (prototype)')} style={s.logout}>
        <Ionicons name="log-out-outline" size={18} color={C.coral} />
        <Text style={s.logoutText}>Sign out</Text>
      </Pressable>

      <Text style={s.version}>IronHaus · v1.0.0 · Expo SDK 58</Text>
    </ScrollView>
  );
}

function getDetails(role) {
  const base = [
    { label: 'Phone number',     value: '+92 300 1234567' },
    { label: 'Emergency contact', value: 'Ayesha Ahmed' },
    { label: 'Member ID',        value: 'IH-2024-1187' },
    { label: 'Biometric access', value: 'Registered' },
  ];
  if (role === 'admin') return [
    { label: 'Role',            value: 'Gym administrator' },
    { label: 'Access level',    value: 'Full' },
    { label: 'Branch',          value: 'Gulberg III, Lahore' },
    { label: 'Onboarded',       value: 'Mar 2022' },
  ];
  if (role === 'coach') return [
    { label: 'Specialty',       value: 'Powerlifting · HIIT' },
    { label: 'Rating',          value: '4.8 ★' },
    { label: 'Active clients',  value: '4' },
    { label: 'Joined',          value: 'Sep 2022' },
  ];
  if (role === 'staff') return [
    { label: 'Position',        value: 'Head faculty · Strength' },
    { label: 'Shift',           value: '05:30 – 13:30' },
    { label: 'Attendance',      value: '96%' },
    { label: 'Joined',          value: 'Mar 2022' },
  ];
  return base;
}

const s = StyleSheet.create({
  wrap: { paddingBottom: 40 },

  hero: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, padding: 16 },
  name: { color: C.white, fontSize: 18, fontWeight: '900' },
  sub: { color: C.t2, fontSize: 12, marginTop: 3 },

  note: { color: C.t3, fontSize: 12, paddingHorizontal: 20, marginBottom: 4, lineHeight: 16 },

  profileRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, padding: 12,
    borderRadius: R.lg, borderWidth: 1,
    borderColor: C.border, backgroundColor: C.card,
  },
  profileRowActive: { borderColor: C.lime + '55', backgroundColor: C.lime + '0e' },
  profileName: { color: C.white, fontSize: 13, fontWeight: '900' },
  profileSub: { color: C.t2, fontSize: 11, marginTop: 2 },

  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  rowLabel: { color: C.t1, fontSize: 12.5, fontWeight: '600' },
  rowValue: { color: C.t3, fontSize: 11.5, fontFamily: 'monospace' },

  logout: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: 20, marginTop: 24, paddingVertical: 14,
    borderRadius: R.md, borderWidth: 1,
    borderColor: C.coral + '35', backgroundColor: C.coral + '0e',
  },
  logoutText: { color: C.coral, fontWeight: '900', fontSize: 13 },

  version: { color: C.t4, fontSize: 10, textAlign: 'center', marginTop: 24, fontFamily: 'monospace' },
});