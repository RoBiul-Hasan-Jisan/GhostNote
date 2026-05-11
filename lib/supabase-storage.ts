import { createClient } from './supabase/client'

export interface UserProfile {
  id: string
  username: string
  createdAt: string
}

export interface Message {
  id: string
  recipientId: string
  messageText: string
  messageType: 'confession' | 'compliment' | 'crush' | 'secret'
  createdAt: string
}

// Create a user profile in Supabase
export async function createUser(username: string): Promise<UserProfile | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ username }])
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return null
    }

    return {
      id: data.id,
      username: data.username,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Get user profile by username
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      console.error('Error getting user:', error)
      return null
    }

    return {
      id: data.id,
      username: data.username,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Get user profile by ID
export async function getUserProfileById(userId: string): Promise<UserProfile | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error getting user:', error)
      return null
    }

    return {
      id: data.id,
      username: data.username,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Add a message to a user
export async function addMessage(
  recipientId: string,
  messageText: string,
  messageType: 'confession' | 'compliment' | 'crush' | 'secret'
): Promise<Message | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          recipient_id: recipientId,
          message_text: messageText,
          message_type: messageType,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error adding message:', error)
      return null
    }

    return {
      id: data.id,
      recipientId: data.recipient_id,
      messageText: data.message_text,
      messageType: data.message_type,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error('Error adding message:', error)
    return null
  }
}

// Get messages for a user
export async function getMessages(userId: string): Promise<Message[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting messages:', error)
      return []
    }

    return data.map((msg) => ({
      id: msg.id,
      recipientId: msg.recipient_id,
      messageText: msg.message_text,
      messageType: msg.message_type,
      createdAt: msg.created_at,
    }))
  } catch (error) {
    console.error('Error getting messages:', error)
    return []
  }
}

// Delete a message
export async function deleteMessage(messageId: string): Promise<boolean> {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)

    if (error) {
      console.error('Error deleting message:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting message:', error)
    return false
  }
}

// Check if username exists
export async function usernameExists(username: string): Promise<boolean> {
  try {
    const profile = await getUserProfileByUsername(username)
    return profile !== null
  } catch (error) {
    console.error('Error checking username:', error)
    return false
  }
}
