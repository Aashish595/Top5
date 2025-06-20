import { NextResponse } from 'next/server';
import { Poll, PollOption } from '@/types';

// Mock database (replace with real DB in production)
let polls: Poll[] = [
  {
    id: '1',
    question: 'What is your favorite frontend framework?',
    options: [
      { id: '1', text: 'React', votes: 45 },
      { id: '2', text: 'Vue', votes: 30 },
      { id: '3', text: 'Angular', votes: 25 },
    ],
    totalVotes: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// GET all polls
export async function GET() {
  return NextResponse.json(polls);
}

// POST create new poll
export async function POST(request: Request) {
  const { question, options } = await request.json();
  
  const newPoll: Poll = {
    id: Math.random().toString(36).substring(2, 9),
    question,
    options: options.map((text: string, index: number) => ({
      id: index.toString(),
      text,
      votes: 0,
    })),
    totalVotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  polls.push(newPoll);
  return NextResponse.json(newPoll);
}

// PUT vote on a poll
export async function PUT(request: Request) {
  const { pollId, optionId } = await request.json();
  
  const pollIndex = polls.findIndex(p => p.id === pollId);
  if (pollIndex === -1) {
    return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
  }

  const optionIndex = polls[pollIndex].options.findIndex(o => o.id === optionId);
  if (optionIndex === -1) {
    return NextResponse.json({ error: 'Option not found' }, { status: 404 });
  }

  polls[pollIndex].options[optionIndex].votes++;
  polls[pollIndex].totalVotes++;
  polls[pollIndex].updatedAt = new Date();

  return NextResponse.json(polls[pollIndex]);
}