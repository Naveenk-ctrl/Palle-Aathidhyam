import { Submission } from '../models/Submission.js';

async function createSubmission(type, body) {
  return Submission.create({ type, ...body });
}

export async function createContact(req, res) {
  const doc = await createSubmission('contact', req.body);
  res.status(201).json({ ok: true, data: doc });
}

export async function createReservation(req, res) {
  const doc = await createSubmission('reservation', req.body);
  res.status(201).json({ ok: true, data: doc });
}

export async function createFeedback(req, res) {
  const { name, phone, rating, review } = req.body;
  const doc = await createSubmission('feedback', { name, phone, rating, review });
  res.status(201).json({ ok: true, data: doc });
}

export async function listSubmissions(req, res) {
  const { type } = req.query;
  const filter = type ? { type } : {};
  const items = await Submission.find(filter).sort({ createdAt: -1 });
  res.json({ ok: true, data: items });
}

export async function updateSubmission(req, res) {
  const { id } = req.params;
  const updated = await Submission.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ ok: true, data: updated });
}
