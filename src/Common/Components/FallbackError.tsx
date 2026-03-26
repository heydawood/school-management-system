export const FallbackError = ({ error, resetErrorBoundary }: any) => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
    <p className="mt-2 text-gray-700">(Error Message: {error?.message})</p>
    <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-primary-25 text-primary-800 hover:text-white hover:bg-primary rounded-lg">
      Try Again
    </button>
  </div>
);
