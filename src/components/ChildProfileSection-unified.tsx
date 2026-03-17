import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Plus, X, Ruler, GraduationCap, Sparkles, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

export interface ChildProfile {
  id: string;
  name: string;
  grade: number;
  currentHeightInches: number;
  estimatedAdultHeightInches: number | null;
  gender: "male" | "female";
}

export interface ParentGoals {
  priority: "fun" | "skill" | "competitive";
  budget: "low" | "medium" | "high";
  time: "casual" | "moderate" | "serious";
}

export const DEFAULT_GOALS: ParentGoals = {
  priority: "fun",
  budget: "medium",
  time: "moderate",
};

interface ChildProfileSectionProps {
  onProfileChange?: (profile: ChildProfile | null, goals: ParentGoals) => void;
}

const GRADE_OPTIONS = [
  { value: -1, label: "Pre-K" },
  { value: 0, label: "K" },
  { value: 1, label: "1st" },
  { value: 2, label: "2nd" },
  { value: 3, label: "3rd" },
  { value: 4, label: "4th" },
  { value: 5, label: "5th" },
  { value: 6, label: "6th" },
  { value: 7, label: "7th" },
  { value: 8, label: "8th" },
  { value: 9, label: "9th" },
  { value: 10, label: "10th" },
  { value: 11, label: "11th" },
  { value: 12, label: "12th" },
];

const ToggleGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <p className="text-xs text-slate-600 mb-1.5 font-medium">{label}</p>
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          variant={value === opt.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(opt.value)}
          className="text-xs"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  </div>
);

const formatHeight = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet}'${remainingInches}"`;
};

