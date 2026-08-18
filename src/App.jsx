import React from 'react';
import QuizScreen from './components/QuizScreen';
import WeakAreasView from './components/WeakAreasView';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <QuizScreen />
      <WeakAreasView/>
    </div>
  );
}

export default App;