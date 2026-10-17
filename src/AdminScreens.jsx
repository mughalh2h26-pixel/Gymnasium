import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from './theme';
import { Card, Chip, Btn, Avatar, Bar, Kpi, SectionTitle, ScreenHeader, useToast } from './components';
import { ADMIN_KPIS, SUBSCRIPTION_SPLIT, REFERRALS, FACULTY, COACHES, LIVE_FEED } from './mock';

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════════ */
export function AdminDashboard() {
  const toast = useToast();
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="COMMAND CENTER"
        title="Good evening, Omar"
        sub="318 members on floor · 47 check-ins in the last hour"
        right={<Pressable onPress={() => toast('Settings')} style={s.gearBtn}><Ionicons name="settings-outline" size={18} color={C.t1} /></Pressable>}
      />

      <View style={s.kpiGrid}>
        {ADMIN_KPIS.map(k => (
          <Kpi key={k.label} label={k.label} value={k.value} delta={k.delta} color={k.color} sub={k.sub} />
        ))}
      </View>

      {/* Live feed */}
      <SectionTitle action="View all" onAction={() => toast('Full log')}>Live gate feed</SectionTitle>
      <Card style={{ marginHorizontal: 20, padding: 0 }}>
        {LIVE_FEED.map((f, i, arr) => (
          <View key={i} style={[s.liveRow, i < arr.length - 1 && s.rowBorder, f.denied && { backgroundColor: C.coral + '08' }]}>
            <Avatar initials={f.ini} size={36} tone={f.tone} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.liveName}>{f.name}</Text>
              <Text style={[s.liveStatus, f.denied && { color: C.coral }]}>
                {f.denied ? '✕ ' : '✓ '}{f.status}
              </Text>
            </View>
            <Text style={s.liveTime}>{f.time}</Text>
          </View>
        ))}
      </Card>

      {/* Plan split */}
      <SectionTitle>Subscription split</SectionTitle>
      <Card style={{ marginHorizontal: 20 }}>
        {SUBSCRIPTION_SPLIT.map((p, i, arr) => (
          <View key={p.plan} style={[i < arr.length - 1 && { marginBottom: 14 }]}>
            <View style={s.rowBetween}>
              <Text style={s.subLabel}>{p.plan}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={s.subCount}>{p.count}</Text>
                <Chip label={p.trend} tone={p.trend.startsWith('+') ? 'mint' : 'coral'} />
              </View>
            </View>
            <Bar value={p.count / 462} tone={p.tone} height={5} style={{ marginTop: 6 }} />
          </View>
        ))}
      </Card>

      <View style={{ paddingHorizontal: 20, marginTop: 14, flexDirection: 'row', gap: 10 }}>
        <Btn label="Export" variant="ghost" icon="download-outline" onPress={() => toast('Report exported')} style={{ flex: 1 }} />
        <Btn label="Onboard" icon="add" onPress={() => toast('Onboard wizard')} style={{ flex: 1 }} />
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   FACULTY (activity + attendance)
   ═══════════════════════════════════════════════════════════ */
