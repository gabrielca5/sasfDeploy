const eventStyleByType = {
  'pdu-reavaliacao': { backgroundColor: '#d97706', border: 'none', borderRadius: 6 },
  'pdu-validade': { backgroundColor: '#db2777', border: 'none', borderRadius: 6 },
}

export function getCalendarEventProps(type) {
  return eventStyleByType[type] ? { style: eventStyleByType[type] } : {}
}
