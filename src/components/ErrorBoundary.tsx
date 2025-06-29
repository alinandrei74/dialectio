import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-32 h-4 bg-white/40 dark:bg-gray-300/30 transform rotate-45 opacity-40 animate-pulse shadow-lg"></div>
            <div className="absolute top-40 left-20 w-4 h-32 bg-blue-300/50 dark:bg-blue-400/40 transform -rotate-30 opacity-50 animate-pulse delay-1000 shadow-md"></div>
            <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-white/35 dark:bg-gray-300/25 transform rotate-45 opacity-35 animate-pulse delay-500 shadow-xl"></div>
            <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-blue-200/45 dark:bg-blue-300/35 transform -rotate-45 opacity-45 animate-pulse delay-700 shadow-lg"></div>
          </div>

          <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl w-full mx-4"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            
            {/* Error Icon */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <AlertTriangle className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">
                ¡Oops! Algo salió mal
              </h1>
              <p className="text-gray-700 dark:text-gray-300 font-bold">
                Ha ocurrido un error inesperado. No te preocupes, estamos trabajando para solucionarlo.
              </p>
            </div>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50/90 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-mono text-sm overflow-auto max-h-40"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <div className="font-bold mb-2">Error Details:</div>
                <div>{this.state.error.toString()}</div>
                {this.state.errorInfo && (
                  <div className="mt-2">
                    <div className="font-bold">Component Stack:</div>
                    <div>{this.state.errorInfo.componentStack}</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Intentar de nuevo</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <Home className="w-5 h-5" />
                <span>Ir al inicio</span>
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                Si el problema persiste, por favor contacta a nuestro equipo de soporte.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;