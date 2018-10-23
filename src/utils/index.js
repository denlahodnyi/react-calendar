import moment from 'moment';
import { forEach, sortBy } from 'lodash';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

const setToStorage = (key, value) => {
  if (window && window.localStorage) {
    const localStorage = window.localStorage;
    localStorage.setItem(key, JSON.stringify(value));
  } 
};

const getFromStorage = (key) => {
  if (window && window.localStorage) {
    const localStorage = window.localStorage;
    return (JSON.parse(localStorage.getItem(key)) || []);
  }
};

const initStorage = () => {
  const mockEvents = [
    {event_title: 'October26', event_desc: 'october 26 test', event_start: '2018-10-26 00:00:00', event_end: '2018-10-26 23:59:59'},
    {event_title: 'October28', event_desc: 'october 28 test 1', event_start: '2018-10-28 09:00:00', event_end: '2018-10-26 23:59:59'},
    {event_title: 'October28', event_desc: 'october 28 test 2', event_start: '2018-10-28 05:00:00', event_end: '2018-10-26 23:59:59'},
    {event_title: 'November2', event_desc: 'november 2 test 2', event_start: '2018-11-02 13:20:00', event_end: '2018-11-02 20:59:59'},
  ];
  setToStorage('calendar_events', mockEvents);
};

const getMonthEvents = (startDate, endDate) => {
  const startDateMoment = moment(startDate, FORMAT);
  const endDateMoment = moment(endDate, FORMAT);
  const events = getFromStorage('calendar_events');
  console.log('utils events', events);
  let sortedEvents = [];
  forEach(events, (event) => {
    const eventStartMoment = moment(event.event_start, FORMAT);
    const eventEndMoment = moment(event.event_end, FORMAT);
    if (eventStartMoment.isSameOrAfter(startDateMoment) && eventEndMoment.isSameOrBefore(endDateMoment)) {
      sortedEvents.push(event);
    }
  });
  sortedEvents = sortBy(sortedEvents, [(obj) => obj.event_start])
  console.log('utils sortedEvents', sortedEvents);
  return sortedEvents;
};

export {
  setToStorage,
  getFromStorage,
  initStorage,
  getMonthEvents,
};