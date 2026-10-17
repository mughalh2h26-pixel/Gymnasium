import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './theme';
import { Card, Chip, Btn, Avatar, Bar, SectionTitle, ScreenHeader, useToast } from './components';
import { ComplaintCard } from './MemberScreens';
import { FACULTY, FACULTY_ROSTER, STAFF_COMPLAINTS, CLASSES } from './mock';

/* ═══════════════════════════════════════════════════════════
   HOME (schedule + attendance status)
   ═══════════════════════════════════════════════════════════ */
export function StaffHome() {
  const toast = useToast();
  const today = CLASSES.filter(c => c.date === '2026-10-16').slice(0, 4);

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="FACULTY DESK"
        title="Sara Ahmed"
        sub="Head Faculty · Friday, 16 October"
        right={<Pressable onPress={() => toast('Settings')} style={s.gearBtn}><Ionicons name="settings-outline" size={18} color={C.t1} /></Pressable>}
      />

      {/* Attendance status hero */}
      <Card style={{ marginHorizontal: 20, borderColor: C.lime + '45', backgroundColor: C.lime + '0e' }}>
        <View style={s.rowBetween}>
          <View>
            <Text style={s.statLabel}>TODAY'S STATUS</Text>
            <Text style={s.bigStatus}>Checked in</Text>
          </View>
          <View style={s.checkInTime}>
            <Text style={s.checkInVal}>05:24</Text>
            <Text style={s.checkInLabel}>AM</Text>
          </View>
        </View>
        <View style={s.attRow}>
          <View style={s.attStat}>
            <Text style={s.attVal}>96%</Text>
            <Text style={s.attLabel}>ATTENDANCE</Text>
          </View>
          <View style={s.attDiv} />
          <View style={s.attStat}>
            <Text style={s.attVal}>132h</Text>
            <Text style={s.attLabel}>HOURS · OCT</Text>
          </View>
          <View style={s.attDiv} />
          <View style={s.attStat}>
            <Text style={[s.attVal, { color: C.lime }]}>0</Text>
            <Text style={s.attLabel}>LATE</Text>
          </View>
        </View>
      </Card>

      {/* Shift + actions */}
      <View style={{ paddingHorizontal: 20, marginTop: 14, flexDirection: 'row', gap: 10 }}>
        <Btn label="Check out" variant="ghost" icon="log-out-outline" onPress={() => toast('Checked out')} style={{ flex: 1 }} />
        <Btn label="Request leave" icon="airplane-outline" onPress={() => toast('Leave request sent')} style={{ flex: 1 }} />
      </View>

      <SectionTitle action="Full schedule" onAction={() => toast('Schedule opened')}>Today's classes</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {today.map(c => (
          <Pressable key={c.id} onPress={() => toast(`Opened: ${c.name}`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={s.timeBox}>
                  <Text style={s.timeBoxTime}>{c.time.split(' ')[0]}</Text>
                  <Text style={s.timeBoxMeridiem}>{c.time.split(' ')[1]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.sessionName}>{c.name}</Text>
                  <Text style={s.sessionMeta}>Coach {c.coach} · {c.booked}/{c.cap} booked</Text>
                </View>
                <Chip label={`${c.cap - c.booked} SPOTS`} tone={c.full ? 'coral' : c.tone} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLAINTS (answer page)
   ═══════════════════════════════════════════════════════════ */
export function StaffComplaints() {
  const toast = useToast();
  const [filter, setFilter] = useState('open');

  const filtered = STAFF_COMPLAINTS.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'open') return c.status === 'open';
    if (filter === 'in-progress') return c.status === 'in-progress';
    if (filter === 'resolved') return c.status === 'resolved';
    return true;
  });

  const openCount = STAFF_COMPLAINTS.filter(c => c.status === 'open').length;
  const ipCount = STAFF_COMPLAINTS.filter(c => c.status === 'in-progress').length;
  const resCount = STAFF_COMPLAINTS.filter(c => c.status === 'resolved').length;

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="RESPOND & RESOLVE"
        title="Complaints"
        sub={`${openCount} open · ${ipCount} in progress · ${resCount} resolved`}
        right={<Pressable onPress={() => toast('Filter')} style={s.gearBtn}><Ionicons name="filter-outline" size={18} color={C.t1} /></Pressable>}
      />

      <View style={s.segRow}>
        {[['open', `OPEN ${openCount}`], ['in-progress', `IN PROG ${ipCount}`], ['resolved', `DONE ${resCount}`], ['all', 'ALL']].map(([id, label]) => (
          <Pressable key={id} onPress={() => setFilter(id)} style={[s.seg, filter === id && s.segActive]}>
            <Text style={[s.segText, filter === id && s.segTextActive]} numberOfLines={1}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {filtered.length === 0 && (
          <Card><Text style={{ color: C.t2, textAlign: 'center', paddingVertical: 20 }}>No complaints in this category</Text></Card>
        )}
        {filtered.map(c => (
          <View key={c.id}>
            <ComplaintCard c={c} onPress={() => toast(`Open thread ${c.id}`)} showAssignee />
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Btn label="Reply" variant="ghost" icon="chatbubble-outline" onPress={() => toast(`Reply to ${c.id}`)} style={{ flex: 1 }} />
              <Btn
                label={c.status === 'resolved' ? 'Reopen' : 'Resolve'}
                icon={c.status === 'resolved' ? 'refresh-outline' : 'checkmark-circle-outline'}
                onPress={() => toast(c.status === 'resolved' ? 'Reopened' : `Resolved ${c.id}`)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROSTER (team positioning + bulletin)
   ═══════════════════════════════════════════════════════════ */
export function StaffRoster() {
  const toast = useToast();
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="TEAM BULLETIN"
        title="Roster"
        sub="Live positioning & shift assignments"
      />

      {/* Bulletin */}
      <Card style={{ marginHorizontal: 20, borderColor: C.amber + '40', backgroundColor: C.amber + '0e' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="megaphone" size={16} color={C.amber} />
          <Text style={{ color: C.amber, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 }}>TODAY'S BULLETIN</Text>
        </View>
        <Text style={s.bulletinBody}>
          Ladies-only window 12–4 PM today. Sara covers Studio B during peak. New Rogue racks arriving at 2 PM — clear Zone C weights by 1:30 PM.
        </Text>
      </Card>

      {/* Zone map */}
      <SectionTitle>Zone assignments</SectionTitle>
      <View style={s.zoneGrid}>
        {[
          { zone: 'A', label: 'Main floor',  tone: 'lime',    count: 2 },
          { zone: 'B', label: 'Ladies',      tone: 'magenta', count: 1 },
          { zone: 'C', label: 'Free weights',tone: 'amber',   count: 1 },
          { zone: 'L', label: 'Lobby',       tone: 'cyan',    count: 1 },
        ].map(z => (
          <Card key={z.zone} style={{ flex: 1, minWidth: '47%', alignItems: 'center', paddingVertical: 14 }}>
            <View style={[s.zoneBadge, { backgroundColor: zoneColor(z.tone) + '22', borderColor: zoneColor(z.tone) + '45' }]}>
              <Text style={[s.zoneBadgeText, { color: zoneColor(z.tone) }]}>{z.zone}</Text>
            </View>
            <Text style={s.zoneLabel}>{z.label}</Text>
            <Text style={s.zoneCount}>{z.count} staff</Text>
          </Card>
        ))}
      </View>

      {/* Roster */}
      <SectionTitle>Active shift</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {FACULTY_ROSTER.map(r => (
          <Pressable key={r.ini} onPress={() => toast(`Contact ${r.name}`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar initials={r.ini} size={42} tone={r.tone} />
                <View style={{ flex: 1 }}>
                  <Text style={s.rosterName}>{r.name}</Text>
                  <Text style={s.rosterRole}>{r.position} · {r.shift}</Text>
                </View>
                <View style={[s.zonePill, { backgroundColor: zoneColor(r.tone) + '22', borderColor: zoneColor(r.tone) + '45' }]}>
                  <Text style={[s.zonePillText, { color: zoneColor(r.tone) }]}>{r.zone}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      {/* Team attendance */}
      <SectionTitle>Team status</SectionTitle>
      <Card style={{ marginHorizontal: 20, padding: 0 }}>
        {FACULTY.slice(0, 4).map((f, i, arr) => (
          <View key={i} style={[s.teamRow, i < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
            <Avatar initials={f.ini} size={32} tone={f.tone} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={s.rosterName}>{f.name}</Text>
              <Text style={s.rosterRole}>{f.checkIn !== '—' ? `In at ${f.checkIn}` : 'Not checked in'}</Text>
            </View>
            <Chip
              label={f.status === 'on-floor' ? 'ON FLOOR' : f.status === 'on-leave' ? 'LEAVE' : 'OFF SHIFT'}
              tone={f.status === 'on-floor' ? 'lime' : f.status === 'on-leave' ? 'coral' : 'slate'}
            />
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function zoneColor(tone) {
  const map = { lime: C.lime, magenta: C.magenta, amber: C.amber, cyan: C.cyan, mint: C.mint, coral: C.coral };
  return map[tone] || C.lime;
}

/* ═══════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════ */
const s = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gearBtn: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },

  statLabel: { color: C.t3, fontSize: 9.5, fontWeight: '900', letterSpacing: 1.2, fontFamily: 'monospace' },
  bigStatus: { color: C.white, fontSize: 22, fontWeight: '900', marginTop: 6 },

  checkInTime: {
    backgroundColor: C.lime, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 8,
    alignItems: 'center',
  },
  checkInVal: { color: C.bg, fontSize: 16, fontWeight: '900', fontFamily: 'monospace' },
  checkInLabel: { color: C.bg, fontSize: 8.5, fontWeight: '900', letterSpacing: 1, marginTop: 1 },

  attRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  attStat: { flex: 1, alignItems: 'center' },
  attDiv: { width: 1, height: 22, backgroundColor: 'rgba(255,255,255,0.08)' },
  attVal: { color: C.white, fontSize: 16, fontWeight: '900', fontFamily: 'monospace' },
  attLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 8.5, fontWeight: '900', letterSpacing: 0.8, marginTop: 3 },

  timeBox: {
    width: 56, height: 56, borderRadius: 14,
    borderWidth: 1, borderColor: C.border,
    backgroundColor: C.card2,
    alignItems: 'center', justifyContent: 'center',
  },
  timeBoxTime: { color: C.white, fontSize: 14, fontWeight: '900', fontFamily: 'monospace' },
  timeBoxMeridiem: { color: C.t3, fontSize: 9, fontWeight: '900', letterSpacing: 0.5, marginTop: 1 },
  sessionName: { color: C.white, fontSize: 14, fontWeight: '900' },
  sessionMeta: { color: C.t2, fontSize: 11, marginTop: 3 },

  segRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 20, marginBottom: 12 },
  seg: { flex: 1, paddingVertical: 10, paddingHorizontal: 4, borderRadius: R.md, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, alignItems: 'center' },
  segActive: { backgroundColor: C.lime, borderColor: C.lime },
  segText: { color: C.t2, fontSize: 10, fontWeight: '900', letterSpacing: 0.5, fontFamily: 'monospace' },
  segTextActive: { color: C.bg },

  bulletinBody: { color: C.t1, fontSize: 12.5, lineHeight: 18, marginTop: 10 },

  zoneGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  zoneBadge: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  zoneBadgeText: { fontSize: 18, fontWeight: '900', fontFamily: 'monospace' },
  zoneLabel: { color: C.white, fontSize: 12, fontWeight: '900', marginTop: 10 },
  zoneCount: { color: C.t3, fontSize: 10.5, marginTop: 3 },

  rosterName: { color: C.white, fontSize: 13, fontWeight: '900' },
  rosterRole: { color: C.t2, fontSize: 11, marginTop: 2 },
  zonePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  zonePillText: { fontSize: 12, fontWeight: '900', fontFamily: 'monospace' },

  teamRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
});