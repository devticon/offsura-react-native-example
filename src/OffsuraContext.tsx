import {initOffsura} from 'offsura';
import {OffsuraConfig, OffsuraRuntimeConfig} from 'offsura/dist/interfaces';
import {startReplication} from 'offsura/dist/typeorm-hasura-replication';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Text} from 'react-native';

export interface OffsuraContextProviderProps extends OffsuraRuntimeConfig {
  config: OffsuraConfig;
  children: ReactNode;
}

export interface OffsuraContextProps {}

const initialValue: OffsuraContextProps = {};

export const OffsuraContext = createContext<OffsuraContextProps>(initialValue);
export const useAuthContext = () => useContext(OffsuraContext);

const OffsuraContextProvider = ({
  children,
  config,
  entities,
  webSocketImpl,
}: OffsuraContextProviderProps) => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    initOffsura(config, {entities, webSocketImpl}).then(
      async ({connection}) => {
        startReplication(config.replication, connection);
        setConnected(true);
      },
    );
  }, [config, entities, webSocketImpl]);

  // todo suspend
  if (!connected) {
    return <Text>Connecting...</Text>;
  }
  return (
    <OffsuraContext.Provider value={{}}>{children}</OffsuraContext.Provider>
  );
};

export default OffsuraContextProvider;
