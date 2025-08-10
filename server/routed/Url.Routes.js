import express from 'express';
import Url from '../models/Url.modal.js';
import { customAlphabet } from 'nanoid';

const router = express.Router();
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

// POST /api/shorten
router.post('/shorten', async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'longUrl is required' });

    // Optionally check if already exists
    let existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`, shortCode: existing.shortCode });
    }

    let shortCode;
    // ensure uniqueness
    do {
      shortCode = nanoid();
    } while (await Url.findOne({ shortCode }));

    const newUrl = await Url.create({ longUrl, shortCode });
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}`, shortCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin/urls  (admin-only should be protected in prod)
router.get('/admin/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;