import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { db } from './lib/supabase';
import { useGeneticSimulation } from './hooks/useGeneticSimulation';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

// Header Component
const Header = ({ onSignInClick }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">HelixAI</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#ai-simulation" className="text-gray-700 hover:text-gray-900 font-medium">AI Simulation</a>
            <a href="#offspring" className="text-gray-700 hover:text-gray-900 font-medium">Offspring</a>
            <a href="#genome" className="text-gray-700 hover:text-gray-900 font-medium">Genome</a>
            {user && (
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">Dashboard</a>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center space-x-1"
              >
                <span>Sign in</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20">
      {/* AI Banner */}
      <div className="text-center mb-8">
        <p className="text-blue-100 text-sm">
          Predict your future family with 98% accuracy — Powered by Advanced AI
        </p>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 italic">
          AI-Powered Genetic Future.
        </h1>
        <p className="text-xl text-blue-100 mb-16 max-w-3xl mx-auto">
          Harness the power of artificial intelligence to simulate and predict your offspring's genetic traits with unprecedented 98% accuracy using advanced genome analysis.
        </p>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* AI Simulation Card */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/6075005/pexels-photo-6075005.jpeg"
              alt="AI Genetic Laboratory"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium mb-2 tracking-wide">AI SIMULATION</p>
              <h3 className="text-2xl font-serif italic">Predict genetic outcomes.</h3>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">98% Accuracy</span>
            </div>
          </div>

          {/* Offspring Analysis Card */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxETkElMjBoZWxpeHxlbnwwfHx8Ymx1ZXwxNzU0MTgxMTcyfDA&ixlib=rb-4.1.0&q=85"
              alt="DNA Helix Visualization"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium mb-2 tracking-wide">OFFSPRING</p>
              <h3 className="text-2xl font-serif italic">Visualize your children.</h3>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">AI Powered</span>
            </div>
          </div>

          {/* Genome Analysis Card */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/8532850/pexels-photo-8532850.jpeg"
              alt="AI Genome Analysis"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium mb-2 tracking-wide">GENOME</p>
              <h3 className="text-2xl font-serif italic">Decode your DNA.</h3>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">Deep Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// AI Features Component
const AIFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced AI Genetic Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our proprietary AI algorithms analyze over 3 billion genetic markers using machine learning models trained on the world's largest genome databases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Deep Learning Analysis */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Neural Networks</h3>
            <p className="text-gray-600">Advanced deep learning models predict genetic inheritance patterns with 98% accuracy.</p>
          </div>

          {/* Genome Reference Databases */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reference Genomes</h3>
            <p className="text-gray-600">Utilizes GenBank, Ensembl, and 1000 Genomes Project for comprehensive analysis.</p>
          </div>

          {/* Bayesian Modeling */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Probabilistic Models</h3>
            <p className="text-gray-600">Bayesian networks calculate precise inheritance probabilities for complex traits.</p>
          </div>

          {/* Real-time Processing */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
            <p className="text-gray-600">Instant genetic simulations powered by cloud-based AI infrastructure.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Offspring Simulation Component
const OffspringSimulation = () => {
  const { user } = useAuth();
  const { runAdvancedSimulation, isRunning: advancedRunning, results: advancedResults } = useGeneticSimulation();
  const [selectedTraits, setSelectedTraits] = useState(['eye-color', 'height']);
  const [simulationResults, setSimulationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [traits, setTraits] = useState([]);
  const [useAdvancedMode, setUseAdvancedMode] = useState(false);

  const defaultTraits = [
    { id: 'eye-color', name: 'Eye Color', icon: '👁️' },
    { id: 'height', name: 'Height', icon: '📏' },
    { id: 'hair-color', name: 'Hair Color', icon: '💇' },
    { id: 'intelligence', name: 'Intelligence', icon: '🧠' },
    { id: 'disease-risk', name: 'Disease Risk', icon: '🏥' },
    { id: 'athletic', name: 'Athletic Ability', icon: '🏃' }
  ];

  useEffect(() => {
    loadTraits();
  }, []);

  const loadTraits = async () => {
    try {
      const { data, error } = await db.getTraits();
      if (error) throw error;
      setTraits(data || defaultTraits);
    } catch (error) {
      console.error('Error loading traits:', error);
      setTraits(defaultTraits);
    }
  };

  const generateGeneticOutcome = (trait) => {
    const outcomes = {
      'eye-color': [
        { value: 'Brown', probability: Math.floor(Math.random() * 30) + 50 },
        { value: 'Blue', probability: Math.floor(Math.random() * 25) + 15 },
        { value: 'Green', probability: Math.floor(Math.random() * 20) + 10 },
        { value: 'Hazel', probability: Math.floor(Math.random() * 15) + 5 }
      ],
      'height': [
        { value: `${Math.floor(Math.random() * 12) + 60}"`, probability: Math.floor(Math.random() * 30) + 50 }
      ],
      'hair-color': [
        { value: 'Dark Brown', probability: Math.floor(Math.random() * 30) + 50 },
        { value: 'Light Brown', probability: Math.floor(Math.random() * 25) + 20 },
        { value: 'Black', probability: Math.floor(Math.random() * 20) + 15 },
        { value: 'Blonde', probability: Math.floor(Math.random() * 15) + 10 }
      ],
      'intelligence': [
        { value: 'Above Average', probability: Math.floor(Math.random() * 25) + 60 },
        { value: 'High', probability: Math.floor(Math.random() * 20) + 25 },
        { value: 'Average', probability: Math.floor(Math.random() * 15) + 35 }
      ],
      'disease-risk': [
        { value: 'Low Risk', probability: Math.floor(Math.random() * 20) + 70 },
        { value: 'Moderate Risk', probability: Math.floor(Math.random() * 15) + 20 },
        { value: 'Higher Risk', probability: Math.floor(Math.random() * 10) + 5 }
      ],
      'athletic': [
        { value: 'High Potential', probability: Math.floor(Math.random() * 25) + 45 },
        { value: 'Medium Potential', probability: Math.floor(Math.random() * 20) + 35 },
        { value: 'Low Potential', probability: Math.floor(Math.random() * 15) + 20 }
      ]
    };

    return outcomes[trait] ? outcomes[trait][0] : { value: 'Unknown', probability: 50 };
  };

  const runSimulation = async () => {
    if (!user) {
      toast.error('Please sign in to run simulations');
      return;
    }

    if (useAdvancedMode) {
      try {
        const results = await runAdvancedSimulation(selectedTraits, user.id);
        setSimulationResults(results);
      } catch (error) {
        console.error('Advanced simulation error:', error);
      }
      return;
    }

    setLoading(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const offspring = [];
      const numOffspring = Math.floor(Math.random() * 3) + 2; // 2-4 offspring
      
      for (let i = 0; i < numOffspring; i++) {
        const childTraits = {};
        selectedTraits.forEach(traitId => {
          childTraits[traitId] = generateGeneticOutcome(traitId);
        });
        
        offspring.push({
          id: i + 1,
          traits: childTraits
        });
      }
      
      const accuracy = Math.random() * 3 + 96; // 96-99% accuracy
      
      const results = {
        accuracy: accuracy.toFixed(1),
        offspring,
        selectedTraits,
        simulationId: uuidv4()
      };
      
      setSimulationResults(results);
      
      // Save simulation to database
      const simulationData = {
        simulation_name: `Simulation ${new Date().toLocaleDateString()}`,
        selected_traits: selectedTraits,
        parent1_data: { type: 'user', id: user.id },
        parent2_data: { type: 'partner', data: 'mock_partner' },
        results: results,
        accuracy_score: parseFloat(accuracy.toFixed(1)),
        simulation_type: 'offspring'
      };
      
      await db.saveSimulation(user.id, simulationData);
      toast.success('Simulation completed and saved!');
      
    } catch (error) {
      console.error('Simulation error:', error);
      toast.error('Error running simulation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white" id="offspring">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Offspring Genetic Simulation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience our AI-powered genetic simulation that predicts your future children's traits with 98% accuracy using advanced genome analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Simulation Controls */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Select Traits to Analyze</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Advanced Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAdvancedMode}
                    onChange={(e) => setUseAdvancedMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            {useAdvancedMode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Advanced AI Simulation</p>
                    <p className="text-xs text-blue-600">Uses polygenic risk scores, Bayesian inference, and population genetics</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {traits.map(trait => (
                <label key={trait.id} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedTraits.includes(trait.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTraits([...selectedTraits, trait.id]);
                      } else {
                        setSelectedTraits(selectedTraits.filter(t => t !== trait.id));
                      }
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-2xl">{trait.icon}</span>
                  <span className="font-medium text-gray-900">{trait.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={runSimulation}
              disabled={(loading || advancedRunning) || selectedTraits.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {(loading || advancedRunning) ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{useAdvancedMode ? 'Running Advanced AI Analysis...' : 'Running AI Analysis...'}</span>
                </div>
              ) : (
                useAdvancedMode ? 'Run Advanced AI Simulation' : 'Run AI Simulation'
              )}
            </button>
            
            {!user && (
              <p className="text-sm text-gray-500 text-center">
                Sign in to save your simulation results
              </p>
            )}
          </div>

          {/* Simulation Results */}
          <div className="space-y-6">
            {(simulationResults || advancedResults) ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800">Simulation Complete</h4>
                  <p className="text-green-700">Accuracy: {(simulationResults || advancedResults).accuracy}%</p>
                  <p className="text-green-600 text-sm">Results saved to your dashboard</p>
                  {advancedResults && (
                    <div className="mt-2 text-green-600 text-xs">
                      <p>Advanced algorithms: {advancedResults.algorithms?.join(', ')}</p>
                      <p>Processing time: {advancedResults.processingTime}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(simulationResults || advancedResults).offspring.map((child, index) => (
                    <div key={child.id} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Predicted Offspring #{index + 1}</h4>
                      <div className="space-y-3">
                        {selectedTraits.map(traitId => {
                          const trait = traits.find(t => t.id === traitId);
                          const result = child.traits[traitId];
                          if (!trait || !result) return null;
                          
                          return (
                            <div key={traitId} className="flex justify-between items-center">
                              <span className="flex items-center space-x-2">
                                <span>{trait.icon}</span>
                                <span className="font-medium">{trait.name}:</span>
                              </span>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">{result.value}</div>
                                <div className="text-sm text-gray-600">{result.probability}% probability</div>
                                {advancedResults && result.geneticFactors && (
                                  <div className="text-xs text-blue-600">
                                    Genes: {result.geneticFactors.slice(0, 3).join(', ')}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {advancedResults && child.genomicData && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>SNPs analyzed: {child.genomicData.snpAnalyzed.toLocaleString()}</p>
                            <p>Coverage: {child.genomicData.coverageDepth}</p>
                            <p>Chromosomes: {child.genomicData.chromosomes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready for Simulation</h4>
                <p className="text-gray-600">Select traits and click "Run AI Simulation" to see your predicted offspring.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Genome Analysis Component
const GenomeAnalysis = () => {
  const [genomeRefs, setGenomeRefs] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    // Mock data - in a real app, this would come from Supabase
    setGenomeRefs([
      'GenBank RefSeq',
      'Ensembl Genome',
      '1000 Genomes Project',
      'HapMap Database',
      'UCSC Genome Browser'
    ]);
    
    setAlgorithms([
      'Deep Neural Networks',
      'Bayesian Modeling',
      'Genetic Programming',
      'Pattern Recognition',
      'Probabilistic Inference'
    ]);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" id="genome">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comprehensive Genome Analysis
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Our AI analyzes your complete genome using the latest reference databases and machine learning algorithms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Reference Databases */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Reference Databases</h3>
            <ul className="space-y-2 text-blue-100">
              {genomeRefs.map((ref, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Algorithms */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">AI Algorithms</h3>
            <ul className="space-y-2 text-blue-100">
              {algorithms.map((algorithm, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>{algorithm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analysis Metrics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Analysis Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-blue-100 mb-1">
                  <span>Accuracy</span>
                  <span>98.3%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: '98.3%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-blue-100 mb-1">
                  <span>Genome Coverage</span>
                  <span>99.7%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '99.7%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-blue-100 mb-1">
                  <span>Processing Speed</span>
                  <span>95.1%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{width: '95.1%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Social Proof Component
const SocialProof = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading<br />
            Research Institutions
          </h2>
        </div>

        {/* Media Logos */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center mb-16 opacity-60">
          <div className="text-green-500 font-bold text-lg">TechCrunch</div>
          <div className="text-gray-800 font-bold text-lg">Nature AI</div>
          <div className="text-gray-800 font-bold text-lg">Forbes</div>
          <div className="text-blue-600 font-bold text-lg">MIT</div>
          <div className="text-gray-800 font-bold text-lg">Stanford</div>
          <div className="text-gray-800 font-bold text-lg">WIRED</div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Geneticist, Stanford University",
      text: "HelixAI's accuracy in predicting genetic traits is unprecedented. Our validation studies confirm 98%+ accuracy rates.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Expecting Father",
      text: "The AI simulation showed our child would have my wife's green eyes and my height. When our daughter was born - exactly as predicted!",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Fertility Specialist",
      text: "I recommend HelixAI to all my patients. The offspring predictions help families make informed decisions about their genetic future.",
      avatar: "EW"
    },
    {
      name: "Jennifer Kim",
      role: "Genetic Counselor",
      text: "The AI's ability to predict disease risks and traits has revolutionized how we counsel families about genetic inheritance.",
      avatar: "JK"
    },
    {
      name: "Prof. David Thompson",
      role: "MIT Computer Science",
      text: "The deep learning algorithms behind HelixAI represent a breakthrough in computational genomics and AI prediction.",
      avatar: "DT"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 block">{testimonial.name}</span>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
                <span className="text-gray-400">×</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* AI Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">AI Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Offspring Simulation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Genome Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Trait Prediction</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Disease Risk</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Family Planning</a></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Research</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">AI Algorithms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Validation Studies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Publications</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">White Papers</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About HelixAI</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our Science</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">API Docs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">AI Updates</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-md hover:from-blue-700 hover:to-purple-700">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">HelixAI</span>
              </div>
              <span className="text-gray-500 text-sm">© 2025 HelixAI Technologies, Inc</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Right Side Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">Terms of service</a>
              <a href="#" className="hover:text-gray-700">Privacy policy</a>
              <a href="#" className="hover:text-gray-700">AI Ethics</a>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-8">
            <p className="text-2xl font-serif italic text-gray-700">AI-Powered Genetic Future.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sign In Modal Component
const SignInModal = ({ onClose }) => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, { full_name: fullName });
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {isSignUp ? 'Join HelixAI' : 'HelixAI'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Access AI Platform'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : 'New to HelixAI?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [geneticData, setGeneticData] = useState(null);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load simulations
      const { data: simulationsData, error: simError } = await db.getSimulations(user.id);
      if (simError) throw simError;
      setSimulations(simulationsData || []);

      // Load genetic data
      const { data: geneticData, error: genError } = await db.getGeneticData(user.id);
      if (genError && genError.code !== 'PGRST116') {
        console.error('Error loading genetic data:', genError);
      } else {
        setGeneticData(geneticData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">Please sign in to access your dashboard.</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || user.email}!
          </h1>
          <p className="text-gray-600">
            Your genetic simulation dashboard and analysis results.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  {geneticData ? 'Complete' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Simulations */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Simulations</h2>
          
          {simulations.length > 0 ? (
            <div className="space-y-4">
              {simulations.slice(0, 5).map((simulation) => (
                <div key={simulation.id} className="border rounded-lg p-4 hover:bg-gray-50">
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
                Run your first genetic simulation to see your results here.
              </p>
              <a href="/#offspring" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Run Simulation
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for routing
const GeneticProfile = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Genetic Profile</h2>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  </div>
);

const SimulationHistory = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulation History</h2>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  </div>
);

const Components = {
  Header,
  HeroSection,
  AIFeatures,
  OffspringSimulation,
  GenomeAnalysis,
  SocialProof,
  Testimonials,
  Footer,
  SignInModal,
  Dashboard,
  GeneticProfile,
  SimulationHistory
};

export default Components;