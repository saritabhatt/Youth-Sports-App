import { useState } from 'react';
import { ChildProfile } from '../data/scoringEngine';
import { estimateAdultHeight, formatHeight, parseHeight } from '../data/scoringEngine';
import { Gender } from '../data/sportsData';

interface ChildProfileFormProps {
  onProfileCreated: (profile: ChildProfile) => void;
  existingProfile?: ChildProfile | null;
  onCancel?: () => void;
}

const US_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' }, { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' }, { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' }, { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' }, { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' }, { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' }, { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' }, { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' }, { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' }, { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' }, { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' }, { abbr: 'DC', name: 'District of Columbia' }
];

const ETHNICITY_OPTIONS = [
  'Prefer not to say',
  'White/Caucasian',
  'Black/African American',
  'Hispanic/Latino',
  'Asian',
  'Native American/Alaska Native',
  'Pacific Islander',
  'Middle Eastern/North African',
  'Mixed/Multiracial',
  'Other'
];

export default function ChildProfileForm({ onProfileCreated, existingProfile, onCancel }: ChildProfileFormProps) {
  // Basic info
  const [name, setName] = useState(existingProfile?.name || '');
  const [age, setAge] = useState(existingProfile?.age || 8);
  const [gender, setGender] = useState<Gender>(existingProfile?.gender || 'male');
  const [ethnicity, setEthnicity] = useState(existingProfile?.ethnicity || 'Prefer not to say');
  
  // Location
  const [zipCode, setZipCode] = useState(existingProfile?.zipCode || '');
  const [state, setState] = useState(existingProfile?.state || '');
  
  // Current height
  const [currentFeet, setCurrentFeet] = useState(Math.floor((existingProfile?.currentHeightInches || 48) / 12));
  const [currentInches, setCurrentInches] = useState((existingProfile?.currentHeightInches || 48) % 12);
  
  // Parent heights for estimator
  const [showHeightEstimator, setShowHeightEstimator] = useState(!existingProfile?.estimatedAdultHeightInches);
  const [fatherFeet, setFatherFeet] = useState(5);
  const [fatherInches, setFatherInches] = useState(10);
  const [motherFeet, setMotherFeet] = useState(5);
  const [motherInches, setMotherInches] = useState(4);
  const [estimatedHeight, setEstimatedHeight] = useState<number | null>(existingProfile?.estimatedAdultHeightInches || null);
  
  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateEstimatedHeight = () => {
    const fatherTotal = parseHeight(fatherFeet, fatherInches);
    const motherTotal = parseHeight(motherFeet, motherInches);
    const estimated = estimateAdultHeight(fatherTotal, motherTotal, gender);
    setEstimatedHeight(estimated);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (age < 3 || age > 18) {
      newErrors.age = 'Age must be between 3 and 18';
    }
    
    if (!zipCode.match(/^\d{5}$/)) {
      newErrors.zipCode = 'Enter a valid 5-digit ZIP code';
    }
    
    if (!state) {
      newErrors.state = 'State is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const profile: ChildProfile = {
      id: existingProfile?.id || Date.now().toString(),
      name: name.trim(),
      age,
      gender,
      ethnicity,
      zipCode,
      state,
      currentHeightInches: parseHeight(currentFeet, currentInches),
      estimatedAdultHeightInches: estimatedHeight,
      parentHeights: estimatedHeight ? {
        fatherInches: parseHeight(fatherFeet, fatherInches),
        motherInches: parseHeight(motherFeet, motherInches)
      } : undefined
    };
    
    onProfileCreated(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Child's Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              min={3}
              max={18}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.age ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value as Gender);
                setEstimatedHeight(null); // Reset estimate when gender changes
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          {/* Ethnicity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ethnicity <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <select
              value={ethnicity}
              onChange={(e) => setEthnicity(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {ETHNICITY_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">Used for analytics only, not scoring</p>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
          Location
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ZIP Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g., 93101"
              maxLength={5}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.zipCode ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
            <p className="text-xs text-slate-400 mt-1">Used to estimate local competition levels</p>
          </div>
          
          {/* State */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.state ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select state...</option>
              {US_STATES.map(s => (
                <option key={s.abbr} value={s.abbr}>{s.name}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>
      </div>

      {/* Height Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
          Height Information
        </h3>
        
        {/* Current Height */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Current Height
          </label>
          <div className="flex gap-2 items-center">
            <select
              value={currentFeet}
              onChange={(e) => setCurrentFeet(parseInt(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {[2, 3, 4, 5, 6].map(ft => (
                <option key={ft} value={ft}>{ft} ft</option>
              ))}
            </select>
            <select
              value={currentInches}
              onChange={(e) => setCurrentInches(parseInt(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>{i} in</option>
              ))}
            </select>
            <span className="text-slate-500 text-sm">
              ({parseHeight(currentFeet, currentInches)} inches)
            </span>
          </div>
        </div>

        {/* Estimated Adult Height */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-slate-800">Estimated Adult Height</h4>
              <p className="text-xs text-slate-500">Used to calculate physical advantage for certain sports</p>
            </div>
            {estimatedHeight && (
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-600">
                  {formatHeight(estimatedHeight)}
                </span>
                <p className="text-xs text-slate-400">
                  Range: {formatHeight(estimatedHeight - 4)} — {formatHeight(estimatedHeight + 4)}
                </p>
              </div>
            )}
          </div>
          
          {!estimatedHeight || showHeightEstimator ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                ℹ️ This uses the <strong>Mid-Parental Height Method</strong>, a common pediatric formula. 
                Actual adult height can vary ±4 inches based on nutrition, health, and genetics.
              </p>
              
              {/* Father's Height */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Father's Height
                </label>
                <div className="flex gap-2">
                  <select
                    value={fatherFeet}
                    onChange={(e) => setFatherFeet(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {[4, 5, 6, 7].map(ft => (
                      <option key={ft} value={ft}>{ft} ft</option>
                    ))}
                  </select>
                  <select
                    value={fatherInches}
                    onChange={(e) => setFatherInches(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i} in</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Mother's Height */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mother's Height
                </label>
                <div className="flex gap-2">
                  <select
                    value={motherFeet}
                    onChange={(e) => setMotherFeet(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {[4, 5, 6, 7].map(ft => (
                      <option key={ft} value={ft}>{ft} ft</option>
                    ))}
                  </select>
                  <select
                    value={motherInches}
                    onChange={(e) => setMotherInches(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i} in</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="button"
                onClick={calculateEstimatedHeight}
                className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Calculate Estimated Height
              </button>
              
              {estimatedHeight && (
                <button
                  type="button"
                  onClick={() => setShowHeightEstimator(false)}
                  className="w-full py-2 px-4 text-slate-600 hover:text-slate-800 text-sm"
                >
                  Hide calculator
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowHeightEstimator(true)}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Recalculate estimated height →
            </button>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          {existingProfile ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
}
