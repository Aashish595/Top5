'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface CreatePollFormProps {
  className?: string
}

export default function CreatePollForm({ className }: CreatePollFormProps) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          options: options.filter(opt => opt.trim() !== '')
        }),
      })

      if (response.ok) {
        setQuestion('')
        setOptions(['', ''])
        // You might want to add a toast notification here
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`border rounded-lg p-6 bg-background shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Create New Poll</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="poll-question" className="block text-sm font-medium mb-2">
            Question
          </label>
          <Input
            id="poll-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your poll question"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Options</label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required={index < 2}
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Poll'}
        </Button>
      </form>
    </div>
  )
}