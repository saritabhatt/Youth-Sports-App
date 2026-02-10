import { ChildProfile, formatHeight } from '../data/scoringEngine';

interface ProfileSelectorProps {
  profiles: ChildProfile[];
  activeProfileId: string | null;
  onSelect: (profileId: string) => void;
  onEdit: (profile: ChildProfile) => void;
  onDelete: (profileId: string) => void;
  onCreateNew: () => void;
}

export default function ProfileSelector({
  profiles,
  activeProfileId,
  onSelect,
  onEdit,
  onDelete,
  onCreateNew
}: ProfileSelectorProps) {
  if (profiles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-slate-500 text-sm mb-3">No profiles yet</p>
        <button
          onClick={onCreateNew}
          className="w-full py-2 px-3 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          + Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 text-sm">Profiles</h3>
        <button
          onClick={onCreateNew}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
        >
          + Add
        </button>
      </div>
      
      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
        {profiles.map(profile => {
          const isActive = profile.id === activeProfileId;
          return (
            <div
              key={profile.id}
              className={`p-3 cursor-pointer transition-colors ${
                isActive ? 'bg-emerald-50' : 'hover:bg-slate-50'
              }`}
              onClick={() => onSelect(profile.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  isActive ? 'bg-emerald-100' : 'bg-slate-100'
                }`}>
                  {profile.gender === 'male' ? '👦' : '👧'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium truncate ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {profile.name}
                    </span>
                    {isActive && (
                      <span className="text-xs bg-emerald-500 text-white px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    {profile.age} yrs • {profile.state}
                    {profile.estimatedAdultHeightInches && ` • ${formatHeight(profile.estimatedAdultHeightInches)}`}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(profile);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    title="Edit profile"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete ${profile.name}'s profile?`)) {
                          onDelete(profile.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete profile"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