export function AdminFaculty() {
  const toast = useToast();
  const statusTone = { 'on-floor': 'lime', 'off-shift': 'slate', upcoming: 'cyan', 'on-leave': 'coral' };
  const statusLabel = { 'on-floor': 'ON FLOOR', 'off-shift': 'OFF SHIFT', upcoming: 'UPCOMING', 'on-leave': 'ON LEAVE' };

  const present = FACULTY.filter(f => f.status === 'on-floor' || f.status === 'off-shift').length;
  const onFloor = FACULTY.filter(f => f.status === 'on-floor').length;
  const totalLate = FACULTY.reduce((a, f) => a + f.late, 0);
  const onLeave = FACULTY.filter(f => f.status === 'on-leave').length;

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="TEAM ATTENDANCE"
        title="Faculty"
        sub="Live activity & attendance tracking"
        right={<Pressable onPress={() => toast('Export log')} style={s.gearBtn}><Ionicons name="download-outline" size={18} color={C.t1} /></Pressable>}
      />

      <View style={s.kpiGrid}>
        <Kpi label="Present" value={String(present)} delta="TODAY" color="lime" sub="of 6 scheduled" />
        <Kpi label="On Floor" value={String(onFloor)} delta="LIVE" color="mint" sub="active now" />
        <Kpi label="Late" value={String(totalLate)} delta="MONTH" color="coral" sub="total late arrivals" />
        <Kpi label="On Leave" value={String(onLeave)} delta="LEAVE" color="amber" sub="back Oct 22" />
      </View>

      <SectionTitle>Today's roster</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {FACULTY.map((f, i) => (
          <Pressable key={i} onPress={() => toast(`Opened ${f.name}'s log`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar initials={f.ini} size={44} tone={f.tone} />
                <View style={{ flex: 1 }}>
                  <Text style={s.facName}>{f.name}</Text>
                  <Text style={s.facRole}>{f.role} · {f.shift}</Text>
                </View>
                <Chip label={statusLabel[f.status]} tone={statusTone[f.status]} />
              </View>

              <View style={s.facStats}>
                <View style={s.facStat}>
                  <Text style={[s.facStatVal, { color: f.attendance >= 92 ? C.lime : f.attendance >= 88 ? C.amber : C.coral }]}>
                    {f.attendance}%
                  </Text>
                  <Text style={s.facStatLabel}>ATTENDANCE</Text>
                </View>
                <View style={s.facStatDiv} />
                <View style={s.facStat}>
                  <Text style={s.facStatVal}>{f.hours}h</Text>
                  <Text style={s.facStatLabel}>MONTHLY</Text>
                </View>
                <View style={s.facStatDiv} />
                <View style={s.facStat}>
                  <Text style={[s.facStatVal, f.late > 0 && { color: C.coral }]}>{f.late}</Text>
                  <Text style={s.facStatLabel}>LATE</Text>
                </View>
                <View style={s.facStatDiv} />
                <View style={s.facStat}>
                  <Text style={[s.facStatVal, { fontFamily: 'monospace', fontSize: 12 }]}>{f.checkIn}</Text>
                  <Text style={s.facStatLabel}>CHECK-IN</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   MEMBERS (subscription analysis + referrals)
   ═══════════════════════════════════════════════════════════ */
export function AdminMembers() {
  const toast = useToast();
  const [tab, setTab] = useState('subscriptions');

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="MEMBER ANALYTICS"
        title="Members"
        sub="1,284 active · 38 overdue · 22 frozen"
      />

      <View style={s.segRow}>
        {[['subscriptions','SUBSCRIPTIONS'],['referrals','REFERRALS']].map(([id, label]) => (
          <Pressable key={id} onPress={() => setTab(id)} style={[s.seg, tab === id && s.segActive]}>
            <Text style={[s.segText, tab === id && s.segTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'subscriptions' ? (
        <>
          <View style={s.kpiGrid}>
            <Kpi label="Total" value="1,284" delta="+7.4%" color="lime" sub="active members" />
            <Kpi label="New (Oct)" value="63" delta="+18%" color="mint" sub="net this month" />
            <Kpi label="Churned" value="21" delta="4.8%" color="coral" sub="this month" />
            <Kpi label="ARPU" value="₨4.2K" delta="+4.1%" color="cyan" sub="avg revenue" />
          </View>

          <SectionTitle>Popular subscriptions</SectionTitle>
          <Card style={{ marginHorizontal: 20 }}>
            {SUBSCRIPTION_SPLIT.map((p, i, arr) => {
              const pct = p.count / 1284;
              return (
                <View key={p.plan} style={[i < arr.length - 1 && { marginBottom: 16 }]}>
                  <View style={s.rowBetween}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.subLabel}>{p.plan}</Text>
                      <Text style={s.subMeta}>{(pct * 100).toFixed(1)}% of members</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={s.subCount}>{p.count}</Text>
                      <Chip label={p.trend} tone={p.trend.startsWith('+') ? 'mint' : 'coral'} style={{ marginTop: 4 }} />
                    </View>
                  </View>
                  <Bar value={pct} tone={p.tone} height={6} style={{ marginTop: 8 }} />
                </View>
              );
            })}
          </Card>
        </>
      ) : (
        <>
          <View style={s.kpiGrid}>
            <Kpi label="Total Ref" value="48" delta="▲ 22%" color="lime" sub="last 30 days" />
            <Kpi label="Converted" value="31" delta="64%" color="mint" sub="signup rate" />
            <Kpi label="Revenue" value="₨1.3M" delta="LTV" color="cyan" sub="referred members" />
            <Kpi label="ROI" value="1:11.4" delta="HIGH" color="amber" sub="credit → LTV" />
          </View>

          <SectionTitle>Top referrers</SectionTitle>
          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            {REFERRALS.map((r, i) => (
              <Card key={i}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={r.ini} size={44} tone={r.tone} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.facName}>{r.name}</Text>
                    <Text style={s.facRole}>{r.count} referrals · {r.revenue} revenue</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: C.lime, fontSize: 14, fontWeight: '900', fontFamily: 'monospace' }}>
                      {r.credits}
                    </Text>
                    <Text style={s.facStatLabel}>CREDIT</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <Card style={{ marginHorizontal: 20, marginTop: 14, borderColor: C.mint + '35', backgroundColor: C.mint + '0e' }}>
            <Text style={{ color: C.mint, fontSize: 12, fontWeight: '900', letterSpacing: 1 }}>💡 INSIGHT</Text>
            <Text style={{ color: C.t1, fontSize: 12, marginTop: 8, lineHeight: 17 }}>
              Referral program drives 42% of new signups and returns ₨11.40 in LTV for every ₨1 in credit. Consider raising the credit reward to accelerate.
            </Text>
          </Card>
        </>
      )}
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   COACHES (overview)
   ═══════════════════════════════════════════════════════════ */
export function AdminCoaches() {
  const toast = useToast();
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="COACH OVERVIEW"
        title="Coaches"
        sub="Performance across all active coaches"
        right={<Pressable onPress={() => toast('Export')} style={s.gearBtn}><Ionicons name="download-outline" size={18} color={C.t1} /></Pressable>}
      />

      <View style={s.kpiGrid}>
        <Kpi label="Active" value="5" delta="TEAM" color="lime" sub="of 6 total" />
        <Kpi label="Classes" value="276" delta="OCT" color="mint" sub="delivered" />
        <Kpi label="Avg Rating" value="4.82" delta="▲ 0.06" color="amber" sub="vs Sept" />
        <Kpi label="PT Hours" value="132" delta="MONTH" color="cyan" sub="1-on-1 sessions" />
      </View>

      <SectionTitle action="Full ranking" onAction={() => toast('Ranking opened')}>Leaderboard</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {COACHES.map((c, idx) => (
          <Pressable key={c.ini} onPress={() => toast(`Opened ${c.name}`)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[s.rankBox,
                  idx === 0 && { backgroundColor: C.lime },
                  idx === 1 && { backgroundColor: C.mint },
                  idx === 2 && { backgroundColor: C.cyan },
                ]}>
                  <Text style={[s.rankText, idx < 3 && { color: C.bg }]}>{idx + 1}</Text>
                </View>
                <Avatar initials={c.ini} size={40} tone={c.tone} />
                <View style={{ flex: 1, marginLeft: 4 }}>
                  <Text style={s.facName}>{c.name}</Text>
                  <Text style={s.facRole}>{c.classes} classes · {c.ptSessions} PT</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[s.facStatVal, { color: c.tone }]}>{c.rating}★</Text>
                  <Text style={s.facStatLabel}>RATING</Text>
                </View>
              </View>
              <View style={{ marginTop: 12, gap: 8 }}>
                <MiniBar label="Attendance" value={c.attendance} target={100} tone={c.tone} />
                <MiniBar label="Member retention" value={c.retention} target={100} tone={c.tone} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <Card style={{ marginHorizontal: 20, marginTop: 14, borderColor: C.mint + '35', backgroundColor: C.mint + '0e' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: C.mint, fontSize: 11, fontWeight: '900', letterSpacing: 1 }}>BONUS PAYOUT · OCT</Text>
            <Text style={{ color: C.white, fontSize: 26, fontWeight: '900', fontFamily: 'monospace', marginTop: 4 }}>₨ 185,000</Text>
            <Text style={{ color: C.t2, fontSize: 11, marginTop: 3 }}>5 coaches · based on ratings + retention</Text>
          </View>
          <Pressable onPress={() => toast('Bonus approved')} style={s.approveBtn}>
            <Text style={s.approveBtnText}>APPROVE</Text>
          </Pressable>
        </View>
      </Card>
    </ScrollView>
  );
}

function MiniBar({ label, value, target, tone }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: C.t2, fontSize: 10.5, fontWeight: '700' }}>{label}</Text>
        <Text style={{ color: C.white, fontSize: 10.5, fontWeight: '900', fontFamily: 'monospace' }}>
          {value}<Text style={{ color: C.t3 }}>/{target}</Text>
        </Text>
      </View>
      <Bar value={value / target} tone={tone} height={4} style={{ marginTop: 5 }} />
    </View>
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

  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },

  liveRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  liveName: { color: C.white, fontSize: 13, fontWeight: '800' },
  liveStatus: { color: C.mint, fontSize: 10.5, marginTop: 2, fontFamily: 'monospace' },
  liveTime: { color: C.t3, fontSize: 10.5, fontFamily: 'monospace' },

  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },

  subLabel: { color: C.t1, fontSize: 13, fontWeight: '800' },
  subMeta: { color: C.t3, fontSize: 10.5, marginTop: 2, fontFamily: 'monospace' },
  subCount: { color: C.white, fontSize: 16, fontWeight: '900', fontFamily: 'monospace' },

  facName: { color: C.white, fontSize: 14, fontWeight: '900' },
  facRole: { color: C.t2, fontSize: 11, marginTop: 2 },
  facStats: { flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
  facStat: { flex: 1, alignItems: 'center' },
  facStatDiv: { width: 1, height: 22, backgroundColor: C.border },
  facStatVal: { color: C.white, fontSize: 14, fontWeight: '900' },
  facStatLabel: { color: C.t3, fontSize: 8.5, fontWeight: '900', letterSpacing: 0.8, marginTop: 3 },

  segRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 20, marginBottom: 12 },
  seg: { flex: 1, paddingVertical: 10, borderRadius: R.md, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, alignItems: 'center' },
  segActive: { backgroundColor: C.lime, borderColor: C.lime },
  segText: { color: C.t2, fontSize: 11, fontWeight: '900', letterSpacing: 1, fontFamily: 'monospace' },
  segTextActive: { color: C.bg },

  rankBox: { width: 26, height: 26, borderRadius: 8, backgroundColor: C.card3, alignItems: 'center', justifyContent: 'center' },
  rankText: { color: C.t1, fontSize: 11, fontWeight: '900', fontFamily: 'monospace' },

  approveBtn: { backgroundColor: C.mint, paddingHorizontal: 16, paddingVertical: 12, borderRadius: R.md },
  approveBtnText: { color: C.bg, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
});