# React Query Quick Start - Youth Sports App

## TL;DR

React Query is now integrated! Use the custom hooks instead of `useState`/`useEffect`.

## Most Common Patterns

### Fetch Profiles
```typescript
import { useProfiles } from '../hooks';

function MyComponent() {
  const { data: profiles = [], isLoading, isError } = useProfiles();
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profiles</div>;
  
  return profiles.map(p => <div key={p.id}>{p.name}</div>);
}
```

### Save/Update Profile
```typescript
import { useSaveProfile } from '../hooks';

function SaveForm() {
  const saveProfileMutation = useSaveProfile();
  
  const handleSubmit = (profile: ChildProfile) => {
    saveProfileMutation.mutate(profile, {
      onSuccess: () => {
        // Success! Cache is automatically updated
        toast.success('Profile saved');
      },
      onError: () => {
        toast.error('Failed to save');
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {saveProfileMutation.isPending && <span>Saving...</span>}
      {/* form fields */}
    </form>
  );
}
```

### Delete Profile
```typescript
const deleteProfileMutation = useDeleteProfile();

const handleDelete = (profileId: string) => {
  deleteProfileMutation.mutate(profileId);
};
```

### Get Scored Sports
```typescript
import { useScoredSports, useWeights } from '../hooks';

function SportsPage({ profile }: { profile: ChildProfile }) {
  const { data: weights } = useWeights();
  const { data: scoredSports = [] } = useScoredSports(profile, weights);
  
  return scoredSports.map(sport => <SportCard key={sport.sport.id} sport={sport} />);
}
```

### Update Weights
```typescript
const saveWeightsMutation = useSaveWeights();

const handleWeightChange = (newWeights: ScoringWeights) => {
  saveWeightsMutation.mutate(newWeights);
};
```

### Compare List
```typescript
import { useCompareList, useAddToCompare, useRemoveFromCompare } from '../hooks';

function ComparePage() {
  const { data: compareList = [] } = useCompareList();
  const addMutation = useAddToCompare();
  const removeMutation = useRemoveFromCompare();
  
  return (
    <>
      <button onClick={() => addMutation.mutate(sportId)}>Add to Compare</button>
      <button onClick={() => removeMutation.mutate(sportId)}>Remove</button>
      <div>In Compare: {compareList.length}/4</div>
    </>
  );
}
```

## All Available Hooks

| Hook | Returns | Use For |
|------|---------|---------|
| `useProfiles()` | `{ data, isLoading, isError }` | Get all profiles |
| `useProfile(id)` | `{ data, isLoading }` | Get single profile |
| `useSaveProfile()` | mutation | Save/update profile |
| `useDeleteProfile()` | mutation | Delete profile |
| `useWeights()` | `{ data }` | Get scoring weights |
| `useSaveWeights()` | mutation | Update weights |
| `useSportsData()` | `{ data }` | Get all sports data |
| `useScoredSports(profile, weights)` | `{ data }` | Get ranked sports |
| `useCompareList()` | `{ data }` | Get comparison list |
| `useAddToCompare()` | mutation | Add to compare |
| `useRemoveFromCompare()` | mutation | Remove from compare |
| `useClearCompare()` | mutation | Clear compare list |

## State Values on Hooks

All hooks provide these values:

```typescript
const {
  // Data
  data,                    // The actual data (or undefined if loading)
  
  // Query States
  isLoading,              // True on first load (no data yet)
  isError,                // True if request failed
  error,                  // Error object if isError is true
  isFetching,             // True while fetching (background refetch too)
  isRefetching,           // True while background refetch happens
  
  // Mutation-specific
  isPending,              // True while mutation in progress
  isSuccess,              // True after successful mutation
  
  // Methods
  refetch,                // Manually refetch
  invalidate,             // Manually invalidate cache
} = useHook();
```

## No More Manual State!

### ❌ OLD WAY (Don't do this anymore)
```typescript
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  setProfiles(loadProfiles());
  setLoading(false);
}, []);
```

### ✅ NEW WAY (Use this)
```typescript
const { data: profiles = [], isLoading } = useProfiles();
```

## Automatic Features

✅ **Caching** - Data cached for 5-10 minutes  
✅ **Deduplication** - Same request made twice? Only fetches once  
✅ **Auto Refetch** - Stale data refetched in background  
✅ **Retry** - Failed requests retry automatically  
✅ **Cache Invalidation** - Mutations automatically update caches  

## Common Mistakes to Avoid

❌ Don't use hooks conditionally:
```typescript
// WRONG
if (isReady) {
  const data = useProfiles();  // DON'T DO THIS
}

// RIGHT
const { data } = useProfiles();
const profiles = data || [];
```

❌ Don't manually call load functions:
```typescript
// WRONG
const data = loadProfiles();

// RIGHT
const { data } = useProfiles();
```

❌ Don't forget to handle undefined data:
```typescript
// WRONG
profiles.map(...)  // Crashes if data is undefined

// RIGHT
(data || []).map(...)
// OR
const { data: profiles = [] } = useProfiles();
profiles.map(...)
```

## Error Handling

```typescript
const { data, isError, error } = useProfiles();

if (isError) {
  console.error('Failed to load profiles:', error);
  return <div>Error: {error.message}</div>;
}
```

## Loading States

```typescript
const { isLoading, isFetching } = useProfiles();

// Show loading spinner on first load
if (isLoading) return <LoadingSpinner />;

// Show subtle indicator while background fetch happens
{isFetching && <div className="opacity-50">Updating...</div>}
```

## Force Refetch

```typescript
const { data, refetch } = useProfiles();

// Manually refetch
<button onClick={() => refetch()}>Refresh</button>
```

---

For detailed docs, see `REACT_QUERY_INTEGRATION.md`
