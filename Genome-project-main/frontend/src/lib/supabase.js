import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helper functions
export const db = {
  // User profiles
  createProfile: async (userId, profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
    return { data, error }
  },

  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Genetic data
  saveGeneticData: async (userId, geneticData) => {
    const { data, error } = await supabase
      .from('genetic_data')
      .insert([{ user_id: userId, ...geneticData }])
      .select()
    return { data, error }
  },

  getGeneticData: async (userId) => {
    const { data, error } = await supabase
      .from('genetic_data')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Simulation results
  saveSimulation: async (userId, simulationData) => {
    const { data, error } = await supabase
      .from('simulations')
      .insert([{ user_id: userId, ...simulationData }])
      .select()
    return { data, error }
  },

  getSimulations: async (userId) => {
    const { data, error } = await supabase
      .from('simulations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getSimulation: async (simulationId) => {
    const { data, error } = await supabase
      .from('simulations')
      .select('*')
      .eq('id', simulationId)
      .single()
    return { data, error }
  },

  // Traits reference data
  getTraits: async () => {
    const { data, error } = await supabase
      .from('traits')
      .select('*')
      .order('name')
    return { data, error }
  },

  // Partner data for couples
  savePartnerData: async (userId, partnerData) => {
    const { data, error } = await supabase
      .from('partners')
      .insert([{ user_id: userId, ...partnerData }])
      .select()
    return { data, error }
  },

  getPartnerData: async (userId) => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  }
}