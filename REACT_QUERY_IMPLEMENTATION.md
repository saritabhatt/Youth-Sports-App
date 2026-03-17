# React Query Implementation - Summary

## Objective
Integrate React Query (@tanstack/react-query) into the Youth Sports App to improve performance, data fetching, and UX with automatic caching, loading states, and error handling.

## What Was Completed

### 1. **Custom Hooks Created**

#### Profile Management (`src/hooks/useProfiles.ts`)
- **useProfiles()** - Fetch all profiles with automatic caching
- **useSaveProfile()** - Create/update profile with automatic cache invalidation
- **useDeleteProfile()** - Delete profile with automatic cache invalidation
- **useProfile(id)** - Fetch single profile by ID

#### Sports & Weights (`src/hooks/useSports.ts`)
- **useWeights()** - Fetch scoring weights
- **useSaveWeights()** - Update weights (invalidates scored sports)
- **useSportsData()** - Fetch all sports and categories
- **useScoredSports(profile, weights)** - Compute ranked sports (with conditional enabling)
- **useCompareList()** - Fetch sports comparison list
- **useAddToCompare()** - Add sport to comparison
- **useRemoveFromCompare()** - Remove sport from comparison
- **useClearCompare()** - Clear entire comparison list

### 2. **QueryClient Setup**
- Configured in `src/main.tsx` with sensible defaults:
  - Retry failed requests once
  - Disable refetch on window focus (reduces noise)
  - Wrapped app with QueryClientProvider

### 3. **Component Updates**

#### Results.tsx (`src/pages/Results.tsx`)
- Replaced localStorage direct calls with React Query hooks
- Added loading states using `useScoredSports` loading indicator
- Implemented proper mutation handlers with success callbacks
- Maintains filtering, sorting, search functionality
- Auto-invalidates related queries on mutations

#### Home.tsx (`src/pages/Home.tsx`)
- Replaced direct `loadProfiles()` with `useProfiles()` hook
- Added loading state display
- Cleaner component with less manual state management

### 4. **Reusable UI Components**
- **LoadingState** - Spinner component with customizable message/size
- **ErrorState** - Error display with optional retry button

### 5. **Documentation**
- Comprehensive guide: `docs/REACT_QUERY_INTEGRATION.md`
- Usage patterns, best practices, caching strategy
- Common issues and solutions

## Key Features Implemented

### ✅ Automatic Data Caching
```typescript
const { data: profiles = [] } = useProfiles();
// Data is cached for 5 minutes, requests deduplicated
```

### ✅ Loading & Error States
```typescript
if (isLoading) return <LoadingState />;
if (error) return <ErrorState message={error.message} />;
return <YourComponent data={data} />;
```

### ✅ Conditional Query Execution
```typescript
// Only fetches when both dependencies exist
const { data: scoredSports } = useScoredSports(activeProfile, weights);
```

### ✅ Automatic Cache Invalidation
```typescript
saveProfileMutation.mutate(profile, {
  onSuccess: () => {
    // Cache automatically invalidated
    success('Profile saved!');
  }
});
```

### ✅ Mutation Success/Error Handling
```typescript
mutation.mutate(data, {
  onSuccess: () => success('Saved!'),
  onError: (error) => error('Failed to save'),
});
```

## Performance Improvements

1. **Reduced Boilerplate** - Custom hooks encapsulate all fetching logic
2. **Automatic Caching** - Avoid redundant requests
3. **Smart Invalidation** - Only refetch when necessary
4. **Request Deduplication** - Multiple hooks requesting same data only fetch once
5. **Better UX** - Loading states prevent blank screens
6. **Optimistic Updates** - UI can update before mutation completes

## File Structure

```
src/
├── hooks/
│   ├── index.ts              # Export all hooks
│   ├── useProfiles.ts        # Profile management hooks
│   └── useSports.ts          # Sports and weights hooks
├── components/
│   ├── LoadingState.tsx      # Loading spinner component
│   └── ...                   # Existing components
├── pages/
│   ├── Results.tsx           # Updated with hooks
│   ├── Home.tsx              # Updated with hooks
│   └── About.tsx
├── main.tsx                  # QueryClient setup
└── ...
```

## Usage Examples

### Basic Query
```typescript
import { useProfiles } from '../hooks';

function MyComponent() {
  const { data: profiles = [], isLoading } = useProfiles();
  
  if (isLoading) return <LoadingState />;
  return <div>{profiles.map(p => p.name)}</div>;
}
```

### Mutation with Callbacks
```typescript
const mutation = useSaveProfile();

function handleSave(profile) {
  mutation.mutate(profile, {
    onSuccess: () => {
      success('Profile saved!');
      navigate('/results');
    },
    onError: () => error('Failed to save profile'),
  });
}
```

### Dependent Queries
```typescript
const { data: profile } = useProfile(activeProfileId);
const { data: scores, isLoading } = useScoredSports(profile, weights);

// Only fetches when profile and weights exist
```

## Browser DevTools Integration

React Query DevTools can be added for development:

```bash
npm install @tanstack/react-query-devtools --save-dev
```

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

## Git Commits

1. **8142a6e** - Initial React Query setup with custom hooks
2. **765ce34** - Integration into pages with loading/error states
3. **6eb2ed5** - TypeScript fixes for mutation types

## Testing Recommendations

1. **Test loading states** - Verify spinners show during fetches
2. **Test cache invalidation** - Verify data updates after mutations
3. **Test error handling** - Verify error states display correctly
4. **Test dependent queries** - Verify scores update when weights change
5. **Test deduplication** - Verify only one request sent for multiple hooks

## Next Steps

1. Add React Query DevTools for debugging
2. Implement optimistic updates for better UX
3. Add request retry strategies for network failures
4. Consider pagination for large datasets
5. Implement background sync for offline-first capability

## Migration Path from Old Code

Old approach:
```typescript
const [profiles, setProfiles] = useState(loadProfiles());
// Manual updates
saveProfile(profile);
setProfiles(loadProfiles());
```

New approach:
```typescript
const { data: profiles } = useProfiles();
// Automatic invalidation
saveProfileMutation.mutate(profile);
```

## Configuration Reference

**Stale Times:**
- Static data (sports): Infinity
- User data (profiles, weights): 5 minutes
- Computed data (scores): 5 minutes

**Cache Times:**
- All data: 10 minutes (gcTime)

**Retry Policy:**
- Queries: 1 retry
- Mutations: 1 retry

**Refetch Strategy:**
- Window focus: Disabled
- Manual refetch: Available on every hook

## Troubleshooting

### Data not updating?
→ Check that mutations invalidate the correct query key

### Loading state stuck?
→ Verify `enabled` condition is met for dependent queries

### Duplicate requests?
→ Normal behavior - verify only one request actually completes

### Stale data visible?
→ Increase stale time or call `refetch()` manually
