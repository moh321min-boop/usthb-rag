'use client'

import { useState } from 'react'
import {
  subjects,
  initialConversations,
  initialMessagesByConversation,
} from './mock-data'
import { createId } from '@/services/utils' // أو المسار الذي وضعت فيه utils.js

export function useChatManager() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeConversationId, setActiveConversationId] = useState('binary-search')
  const [messagesByConversation, setMessagesByConversation] = useState(initialMessagesByConversation)
  const [input, setInput] = useState('')

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ?? conversations[0]

  const activeSubject =
    subjects.find((s) => s.id === activeConversation?.subjectId) ?? subjects[0]

  const activeMessages = messagesByConversation[activeConversation?.id] ?? []

  function handleSelectSubject(subjectId, onFinishMobile) {
    const existingConversation = conversations.find((c) => c.subjectId === subjectId)

    if (existingConversation) {
      setActiveConversationId(existingConversation.id)
    } else {
      const subject = subjects.find((item) => item.id === subjectId)
      const id = createId('conversation')
      const newConversation = {
        id,
        title: `New Chat · ${subject?.nameEn ?? ''}`,
        updatedAt: 'Just now',
        subjectId,
      }

      setConversations((current) => [newConversation, ...current])
      setMessagesByConversation((current) => ({ ...current, [id]: [] }))
      setActiveConversationId(id)
    }

    if (onFinishMobile) onFinishMobile()
  }

  function handleSelectConversation(conversationId, onFinishMobile) {
    setActiveConversationId(conversationId)
    if (onFinishMobile) onFinishMobile()
  }

  function handleQuestionSubmit(event) {
    event.preventDefault()
    const text = input.trim()

    if (!text || !activeConversation) return

    const userMessageId = createId('user')
    const assistantMessageId = createId('response')
    const userMessage = { id: userMessageId, role: 'user', text }

    // TODO: [Backend Integration] Replace this mock response with actual API response
    const assistantResponse = {
      id: assistantMessageId,
      role: 'assistant',
      text: 'This is a simulated response from the pre-trained RAG model based on USTHB official academic curricula.',
    }

    setMessagesByConversation((current) => ({
      ...current,
      [activeConversation.id]: [
        ...(current[activeConversation.id] ?? []),
        userMessage,
        assistantResponse,
      ],
    }))

    setConversations((current) =>
      current.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              title: conv.title.startsWith('New Chat') ? text.slice(0, 42) : conv.title,
              updatedAt: 'Just now',
              updatedAtValue: Date.now(),
            }
          : conv
      )
    )

    setInput('')
  }

  return {
    subjects,
    conversations,
    activeSubject,
    activeConversation,
    activeMessages,
    input,
    setInput,
    handleSelectSubject,
    handleSelectConversation,
    handleQuestionSubmit,
  }
}