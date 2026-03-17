import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChildProfile as ChildProfileType } from '../data/scoringEngine';
import { ChildProfileSchema } from '../validation/profileSchema';
import { estimateAdultHeight, formatHeight, parseHeight } from '../data/scoringEngine';
import { Gender } from '../data/sportsData';
import { useState } from 'react';

interface ChildProfileFormRHFProps {
  onProfileCreated: (profile: ChildProfileType) => void;
  existingProfile?: ChildProfileType | null;
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

/**
 * Improved ChildProfileForm using React Hook Form + Zod validation
 * Provides better error handling, validation, and accessibility
 */
export default function ChildProfileFormRHF({ 
  onProfileCreated, 
  existingProfile, 
  onCancel 
}: ChildProfileFormRHFProps) {
  const [showHeightEstimator, setShowHeightEstimator] = useState(!existingProfile?.estimatedAdultHeightInches);
  const [estimatedHeight, setEstimatedHeight] = useState<number | null>(
    existingProfile?.estimatedAdultHeightInches || null
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(ChildProfileSchema),
    defaultValues: {
      id: existingProfile?.id,
      name: existingProfile?.name || '',
      age: existingProfile?.age || 8,
      gender: existingProfile?.gender || 'male',
      zipCode: existingProfile?.zipCode || '',
      state: existingProfile?.state || '',
      athleticism: existingProfile?.athleticism || 5,
      competitiveness: existingProfile?.competitiveness || 5,
      endurance: existingProfile?.endurance || 5,
      teamOriented: existingProfile?.teamOriented || 5,
      riskTolerance: existingProfile?.riskTolerance || 5,
      currentHeightInches: existingProfile?.currentHeightInches || 48,
      estimatedAdultHeightInches: existingProfile?.estimatedAdultHeightInches,
      ethnicity: existingProfile?.ethnicity || '',
    }
  });

  const currentHeightInches = watch('currentHeightInches');
  const gender = watch('gender') as Gender;

  const onSubmit = (data: any) => {
    const profile: ChildProfileType = {
      ...data,
      estimatedAdultHeightInches: estimatedHeight,
      athleticism: parseInt(data.athleticism),
      competitiveness: parseInt(data.competitiveness),
      endurance: parseInt(data.endurance),
      teamOriented: parseInt(data.teamOriented),
      riskTolerance: parseInt(data.riskTolerance),
    };
    
    onProfileCreated(profile);
  };

  const calculateEstimatedHeight = (fatherInches: number, motherInches: number) => {
    const estimated = estimateAdultHeight(fatherInches, motherInches, gender);
    setEstimatedHeight(estimated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Child's Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g., Alex"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">
              Age (years) *
            </label>
            <input
              {...register('age', { valueAsNumber: true })}
              type="number"
              id="age"
              min="4"
              max="18"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.age ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.age ? 'age-error' : undefined}
            />
            {errors.age && (
              <p id="age-error" className="text-red-600 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">
              Gender *
            </label>
            <select
              {...register('gender')}
              id="gender"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.gender ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
            >
              <option value="">Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p id="gender-error" className="text-red-600 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* ZIP Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
              ZIP Code *
            </label>
            <input
              {...register('zipCode')}
              type="text"
              id="zipCode"
              placeholder="90210"
              maxLength="5"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.zipCode ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
            />
            {errors.zipCode && (
              <p id="zipCode-error" className="text-red-600 text-sm mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
              State *
            </label>
            <select
              {...register('state')}
              id="state"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.state ? 'border-red-500' : 'border-slate-300'
              }`}
              aria-describedby={errors.state ? 'state-error' : undefined}
            >
              <option value="">Select state...</option>
              {US_STATES.map(s => (
                <option key={s.abbr} value={s.abbr}>{s.name}</option>
              ))}
            </select>
            {errors.state && (
              <p id="state-error" className="text-red-600 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Current Height */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
          Height Information
        </h3>
        
        <div>
          <label htmlFor="currentHeight" className="block text-sm font-medium text-slate-700 mb-2">
            Current Height *
          </label>
          <p className="text-sm text-slate-600 mb-2">
            {formatHeight(currentHeightInches)}
          </p>
          <input
            {...register('currentHeightInches', { valueAsNumber: true })}
            type="range"
            id="currentHeight"
            min="30"
            max="84"
            step="0.5"
            className="w-full"
            aria-label="Current height in inches"
          />
          {errors.currentHeightInches && (
            <p className="text-red-600 text-sm mt-1">
              {errors.currentHeightInches.message}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : existingProfile ? 'Update Profile' : 'Create Profile'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
