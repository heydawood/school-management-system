import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '@/Common/Components/FallbackError';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'overflow-hidden'}>
      <ErrorBoundary
        FallbackComponent={FallbackError}
        onReset={() => {
          // Optional: reset global state, clear cache, or reload page
          window.location.reload();
        }}
      >
        <main>{children}</main>
      </ErrorBoundary>
    </div>
  );
}
