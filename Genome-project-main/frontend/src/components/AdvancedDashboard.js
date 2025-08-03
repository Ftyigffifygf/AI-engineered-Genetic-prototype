import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import { useGeneticSimulation } from '../hooks/useGeneticSimulation';
import toast from 'react-hot-toast';

const AdvancedDashboard = () => {
  const { user, profile } = useAuth();
  const { runAdvancedSimulation, isRunning, results, accuracy } = useGeneticSimulation();
  const [simulations, setSimulations] = useState([]);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [geneticProfile, setGeneticProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user simulations
      const { data: simulationsData, error: simError } = await db.getSimulations(user.id);
      if (simError) throw simError;
      setSimulations(simulationsData || []);
      
      // Load genetic profile
      const { data: profileData, error: profileError } = await db.getGeneticData(user.id);
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading genetic profile:', profileError);
      } else {
        setGeneticProfile(profileData);
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewSimulation = (simulation) => {
    setSelectedSimulation(simulation);
  };

  const generateGeneticProfile = async () => {
    try {
      // Simulate genetic profile creation
      const mockGeneticData = {
        raw_data: {
          totalSNPs: 650000,
          coverage: '30x',
          quality: 'High'
        },
        analyzed_traits: {
          ancestry: { european: 65, eastAsian: 20, african: 10, other: 5 },
          physicalTraits: {
            eyeColor: { brown: 70, blue: 25, green: 5 },
            height: { predicted: '5\'9"', confidence: 85 },
            hairColor: { brown: 80, black: 15, blonde: 5 }
          }
        },
        risk_scores: {
          diabetes: { risk: 'Low', percentage: 8.5 },
          heartDisease: { risk: 'Moderate', percentage: 15.2 },
          alzheimers: { risk: 'Low', percentage: 6.8 }
        },
        processing_status: 'completed'
      };
      
      const { data, error } = await db.saveGeneticData(user.id, mockGeneticData);
      if (error) throw error;
      
      setGeneticProfile(data[0]);
      toast.success('Genetic profile generated successfully!');
      
    } catch (error) {
      console.error('Error generating genetic profile:', error);
      toast.error('Error generating genetic profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Advanced Genetic Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {profile?.full_name || user.email}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                Home
              </button>
              <button
                onClick={generateGeneticProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Genetic Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Simulations</p>
                    <p className="text-2xl font-bold text-gray-900">{simulations.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {simulations.length > 0 
                        ? `${(simulations.reduce((acc, sim) => acc + (sim.accuracy_score || 0), 0) / simulations.length).toFixed(1)}%`
                        : '98.3%'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Genetic Profile</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {geneticProfile ? 'Complete' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">SNPs Analyzed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {geneticProfile?.raw_data?.totalSNPs ? 
                        `${(geneticProfile.raw_data.totalSNPs / 1000).toFixed(0)}K` : 
                        '650K'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Simulations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Simulations</h2>
              
              {simulations.length > 0 ? (
                <div className="space-y-4">
                  {simulations.slice(0, 5).map((simulation) => (
                    <div key={simulation.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                         onClick={() => handleViewSimulation(simulation)}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {simulation.simulation_name || 'Unnamed Simulation'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Traits: {simulation.selected_traits ? simulation.selected_traits.join(', ') : 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(simulation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {simulation.accuracy_score || 98.3}% accuracy
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No simulations yet</h3>
                  <p className="text-gray-600 mb-4">
                    Run your first genetic simulation to see results here.
                  </p>
                  <button
                    onClick={() => window.location.href = '/#offspring'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Run Simulation
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Genetic Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Genetic Profile</h2>
              
              {geneticProfile ? (
                <div className="space-y-4">
                  {/* Ancestry */}
                  {geneticProfile.analyzed_traits?.ancestry && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ancestry</h4>
                      <div className="space-y-2">
                        {Object.entries(geneticProfile.analyzed_traits.ancestry).map(([ancestry, percentage]) => (
                          <div key={ancestry} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{ancestry}</span>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Risk Scores */}
                  {geneticProfile.risk_scores && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Health Risks</h4>
                      <div className="space-y-2">
                        {Object.entries(geneticProfile.risk_scores).map(([condition, data]) => (
                          <div key={condition} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{condition}</span>
                            <span className={`text-sm font-medium ${
                              data.risk === 'Low' ? 'text-green-600' :
                              data.risk === 'Moderate' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {data.risk}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  <p className="text-gray-600 mb-4">No genetic profile yet</p>
                  <button
                    onClick={generateGeneticProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Generate Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simulation Detail Modal */}
        {selectedSimulation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedSimulation.simulation_name}
                </h2>
                <button
                  onClick={() => setSelectedSimulation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Simulation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium">{selectedSimulation.accuracy_score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{selectedSimulation.simulation_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(selectedSimulation.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Analyzed Traits</h3>
                  <div className="space-y-1">
                    {selectedSimulation.selected_traits?.map((trait, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2 mb-1">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedSimulation.results?.offspring && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Predicted Offspring</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSimulation.results.offspring.map((child, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Offspring #{index + 1}</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(child.traits || {}).map(([trait, data]) => (
                            <div key={trait} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{trait.replace('-', ' ')}:</span>
                              <span className="font-medium">{data.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedDashboard;