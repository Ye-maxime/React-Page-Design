import * as React from 'react';
import useDataApi from '../customHooks/useDataApi';

export interface HelloProps { compiler: string; framework: string; }

// eslint-disable-next-line max-len
export const Hello : React.FunctionComponent<HelloProps> = ({ compiler, framework }: HelloProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, doFetch } = useDataApi(
    'http://localhost:4000/api/page',
    '',
  );

  return (
    <h1>
      Hello from
      {compiler}
      {' '}
      and
      {framework}
      ?
      {data}
      !
    </h1>
  );
};
