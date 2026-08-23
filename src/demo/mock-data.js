const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysFromNow = (n, hour) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  if (hour !== undefined) d.setHours(hour, 0, 0, 0);
  return d;
};

export const lists = [
  { id: '@default', title: 'Default List' },
  { id: 'groceries', title: 'Groceries 🛒' },
  { id: 'family', title: 'Family Plans' },
];

export const events = [
  {
    id: 'ev1',
    calendarId: 'primary',
    title: 'Family Dinner 🍕',
    description: '',
    start: `${fmt(daysFromNow(0))}T18:30:00`,
    end: `${fmt(daysFromNow(0))}T20:00:00`,
    allDay: false,
    location: "Grandma's house",
    color: null,
    attendees: [],
  },
  {
    id: 'ev2',
    calendarId: 'primary',
    title: 'School Sports Day 🏃',
    description: 'Bring sunscreen and water',
    start: fmt(daysFromNow(2)),
    end: fmt(daysFromNow(2)),
    allDay: true,
    location: 'City park',
    color: null,
    attendees: [],
  },
  {
    id: 'ev3',
    calendarId: 'family',
    title: 'Dentist Appointment 🦷',
    description: '',
    start: `${fmt(daysFromNow(-1))}T09:00:00`,
    end: `${fmt(daysFromNow(-1))}T09:45:00`,
    allDay: false,
    location: 'Smile Dental',
    color: null,
    attendees: [],
  },
  {
    id: 'ev4',
    calendarId: 'primary',
    title: 'Weekend Road Trip 🚗',
    description: 'Pack the camping gear',
    start: fmt(daysFromNow(4)),
    end: fmt(daysFromNow(6)),
    allDay: true,
    location: 'Lakeview',
    color: null,
    attendees: [],
  },
];

export const tasks = [
  { id: 't1', listId: '@default', listTitle: 'Default List', title: 'Buy milk 🥛', notes: 'Two litres', due: `${fmt(daysFromNow(0))}T00:00:00`, completed: false, completedAt: null, position: '00000000000000000001', parent: null },
  { id: 't2', listId: 'groceries', listTitle: 'Groceries 🛒', title: 'Vegetables for the week', notes: 'Tomatoes, lettuce, carrots', due: `${fmt(daysFromNow(1))}T00:00:00`, completed: false, completedAt: null, position: '00000000000000000002', parent: null },
  { id: 't3', listId: 'family', listTitle: 'Family Plans', title: 'Book cinema tickets 🎬', notes: 'Check times first', due: null, completed: false, completedAt: null, position: '00000000000000000003', parent: null },
  { id: 't4', listId: 'groceries', listTitle: 'Groceries 🛒', title: 'Pick up dry cleaning', notes: '', due: `${fmt(daysFromNow(-1))}T00:00:00`, completed: true, completedAt: `${fmt(daysFromNow(-1))}T10:00:00`, position: '00000000000000000004', parent: null },
];

export const lastSync = new Date().toISOString();
