/* ══════════ PROFILES (role switcher) ══════════ */
export const PROFILES = [
  { id: 'member', role: 'member', name: 'Bilal Ahmed',   sub: 'Pro Annual member',           ini: 'BA', tone: 'lime',    tag: 'ACTIVE'  },
  { id: 'admin',  role: 'admin',  name: 'Omar Awan',     sub: 'Gym administrator',           ini: 'OA', tone: 'magenta', tag: 'ADMIN'   },
  { id: 'staff',  role: 'staff',  name: 'Sara Ahmed',    sub: 'Head faculty · Strength',     ini: 'SA', tone: 'cyan',    tag: 'FACULTY' },
  { id: 'coach',  role: 'coach',  name: 'Zohaib Hassan', sub: 'Coach · Powerlifting',        ini: 'ZH', tone: 'amber',   tag: 'COACH'   },
];

/* ══════════ MEMBER — HOME ══════════ */
export const MEMBER_STATS = [
  { label: 'STREAK',    value: '14',      unit: 'days',  tone: 'lime' },
  { label: 'WEIGHT',    value: '68',      unit: 'kg',    tone: 't1' },
  { label: 'THIS WEEK', value: '4',       unit: 'classes', tone: 't1' },
];

export const TODAY_WORKOUT = [
  { n: '01', name: 'Bench press',            sets: '4 sets · 8 reps' },
  { n: '02', name: 'Incline dumbbell press', sets: '3 sets · 10 reps' },
  { n: '03', name: 'Cable fly',              sets: '3 sets · 12 reps' },
  { n: '04', name: 'Triceps rope',           sets: '3 sets · 15 reps' },
];

export const ACTIVE_CHALLENGE = {
  title: '30-day streak',
  progress: 14 / 30,
  rank: 8,
  total: 214,
  reward: '1 month free',
};

/* ══════════ CLASSES — CALENDAR ══════════ */
export const CLASSES = [
  { id: 'c1', date: '2026-10-16', time: '06:00 AM', name: 'HIIT Blast',          coach: 'Zohaib', tone: 'lime',    booked: 22, cap: 24 },
  { id: 'c2', date: '2026-10-16', time: '07:30 AM', name: 'Ladies Only Circuit', coach: 'Ayesha', tone: 'magenta', booked: 18, cap: 20 },
  { id: 'c3', date: '2026-10-16', time: '12:00 PM', name: 'Powerlifting Basics', coach: 'Hamza',  tone: 'cyan',    booked: 11, cap: 14 },
  { id: 'c4', date: '2026-10-16', time: '05:00 PM', name: 'Spin & Core',         coach: 'Sara',   tone: 'coral',   booked: 24, cap: 24, full: true },
  { id: 'c5', date: '2026-10-16', time: '06:30 PM', name: 'Boxing Fundamentals', coach: 'Bilal',  tone: 'amber',   booked: 14, cap: 18 },
  { id: 'c6', date: '2026-10-16', time: '08:00 PM', name: 'Yoga & Mobility',     coach: 'Nadia',  tone: 'mint',    booked: 12, cap: 20 },
  { id: 'c7', date: '2026-10-17', time: '07:00 AM', name: 'CrossFit Intro',      coach: 'Zohaib', tone: 'lime',    booked: 8,  cap: 16 },
  { id: 'c8', date: '2026-10-17', time: '09:00 AM', name: 'Yoga Flow',           coach: 'Nadia',  tone: 'mint',    booked: 15, cap: 20 },
  { id: 'c9', date: '2026-10-18', time: '10:00 AM', name: 'Powerlifting Open',   coach: 'Hamza',  tone: 'cyan',    booked: 6,  cap: 12 },
];

