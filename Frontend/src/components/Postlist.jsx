import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [userTokenBalance, setUserTokenBalance] = useState(100);
  const [voteAmount, setVoteAmount] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const MAX_CONTENT_LENGTH = 280;

  // Mock data with more variety
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        content: "🚀 Welcome to the token-based discussion board! Stake your mod-tokens to vote on posts and shape the community.",
        author: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
        upvotes: 25,
        downvotes: 3,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        category: "announcement"
      },
      {
        id: 2, 
        content: "💡 The more tokens you stake, the more weight your vote carries. This creates meaningful moderation and prevents spam!",
        author: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
        upvotes: 18,
        downvotes: 2,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        category: "discussion"
      },
      {
        id: 3,
        content: "⚠️ Remember: voting burns your tokens permanently. Vote wisely and only on content that truly matters to the community!",
        author: "SP1HTBVD3JG9C05J6MYG29CTC1P264SP17BX4THP",
        upvotes: 15,
        downvotes: 1,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: "warning"
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleSubmitPost = async () => {
    if (!newPost.trim()) {
      alert('Please enter some content');
      return;
    }

    if (newPost.length > MAX_CONTENT_LENGTH) {
      alert(`Content must be ${MAX_CONTENT_LENGTH} characters or less`);
      return;
    }

    setLoading(true);
    
    try {
      const post = {
        id: posts.length + 1,
        content: newPost,
        author: userAddress || 'SP' + Math.random().toString(36).substr(2, 32).toUpperCase(),
        upvotes: 0,
        downvotes: 0,
        timestamp: new Date(),
        category: "discussion"
      };
      
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreateForm(false);
      
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  const handleVotePost = async (postId, isUpvote) => {
    if (voteAmount <= 0) {
      alert('Vote amount must be greater than 0');
      return;
    }

    if (voteAmount > userTokenBalance) {
      alert('Insufficient token balance');
      return;
    }

    const confirmed = window.confirm(
      `🔥 Are you sure you want to ${isUpvote ? 'upvote' : 'downvote'} this post with ${voteAmount} tokens? These tokens will be burned permanently!`
    );

    if (!confirmed) return;

    setLoading(true);
    
    try {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes: isUpvote ? post.upvotes + voteAmount : post.upvotes,
            downvotes: !isUpvote ? post.downvotes + voteAmount : post.downvotes
          };
        }
        return post;
      }));
      
      setUserTokenBalance(prev => prev - voteAmount);
      
    } catch (error) {
      console.error('Error voting on post:', error);
      alert('Failed to vote on post');
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getNetScore = (upvotes, downvotes) => {
    return upvotes - downvotes;
  };

  const getScoreColor = (score) => {
    if (score > 15) return '#10b981';
    if (score > 5) return '#22c55e';
    if (score > 0) return '#3b82f6';
    if (score < 0) return '#ef4444';
    return '#6b7280';
  };

  const getCategoryStyle = (category) => {
    const styles = {
      announcement: {
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      },
      discussion: {
        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }
    };
    return styles[category] || styles.discussion;
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937, #000000, #374151)',
      fontFamily: 'Arial, sans-serif'
    },
    backgroundOrbs: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    },
    orb1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite'
    },
    orb2: {
      position: 'absolute',
      top: '75%',
      right: '25%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(251, 146, 60, 0.3))',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite 2s'
    },
    content: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      zIndex: 1
    },
    header: {
      background: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px'
    },
    subtitle: {
      color: '#d1d5db',
      fontSize: '20px'
    },
    tokenBalance: {
      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
      borderRadius: '24px',
      padding: '24px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
      transform: 'scale(1)',
      transition: 'transform 0.3s ease'
    },
    tokenBalanceHover: {
      transform: 'scale(1.05)'
    },
    tokenAmount: {
      fontSize: '32px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    createButton: {
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      color: 'white',
      padding: '20px 40px',
      borderRadius: '24px',
      border: 'none',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      transform: 'scale(1)',
      transition: 'all 0.3s ease',
      marginBottom: '32px'
    },
    createForm: {
      background: 'rgba(31, 41, 55, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    formTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    textarea: {
      width: '100%',
      padding: '20px',
      background: 'rgba(55, 65, 81, 0.8)',
      border: '2px solid #4b5563',
      borderRadius: '16px',
      color: 'white',
      fontSize: '18px',
      resize: 'none',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    textareaFocus: {
      borderColor: '#06b6d4'
    },
    characterCount: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px'
    },
    publishButton: {
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '16px',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transform: 'scale(1)',
      transition: 'all 0.3s ease'
    },
    voteControls: {
      background: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    voteAmountControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    voteButton: {
      width: '48px',
      height: '48px',
      background: '#374151',
      color: 'white',
      border: '1px solid #4b5563',
      borderRadius: '50%',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s ease'
    },
    voteInput: {
      width: '80px',
      padding: '12px',
      background: '#374151',
      border: '2px solid #4b5563',
      borderRadius: '12px',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      outline: 'none'
    },
    burnWarning: {
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '20px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    post: {
      background: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      transform: 'scale(1)',
      transition: 'all 0.3s ease'
    },
    postHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px'
    },
    postMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#9ca3af'
    },
    authorAddress: {
      background: '#374151',
      padding: '8px 16px',
      borderRadius: '20px',
      fontFamily: 'monospace',
      color: '#06b6d4',
      border: '1px solid #4b5563'
    },
    postScore: {
      fontSize: '48px',
      fontWeight: 'bold',
      background: '#111827',
      borderRadius: '20px',
      padding: '16px 24px',
      border: '1px solid #374151'
    },
    postContent: {
      color: '#f3f4f6',
      fontSize: '20px',
      lineHeight: '1.6',
      background: 'rgba(17, 24, 39, 0.5)',
      padding: '32px',
      borderRadius: '16px',
      borderLeft: '4px solid #06b6d4',
      marginBottom: '32px'
    },
    voteButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    voteButtonsLeft: {
      display: 'flex',
      gap: '24px'
    },
    upvoteButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #22c55e, #10b981)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transform: 'scale(1)',
      transition: 'all 0.3s ease'
    },
    downvoteButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #ef4444, #ec4899)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transform: 'scale(1)',
      transition: 'all 0.3s ease'
    },
    voteStats: {
      display: 'flex',
      gap: '32px',
      fontSize: '20px'
    },
    upvoteCount: {
      background: 'rgba(34, 197, 94, 0.2)',
      padding: '12px 24px',
      borderRadius: '12px',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      color: '#22c55e',
      fontWeight: 'bold'
    },
    downvoteCount: {
      background: 'rgba(239, 68, 68, 0.2)',
      padding: '12px 24px',
      borderRadius: '12px',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
      fontWeight: 'bold'
    },
    emptyState: {
      textAlign: 'center',
      padding: '96px 0',
      color: 'white'
    },
    noTokensWarning: {
      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
      color: 'white',
      padding: '32px',
      borderRadius: '24px',
      marginTop: '32px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundOrbs}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
      </div>

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.title}>🏛️ Token Board</h1>
              <p style={styles.subtitle}>Stake • Vote • Moderate • Shape the Future</p>
            </div>
            <div style={styles.tokenBalance}>
              <div style={styles.tokenAmount}>
                <span style={{marginRight: '12px', fontSize: '40px'}}>🪙</span>
                {userTokenBalance}
              </div>
              <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '8px'}}>MOD Tokens</p>
            </div>
          </div>
        </div>

        {/* Create Post Button */}
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={styles.createButton}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {showCreateForm ? '❌ Cancel' : '✨ Create New Post'}
        </button>

        {/* Create Post Form */}
        {showCreateForm && (
          <div style={styles.createForm}>
            <h2 style={styles.formTitle}>
              <span style={{marginRight: '16px', fontSize: '32px'}}>📝</span>
              Share Your Thoughts
            </h2>
            <textarea
              placeholder="What's on your mind? Share something valuable with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={6}
              maxLength={MAX_CONTENT_LENGTH}
              style={styles.textarea}
            />
            <div style={styles.characterCount}>
              <span style={{color: newPost.length > MAX_CONTENT_LENGTH * 0.9 ? '#ef4444' : '#9ca3af'}}>
                <span style={{background: '#374151', padding: '8px 16px', borderRadius: '20px'}}>
                  {newPost.length}/{MAX_CONTENT_LENGTH} characters
                </span>
              </span>
              <button
                onClick={handleSubmitPost}
                disabled={loading || !newPost.trim() || newPost.length > MAX_CONTENT_LENGTH}
                style={{
                  ...styles.publishButton,
                  opacity: (loading || !newPost.trim() || newPost.length > MAX_CONTENT_LENGTH) ? 0.5 : 1
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {loading ? '🚀 Publishing...' : '🚀 Publish Post'}
              </button>
            </div>
          </div>
        )}

        {/* Vote Controls */}
        <div style={styles.voteControls}>
          <div style={styles.voteAmountControls}>
            <span style={{color: 'white', fontSize: '20px', fontWeight: 'bold'}}>⚡ Vote Power:</span>
            <button
              onClick={() => setVoteAmount(Math.max(1, voteAmount - 1))}
              style={styles.voteButton}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={userTokenBalance}
              value={voteAmount}
              onChange={(e) => setVoteAmount(parseInt(e.target.value) || 1)}
              style={styles.voteInput}
            />
            <button
              onClick={() => setVoteAmount(Math.min(userTokenBalance, voteAmount + 1))}
              style={styles.voteButton}
            >
              +
            </button>
            <span style={{color: '#d1d5db', fontSize: '18px'}}>tokens per vote</span>
          </div>
          <div style={styles.burnWarning}>
            🔥 Tokens burn forever!
          </div>
        </div>

        {/* Posts */}
        <div>
          {posts
            .sort((a, b) => getNetScore(b.upvotes, b.downvotes) - getNetScore(a.upvotes, a.downvotes))
            .map((post) => (
            <div 
              key={post.id} 
              style={styles.post}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={styles.postHeader}>
                <div style={{flex: 1}}>
                  <div style={styles.postMeta}>
                    <span style={getCategoryStyle(post.category)}>
                      {post.category}
                    </span>
                    <div style={styles.authorInfo}>
                      <span style={{fontSize: '20px'}}>👤</span>
                      <span style={styles.authorAddress}>
                        {formatAddress(post.author)}
                      </span>
                      <span>•</span>
                      <span style={{background: '#1e3a8a', color: '#93c5fd', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold'}}>
                        #{post.id}
                      </span>
                      <span>•</span>
                      <span>{formatTime(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div style={{...styles.postScore, color: getScoreColor(getNetScore(post.upvotes, post.downvotes))}}>
                  {getNetScore(post.upvotes, post.downvotes) > 0 ? '+' : ''}{getNetScore(post.upvotes, post.downvotes)}
                </div>
              </div>
              
              <p style={styles.postContent}>
                {post.content}
              </p>
              
              <div style={styles.voteButtons}>
                <div style={styles.voteButtonsLeft}>
                  <button
                    onClick={() => handleVotePost(post.id, true)}
                    disabled={loading || userTokenBalance < voteAmount}
                    style={{
                      ...styles.upvoteButton,
                      opacity: (loading || userTokenBalance < voteAmount) ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <span style={{fontSize: '24px'}}>🚀</span>
                    <span>Upvote</span>
                    <span style={{background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '12px', fontSize: '14px'}}>
                      {voteAmount} 🪙
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleVotePost(post.id, false)}
                    disabled={loading || userTokenBalance < voteAmount}
                    style={{
                      ...styles.downvoteButton,
                      opacity: (loading || userTokenBalance < voteAmount) ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <span style={{fontSize: '24px'}}>👎</span>
                    <span>Downvote</span>
                    <span style={{background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '12px', fontSize: '14px'}}>
                      {voteAmount} 🪙
                    </span>
                  </button>
                </div>
                
                <div style={styles.voteStats}>
                  <div style={styles.upvoteCount}>
                    ↑ {post.upvotes}
                  </div>
                  <div style={styles.downvoteCount}>
                    ↓ {post.downvotes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {posts.length === 0 && (
          <div style={styles.emptyState}>
            <div style={{fontSize: '120px', marginBottom: '32px'}}>💭</div>
            <h3 style={{fontSize: '36px', fontWeight: 'bold', marginBottom: '24px'}}>No posts yet</h3>
            <p style={{fontSize: '24px', color: '#9ca3af'}}>Be the pioneer! Share the first post with the community!</p>
          </div>
        )}
        
        {/* No Tokens Warning */}
        {userTokenBalance === 0 && (
          <div style={styles.noTokensWarning}>
            <span style={{marginRight: '24px', fontSize: '32px'}}>⚠️</span>
            <span>
              Out of tokens! You'll need to acquire more MOD tokens to participate in voting.
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default PostList;