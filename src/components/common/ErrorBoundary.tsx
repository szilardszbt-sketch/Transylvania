import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  variant?: 'page' | 'card' | 'section';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error safely without crashing the client runtime
    console.error('Safe catch: Component error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Compact card variant for individual feed items
      if (this.props.variant === 'card') {
        return (
          <div className="bg-[#FAF8F5] border border-[#E5DFD4] rounded-xl p-5 text-center flex flex-col items-center justify-center space-y-2 min-h-[220px]">
            <div className="w-9 h-9 rounded-full bg-[#FBF0EE] text-[#B83A2A] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="font-brand font-bold text-sm text-[#1B3322]">
              Dispatch Temporarily Unavailable
            </p>
            <p className="text-[11px] text-[#5D665B] max-w-xs leading-relaxed">
              This entry could not be rendered due to a data format issue. The rest of the journal remains operational.
            </p>
          </div>
        );
      }

      // Section variant for embedded modules
      if (this.props.variant === 'section') {
        return (
          <div className="bg-[#FAF8F5] border border-[#E5DFD4] rounded-2xl p-6 text-center space-y-3 my-6">
            <div className="w-10 h-10 rounded-full bg-[#FBF0EE] text-[#B83A2A] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#1B3322]">
              Content Section Unavailable
            </h3>
            <p className="text-xs text-[#5D665B] max-w-md mx-auto">
              This section could not load properly. Other sections on this page are unaffected.
            </p>
          </div>
        );
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white border border-[#E5E0D8] rounded-2xl p-8 text-center shadow-lg space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FBF0EE] text-[#B83A2A] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="font-brand text-2xl font-bold text-[#1B3322]">
                Something went wrong
              </h2>
              <p className="text-xs text-[#5D665B] leading-relaxed">
                We encountered an unexpected error while loading this page or dispatch. Don't worry—your session is safe.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#F8F7F4] border border-[#EAE5DD] rounded-lg p-3 text-left">
                <p className="text-[11px] font-mono text-[#8C2E22] break-words">
                  {this.state.error.message || 'Unknown runtime error'}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1B3322] text-[#F3EFE8] text-xs font-semibold rounded-xl hover:bg-[#2D5A38] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F2EDE4] text-[#1B3322] text-xs font-semibold rounded-xl hover:bg-[#E5DFD4] transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