/* ══════════ COMMUNITY ══════════ */
export const FEED = [
  { id: 'f1', who: 'Zohaib Riaz',  ini: 'ZR', tone: 'amber',   time: '2h ago', tag: 'PR 🏆',   body: 'New deadlift PR — 200kg × 1! 8 months of grinding. Coach Sara\'s programming works. 💪', likes: 142, comments: 28 },
  { id: 'f2', who: 'Ayesha Nawaz', ini: 'AN', tone: 'magenta', time: '4h ago', tag: 'STREAK', body: '30-day streak unlocked! 🎉 Coming at 6 AM before work was the game changer. Who wants to join a 6 AM accountability group?', likes: 89,  comments: 34 },
  { id: 'f3', who: 'IronHaus',     ini: 'IH', tone: 'lime',    time: '6h ago', tag: '📢',     body: 'New equipment alert! Two Rogue power racks + a full set of calibrated plates just landed. Come test them out this weekend. 🔥', likes: 201, comments: 45 },
  { id: 'f4', who: 'Hassan Khan',  ini: 'HK', tone: 'cyan',    time: '9h ago', tag: 'MOBILITY', body: 'Reminder to everyone hitting heavy squats this week — 10 min of hip mobility before every session. Your future self will thank you.', likes: 67, comments: 12 },
];

export const LEADERBOARD = [
  { rank: 1, name: 'Zohaib Riaz', ini: 'ZR', tone: 'amber',   pts: 1840 },
  { rank: 2, name: 'Sana Ahmed',  ini: 'SA', tone: 'magenta', pts: 1720 },
  { rank: 3, name: 'Hassan Khan', ini: 'HK', tone: 'cyan',    pts: 1650 },
  { rank: 4, name: 'Maria Javed', ini: 'MJ', tone: 'coral',   pts: 1580 },
  { rank: 8, name: 'You · Bilal', ini: 'BA', tone: 'lime',    pts: 1420, me: true },
];

/* ══════════ COMPLAINTS ══════════ */
export const COMPLAINTS = [
  { id: 'C-1042', author: 'Bilal Ahmed',  tone: 'lime',    category: 'Equipment', title: 'Treadmill #3 belt slipping',   body: 'The belt on treadmill #3 slips above 8 km/h. Reported 3 days ago, still not fixed.', status: 'open',     assigned: 'Sara Ahmed',    opened: '2d ago',  replies: 1 },
  { id: 'C-1041', author: 'Ayesha Khan',  tone: 'magenta', category: 'Cleanliness', title: 'Ladies locker room AC',      body: 'AC in the ladies locker room has been warm since Monday afternoon.',              status: 'in-progress', assigned: 'Farhan Dawood', opened: '3d ago',  replies: 2 },
  { id: 'C-1040', author: 'Usman Tariq',  tone: 'coral',   category: 'Billing',    title: 'Charged twice for September', body: 'I was charged twice via JazzCash for my September renewal. Please refund.',     status: 'resolved', assigned: 'Omar Awan',     opened: '5d ago',  replies: 4 },
  { id: 'C-1039', author: 'Fatima Noor',  tone: 'cyan',    category: 'Class',      title: 'Spin class overbooked',      body: 'Last Thursday the 5 PM spin class had 4 more people than bikes. Need a waitlist.', status: 'in-progress', assigned: 'Sara Ahmed',   opened: '6d ago',  replies: 3 },
  { id: 'C-1038', author: 'Ali Raza',     tone: 'cyan',    category: 'Noise',      title: 'Music too loud after 9 PM', body: 'The music volume in the main floor is too loud after 9 PM. Requesting lowering it.', status: 'open',    assigned: 'Unassigned',    opened: '1d ago',  replies: 0 },
];

/* ══════════ ADMIN ══════════ */
export const ADMIN_KPIS = [
  { label: 'Active',   value: '1,284',  delta: '▲ 7.4%',  color: 'lime',    sub: '+63 net · 21 churned' },
  { label: 'Revenue',  value: '₨ 5.42M', delta: '▲ 21.3%', color: 'mint',    sub: 'Target ₨ 6.0M · 90%' },
  { label: 'Check-ins', value: '847',    delta: 'PEAK 7PM', color: 'cyan',   sub: '612 M · 235 F' },
  { label: 'Overdue',  value: '38',      delta: '⚠ ACTION', color: 'coral',  sub: '₨ 1.24M outstanding' },
];

