// src/App.jsx
import React, { useEffect, useState } from 'react';
import { AppConfig, UserSession } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';

import ErrorBoundary from './ErrorBoundary.jsx';
import ConnectWallet from './components/ConnectWallet.jsx';
import BoardForm from './components/BoardForm.jsx';
import PostList from './components/PostList.jsx';

// Initialize Stacks configuration only once
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
const network = STACKS_TESTNET; // Use static constant per Stacks.js v7+

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setIsSignedIn(true);
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => setIsSignedIn(true));
    }
  }, []);

  const contractAddress = 'ST28G9AV4ECEXEJX9WXXXYWT178WVTAFRTGD04FC1';
  const contractName = 'Board';

  return (
    <ErrorBoundary>
      <div style={{ padding: '1rem' }}>
        <h1>Discussion Board</h1>

        {!isSignedIn ? (
          <>
            <h2>Please connect your wallet</h2>
            <ConnectWallet userSession={userSession} />
          </>
        ) : (
          <>
            <ConnectWallet userSession={userSession} />
            <BoardForm
              userSession={userSession}
              network={network}
              contractAddress={contractAddress}
              contractName={contractName}
            />
            <PostList
              userSession={userSession}
              network={network}
              contractAddress={contractAddress}
              contractName={contractName}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}