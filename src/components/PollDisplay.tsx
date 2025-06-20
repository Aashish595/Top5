'use client'

import { Poll } from '@/types'
import { Button } from './ui/button'
import { BarChart2 } from 'lucide-react'
import { useState } from 'react'

interface PollDisplayProps {
  poll: Poll
  className?: string
}

export default function PollDisplay({ poll, className }: PollDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [localPoll, setLocalPoll] = useState(poll)

  const totalVotes = localPoll.options.reduce((sum, opt) => sum + opt.votes, 0)

  const handleVote = async (optionId: string) => {
    if (hasVoted) return
    
    // Optimistic update
    const updatedOptions = localPoll.options.map(opt => 
      opt.optionId === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    )
    setLocalPoll({ ...localPoll, options: updatedOptions })
    setSelectedOption(optionId)
    setHasVoted(true)

    // Send to API
    await fetch('/api/polls/vote', {
      method: 'POST',
      body: JSON.stringify({
        pollId: poll.id,
      })
    })
  }

  return (
    <div className={`border rounded-lg p-6 bg-background shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{poll.question}</h3>
      </div>
      
      <div className="space-y-3">
        {localPoll.options.map((option) => (
          <div key={option.optionId} className="relative">
            <Button
              variant={selectedOption === option.optionId ? 'secondary' : 'ghost'}
              className={`w-full h-auto justify-between py-3 ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => handleVote(option.optionId)}
              disabled={hasVoted}
            >
              <span>{option.text}</span>
              {hasVoted && (
                <span className="text-sm font-medium">
                  {Math.round((option.votes / totalVotes) * 100)}%
                </span>
              )}
            </Button>
            
            {hasVoted && (
              <div
                className="absolute inset-0 bg-primary/10 rounded-md z-0"
                style={{
                  width: `${(option.votes / totalVotes) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
      {hasVoted && (
        <p className="text-sm text-muted-foreground mt-3">
          {totalVotes} total votes
        </p>
      )}
    </div>
  )
}