export const SUBSCRIPTION_SPLIT = [
  { plan: 'Pro Annual',   count: 462, trend: '+8.2%', tone: 'lime' },
  { plan: 'Pro Monthly',  count: 347, trend: '+3.1%', tone: 'mint' },
  { plan: 'Standard',     count: 269, trend: '-1.4%', tone: 'cyan' },
  { plan: 'Ladies Only',  count: 141, trend: '+14.7%', tone: 'magenta' },
  { plan: 'Student',      count: 65,  trend: '+2.0%', tone: 'amber' },
];

export const REFERRALS = [
  { name: 'Bilal Ahmed',   ini: 'BA', tone: 'lime',    count: 7, revenue: '₨ 294K', credits: '₨ 4,500' },
  { name: 'Ayesha Khan',   ini: 'AK', tone: 'magenta', count: 5, revenue: '₨ 210K', credits: '₨ 3,000' },
  { name: 'Hassan Khan',   ini: 'HK', tone: 'cyan',    count: 4, revenue: '₨ 168K', credits: '₨ 2,400' },
  { name: 'Zohaib Riaz',   ini: 'ZR', tone: 'amber',   count: 3, revenue: '₨ 126K', credits: '₨ 1,800' },
];

/* ══════════ FACULTY (staff) ══════════ */
export const FACULTY = [
  { ini: 'SA', name: 'Sara Ahmed',    role: 'Head Faculty',  tone: 'lime',    status: 'on-floor',  attendance: 96, hours: 132, late: 0, shift: '05:30 – 13:30', checkIn: '05:24' },
  { ini: 'AY', name: 'Ayesha Yousuf', role: 'Coach',         tone: 'magenta', status: 'on-floor',  attendance: 94, hours: 118, late: 1, shift: '07:00 – 15:00', checkIn: '07:14' },
  { ini: 'FD', name: 'Farhan Dawood', role: 'Front Desk',    tone: 'cyan',    status: 'on-floor',  attendance: 89, hours: 96,  late: 3, shift: '08:00 – 16:00', checkIn: '08:14' },
  { ini: 'MK', name: 'Maryam Khan',   role: 'Cleaner',       tone: 'mint',    status: 'off-shift', attendance: 92, hours: 104, late: 0, shift: '06:00 – 14:00', checkIn: '06:05' },
  { ini: 'ZH', name: 'Zohaib Hassan', role: 'Coach',         tone: 'amber',   status: 'upcoming',  attendance: 91, hours: 104, late: 2, shift: '16:00 – 00:00', checkIn: '—' },
  { ini: 'HS', name: 'Hassan Saeed',  role: 'Coach',         tone: 'coral',   status: 'on-leave',  attendance: 0,  hours: 22,  late: 0, shift: 'On Leave',      checkIn: '—' },
];

export const FACULTY_ROSTER = [
  { ini: 'SA', name: 'Sara Ahmed',    position: 'Main floor',    zone: 'A', shift: '05:30 – 13:30', tone: 'lime' },
  { ini: 'AY', name: 'Ayesha Yousuf', position: 'Ladies studio', zone: 'B', shift: '07:00 – 15:00', tone: 'magenta' },
  { ini: 'ZH', name: 'Zohaib Hassan', position: 'Free weights',  zone: 'C', shift: '16:00 – 00:00', tone: 'amber' },
  { ini: 'FD', name: 'Farhan Dawood', position: 'Front desk',    zone: 'Lobby', shift: '08:00 – 16:00', tone: 'cyan' },
];

