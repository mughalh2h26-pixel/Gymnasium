import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { C, R } from './theme';

/* ══════════ TOAST ══════════ */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(20)).current;
  const timer = useRef(null);

  const show = useCallback((m) => {
    setMsg(m);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(ty, { toValue: 20, duration: 200, useNativeDriver: true }),
      ]).start();
    }, 2200);
  }, [opacity, ty]);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <Animated.View pointerEvents="none" style={[s.toast, { opacity, transform: [{ translateY: ty }] }]}>
        <View style={s.toastIcon}>
          <Ionicons name="checkmark" size={14} color={C.bg} />
        </View>
        <Text style={s.toastText} numberOfLines={2}>{msg}</Text>
      </Animated.View>
    </ToastCtx.Provider>
  );
}

/* ══════════ GLASS CARD ══════════ */
export function Card({ style, children, accent }) {
  return <View style={[s.card, accent && { borderColor: accent + '35' }, style]}>{children}</View>;
}

/* ══════════ CHIP ══════════ */
const CHIP_TONES = {
  lime:    { border: C.lime + '35',    bg: C.lime + '18',    text: C.lime },
  mint:    { border: C.mint + '35',    bg: C.mint + '18',    text: C.mint },
  cyan:    { border: C.cyan + '35',    bg: C.cyan + '18',    text: C.cyan },
  magenta: { border: C.magenta + '35', bg: C.magenta + '18', text: C.magenta },
  amber:   { border: C.amber + '35',   bg: C.amber + '18',   text: C.amber },
  coral:   { border: C.coral + '35',   bg: C.coral + '18',   text: C.coral },
  slate:   { border: C.border,         bg: 'rgba(255,255,255,0.05)', text: C.t2 },
};
export function Chip({ label, tone = 'lime', style }) {
  const t = CHIP_TONES[tone] || CHIP_TONES.lime;
  return (
    <View style={[s.chip, { borderColor: t.border, backgroundColor: t.bg }, style]}>
      <Text style={[s.chipText, { color: t.text }]}>{label}</Text>
    </View>
  );
}

/* ══════════ BUTTON ══════════ */
export function Btn({ label, onPress, icon, variant = 'primary', full, style }) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.btn,
        isPrimary ? s.btnPrimary : s.btnGhost,
        full && { alignSelf: 'stretch' },
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.92 },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={15} color={isPrimary ? C.bg : C.t1} />}
      <Text style={[s.btnText, isPrimary ? s.btnTextPrimary : s.btnTextGhost]}>{label}</Text>
    </Pressable>
  );
}

/* ══════════ AVATAR ══════════ */
export function Avatar({ initials, size = 40, tone = 'lime', gradient }) {
  if (gradient) {
    return (
      <LinearGradient
        colors={[C.lime, C.mint]}
        style={{ width: size, height: size, borderRadius: size * 0.32, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: C.bg, fontWeight: '900', fontSize: size * 0.32, fontFamily: 'monospace' }}>{initials}</Text>
      </LinearGradient>
    );
  }
  const map = {
    lime:    { bg: C.lime + '22',    fg: C.lime },
    mint:    { bg: C.mint + '22',    fg: C.mint },
    cyan:    { bg: C.cyan + '22',    fg: C.cyan },
    magenta: { bg: C.magenta + '22', fg: C.magenta },
    amber:   { bg: C.amber + '22',   fg: C.amber },
    coral:   { bg: C.coral + '22',   fg: C.coral },
    slate:   { bg: 'rgba(255,255,255,0.08)', fg: C.t2 },
  };
  const t = map[tone] || map.lime;
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.3, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: t.fg, fontWeight: '900', fontSize: size * 0.3, fontFamily: 'monospace' }}>{initials}</Text>
    </View>
  );
}

