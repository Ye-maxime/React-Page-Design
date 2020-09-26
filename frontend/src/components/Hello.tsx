import * as React from 'react';

export interface HelloProps { compiler: string; framework: string; }

// eslint-disable-next-line max-len
export const Hello : React.FunctionComponent<HelloProps> = ({ compiler, framework }: HelloProps) => (
  <h1>
    Hello from
    {compiler}
    {' '}
    and
    {framework}
    !
  </h1>
);
