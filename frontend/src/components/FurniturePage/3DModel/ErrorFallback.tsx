function ErrorFallback({ error }: { error: Error }) {
    return (
      <div role="alert">
        <p>Something went wrong while loading the model:</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

export default ErrorFallback;