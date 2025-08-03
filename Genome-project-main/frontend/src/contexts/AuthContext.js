import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { user } } = await auth.getCurrentUser()
      setUser(user)
      
      if (user) {
        await loadUserProfile(user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await db.getProfile(userId)
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading profile:', error)
        return
      }
      setProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signUp(email, password, userData)
      
      if (error) throw error
      
      if (data.user) {
        // Create profile
        const profileData = {
          email: data.user.email,
          full_name: userData.full_name || '',
          created_at: new Date().toISOString()
        }
        
        const { error: profileError } = await db.createProfile(data.user.id, profileData)
        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }
      
      toast.success('Account created successfully! Please check your email for verification.')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signIn(email, password)
      
      if (error) throw error
      
      toast.success('Signed in successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!user) return { error: 'No user logged in' }
      
      const { data, error } = await db.updateProfile(user.id, updates)
      if (error) throw error
      
      setProfile(data[0])
      toast.success('Profile updated successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    loadUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}