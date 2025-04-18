const express = require('express');
const router = express.Router();
const { Event } = require('../../../models/index.model');
const {isAdmin, isAuthenticated} = require('../../../middleware/auth');


// Get all events
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' , error: error.message});
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
    res.status(500).json({ message: 'Server error' , error: error.message });
  }
});

// Create new event (admin only)
router.post('/', isAdmin, async (req, res) => {
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
router.put('/:id', isAdmin, async (req, res) => {
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
router.delete('/:id', isAdmin, async (req, res) => {
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


// Link products to event
router.put('/:id/products', isAdmin, async (req, res) => {
  try {
    const { products } = req.body;
    const event = await Event.findById(req.params.id);  
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    event.products = products;
    await event.save();
    res.json(event);
  } catch (error) {
    console.error('Error linking products to event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router; 