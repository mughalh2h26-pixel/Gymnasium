import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from './theme';
import { Card, Chip, Btn, Avatar, Bar, SectionTitle, ScreenHeader, useToast } from './components';
import { MEMBER_STATS, TODAY_WORKOUT, ACTIVE_CHALLENGE, CLASSES, FEED, LEADERBOARD, COMPLAINTS } from './mock';

/* ═══════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════ */
export function MemberHome() {
  const toast = useToast();
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="GOOD EVENING"
        title="Bilal Ahmed"
        right={<Pressable onPress={() => toast('Settings')} style={s.gearBtn}><Ionicons name="settings-outline" size={18} color={C.t1} /></Pressable>}
      />

      {/* Stats */}
      <View style={s.statsRow}>
        {MEMBER_STATS.map((st, i) => (
          <Card key={i} style={s.statBox}>
            <Text style={s.statLabel}>{st.label}</Text>
            <Text style={[s.statValue, st.tone === 'lime' && { color: C.lime }]}>
              {st.value}<Text style={s.statUnit}> {st.unit}</Text>
            </Text>
          </Card>
        ))}
      </View>

      {/* Membership */}
      <Pressable onPress={() => toast('QR ready — scan at gate')} style={{ marginHorizontal: 20, marginTop: 16 }}>
        <LinearGradient
          colors={[C.lime, C.mint]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={s.memberCard}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={s.cardKicker}>MEMBERSHIP</Text>
              <Text style={s.cardTitle}>Pro Annual</Text>
            </View>
            <View style={s.activePill}>
              <Text style={s.activePillText}>ACTIVE</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 26 }}>
            <View>
              <Text style={s.cardKicker2}>VALID THROUGH</Text>
              <Text style={s.cardDate}>12 December 2026</Text>
              <Text style={s.cardMeta}>57 days remaining</Text>
            </View>
            <View style={s.qrBox}>
              <Ionicons name="qr-code-outline" size={30} color={C.lime} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      {/* Workout */}
      <Card style={s.section}>
        <View style={s.rowBetween}>
          <Text style={s.h3}>Today's workout</Text>
          <Chip label="PUSH DAY" tone="lime" />
        </View>
        <View style={{ marginTop: 14, gap: 14 }}>
          {TODAY_WORKOUT.map((ex, i) => (
            <Pressable
              key={i}
              onPress={() => toast(`${ex.name} — exercise opened`)}
              style={[s.exRow, i < TODAY_WORKOUT.length - 1 && s.exRowBorder]}
            >
              <Text style={s.exNum}>{ex.n}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.exName}>{ex.name}</Text>
                <Text style={s.exSets}>{ex.sets}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={C.t3} />
            </Pressable>
          ))}
        </View>
        <Btn label="Start workout" full onPress={() => toast('Workout started 💪')} style={{ marginTop: 16 }} />
      </Card>

      {/* Challenge */}
      <Card style={[s.section, { borderColor: C.magenta + '35', backgroundColor: C.magenta + '0e' }]}>
        <View style={s.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text style={s.challengeKicker}>ACTIVE CHALLENGE</Text>
            <Text style={s.challengeName}>{ACTIVE_CHALLENGE.title}</Text>
          </View>
          <View style={s.challengeBadge}>
            <Text style={s.challengeBadgeVal}>14</Text>
            <Text style={s.challengeBadgeLabel}>DAYS</Text>
          </View>
        </View>
        <Text style={s.challengeMeta}>
          You're <Text style={{ color: C.magenta, fontWeight: '900' }}>#{ACTIVE_CHALLENGE.rank}</Text> of {ACTIVE_CHALLENGE.total} members
        </Text>
        <View style={{ marginTop: 12 }}>
          <Bar value={ACTIVE_CHALLENGE.progress} tone="magenta" height={8} />
        </View>
      </Card>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   CALENDAR (classes)
   ═══════════════════════════════════════════════════════════ */
const MONTH = 'October 2026';
const DAYS_SHORT = ['S','M','T','W','T','F','S'];
const CAL_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
// Oct 1, 2026 is a Thursday (index 4 in Sun=0 layout)
const CAL_PAD = 4;

export function MemberCalendar() {
  const toast = useToast();
  const [selectedDay, setSelectedDay] = useState(16);
  const [viewMode, setViewMode] = useState('month'); // month | week

  const dayString = `2026-10-${String(selectedDay).padStart(2, '0')}`;
  const dayClasses = useMemo(
    () => CLASSES.filter(c => c.date === dayString),
    [dayString]
  );

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="TRAIN TOGETHER"
        title="Classes"
        sub="Friday, 16 October · Find your next session."
        right={<Pressable onPress={() => toast('Settings')} style={s.gearBtn}><Ionicons name="settings-outline" size={18} color={C.t1} /></Pressable>}
      />

      {/* View toggle */}
      <View style={s.segRow}>
        {['month', 'week'].map(m => (
          <Pressable
            key={m}
            onPress={() => setViewMode(m)}
            style={[s.seg, viewMode === m && s.segActive]}
          >
            <Text style={[s.segText, viewMode === m && s.segTextActive]}>{m.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {/* Calendar grid */}
      <Card style={{ marginHorizontal: 20, marginTop: 12, paddingVertical: 16 }}>
        <View style={s.calHeader}>
          <Text style={s.calMonth}>{MONTH}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable onPress={() => toast('Previous month')}><Ionicons name="chevron-back" size={18} color={C.t2} /></Pressable>
            <Pressable onPress={() => toast('Next month')}><Ionicons name="chevron-forward" size={18} color={C.t2} /></Pressable>
          </View>
        </View>
        <View style={s.calDaysRow}>
          {DAYS_SHORT.map((d, i) => (
            <Text key={i} style={s.calDayShort}>{d}</Text>
          ))}
        </View>
        <View style={s.calGrid}>
          {Array.from({ length: CAL_PAD }).map((_, i) => (
            <View key={`pad-${i}`} style={s.calCell} />
          ))}
          {CAL_DAYS.map(d => {
            const isSelected = d === selectedDay;
            const hasClass = CLASSES.some(c => c.date === `2026-10-${String(d).padStart(2, '0')}`);
            const isToday = d === 16;
            return (
              <Pressable
                key={d}
                onPress={() => setSelectedDay(d)}
                style={[s.calCell, s.calBtn, isSelected && s.calSelected, isToday && !isSelected && s.calToday]}
              >
                <Text style={[s.calNum, isSelected && s.calNumActive, isToday && !isSelected && { color: C.lime }]}>
                  {d}
                </Text>
                {hasClass && <View style={[s.calDot, isSelected && { backgroundColor: C.bg }]} />}
              </Pressable>
            );
          })}
        </View>
      </Card>

      <SectionTitle action="Book all" onAction={() => toast('Bulk booking opened')}>
        {selectedDay === 16 ? 'Today' : `${selectedDay} October`} · {dayClasses.length} classes
      </SectionTitle>

      <View style={{ paddingHorizontal: 20, gap: 12 }}>
        {dayClasses.length === 0 && (
          <Card><Text style={{ color: C.t2, textAlign: 'center', paddingVertical: 20 }}>No classes scheduled</Text></Card>
        )}
        {dayClasses.map(c => {
          const pct = c.booked / c.cap;
          const tone = c.full ? 'coral' : pct > 0.85 ? 'amber' : c.tone;
          return (
            <Card key={c.id}>
              <View style={s.rowBetween}>
                <View>
                  <Text style={[s.classTime, { color: tone === 'coral' ? C.coral : tone === 'amber' ? C.amber : c.tone === 'lime' ? C.lime : c.tone === 'mint' ? C.mint : c.tone === 'cyan' ? C.cyan : c.tone === 'magenta' ? C.magenta : C.amber }]}>
                    {c.time}
                  </Text>
                  <Text style={s.className}>{c.name}</Text>
                  <Text style={s.classCoach}>Coach {c.coach}</Text>
                </View>
                <Chip
                  label={c.full ? 'FULL' : `${c.cap - c.booked} SPOTS`}
                  tone={tone}
                />
              </View>
              <View style={{ marginTop: 12 }}>
                <Bar value={pct} tone={tone} height={5} />
              </View>
              {c.full ? (
                <Btn label="Join waitlist" variant="ghost" full style={{ marginTop: 12 }} onPress={() => toast('Added to waitlist')} />
              ) : (
                <Btn label="Book class" full style={{ marginTop: 12 }} onPress={() => toast(`Booked: ${c.name}`)} />
              )}
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMMUNITY (social + leaderboard)
   ═══════════════════════════════════════════════════════════ */
export function MemberCommunity() {
  const toast = useToast();
  const [tab, setTab] = useState('feed');

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader kicker="TRAIN TOGETHER" title="Community" sub="1,284 members · 42 posts today" />

      <View style={s.segRow}>
        {['feed', 'leaderboard'].map(m => (
          <Pressable key={m} onPress={() => setTab(m)} style={[s.seg, tab === m && s.segActive]}>
            <Text style={[s.segText, tab === m && s.segTextActive]}>{m.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'feed' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16, gap: 12 }}>
          {/* Compose */}
          <Pressable onPress={() => toast('Compose post')} style={s.compose}>
            <Avatar initials="BA" size={36} gradient />
            <Text style={s.composeText}>Share a win, PR, or update…</Text>
            <Ionicons name="create-outline" size={18} color={C.lime} />
          </Pressable>

          {FEED.map(p => (
            <Card key={p.id}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar initials={p.ini} size={40} tone={p.tone} />
                <View style={{ flex: 1 }}>
                  <Text style={s.postName}>{p.who}</Text>
                  <Text style={s.postTime}>{p.time}</Text>
                </View>
                <Chip label={p.tag} tone={p.tone} />
              </View>
              <Text style={s.postBody}>{p.body}</Text>
              <View style={s.postActions}>
                <Pressable onPress={() => toast('Liked')} style={s.postAction}>
                  <Ionicons name="thumbs-up-outline" size={16} color={C.t2} />
                  <Text style={s.postActionText}>{p.likes}</Text>
                </Pressable>
                <Pressable onPress={() => toast('Comments')} style={s.postAction}>
                  <Ionicons name="chatbubble-outline" size={16} color={C.t2} />
                  <Text style={s.postActionText}>{p.comments}</Text>
                </Pressable>
                <Pressable onPress={() => toast('Shared')} style={[s.postAction, { marginLeft: 'auto' }]}>
                  <Ionicons name="share-outline" size={16} color={C.t2} />
                </Pressable>
              </View>
            </Card>
          ))}
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Card style={{ padding: 0 }}>
            {LEADERBOARD.map((l, i, arr) => (
              <View key={l.rank} style={[s.lbRow, i < arr.length - 1 && s.rowBorder, l.me && s.lbRowMe]}>
                <View style={[s.lbRank, l.rank === 1 && { backgroundColor: C.amber }]}>
                  <Text style={[s.lbRankText, l.rank === 1 && { color: C.bg }]}>{l.rank}</Text>
                </View>
                <Avatar initials={l.ini} size={36} tone={l.tone} />
                <Text style={[s.lbName, { flex: 1, marginLeft: 12 }, l.me && { fontWeight: '900', color: C.lime }]}>
                  {l.name}
                </Text>
                <Text style={[s.lbPts, l.me && { color: C.lime }]}>{l.pts.toLocaleString()}</Text>
              </View>
            ))}
          </Card>

          <Card style={{ marginTop: 12, borderColor: C.amber + '35', backgroundColor: C.amber + '0e' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 22 }}>🏆</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: C.amber, fontWeight: '900', fontSize: 12 }}>WEEKLY PRIZE</Text>
                <Text style={{ color: C.white, fontWeight: '900', fontSize: 14, marginTop: 2 }}>1 month free membership</Text>
                <Text style={{ color: C.t2, fontSize: 11, marginTop: 2 }}>Ends Sunday · top scorer wins</Text>
              </View>
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS
   ═══════════════════════════════════════════════════════════ */
export function MemberProgress() {
  const toast = useToast();
  const weightData = [78, 76, 74, 72, 70, 69, 68.4];
  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader kicker="YOUR JOURNEY" title="Progress" sub="Last 6 months · 84 workouts logged" />

      <Card style={{ marginHorizontal: 20 }}>
        <View style={s.rowBetween}>
          <View>
            <Text style={s.statLabel}>CURRENT WEIGHT</Text>
            <Text style={{ color: C.white, fontSize: 32, fontWeight: '900', fontFamily: 'monospace', marginTop: 6 }}>
              68.4<Text style={{ fontSize: 14, color: C.t3 }}> kg</Text>
            </Text>
          </View>
          <Chip label="▼ 6.8 KG" tone="lime" />
        </View>

        <View style={s.chart}>
          {weightData.map((v, i) => (
            <View key={i} style={s.chartCol}>
              <LinearGradient
                colors={i === weightData.length - 1 ? [C.lime, C.mint] : ['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.06)']}
                style={{ width: '60%', height: `${((v - 60) / 20) * 100}%`, borderRadius: 3, alignSelf: 'center' }}
              />
            </View>
          ))}
        </View>
        <View style={s.chartLabels}>
          {['MAY','JUN','JUL','AUG','SEP','OCT'].map((m, i) => (
            <Text key={i} style={[s.chartLabel, i === 5 && { color: C.lime }]}>{m}</Text>
          ))}
        </View>
      </Card>

      <SectionTitle>Body stats</SectionTitle>
      <View style={s.grid2}>
        {[
          { l: 'BODY FAT', v: '18.2%', d: '▼ 3.1%' },
          { l: 'CHEST',    v: '102cm', d: '▲ 4cm' },
          { l: 'WAIST',    v: '82cm',  d: '▼ 7cm' },
          { l: 'BENCH 1RM', v: '85kg', d: '▲ 15kg' },
        ].map(x => (
          <Card key={x.l} style={{ flex: 1, minWidth: '47%' }}>
            <Text style={s.statLabel}>{x.l}</Text>
            <Text style={{ color: C.white, fontSize: 20, fontWeight: '900', fontFamily: 'monospace', marginTop: 6 }}>
              {x.v}
            </Text>
            <Text style={{ color: C.lime, fontSize: 10.5, fontWeight: '900', marginTop: 4 }}>{x.d}</Text>
          </Card>
        ))}
      </View>

      <SectionTitle>Achievements</SectionTitle>
      <View style={[s.grid2, { paddingHorizontal: 20 }]}>
        {[
          { e: '🔥', l: '30-DAY STREAK', u: true },
          { e: '💪', l: '100 WORKOUTS',  u: true },
          { e: '🏆', l: 'TOP 10 WEEKLY', u: true },
          { e: '🥇', l: '200 WORKOUTS',  u: false },
        ].map(a => (
          <Pressable key={a.l} onPress={() => toast(a.u ? `${a.l} earned!` : `${a.l} locked`)} style={[{ flex: 1, minWidth: '47%' }, !a.u && { opacity: 0.35 }]}>
            <Card style={{ alignItems: 'center', paddingVertical: 16 }}>
              <Text style={{ fontSize: 26 }}>{a.e}</Text>
              <Text style={s.achLabel}>{a.l}</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLAINTS (member — submit + view own)
   ═══════════════════════════════════════════════════════════ */
export function MemberComplaints() {
  const toast = useToast();
  const mine = COMPLAINTS.filter(c => c.author === 'Bilal Ahmed');

  return (
    <ScrollView contentContainerStyle={s.wrap} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        kicker="HAVE YOUR SAY"
        title="Complaints"
        sub="Report an issue — our team will respond within 24 hours."
        right={
          <Pressable onPress={() => toast('New complaint form')} style={s.gearBtn}>
            <Ionicons name="add" size={20} color={C.lime} />
          </Pressable>
        }
      />

      <Pressable onPress={() => toast('New complaint form opened')} style={{ marginHorizontal: 20, marginBottom: 4 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12, borderColor: C.lime + '35', backgroundColor: C.lime + '0e' }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: C.lime + '25', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={22} color={C.lime} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.white, fontWeight: '900', fontSize: 13 }}>Raise a new complaint</Text>
            <Text style={{ color: C.t2, fontSize: 11, marginTop: 2 }}>Equipment, cleanliness, billing, classes…</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={C.lime} />
        </Card>
      </Pressable>

      <SectionTitle>Your complaints · {mine.length}</SectionTitle>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {mine.map(c => (
          <ComplaintCard key={c.id} c={c} onPress={() => toast(`Opened ${c.id}`)} />
        ))}
      </View>
    </ScrollView>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHARED — complaint card
   ═══════════════════════════════════════════════════════════ */
const STATUS_TONE = { open: 'coral', 'in-progress': 'amber', resolved: 'mint' };
const STATUS_LABEL = { open: 'OPEN', 'in-progress': 'IN PROGRESS', resolved: 'RESOLVED' };

export function ComplaintCard({ c, onPress, showAssignee }) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={s.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
            <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: C.card3, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: C.t2, fontFamily: 'monospace', fontSize: 9, fontWeight: '900' }}>{c.id.slice(-2)}</Text>
            </View>
            <Text style={{ color: C.t3, fontFamily: 'monospace', fontSize: 10, fontWeight: '800' }}>{c.id}</Text>
            <Chip label={c.category.toUpperCase()} tone="slate" />
          </View>
          <Chip label={STATUS_LABEL[c.status]} tone={STATUS_TONE[c.status]} />
        </View>

        <Text style={s.complaintTitle}>{c.title}</Text>
        <Text style={s.complaintBody} numberOfLines={2}>{c.body}</Text>

        <View style={s.complaintFooter}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Avatar initials={c.author.split(' ').map(w => w[0]).join('')} size={22} tone={c.tone} />
            <Text style={s.complaintMeta}>{c.author}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {showAssignee && <Text style={s.complaintMeta}>→ {c.assigned}</Text>}
            <Text style={s.complaintMeta}>{c.opened}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="chatbubble-outline" size={12} color={C.t3} />
              <Text style={s.complaintMeta}>{c.replies}</Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

/* ═══════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════ */
const s = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  h3: { color: C.white, fontSize: 16, fontWeight: '900' },

  gearBtn: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Stats row
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20 },
  statBox: { flex: 1, padding: 12, borderRadius: R.lg },
  statLabel: { color: C.t3, fontSize: 9.5, fontWeight: '900', letterSpacing: 1, fontFamily: 'monospace' },
  statValue: { color: C.white, fontSize: 20, fontWeight: '900', marginTop: 6 },
  statUnit: { color: C.t3, fontSize: 11, fontWeight: '700' },

  // Membership card
  memberCard: { borderRadius: R.xxl, padding: 22, overflow: 'hidden' },
  cardKicker: { color: 'rgba(10,14,21,0.65)', fontSize: 10, fontWeight: '900', letterSpacing: 2, fontFamily: 'monospace' },
  cardKicker2: { color: 'rgba(10,14,21,0.65)', fontSize: 9, fontWeight: '900', letterSpacing: 2, fontFamily: 'monospace' },
  cardTitle: { color: C.bg, fontSize: 26, fontWeight: '900', marginTop: 4, letterSpacing: -0.5 },
  cardDate: { color: C.bg, fontSize: 16, fontWeight: '900', marginTop: 4 },
  cardMeta: { color: 'rgba(10,14,21,0.7)', fontSize: 11, marginTop: 3 },
  activePill: { backgroundColor: C.bg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  activePillText: { color: C.lime, fontSize: 9.5, fontWeight: '900', letterSpacing: 1 },
  qrBox: { width: 56, height: 56, borderRadius: 16, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },

  // Section
  section: { marginHorizontal: 20, marginTop: 16 },

  // Exercises
  exRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 },
  exRowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  exNum: { color: C.t3, fontFamily: 'monospace', fontSize: 11, fontWeight: '900', width: 24 },
  exName: { color: C.white, fontSize: 14, fontWeight: '800' },
  exSets: { color: C.t2, fontSize: 12, marginTop: 3 },

  // Challenge
  challengeKicker: { color: C.magenta, fontSize: 10, fontWeight: '900', letterSpacing: 2, fontFamily: 'monospace' },
  challengeName: { color: C.white, fontSize: 18, fontWeight: '900', marginTop: 6 },
  challengeMeta: { color: C.t2, fontSize: 12.5, marginTop: 12 },
  challengeBadge: { width: 56, height: 56, borderRadius: 16, backgroundColor: C.magenta + '25', alignItems: 'center', justifyContent: 'center' },
  challengeBadgeVal: { color: C.magenta, fontSize: 20, fontWeight: '900', fontFamily: 'monospace', lineHeight: 22 },
  challengeBadgeLabel: { color: C.magenta, fontSize: 8.5, fontWeight: '900', letterSpacing: 1, marginTop: 1 },

  // Segmented control
  segRow: {
    flexDirection: 'row', gap: 6, paddingHorizontal: 20,
    marginBottom: 4,
  },
  seg: {
    flex: 1, paddingVertical: 10, borderRadius: R.md,
    borderWidth: 1, borderColor: C.border,
    backgroundColor: C.card,
    alignItems: 'center',
  },
  segActive: { backgroundColor: C.lime, borderColor: C.lime },
  segText: { color: C.t2, fontSize: 11, fontWeight: '900', letterSpacing: 1, fontFamily: 'monospace' },
  segTextActive: { color: C.bg },

  // Calendar
  calHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  calMonth: { color: C.white, fontSize: 14, fontWeight: '900' },
  calDaysRow: { flexDirection: 'row', marginBottom: 6 },
  calDayShort: { flex: 1, textAlign: 'center', color: C.t3, fontSize: 10, fontWeight: '900', fontFamily: 'monospace' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  calBtn: { borderRadius: 10 },
  calSelected: { backgroundColor: C.lime },
  calToday: { borderWidth: 1, borderColor: C.lime + '55' },
  calNum: { color: C.t1, fontSize: 13, fontWeight: '800' },
  calNumActive: { color: C.bg, fontWeight: '900' },
  calDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.lime, marginTop: 2, position: 'absolute', bottom: 4 },

  // Class card
  classTime: { fontSize: 11, fontWeight: '900', fontFamily: 'monospace', letterSpacing: 0.5 },
  className: { color: C.white, fontSize: 16, fontWeight: '900', marginTop: 4 },
  classCoach: { color: C.t2, fontSize: 12, marginTop: 2 },

  // Compose
  compose: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border, backgroundColor: C.card,
  },
  composeText: { flex: 1, color: C.t3, fontSize: 13 },

  // Post
  postName: { color: C.white, fontSize: 13, fontWeight: '900' },
  postTime: { color: C.t3, fontSize: 10.5, marginTop: 2, fontFamily: 'monospace' },
  postBody: { color: C.t1, fontSize: 13, lineHeight: 19, marginTop: 12 },
  postActions: { flexDirection: 'row', gap: 20, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border, alignItems: 'center' },
  postAction: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  postActionText: { color: C.t2, fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },

  // Leaderboard
  lbRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  lbRowMe: { backgroundColor: C.lime + '10' },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  lbRank: { width: 26, height: 26, borderRadius: 8, backgroundColor: C.card3, alignItems: 'center', justifyContent: 'center' },
  lbRankText: { color: C.t1, fontSize: 11, fontWeight: '900', fontFamily: 'monospace' },
  lbName: { color: C.white, fontSize: 12.5, fontWeight: '700' },
  lbPts: { color: C.t2, fontSize: 12, fontWeight: '900', fontFamily: 'monospace' },

  // Progress
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 100, marginTop: 20 },
  chartCol: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartLabel: { color: C.t3, fontSize: 9.5, fontFamily: 'monospace', fontWeight: '900' },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  achLabel: { color: C.white, fontSize: 9.5, fontWeight: '900', marginTop: 6, letterSpacing: 0.5, fontFamily: 'monospace', textAlign: 'center' },

  // Complaint
  complaintTitle: { color: C.white, fontSize: 13.5, fontWeight: '900', marginTop: 12 },
  complaintBody: { color: C.t2, fontSize: 12, lineHeight: 17, marginTop: 6 },
  complaintFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
  complaintMeta: { color: C.t3, fontSize: 10.5, fontFamily: 'monospace' },
});