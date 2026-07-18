export type SubmissionType = 'contact' | 'reservation' | 'feedback';

export type SubmissionStatus = 'new' | 'viewed' | 'replied' | 'closed';

export type SubmissionRecord = {
  _id: string;
  type: SubmissionType;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  review?: string;
  rating?: number;
  guests?: number;
  date?: string;
  time?: string;
  occasion?: string;
  requests?: string;
  status: SubmissionStatus;
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
};
