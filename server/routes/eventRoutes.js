const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.post('/', async (req, res) => {
	const event = new Event({
		title: req.body.title,
		date: req.body.date,
		reminder: req.body.reminder || false,
	});
	try {
		const newEvent = await event.save();
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	console.log('****** Deleting event ******');
	try {
		console.log('Delete route called');
		await Event.findByIdAndDelete(req.params.id);
		console.log('Event deleted');
		res.json({ message: 'Event deleted' });
	} catch (error) {
		console.error('Error deleting event:', error);
		res.status(500).json({ message: error.message });
	}
});
router.put('/:id', async (req, res) => {
	const eventId = req.params.id;
	const { title, date, reminder } = req.body;

	console.log('reminder', reminder);
	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}

		event.date = date;
		event.title = title;
		event.reminder = reminder;
		console.log('event updated', event.reminder);
		await event.save();

		res.json(event);
	} catch (error) {
		console.error('Error updating event:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;
