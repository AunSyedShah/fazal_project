import { Event } from '../models/Event.js';
import { logError } from '../utils/logger.js';

async function getAllEvents(req, res, next) {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    logError(err);
    next(err);
  }
}

async function getEventById(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    logError(err);
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const { title, venue, date, description } = req.body;
    const event = new Event({ title, venue, date, description });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    logError(err);
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    logError(err);
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    logError(err);
    next(err);
  }
}

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