/* ══════════ COACH ══════════ */
export const COACH_TIMETABLE = [
  { id: 't1', time: '06:00 AM', duration: '60 min', name: 'HIIT Blast',          studio: 'Studio A', booked: 22, cap: 24, status: 'next' },
  { id: 't2', time: '09:00 AM', duration: '60 min', name: 'PT · Bilal Ahmed',    studio: 'PT Room 2', booked: 1, cap: 1, status: 'pt' },
  { id: 't3', time: '12:00 PM', duration: '45 min', name: 'Powerlifting Basics', studio: 'Free Weights', booked: 11, cap: 14, status: 'upcoming' },
  { id: 't4', time: '04:30 PM', duration: '60 min', name: 'PT · Sana Iqbal',     studio: 'PT Room 1', booked: 1, cap: 1, status: 'pt' },
  { id: 't5', time: '06:30 PM', duration: '60 min', name: 'CrossFit WOD',        studio: 'Studio B', booked: 14, cap: 16, status: 'upcoming' },
];

export const COACH_CLIENTS = [
  { ini: 'BA', name: 'Bilal Ahmed',  tone: 'lime',    plan: 'PT · 3x/week',  weeks: 12, progress: 0.78, lastSession: 'Today, 9:00 AM',  notes: 'Squat depth improving' },
  { ini: 'SI', name: 'Sana Iqbal',   tone: 'magenta', plan: 'PT · 2x/week',  weeks: 8,  progress: 0.52, lastSession: 'Yesterday, 4:30 PM', notes: 'De-load week next' },
  { ini: 'AK', name: 'Ahmed Khan',   tone: 'cyan',    plan: 'PT · 1x/week',  weeks: 4,  progress: 0.25, lastSession: 'Mon, 7:00 PM',      notes: 'New client, form focus' },
  { ini: 'MJ', name: 'Maria Javed',  tone: 'coral',   plan: 'PT · 3x/week',  weeks: 20, progress: 0.92, lastSession: 'Today, 11:30 AM', notes: 'Prepping for comp' },
];

/* ══════════ STAFF — COMPLAINTS TO ANSWER ══════════ */
export const STAFF_COMPLAINTS = COMPLAINTS;

/* ══════════ LEADERBOARD (for admin) ══════════ */
export const COACHES = [
  { ini: 'SA', name: 'Sara Ahmed',    tone: 'lime',    classes: 72, attendance: 96, rating: 4.9, retention: 92, ptSessions: 42 },
  { ini: 'AY', name: 'Ayesha Yousuf', tone: 'magenta', classes: 60, attendance: 94, rating: 4.9, retention: 94, ptSessions: 31 },
  { ini: 'ZH', name: 'Zohaib Hassan', tone: 'cyan',    classes: 56, attendance: 91, rating: 4.8, retention: 88, ptSessions: 24 },
  { ini: 'BI', name: 'Bilal Iqbal',   tone: 'amber',   classes: 48, attendance: 89, rating: 4.7, retention: 85, ptSessions: 19 },
  { ini: 'NA', name: 'Nadia Aslam',   tone: 'mint',    classes: 40, attendance: 92, rating: 4.8, retention: 90, ptSessions: 14 },
];

/* ══════════ LIVE FEED (admin) ══════════ */
export const LIVE_FEED = [
  { ini: 'BA', name: 'Bilal Ahmed', tone: 'lime',    status: 'Pro Annual · Gate A',  time: '20:41', denied: false },
  { ini: 'AK', name: 'Ayesha Khan', tone: 'magenta', status: 'Ladies Only · Gate B', time: '20:39', denied: false },
  { ini: 'UT', name: 'Usman Tariq', tone: 'coral',   status: 'DENIED · payment overdue', time: '20:36', denied: true },
  { ini: 'FN', name: 'Fatima Noor', tone: 'cyan',    status: 'Pro Monthly · Gate B', time: '20:34', denied: false },
  { ini: 'ZR', name: 'Zohaib Riaz', tone: 'amber',   status: 'Student · Gate C',     time: '20:31', denied: false },
];