# React Query Integration Guide

This document explains how React Query (@tanstack/react-query) has been integrated into the Youth Sports App for improved performance and UX.

## Overview

React Query provides:
- **Automatic caching** of queries with configurable stale times
- **Automatic cache invalidation** on mutations
- **Loading and error states** without manual management
- **Network state awareness** and retry logic
- **Deduplication** of identical requests

## Setup

### QueryClient Configuration

The QueryClient is initialized in `src/main.tsx` with sensible defaults:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
```

Key options:
- `retry: 1` - Retry failed requests once
- `refetchOnWindowFocus: false` - Don't refetch when window regains focus

## Custom Hooks

### Profile Hooks (`src/hooks/useProfiles.ts`)

#### `useProfiles()`
Fetches all child profiles.
```typescript
const { data: profiles = [], isLoading, isError } = useProfiles();
```

#### `useProfile(profileId)`
Fetches a single profile by ID.
```typescript
const { data: profile } = useProfile(profileId);
```

#### `useSaveProfile()`
Mutation to save or update a profile. Automatically invalidates the profiles query.
```typescript
const saveProfileMutation = useSaveProfile();
saveProfileMutation.mutate(newProfile);
```

#### `useDeleteProfile()`
Mutation to delete a profile. Automatically invalidates the profiles query.
```typescript
const deleteProfileMutation = useDeleteProfile();
deleteProfileMutation.mutate(profileId);
```

### Sports Hooks (`src/hooks/useSports.ts`)

#### `useWeights()`
Fetches the current scoring weights.
```typescript
const { data: weights } = useWeights();
```

#### `useSaveWeights()`
Mutation to update scoring weights. Invalidates both weights and scored sports queries.
```typescript
const saveWeightsMutation = useSaveWeights();
saveWeightsMutation.mutate(newWeights);
```

#### `useSportsData()`
Fetches static sports data.
```typescript
const { data: sportsData } = useSportsData();
```

#### `useScoredSports(profile, weights)`
Computes scored sports for a profile. Only runs when both dependencies are provided.
```typescript
const { data: scoredSports } = useScoredSports(activeProfile, weights);
```

#### `useCompareList()`
Fetches the list of sports in the comparison mode.
```typescript
const { data: compareList = [] } = useCompareList();
```

#### `useAddToCompare()` / `useRemoveFromCompare()` / `useClearCompare()`
Mutations for managing the comparison list.
```typescript
const addMutation = useAddToCompare();
addMutation.mutate(sportId);
```

## Usage Example

```typescript
import { useProfiles, useSaveProfile, useWeights, useScoredSports } from '../hooks';

function MyComponent() {
  // Fetch data
  const { data: profiles, isLoading } = useProfiles();
  const { data: weights } = useWeights();
  
  // Use mutations
  const saveProfileMutation = useSaveProfile();
  
  // Derive active profile
  const activeProfile = profiles?.[0] || null;
  
  // Get computed data
  const { data: scoredSports } = useScoredSports(activeProfile, weights);
  
  // Use in handlers
  const handleSave = useCallback((profile: ChildProfile) => {
    saveProfileMutation.mutate(profile, {
      onSuccess: () => {
        console.log('Saved!');
      },
    });
  }, [saveProfileMutation]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {profiles.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </>
  );
}
```

## Cache Configuration

Each hook has configured cache times:

| Hook | staleTime | gcTime |
|------|-----------|--------|
| useProfiles | 5 min | 10 min |
| useProfile | 5 min | 10 min |
| useWeights | Infinity | 10 min |
| useSportsData | Infinity | 10 min |
| useScoredSports | 5 min | 10 min |
| useCompareList | Infinity | 10 min |

- `staleTime`: How long data is considered fresh before background refetch
- `gcTime`: How long inactive data is kept in cache before removal

## Loading and Error States

React Query provides these states on all hooks:

```typescript
const { 
  data,
  isLoading,        // First load (no data yet)
  isPending,        // Mutation in progress
  isError,
  error,
  isFetching,       // Background fetch in progress
  isRefetching,     // Background refetch in progress
} = useQuery(...)
```

## Key Benefits

✅ **Automatic Updates** - Mutations automatically invalidate and refetch related queries
✅ **No Manual State Management** - React Query handles loading/error states
✅ **Network Efficiency** - Deduplicates requests, caches responses
✅ **Better UX** - Optimistic updates, retry logic, background refetching
✅ **DevTools** - React Query DevTools for debugging (can be added later)

## Next Steps

1. **Install DevTools** - Add `@tanstack/react-query-devtools` for debugging
2. **Add Mutations** - For backend API integration when available
3. **Optimize Stale Times** - Based on actual usage patterns
4. **Error Handling** - Add error boundaries and user feedback

## Migration from useState

Before:
```typescript
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  const data = loadProfiles();
  setProfiles(data);
  setLoading(false);
}, []);
```

After:
```typescript
const { data: profiles = [], isLoading } = useProfiles();
```

Much simpler! ✨
