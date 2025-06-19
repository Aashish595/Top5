'use client'

import { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import { Button } from './ui/button'
import { Poll } from '@/types'

const samplePoll: Poll = {
  _id: '1',
  _type: 'poll',
  question: 'Which smartphone brand do you prefer?',
  options: [
    { text: 'Apple', votes: 45 },
    { text: 'Samsung', votes: 30 },
    { text: 'Google', votes: 15 },
    { text: 'OnePlus', votes: 10 },
  ],
  publishedAt: new Date().toISOString(),
}

export default function PollSection() {
  const [poll, setPoll] = useState(samplePoll)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)

  const handleVote = (optionText: string) => {
    if (hasVoted) return
    
    setSelectedOption(optionText)
    setPoll(prev => ({
      ...prev,
      options: prev.options.map(option => 
        option.text === optionText 
          ? { ...option, votes: option.votes + 1 } 
          : option
      ),
    }))
    setHasVoted(true)
  }

  return (
    <div className="bg-background rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Daily Poll</h2>
      </div>
      
      <h3 className="text-lg font-medium mb-4">{poll.question}</h3>
      
      <div className="space-y-3 mb-6">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 
            ? Math.round((option.votes / totalVotes) * 100) 
            : 0
          const isSelected = selectedOption === option.text
          
          return (
            <div key={option.text}>
              <button
                onClick={() => handleVote(option.text)}
                disabled={hasVoted}
                className={`w-full text-left p-3 rounded-md border transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:bg-muted/50'
                } ${
                  hasVoted && !isSelected ? 'opacity-70' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{option.text}</span>
                  {hasVoted && (
                    <span className="text-sm font-medium">{percentage}%</span>
                  )}
                </div>
                {hasVoted && (
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{totalVotes} votes</span>
        {hasVoted ? (
          <span>Thanks for voting!</span>
        ) : (
          <span>Select an option to vote</span>
        )}
      </div>
    </div>
  )
}