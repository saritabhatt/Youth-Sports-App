/**
 * Reusable loading state component
 * Provides consistent loading UI across the app
 */

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingState({ message = 'Loading...', size = 'large' }: LoadingStateProps) {
  const spinnerSize = size === 'small' ? 'h-6 w-6' : 'h-8 w-8';
  const containerSize = size === 'small' ? 'py-8' : 'py-12';

  return (
    <div className={`flex justify-center items-center ${containerSize}`}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full ${spinnerSize} border-b-2 border-blue-600 mb-3`}></div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

/**
 * Error state component
 * Provides consistent error UI with optional retry button
 */

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
      <div className="text-2xl mb-3">⚠️</div>
      <p className="text-red-800 dark:text-red-200 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
