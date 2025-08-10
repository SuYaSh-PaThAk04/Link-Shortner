import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routed/Url.Routes.js';
import Url from './models/Url.modal.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  // mongoose options (defaults are fine for modern mongoose)
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// API routes
app.use('/api', urlRoutes);

// Redirect route - must be after /api
app.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlEntry = await Url.findOne({ shortCode: shortcode });
    if (!urlEntry) return res.status(404).send('Not found');

    urlEntry.visitCount += 1;
    await urlEntry.save();
    let target = urlEntry.longUrl;
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;

    res.redirect(target);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => res.send('URL Shortener API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));