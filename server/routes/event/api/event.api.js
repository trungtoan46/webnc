const express = require('express');
const router = express.Router();
const { Event } = require('../../../models/index.model');
const authenticateAdmin = require('../../../middleware/authAdmin');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new event (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, start_date, end_date, image, is_active } = req.body;
    const newEvent = new Event({
      name,
      description,
      start_date,
      end_date,
      image,
      is_active
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, start_date, end_date, image, is_active } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        start_date,
        end_date,
        image,
        is_active,
        updated_at: Date.now()
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get active events
router.get('/status/active', async (req, res) => {
  try {
    const activeEvents = await Event.find({ is_active: true });
    res.json(activeEvents);
  } catch (error) {
    console.error('Error fetching active events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 