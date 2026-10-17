import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './theme';
import { Card, Chip, Btn, Avatar, Bar, SectionTitle, ScreenHeader, useToast } from './components';
import { COACH_TIMETABLE, COACH_CLIENTS } from './mock';

/* ═══════════════════════════════════════════════════════════
   TODAY (next in timetable)
   ═══════════════════════════════════════════════════════════ */
export function CoachToday() {
  const toast = useToast();
  const next = COACH_TIMETABLE.find(t => t.status === 'next');
  const rest = COACH_TIMETABLE.filter(t => t.status !== 'next');

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="COACH DASHBOARD"
        title="Today"
        sub="Friday, 16 October · 5 sessions"
        right={<Pressable onPress={() => toast('Settings')} style={s.gearBtn}><Ionicons name="settings-outline" size={18} color={C.t1} /></Pressable>}
      />

      {/* Next session highlight */}
      {next && (
        <Card style={{ marginHorizontal: 20, borderColor: C.lime + '45', backgroundColor: C.lime + '0e' }}>
          <View style={s.rowBetween}>
            <Chip label="● NEXT UP" tone="lime" />
            <Text style={{ color: C.t2, fontSize: 11, fontFamily: 'monospace' }}>in 12 min</Text>
          </View>
          <Text style={s.nextTime}>{next.time} · {next.duration}</Text>
          <Text style={s.nextName}>{next.name}</Text>
          <Text style={s.nextStudio}>{next.studio} · {next.booked}/{next.cap} booked</Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            <Btn label="Start session" icon="play" onPress={() => toast('Session started')} style={{ flex: 1 }} />
            <Btn label="Roster" variant="ghost" icon="people-outline" onPress={() => toast('Roster opened')} style={{ flex: 1 }} />
          </View>
        </Card>
      )}

      {/* Stats */}
      <View style={s.kpiRow}>
        <StatBox label="Today" value="5" sub="sessions" tone="lime" />
        <StatBox label="Clients" value="4" sub="active PT" tone="magenta" />
        <StatBox label="Hours" value="4.5" sub="scheduled" tone="cyan" />
      </View>

      <SectionTitle action="Full timetable" onAction={() => toast('Timetable opened')}>Rest of day</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {rest.map(t => (
          <Pressable key={t.id} onPress={() => toast(`Opened: ${t.name}`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[s.timeBox, { borderColor: t.status === 'pt' ? C.amber + '55' : C.border }]}>
                  <Text style={[s.timeBoxTime, t.status === 'pt' && { color: C.amber }]}>{t.time.split(' ')[0]}</Text>
                  <Text style={s.timeBoxMeridiem}>{t.time.split(' ')[1]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.sessionName}>{t.name}</Text>
                  <Text style={s.sessionMeta}>{t.studio} · {t.duration}</Text>
                </View>
                <Chip
                  label={t.status === 'pt' ? 'PT' : `${t.booked}/${t.cap}`}
                  tone={t.status === 'pt' ? 'amber' : 'lime'}
                />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   TIMETABLE (calendar view)
   ═══════════════════════════════════════════════════════════ */
export function CoachTimetable() {
  const toast = useToast();
  const hours = ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="YOUR SCHEDULE"
        title="Timetable"
        sub="This week · 22 sessions · 26 hours"
      />

      {/* Week strip */}
      <View style={s.weekStrip}>
        {days.map((d, i) => (
          <Pressable key={i} onPress={() => toast(`Day ${i + 1}`)} style={[s.dayPill, i === 4 && s.dayPillActive]}>
            <Text style={[s.dayText, i === 4 && s.dayTextActive]}>{d}</Text>
            <Text style={[s.dayNum, i === 4 && s.dayNumActive]}>{12 + i}</Text>
          </Pressable>
        ))}
      </View>

      {/* Hour list */}
      <SectionTitle>Friday, 16 October</SectionTitle>
      <Card style={{ marginHorizontal: 20, padding: 0 }}>
        {hours.map((h, i) => {
          const events = COACH_TIMETABLE.filter(t => {
            const hour = parseInt(t.time.split(':')[0], 10);
            const isPM = t.time.includes('PM') && hour !== 12;
            const h24 = isPM ? hour + 12 : hour;
            const targetH = parseInt(h.split(' ')[0], 10) + (h.includes('PM') && parseInt(h.split(' ')[0], 10) !== 12 ? 12 : 0);
            return h24 >= targetH && h24 < targetH + 2;
          });
          return (
            <View key={h} style={[s.hourRow, i < hours.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
              <Text style={s.hourLabel}>{h}</Text>
              <View style={{ flex: 1, gap: 6 }}>
                {events.length === 0 ? (
                  <Text style={s.hourEmpty}>—</Text>
                ) : (
                  events.map(e => (
                    <Pressable key={e.id} onPress={() => toast(e.name)} style={[s.eventBlock, { borderLeftColor: e.status === 'pt' ? C.amber : C.lime }]}>
                      <Text style={s.eventName}>{e.name}</Text>
                      <Text style={s.eventMeta}>{e.time} · {e.studio}</Text>
                    </Pressable>
                  ))
                )}
              </View>
            </View>
          );
        })}
      </Card>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Btn label="+ Block a slot" variant="ghost" icon="add" full onPress={() => toast('Slot blocked')} />
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   CLIENTS (manage who they work with)
   ═══════════════════════════════════════════════════════════ */
export function CoachClients() {
  const toast = useToast();
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="CLIENT MANAGEMENT"
        title="Clients"
        sub="4 active · track progress & duration"
      />

      <View style={s.kpiRow}>
        <StatBox label="Active" value="4" sub="clients" tone="lime" />
        <StatBox label="Sessions" value="12" sub="this week" tone="mint" />
        <StatBox label="Avg Tenure" value="11w" sub="relationship" tone="cyan" />
      </View>

      <SectionTitle>Your roster</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {COACH_CLIENTS.map((c, i) => (
          <Pressable key={i} onPress={() => toast(`Opened ${c.name}`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar initials={c.ini} size={44} tone={c.tone} />
                <View style={{ flex: 1 }}>
                  <Text style={s.facName}>{c.name}</Text>
                  <Text style={s.facRole}>{c.plan}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: C.lime, fontSize: 15, fontWeight: '900', fontFamily: 'monospace' }}>{c.weeks}w</Text>
                  <Text style={s.facStatLabel}>TENURE</Text>
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <View style={s.rowBetween}>
                  <Text style={{ color: C.t2, fontSize: 10.5, fontWeight: '700' }}>Program progress</Text>
                  <Text style={{ color: C.white, fontSize: 10.5, fontWeight: '900', fontFamily: 'monospace' }}>
                    {Math.round(c.progress * 100)}%
                  </Text>
                </View>
                <Bar value={c.progress} tone={c.tone} height={5} style={{ marginTop: 6 }} />
              </View>

              <View style={s.clientFooter}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="time-outline" size={12} color={C.t3} />
                  <Text style={s.clientMeta}>{c.lastSession}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="document-text-outline" size={12} color={C.t3} />
                  <Text style={s.clientMeta} numberOfLines={1}>{c.notes}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Btn label="Message" variant="ghost" icon="chatbubble-outline" onPress={() => toast(`Message sent to ${c.name}`)} style={{ flex: 1 }} />
                <Btn label="Plan" icon="create-outline" onPress={() => toast(`Editing plan for ${c.name}`)} style={{ flex: 1 }} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function StatBox({ label, value, sub, tone }) {
  const color = { lime: C.lime, mint: C.mint, cyan: C.cyan, magenta: C.magenta, amber: C.amber, coral: C.coral }[tone] || C.lime;
  return (
    <Card style={{ flex: 1, padding: 12 }}>
      <Text style={s.facStatLabel}>{label}</Text>
      <Text style={{ color, fontSize: 22, fontWeight: '900', fontFamily: 'monospace', marginTop: 6 }}>{value}</Text>
      <Text style={{ color: C.t3, fontSize: 10, marginTop: 3 }}>{sub}</Text>
    </Card>
  );
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

  nextTime: { color: C.lime, fontSize: 12, fontWeight: '900', fontFamily: 'monospace', marginTop: 12, letterSpacing: 0.5 },
  nextName: { color: C.white, fontSize: 22, fontWeight: '900', marginTop: 6, letterSpacing: -0.4 },
  nextStudio: { color: C.t2, fontSize: 12, marginTop: 4 },

  kpiRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 16 },

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

  weekStrip: { flexDirection: 'row', gap: 8, paddingHorizontal: 20 },
  dayPill: {
    flex: 1, paddingVertical: 10, borderRadius: R.md,
    borderWidth: 1, borderColor: C.border, backgroundColor: C.card,
    alignItems: 'center',
  },
  dayPillActive: { backgroundColor: C.lime, borderColor: C.lime },
  dayText: { color: C.t3, fontSize: 10, fontWeight: '900', fontFamily: 'monospace' },
  dayTextActive: { color: C.bg },
  dayNum: { color: C.white, fontSize: 15, fontWeight: '900', marginTop: 4, fontFamily: 'monospace' },
  dayNumActive: { color: C.bg },

  hourRow: { flexDirection: 'row', padding: 12, alignItems: 'flex-start' },
  hourLabel: { color: C.t3, fontSize: 10, fontWeight: '900', fontFamily: 'monospace', width: 50, paddingTop: 2 },
  hourEmpty: { color: C.t4, fontSize: 12, paddingVertical: 6 },
  eventBlock: {
    paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderLeftWidth: 3, borderLeftColor: C.lime,
  },
  eventName: { color: C.white, fontSize: 12, fontWeight: '800' },
  eventMeta: { color: C.t2, fontSize: 10, marginTop: 3, fontFamily: 'monospace' },

  facName: { color: C.white, fontSize: 14, fontWeight: '900' },
  facRole: { color: C.t2, fontSize: 11, marginTop: 3 },
  facStatLabel: { color: C.t3, fontSize: 8.5, fontWeight: '900', letterSpacing: 0.8, fontFamily: 'monospace' },

  clientFooter: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
  clientMeta: { color: C.t3, fontSize: 10, fontFamily: 'monospace' },
});