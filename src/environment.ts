import {offsura} from 'offsura';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';

function fetchQuery(operation: any, variables: any) {
  return offsura(operation.text, variables);
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
