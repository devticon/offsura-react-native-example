import React, {useCallback, useEffect} from 'react';
import {Button, FlatList, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {graphql, usePaginationFragment} from 'react-relay/hooks';
import {ListFragment$key} from './__generated__/ListFragment.graphql';
import {ListPaginationQuery} from './__generated__/ListPaginationQuery.graphql';

const productsListFragment = graphql`
  fragment ListFragment on Query
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 1}
    cursor: {type: "String"}
  )
  @refetchable(queryName: "ListPaginationQuery") {
    Product_connection(first: $count, after: $cursor, order_by: {name: asc})
      @connection(key: "ListFragment_Product_connection") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Props = {
  productsRef: ListFragment$key;
};
export const List = ({productsRef}: Props) => {
  const {data, loadNext, refetch, isLoadingNext} = usePaginationFragment<
    ListPaginationQuery,
    ListFragment$key
  >(productsListFragment, productsRef);

  useEffect(() => {
    refetch({});
  }, [refetch]);

  const renderItem = useCallback(({item: {node: product}}) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{product.name}</ListItem.Title>
          <ListItem.Subtitle>{product.id}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }, []);

  return (
    <>
      <FlatList
        data={data.Product_connection!.edges}
        keyExtractor={(product) => product!.node.id}
        ListEmptyComponent={<Text>Empty.</Text>}
        renderItem={renderItem}
      />
      <Button
        title={isLoadingNext ? 'loading...' : 'load next'}
        onPress={() => loadNext(1)}
      />
    </>
  );
};
