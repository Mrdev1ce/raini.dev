import React, { Component, ComponentClass, ErrorInfo, FunctionComponent, ReactElement } from "react"

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
  public state: IErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error boundary caught an error ", error, errorInfo)
  }

  public render(): ReactElement {
    const errorMessage: ReactElement = <p>Something went wrong. Sorry...</p>

    return this.state.hasError ? errorMessage : (this.props.children as ReactElement)
  }
}

const withErrorBoundary = <T, _>(ReactComponent: ComponentClass<T> | FunctionComponent<T>) => (
  props: T,
): ReactElement => (
  <ErrorBoundary>
    <ReactComponent {...props} />
  </ErrorBoundary>
)

export default withErrorBoundary
