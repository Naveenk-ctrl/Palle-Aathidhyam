import express from 'express';
import cors from 'cors';
import { config } from './src/config.js';
import { connectDb } from './src/db.js';
import submissionRoutes from './src/routes/submissionRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import siteConfigRoutes from './src/routes/siteConfigRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

await connectDb();

const app = express();

app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'palle-aathidhyam-backend' });
});

app.use('/api', siteConfigRoutes);
app.use('/api', submissionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', uploadRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
