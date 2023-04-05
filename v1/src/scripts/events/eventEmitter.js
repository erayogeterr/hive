// const events = require("events")
// module.exports = new events.EventEmitter();

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

module.exports = eventEmitter;