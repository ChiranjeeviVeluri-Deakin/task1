let store = []; // [{_id, studentName, tutorName, topic, start, end, status}]

function create(data) {
  const doc = {
    _id: String(Date.now()),
    studentName: data.studentName,
    tutorName:   data.tutorName,
    topic:       data.topic,
    start:       data.start,
    end:         data.end,
    status:      data.status || 'requested'
  };
  store.push(doc);
  return doc;
}

function find() {
  return store;
}

function clear() {
  store = [];
}

module.exports = { create, find, clear };
