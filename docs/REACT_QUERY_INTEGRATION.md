# React Query Integration Guide

## Overview

This document describes the React Query (@tanstack/react-query) integration in the Youth Sports App. React Query provides powerful data fetching, caching, and synchronization capabilities that improve app performance and UX.

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

**Configuration Details:**
- **retry: 1** - Retry failed requests once before showing error
- **refetchOnWindowFocus: false** - Don't refetch when window regains focus (reduces noise)
- **Wrapped with QueryClientProvider** in the app root for context access

## Custom Hooks

All data fetching logic is encapsulated in custom hooks located in `src/hooks/`.

### Profile Hooks (`useProfiles.ts`)

#### `useProfiles()`
Fetches all profiles with caching.

```typescript
const { data: profiles = [], isLoading, error } = useProfiles();
```

**Features:**
- 5-minute stale time
- 10-minute garbage collection
- Automatic caching

#### `useSaveProfile()`
Create or update a profile mutation.

```typescript
const mutation = useSaveProfile();

// Usage
mutation.mutate(profileData, {
  onSuccess: () => {
    success('Profile saved!');
  },
});
```

**Auto-invalidates:** `profiles` query after success

#### `useDeleteProfile()`
Delete a profile mutation.

```typescript
const mutation = useDeleteProfile();
mutation.mutate(profileId);
```

**Auto-invalidates:** `profiles` query after success

#### `useProfile(profileId)`
Fetch a single profile by ID.

```typescript
const { data: profile } = useProfile(activeProfileId);
```

### Sports & Weights Hooks (`useSports.ts`)

#### `useWeights()`
Fetch scoring weights.

```typescript
const { data: weights, isLoading } = useWeights();
```

**Features:**
- Infinite stale time (static data)
- Caches for 10 minutes

#### `useSaveWeights()`
Update scoring weights mutation.

```typescript
const mutation = useSaveWeights();
mutation.mutate(newWeights);
```

**Auto-invalidates:** `weights` and `scoredSports` queries

#### `useSportsData()`
Fetch all sports and categories.

```typescript
const { data: sports } = useSportsData();
```

#### `useScoredSports(profile, weights)`
Compute scored sports for a profile.

```typescript
const { data: scoredSports = [], isLoading } = useScoredSports(
  activeProfile,
  weights
);
```

**Features:**
- Only runs if both profile and weights are present (`enabled: !!profile && !!weights`)
- Returns cached results immediately
- Automatically invalidated when weights change

#### Compare List Hooks

```typescript
// Fetch compare list
const { data: compareList = [] } = useCompareList();

// Add to compare
const addMutation = useAddToCompare();
addMutation.mutate(sportId);

// Remove from compare
const removeMutation = useRemoveFromCompare();
removeMutation.mutate(sportId);

// Clear all
const clearMutation = useClearCompare();
clearMutation.mutate();
```

## Usage Patterns

### Basic Data Fetching

```typescript
import { useProfiles, useWeights } from '../hooks';

function MyComponent() {
  const { data: profiles = [], isLoading, error } = useProfiles();
  const { data: weights } = useWeights();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div>
      {profiles.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

### Mutations with Loading States

```typescript
const mutation = useSaveProfile();

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate(formData, {
        onSuccess: () => success('Saved!'),
        onError: () => error('Failed to save'),
      });
    }}
  >
    {mutation.isPending && <LoadingState size="small" />}
    <button disabled={mutation.isPending}>Save</button>
  </form>
);
```

### Dependent Queries

```typescript
// This query only runs when profileId is set
const { data: profile } = useProfile(activeProfileId);

// This query only runs when both profile and weights exist
const { data: scoredSports } = useScoredSports(activeProfile, weights);
```

## Loading & Error States

### Built-in Components

#### `<LoadingState />`
Displays a spinner with optional message.

```typescript
<LoadingState message="Loading sports..." size="large" />
```

Props:
- `message?: string` - Loading text
- `size?: 'small' | 'large'` - Spinner size

#### `<ErrorState />`
Displays error message with optional retry.

```typescript
<ErrorState 
  message="Failed to load"
  onRetry={() => refetch()}
/>
```

Props:
- `message?: string` - Error text
- `onRetry?: () => void` - Retry callback

## Best Practices

### 1. Handle Loading & Error States
Always check `isLoading` and `error` before rendering data:

```typescript
if (isLoading) return <LoadingState />;
if (error) return <ErrorState />;
return <YourComponent data={data} />;
```

### 2. Use Default Values
Prevent destructuring errors:

```typescript
const { data: profiles = [] } = useProfiles();
```

### 3. Enable Queries Conditionally
Only run dependent queries when prerequisites exist:

```typescript
const { data } = useQuery({
  enabled: !!userId,
  // ...
});
```

### 4. Batch Mutations
When multiple mutations should happen together:

```typescript
Promise.all([
  saveMutation1.mutateAsync(data1),
  saveMutation2.mutateAsync(data2),
]).then(() => success('All saved!'));
```

### 5. Use Callbacks for Side Effects
Instead of manual state updates:

```typescript
mutation.mutate(data, {
  onSuccess: (result) => {
    // Handle success
    setViewMode('results');
    success('Profile created!');
  },
  onError: (error) => {
    // Handle error
    console.error(error);
  },
});
```

## Caching Strategy

### Query Keys
Hierarchical query keys help with invalidation:

```typescript
['profiles']              // All profiles
['profile', profileId]    // Specific profile
['weights']               // All weights
['scoredSports']          // Computed scores
['compareList']           // Comparison list
```

### Stale Times
- **Static data** (sports, categories): Infinite stale time
- **User data** (profiles, weights): 5 minutes
- **Computed data** (scored sports): 5 minutes

### Cache Invalidation
Mutations automatically invalidate related queries:

```typescript
const saveProfileMutation = useSaveProfile();
// onSuccess: queryClient.invalidateQueries({ 
//   queryKey: ['profiles'] 
// });
```

## Performance Benefits

1. **Automatic Caching** - Avoid redundant network requests
2. **Stale-While-Revalidate** - Show cached data immediately, update in background
3. **Automatic Garbage Collection** - Old data is cleaned up
4. **Request Deduplication** - Multiple hooks requesting same data only fetch once
5. **Optimistic Updates** - Update UI before mutation completes
6. **Background Refetching** - Keep data fresh without blocking UI

## Common Issues & Solutions

### Query not updating after mutation
**Solution:** Ensure mutation calls `invalidateQueries()` for related queries.

```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['profiles'] });
}
```

### Infinite loading state
**Solution:** Check that `enabled` condition is properly set for dependent queries.

```typescript
const { data } = useQuery({
  enabled: !!parentData, // Only fetch if parent exists
  // ...
});
```

### Stale data on screen
**Solution:** Reduce stale time if data changes frequently.

```typescript
useQuery({
  staleTime: 1000 * 30, // 30 seconds instead of 5 minutes
  // ...
})
```

## Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Query Keys Guide](https://tanstack.com/query/latest/docs/react/guides/important-defaults)
- [Mutations Guide](https://tanstack.com/query/latest/docs/react/guides/mutations)
- [Caching Guide](https://tanstack.com/query/latest/docs/react/guides/caching)
