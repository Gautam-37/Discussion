// src/components/BoardForm.jsx - Modern UI Version
import React, { useState } from 'react';
import {
  makeContractCall,
  uintCV,
  bufferCVFromString,
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';

export default function BoardForm({
  userSession, 
  network, 
  contractAddress, 
  contractName,
}) {
  const [postId, setPostId] = useState('');
  const [content, setContent] = useState('');
  const [stake, setStake] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!postId || !content || !stake) {
      setStatus('⚠️ Please fill in all fields');
      return;
    }

    if (Number(postId) <= 0 || Number(stake) <= 0) {
      setStatus('⚠️ Post ID and Stake must be positive numbers');
      return;
    }

    setLoading(true);
    setStatus('🚀 Submitting your amazing post...');

    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'post-message',
        functionArgs: [
          uintCV(Number(postId)),
          bufferCVFromString(content),
          uintCV(Number(stake)),
        ],
        network,
        postConditionMode: 'allow',
        onFinish: (data) => {
          setStatus(`🎉 Success! TX ID: ${data.txId}`);
          setPostId('');
          setContent('');
          setStake('');
          setLoading(false);
          
          // Auto-clear success message after 5 seconds
          setTimeout(() => setStatus(''), 5000);
        },
        onCancel: () => {
          setStatus('❌ Transaction cancelled');
          setLoading(false);
        },
      });
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setStatus(`💥 Error: ${error.message || 'Transaction failed'}`);
      setLoading(false);
    }
  };

  const getStakeLevel = (stakeValue) => {
    const stake = Number(stakeValue) || 0;
    if (stake >= 1000) return { level: 'Epic', color: '#ff6b35', emoji: '🔥' };
    if (stake >= 500) return { level: 'High', color: '#4ecdc4', emoji: '⭐' };
    if (stake >= 100) return { level: 'Medium', color: '#45b7d1', emoji: '💫' };
    return { level: 'Low', color: '#667eea', emoji: '✨' };
  };

  const stakeLevel = getStakeLevel(stake);

  const keyframes = `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
      50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={{
        margin: '2rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderRadius: '25px',
        overflow: 'hidden',
        border: '2px solid #333',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '0.5rem',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              ✍️
            </div>
            <h2 style={{
              color: '#ffffff',
              fontSize: '2rem',
              margin: '0 0 0.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Create New Post
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              Share your thoughts with the community
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '2rem' }}>
          {/* Post ID Field */}
          <div style={{ marginBottom: '2rem', animation: 'slideUp 0.6s ease-out' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '0.8rem'
            }}>
              🆔 Post ID
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="Enter unique post ID (e.g., 1, 2, 3...)"
                value={postId}
                onChange={e => setPostId(e.target.value)}
                onFocus={() => setFocusedField('postId')}
                onBlur={() => setFocusedField('')}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${focusedField === 'postId' ? '#667eea' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '15px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: focusedField === 'postId' ? '0 0 20px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              />
              {postId && (
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#4ecdc4',
                  fontSize: '1.2rem'
                }}>
                  ✅
                </div>
              )}
            </div>
          </div>

          {/* Content Field */}
          <div style={{ marginBottom: '2rem', animation: 'slideUp 0.8s ease-out' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '0.8rem'
            }}>
              📝 Your Message
              <span style={{
                fontSize: '0.8rem',
                color: '#888',
                fontWeight: 'normal',
                marginLeft: '0.5rem'
              }}>
                ({content.length}/500)
              </span>
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                placeholder="What's on your mind? Share your thoughts, ideas, or questions with the community..."
                value={content}
                onChange={e => setContent(e.target.value.slice(0, 500))}
                onFocus={() => setFocusedField('content')}
                onBlur={() => setFocusedField('')}
                disabled={loading}
                rows={6}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${focusedField === 'content' ? '#667eea' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '15px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.6',
                  boxShadow: focusedField === 'content' ? '0 0 20px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              />
              {content && (
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: content.length > 450 ? '#ff6b35' : '#4ecdc4',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem'
                }}>
                  {content.length}/500
                </div>
              )}
            </div>
          </div>

          {/* Stake Field */}
          <div style={{ marginBottom: '2rem', animation: 'slideUp 1s ease-out' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '0.8rem'
            }}>
              💰 Stake Amount (STX)
              {stake && (
                <span style={{
                  background: stakeLevel.color,
                  color: 'white',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  {stakeLevel.emoji} {stakeLevel.level}
                </span>
              )}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="Enter stake amount (minimum 1 STX)"
                value={stake}
                onChange={e => setStake(e.target.value)}
                onFocus={() => setFocusedField('stake')}
                onBlur={() => setFocusedField('')}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${focusedField === 'stake' ? stakeLevel.color : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '15px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: focusedField === 'stake' ? `0 0 20px ${stakeLevel.color}40` : 'none'
                }}
              />
              {stake && (
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: stakeLevel.color,
                  fontSize: '1.2rem'
                }}>
                  {stakeLevel.emoji}
                </div>
              )}
            </div>
            {stake && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.8rem',
                background: `linear-gradient(45deg, ${stakeLevel.color}20, ${stakeLevel.color}10)`,
                borderRadius: '10px',
                border: `1px solid ${stakeLevel.color}40`,
                color: '#ffffff',
                fontSize: '0.9rem'
              }}>
                💡 <strong>{stakeLevel.level} Stake:</strong> Higher stakes increase your post visibility and credibility!
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button 
              onClick={handleSubmit}
              disabled={loading || !postId || !content || !stake}
              style={{
                background: loading 
                  ? 'linear-gradient(45deg, #6c757d, #5a6268)' 
                  : 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '1.2rem 3rem',
                borderRadius: '50px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                margin: '0 auto',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ 
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    border: '3px solid transparent',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Publishing...
                </>
              ) : (
                <>
                  🚀 Publish Post
                </>
              )}
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '15px',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              animation: status.includes('Error') || status.includes('cancelled') ? 'shake 0.5s ease-in-out' : 'slideUp 0.5s ease-out',
              background: status.includes('Success') || status.includes('🎉') 
                ? 'linear-gradient(45deg, #28a745, #20c997)' 
                : status.includes('Error') || status.includes('💥') || status.includes('cancelled')
                ? 'linear-gradient(45deg, #dc3545, #c82333)'
                : 'linear-gradient(45deg, #17a2b8, #138496)',
              color: 'white',
              border: 'none',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
            }}>
              {status}
            </div>
          )}

          {/* Tips */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(102, 126, 234, 0.3)'
          }}>
            <h4 style={{
              color: '#ffffff',
              margin: '0 0 1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              💡 Pro Tips
            </h4>
            <div style={{
              display: 'grid',
              gap: '0.8rem',
              fontSize: '0.9rem',
              color: '#ccc'
            }}>
              <div>🎯 <strong>Unique Post ID:</strong> Make sure your Post ID hasn't been used before</div>
              <div>✨ <strong>Quality Content:</strong> Well-written posts get more engagement</div>
              <div>💰 <strong>Smart Staking:</strong> Higher stakes = better visibility and credibility</div>
              <div>🔒 <strong>Security:</strong> Your transaction is secured by the Stacks blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}