/* ══════════ PROGRESS BAR ══════════ */
export function Bar({ value, tone = 'lime', height = 6, style }) {
  const fill = {
    lime:    'linear-gradient(90deg, #c6ff3d, #4affc0)',
    mint:    'linear-gradient(90deg, #4affc0, #3ddcff)',
    cyan:    'linear-gradient(90deg, #3ddcff, #4affc0)',
    magenta: 'linear-gradient(90deg, #ff3dd4, #ff5c5c)',
    amber:   'linear-gradient(90deg, #ffb83d, #ff5c5c)',
    coral:   'linear-gradient(90deg, #ff5c5c, #ff3dd4)',
    slate:   'rgba(255,255,255,0.3)',
  }[tone] || '#c6ff3d';
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={[{ height, borderRadius: height, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }, style]}>
      <View style={{ height, width: `${pct}%`, borderRadius: height, backgroundColor: fill, backgroundImage: fill }} />
    </View>
  );
}

/* ══════════ KPI CARD ══════════ */
export function Kpi({ label, value, delta, color = 'lime', sub }) {
  const tone = CHIP_TONES[color] || CHIP_TONES.lime;
  return (
    <Card style={s.kpi}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
        <Text style={s.kpiLabel}>{label}</Text>
        {delta && <Chip label={delta} tone={color} />}
      </View>
      <Text style={s.kpiValue}>{value}</Text>
      {sub && <Text style={s.kpiSub}>{sub}</Text>}
    </Card>
  );
}

/* ══════════ SECTION HEADER ══════════ */
export function SectionTitle({ children, action, onAction }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 10 }}>
      <Text style={s.sectionTitle}>{children}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text style={s.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

/* ══════════ SCREEN HEADER (with kicker + title) ══════════ */
export function ScreenHeader({ kicker, title, sub, right }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flex: 1 }}>
          {kicker && <Text style={s.kicker}>{kicker}</Text>}
          <Text style={s.screenTitle}>{title}</Text>
          {sub && <Text style={s.screenSub}>{sub}</Text>}
        </View>
        {right}
      </View>
    </View>
  );
}

/* ══════════ ICON BUTTON ══════════ */
export function IconBtn({ icon, onPress, tone = 'slate' }) {
  return (
    <Pressable onPress={onPress} style={s.iconBtn}>
      <Ionicons name={icon} size={18} color={C.t1} />
    </Pressable>
  );
}

/* ══════════ STYLES ══════════ */
const s = StyleSheet.create({
  card: {
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
    padding: 16,
  },
  chip: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: R.pill, borderWidth: 1,
  },
  chipText: { fontSize: 9.5, fontWeight: '900', letterSpacing: 0.8 },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    paddingVertical: 13, paddingHorizontal: 18, borderRadius: R.md,
  },
  btnPrimary: { backgroundColor: C.lime },
  btnGhost: { backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: C.borderLight },
  btnText: { fontSize: 13, fontWeight: '800' },
  btnTextPrimary: { color: C.bg },
  btnTextGhost: { color: C.t1 },

  toast: {
    position: 'absolute', bottom: 90, left: 20, right: 20,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: R.lg, backgroundColor: C.card2,
    borderWidth: 1, borderColor: C.lime + '50',
    zIndex: 9999, elevation: 20,
  },
  toastIcon: { width: 22, height: 22, borderRadius: 6, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center' },
  toastText: { color: C.white, fontWeight: '700', fontSize: 13, flex: 1 },

  kpi: { minWidth: 0, flex: 1, padding: 12 },
  kpiLabel: { color: C.t3, fontSize: 9.5, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
  kpiValue: { color: C.white, fontSize: 22, fontWeight: '900', fontFamily: 'monospace', marginTop: 8 },
  kpiSub: { color: C.t3, fontSize: 10, marginTop: 4 },

  sectionTitle: { color: C.white, fontSize: 14, fontWeight: '900' },
  sectionAction: { color: C.lime, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },

  kicker: { color: C.lime, fontSize: 10, fontWeight: '900', letterSpacing: 2.2, fontFamily: 'monospace' },
  screenTitle: { color: C.white, fontSize: 32, fontWeight: '900', letterSpacing: -0.8, marginTop: 4 },
  screenSub: { color: C.t2, fontSize: 13, marginTop: 6, lineHeight: 18 },

  iconBtn: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },
});

export { s as uiStyles };