const ChildProfileSection = ({ onProfileChange }: ChildProfileSectionProps) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [goals, setGoals] = useState<ParentGoals>(DEFAULT_GOALS);

  // New profile form
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState(3);
  const [newGender, setNewGender] = useState<"male" | "female">("male");
  const [newHeight, setNewHeight] = useState(48);

  const notifyChange = (profileId: string | null, updatedProfiles: ChildProfile[], updatedGoals: ParentGoals) => {
    if (!onProfileChange) return;
    const profile = updatedProfiles.find((p) => p.id === profileId) ?? null;
    onProfileChange(profile, updatedGoals);
  };

  const handleGoalChange = (key: keyof ParentGoals, value: string) => {
    const updated = { ...goals, [key]: value } as ParentGoals;
    setGoals(updated);
    notifyChange(selectedProfileId, profiles, updated);
  };

  const handleAddProfile = () => {
    if (!newName.trim()) return;

    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name: newName.trim(),
      grade: newGrade,
      gender: newGender,
      currentHeightInches: newHeight,
      estimatedAdultHeightInches: null,
    };

    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setSelectedProfileId(newProfile.id);
    setIsAdding(false);
    setNewName("");
    setNewGrade(3);
    setNewHeight(48);
    notifyChange(newProfile.id, updated, goals);
  };

  const handleRemoveProfile = (id: string) => {
    const updated = profiles.filter((p) => p.id !== id);
    let nextId = selectedProfileId;
    if (selectedProfileId === id) {
      nextId = updated.length > 0 ? updated[0].id : null;
      setSelectedProfileId(nextId);
    }
    setProfiles(updated);
    notifyChange(nextId, updated, goals);
  };

  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    notifyChange(id, profiles, goals);
  };

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-6 border border-slate-200 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-800">Child Profiles</h3>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Child
          </Button>
        )}
      </div>

      {/* Add Profile Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Child's name"
                  maxLength={50}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Gender</label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value as "male" | "female")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                >
                  {GRADE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">
                  Height: {formatHeight(newHeight)}
                </label>
                <input
                  type="range"
                  min={36}
                  max={72}
                  value={newHeight}
                  onChange={(e) => setNewHeight(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Parent Goals */}
            <div className="space-y-3 mb-4 pt-3 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-800 uppercase">Your Goals</p>
              <ToggleGroup
                label="Priority"
                options={[
                  { value: "fun", label: "Fun & Social" },
                  { value: "skill", label: "Skill Dev" },
                  { value: "competitive", label: "Competitive" },
                ]}
                value={goals.priority}
                onChange={(v) => handleGoalChange("priority", v)}
              />
              <ToggleGroup
                label="Budget"
                options={[
                  { value: "low", label: "< $500" },
                  { value: "medium", label: "$500–2k" },
                  { value: "high", label: "$2k+" },
                ]}
                value={goals.budget}
                onChange={(v) => handleGoalChange("budget", v)}
              />
              <ToggleGroup
                label="Time/Week"
                options={[
                  { value: "casual", label: "1–3h" },
                  { value: "moderate", label: "4–6h" },
                  { value: "serious", label: "7+h" },
                ]}
                value={goals.time}
                onChange={(v) => handleGoalChange("time", v)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddProfile}
                disabled={!newName.trim()}
              >
                Add Profile
              </Button>
              <Button
                onClick={() => setIsAdding(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Pills */}
      {profiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {profiles.map((profile) => (
            <motion.button
              key={profile.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectProfile(profile.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedProfileId === profile.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{profile.name}</span>
              <span className="text-xs opacity-70">
                {GRADE_OPTIONS.find((g) => g.value === profile.grade)?.label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProfile(profile.id);
                }}
                className="ml-1 p-0.5 rounded-full hover:bg-red-200 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.button>
          ))}
        </div>
      )}

      {/* Goals (always visible when profile selected) */}
      {selectedProfile && (
        <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
          <p className="text-xs font-semibold text-slate-800 uppercase">Your Goals</p>
          <ToggleGroup
            label="Priority"
            options={[
              { value: "fun", label: "Fun & Social" },
              { value: "skill", label: "Skill Dev" },
              { value: "competitive", label: "Competitive" },
            ]}
            value={goals.priority}
            onChange={(v) => handleGoalChange("priority", v)}
          />
          <ToggleGroup
            label="Budget"
            options={[
              { value: "low", label: "< $500" },
              { value: "medium", label: "$500–2k" },
              { value: "high", label: "$2k+" },
            ]}
            value={goals.budget}
            onChange={(v) => handleGoalChange("budget", v)}
          />
          <ToggleGroup
            label="Time/Week"
            options={[
              { value: "casual", label: "1–3h" },
              { value: "moderate", label: "4–6h" },
              { value: "serious", label: "7+h" },
            ]}
            value={goals.time}
            onChange={(v) => handleGoalChange("time", v)}
          />
        </div>
      )}

      {/* Selected Profile Details */}
      {selectedProfile && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-3 text-center">
              <GraduationCap className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-slate-600">Grade</p>
              <p className="text-sm font-semibold text-slate-800">
                {GRADE_OPTIONS.find((g) => g.value === selectedProfile.grade)?.label}
              </p>
            </Card>
            <Card className="p-3 text-center">
              <Ruler className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-slate-600">Height Now</p>
              <p className="text-sm font-semibold text-slate-800">
                {formatHeight(selectedProfile.currentHeightInches)}
              </p>
            </Card>
            <Card className="p-3 text-center">
              <Ruler className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
              <p className="text-xs text-slate-600">Est. Adult</p>
              <p className="text-sm font-semibold text-emerald-600">
                {selectedProfile.estimatedAdultHeightInches 
                  ? formatHeight(selectedProfile.estimatedAdultHeightInches)
                  : '—'}
              </p>
            </Card>
          </div>
        </div>
      )}

      {profiles.length === 0 && !isAdding && (
        <div className="text-center py-8">
          <User className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm text-slate-600 mb-2">No child profiles yet</p>
          <p className="text-xs text-slate-500">
            Add a profile to get personalized sport recommendations
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ChildProfileSection;
