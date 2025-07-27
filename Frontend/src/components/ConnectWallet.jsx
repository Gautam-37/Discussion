// src/components/ConnectWallet.jsx - Fixed Version
import React, { useState } from 'react';
import { showConnect } from '@stacks/connect';

export default function ConnectWallet({ userSession, onConnect }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Using @stacks/connect instead of userSession.redirectToSignIn
      showConnect({
        appDetails: {
          name: 'Your App Name',
          icon: window.location.origin + '/logo.png', // Update with your app icon
        },
        redirectTo: '/',
        onFinish: (authData) => {
          console.log('Connected:', authData);
          setIsConnecting(false);
          if (onConnect) onConnect(authData);
          window.location.reload(); // Refresh to update UI
        },
        onCancel: () => {
          console.log('Connection cancelled');
          setIsConnecting(false);
        },
        userSession, // Pass the userSession if you have it
      });
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnecting(false);
    }
  };

  // Alternative method using userSession directly (if properly initialized)
  const handleConnectFallback = async () => {
    setIsConnecting(true);
    try {
      // Check if method exists before calling
      if (userSession && typeof userSession.redirectToSignIn === 'function') {
        await userSession.redirectToSignIn();
      } else {
        console.error('userSession.redirectToSignIn is not available');
        console.log('Available methods:', Object.getOwnPropertyNames(userSession));
        throw new Error('Wallet connection method not available');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (userSession && typeof userSession.signUserOut === 'function') {
      userSession.signUserOut();
      window.location.reload();
    } else {
      console.error('signUserOut method not available');
    }
  };

  const isSignedIn = userSession && userSession.isUserSignedIn && userSession.isUserSignedIn();
  const userData = isSignedIn && userSession.loadUserData ? userSession.loadUserData() : null;
  const address = userData?.profile?.stxAddress?.testnet;
  const shortAddress = address ? `${address.slice(0, 8)}...${address.slice(-8)}` : 'Not available';

  // Gradient animations
  const gradientKeyframes = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.3); }
      50% { box-shadow: 0 0 30px rgba(0, 123, 255, 0.6); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <div>
      <style>{gradientKeyframes}</style>
      <div style={{ 
        padding: '2rem', 
        margin: '1.5rem 0', 
        border: '2px solid transparent',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 4s ease infinite',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 123, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 150, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 150, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />

        {!isSignedIn ? (
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Wallet icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(45deg, #007bff, #0056b3)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              animation: 'float 3s ease-in-out infinite',
              boxShadow: '0 10px 20px rgba(0, 123, 255, 0.3)'
            }}>
              💳
            </div>
            
            <h3 style={{ 
              color: '#ffffff', 
              fontSize: '1.8rem',
              marginBottom: '0.5rem',
              background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Connect Your Wallet
            </h3>
            
            <p style={{ 
              color: '#b0b0b0', 
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              🚀 Join the discussion board by connecting your Stacks wallet
              <br />
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Secure • Fast • Decentralized
              </span>
            </p>
            
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              style={{
                background: isConnecting 
                  ? 'linear-gradient(45deg, #6c757d, #5a6268)' 
                  : 'linear-gradient(45deg, #007bff, #0056b3, #007bff)',
                backgroundSize: '200% 200%',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 5px 15px rgba(0, 123, 255, 0.4)',
                animation: isConnecting ? 'none' : 'glow 2s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                if (!isConnecting) {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.animation = 'none';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isConnecting) {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.animation = 'glow 2s ease-in-out infinite';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.4)';
                }
              }}
            >
              {isConnecting ? (
                <>
                  <span style={{ 
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Connecting...
                </>
              ) : (
                <>
                  🔗 Connect Stacks Wallet
                </>
              )}
            </button>
            
            <div style={{
              marginTop: '1.5rem',
              fontSize: '0.8rem',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span>🔒 Secure</span>
              <span>⚡ Fast</span>
              <span>🌐 Decentralized</span>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Success icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1rem',
              background: 'linear-gradient(45deg, #28a745, #20c997)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 5px 15px rgba(40, 167, 69, 0.4)'
            }}>
              ✅
            </div>
            
            <h3 style={{ 
              color: '#ffffff', 
              fontSize: '1.6rem',
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #28a745, #20c997)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Wallet Connected Successfully! 🎉
            </h3>
            
            <div style={{ 
              background: 'rgba(40, 167, 69, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(40, 167, 69, 0.3)'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ 
                  color: '#ffffff', 
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🏠 <strong>Address:</strong> 
                  <span style={{ 
                    background: 'rgba(0, 123, 255, 0.2)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '5px',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}>
                    {shortAddress}
                  </span>
                </p>
                
                <p style={{ 
                  color: '#ffffff', 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  👤 <strong>Username:</strong> {userData?.username || 'Anonymous'}
                </p>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={handleDisconnect}
                style={{
                  background: 'linear-gradient(45deg, #dc3545, #c82333)',
                  color: 'white',
                  border: 'none',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 3px 10px rgba(220, 53, 69, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(220, 53, 69, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 10px rgba(220, 53, 69, 0.3)';
                }}
              >
                🔓 Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}