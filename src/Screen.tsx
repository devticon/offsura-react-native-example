import React from 'react';
import {graphql} from 'react-relay';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {ScreenQuery} from './__generated__/ScreenQuery.graphql';
import {List} from './List';

const screenQuery = graphql`
  query ScreenQuery {
    ...ListFragment
  }
`;

export const Screen = () => {
  const data = useLazyLoadQuery<ScreenQuery>(screenQuery, {});

  return <List productsRef={data} />;
};
