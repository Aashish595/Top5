'use client';

import { useState } from 'react';
import { Poll, PollOption } from '@/types';

interface PollProps {
  poll: Poll;
  onVote?: (optionId: string) => void;
}

export default function PollComponent({ poll, onVote }: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (optionId: string) => {
    if (hasVoted) return;
    
    try {
      const response = await fetch('/api/polls', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollId: poll.id,
          optionId,
        }),
      });

      if (response.ok) {
        setSelectedOption(optionId);
        setHasVoted(true);
        if (onVote) onVote(optionId);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{poll.question}</h3>
      <div className="space-y-2">
        {poll.options.map((option) => (
          <div key={option.id} className="mb-2">
            <button
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full text-left p-2 rounded-md transition-colors ${
                selectedOption === option.id
                  ? 'bg-blue-100 border border-blue-500'
                  : 'hover:bg-gray-100 border border-transparent'
              } ${
                hasVoted && selectedOption !== option.id ? 'opacity-50' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                {hasVoted && (
                  <span className="text-sm text-gray-500">
                    {Math.round((option.votes / poll.totalVotes) * 100)}%
                  </span>
                )}
              </div>
              {hasVoted && (
                <div
                  className="h-1 bg-blue-500 mt-1 rounded-full"
                  style={{
                    width: `${(option.votes / poll.totalVotes) * 100}%`,
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>
      {hasVoted && (
        <p className="text-sm text-gray-500 mt-2">
          Total votes: {poll.totalVotes}
        </p>
      )}
    </div>
  );
}