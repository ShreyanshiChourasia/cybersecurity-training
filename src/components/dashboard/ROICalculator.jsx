import { useState } from 'react';
import { Card } from '../common/Card';

export function ROICalculator() {
  const [employees, setEmployees] = useState(500);
  const [avgHourlyRate, setAvgHourlyRate] = useState(40);
  
  // Assumption: Adaptive training saves 2 hours per employee by skipping known material
  const savedHoursPerEmployee = 2;
  const totalHoursSaved = employees * savedHoursPerEmployee;
  const totalDollarsSaved = totalHoursSaved * avgHourlyRate;

  return (
    <Card title="ROI & Time Saving Estimator" className="h-full">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Number of Employees: {employees}
          </label>
          <input
            type="range"
            min="10"
            max="5000"
            step="10"
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Avg. Hourly Rate ($): {avgHourlyRate}
          </label>
          <input
            type="range"
            min="15"
            max="150"
            step="5"
            value={avgHourlyRate}
            onChange={(e) => setAvgHourlyRate(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">Estimated Annual Savings</p>
            <h3 className="text-3xl font-bold text-success-600">
              ${totalDollarsSaved.toLocaleString()}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500">Hours Saved</p>
            <h3 className="text-xl font-bold text-slate-700">
              {totalHoursSaved.toLocaleString()} hrs
            </h3>
          </div>
        </div>
      </div>
    </Card>
  );
}
