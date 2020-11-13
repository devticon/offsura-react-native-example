import {OffsuraConfig} from 'offsura/dist/interfaces';
import React, {Suspense} from 'react';
import {Text} from 'react-native';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {entities} from './__generated__';
import environment from './environment';
import OffsuraContextProvider from './OffsuraContext';
import {Screen} from './Screen';
import offsuraConfig from '../offsura.config';

const App = () => {
  return (
    <>
      <RelayEnvironmentProvider environment={environment}>
        <OffsuraContextProvider
          config={offsuraConfig as OffsuraConfig}
          entities={entities}>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Screen />
          </Suspense>
        </OffsuraContextProvider>
      </RelayEnvironmentProvider>
    </>
  );
};

export default App;
