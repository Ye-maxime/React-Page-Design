import * as React from 'react';

export interface OwnProps {
  isLoading: boolean;
  error: boolean;
}

type Props = OwnProps;

const Loading: React.FunctionComponent<Props> = ({
  isLoading,
  error,
}: Props) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>;
  }

  return null;
};

export default Loading;
