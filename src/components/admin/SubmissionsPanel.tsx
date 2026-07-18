'use client';

import { useEffect, useState } from 'react';
import { backendUrl } from '@/lib/backend';
import type { SubmissionRecord, SubmissionStatus } from '@/types/submission';
import { 
  RefreshCw, 
  MessageSquare, 
  Calendar, 
  Star, 
  Clock, 
  Check, 
  Mail, 
  Phone,
  User,
  Inbox,
  Send
} from 'lucide-react';

const statusOptions: SubmissionStatus[] = ['new', 'viewed', 'replied', 'closed'];

export default function SubmissionsPanel({ adminSecret }: { adminSecret: string }) {
  const [items, setItems] = useState<SubmissionRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, { status: SubmissionStatus; adminReply: string }>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Filtering states
  const [typeFilter, setTypeFilter] = useState<'all' | 'contact' | 'reservation' | 'feedback'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');

  const loadSubmissions = async () => {
    setLoading(true);
    setMessage('Loading inbox items...');

    try {
      const response = await fetch(backendUrl('/api/admin/submissions'), {
        headers: adminSecret ? { 'x-admin-secret': adminSecret } : {},
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        setMessage(result?.message || 'Unable to load inbox items.');
        setItems([]);
        return;
      }

      const data = (result.data || []) as SubmissionRecord[];
      setItems(data);
      setDrafts(
        Object.fromEntries(
          data.map((item) => [item._id, { status: item.status, adminReply: item.adminReply || '' }])
        )
      );
      setMessage(data.length ? `${data.length} submissions found.` : 'Inbox is empty.');
    } catch {
      setMessage('Failed to connect to the backend API.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminSecret]);

  const saveSubmission = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;

    try {
      const response = await fetch(backendUrl(`/api/admin/submissions/${id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(adminSecret ? { 'x-admin-secret': adminSecret } : {}),
        },
        body: JSON.stringify(draft),
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        alert(result?.message || 'Failed to update item.');
        return;
      }

      // Local update feedback
      setItems(current => current.map(item => item._id === id ? { ...item, status: draft.status, adminReply: draft.adminReply } : item));
      alert('Inbox item updated successfully.');
    } catch {
      alert('Failed to save changes. Network error.');
    }
  };

  // Filter logic
  const filteredItems = items.filter(item => {
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchType && matchStatus;
  });

  return (
    <section className="space-y-6 rounded-[28px] bg-white p-6 sm:p-8 shadow-luxury-md border border-border/60">
      {/* Inbox Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-primary-green">
            Inbound Submissions
          </h2>
          <p className="mt-1 font-[family-name:var(--font-poppins)] text-xs text-wood-brown/60">
            Read and respond to inquiries, bookings, and customer reviews.
          </p>
        </div>
        <button
          onClick={() => void loadSubmissions()}
          disabled={loading}
          className="flex items-center gap-1.5 self-start rounded-full border border-border bg-white px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold text-wood-brown hover:bg-cream transition shrink-0 shadow-luxury-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh Inbox'}
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-cream/35 rounded-2xl p-4 border border-border/50">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
              typeFilter === 'all'
                ? 'bg-primary-green border-primary-green text-ivory'
                : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
            }`}
          >
            All Submissions
          </button>
          <button
            onClick={() => setTypeFilter('reservation')}
            className={`rounded-xl px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
              typeFilter === 'reservation'
                ? 'bg-primary-green border-primary-green text-ivory'
                : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => setTypeFilter('contact')}
            className={`rounded-xl px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
              typeFilter === 'contact'
                ? 'bg-primary-green border-primary-green text-ivory'
                : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setTypeFilter('feedback')}
            className={`rounded-xl px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
              typeFilter === 'feedback'
                ? 'bg-primary-green border-primary-green text-ivory'
                : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
            }`}
          >
            Feedbacks
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-xs">
          <span className="font-semibold text-wood-brown/65">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl border border-border bg-white px-3 py-1.5 font-semibold text-wood-brown/80"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold text-wood-brown/50 px-1">
        {message}
      </p>

      {/* Inbox Feed */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-[24px]">
            <Inbox className="h-10 w-10 text-wood-brown/30 mx-auto mb-2" />
            <p className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown/60">
              No matching messages or bookings.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const draft = drafts[item._id] || { status: item.status, adminReply: item.adminReply || '' };
            const dateStr = new Date(item.createdAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            });

            // Tag classes
            let badgeBg = 'bg-cream text-wood-brown';
            if (item.type === 'reservation') badgeBg = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
            else if (item.type === 'contact') badgeBg = 'bg-blue-50 text-blue-700 border border-blue-100';
            else if (item.type === 'feedback') badgeBg = 'bg-amber-50 text-amber-700 border border-amber-100';

            let statusBg = 'bg-gray-100 text-gray-700';
            if (item.status === 'new') statusBg = 'bg-red-50 text-red-700 border border-red-100 font-bold';
            else if (item.status === 'viewed') statusBg = 'bg-yellow-50 text-yellow-700 border border-yellow-100';
            else if (item.status === 'replied') statusBg = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
            else if (item.status === 'closed') statusBg = 'bg-gray-200 text-gray-700';

            return (
              <article
                key={item._id}
                className="rounded-[24px] border border-border/75 bg-cream/15 p-5 transition shadow-luxury-sm hover:border-gold/30"
              >
                {/* Upper Metadata */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between border-b border-border/40 pb-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold uppercase tracking-wider ${badgeBg}`}>
                        {item.type}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold uppercase tracking-wider ${statusBg}`}>
                        {item.status}
                      </span>
                      <span className="font-[family-name:var(--font-poppins)] text-[11px] text-wood-brown/50">
                        {dateStr}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary-green shrink-0" />
                      <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-primary-green leading-tight">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-[family-name:var(--font-poppins)] text-xs text-wood-brown/70">
                      {item.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-wood-brown/40" /> {item.email}
                        </span>
                      )}
                      {item.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-wood-brown/40" /> {item.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Box */}
                  <div className="flex flex-wrap items-end gap-3 lg:flex-col lg:items-end">
                    <div className="space-y-1 w-full sm:w-auto">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                        Workflow Status
                      </span>
                      <select
                        value={draft.status}
                        onChange={(e) =>
                          setDrafts((current) => ({
                            ...current,
                            [item._id]: { ...draft, status: e.target.value as SubmissionStatus },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-wood-brown"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => void saveSubmission(item._id)}
                      className="flex items-center gap-1 rounded-full bg-primary-green px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-ivory hover:bg-primary-green/90 transition shadow-luxury-sm shrink-0"
                    >
                      <Send className="h-3 w-3" /> Update Item
                    </button>
                  </div>
                </div>

                {/* Submission Content Detail fields */}
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 font-[family-name:var(--font-poppins)] text-xs sm:text-sm bg-white p-4 rounded-2xl border border-border/40">
                  {item.subject && (
                    <p className="text-wood-brown/85">
                      <span className="font-bold text-primary-green">Subject:</span> {item.subject}
                    </p>
                  )}
                  {item.rating !== undefined && (
                    <p className="text-wood-brown/85 flex items-center gap-1">
                      <span className="font-bold text-primary-green">Rating:</span> 
                      <span className="font-semibold text-gold flex items-center">{item.rating} <Star className="h-3 w-3 fill-current ml-0.5" /></span>
                    </p>
                  )}
                  {item.guests !== undefined && (
                    <p className="text-wood-brown/85">
                      <span className="font-bold text-primary-green">Guests:</span> {item.guests} Persons
                    </p>
                  )}
                  {item.date && (
                    <p className="text-wood-brown/85 flex items-center gap-1.5">
                      <Calendar className="h-4.5 w-4.5 text-primary-green/60" />
                      <span className="font-bold text-primary-green">Date:</span> {item.date}
                    </p>
                  )}
                  {item.time && (
                    <p className="text-wood-brown/85 flex items-center gap-1.5">
                      <Clock className="h-4.5 w-4.5 text-primary-green/60" />
                      <span className="font-bold text-primary-green">Time:</span> {item.time}
                    </p>
                  )}
                  {item.occasion && (
                    <p className="text-wood-brown/85">
                      <span className="font-bold text-primary-green">Occasion:</span> {item.occasion}
                    </p>
                  )}
                </div>

                {/* Customer Message details */}
                {(item.message || item.review || item.requests) && (
                  <div className="mt-4 space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                      Customer Message / Notes
                    </span>
                    <div className="rounded-2xl bg-white border border-border/40 p-4 text-xs sm:text-sm leading-relaxed text-wood-brown/80">
                      {item.message || item.review || item.requests}
                    </div>
                  </div>
                )}

                {/* Admin Reply Section */}
                <div className="mt-4 space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                    Official Admin Response Notes
                  </span>
                  <textarea
                    value={draft.adminReply}
                    onChange={(e) =>
                      setDrafts((current) => ({
                        ...current,
                        [item._id]: { ...draft, adminReply: e.target.value },
                      }))
                    }
                    placeholder="Type official reply notes or action items here..."
                    className="min-h-[80px] w-full rounded-2xl border border-border bg-white px-4 py-3 text-xs sm:text-sm text-wood-brown outline-none focus:border-gold focus:ring-1 focus:ring-gold transition resize-none"
                  />
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
