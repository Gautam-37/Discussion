# Discussion Board with Token-Based Moderation Smart Contract

## Project Description

This project implements a decentralized discussion board platform using Clarity smart contracts on the Stacks blockchain. The platform enables community-driven content moderation through a token-based governance system where users earn tokens for participation and use these tokens to vote on content moderation decisions.

The smart contract features two core functions:
1. **`create-post`** - Allows users to create posts and earn governance tokens
2. **`moderate-post`** - Enables token holders to vote on post moderation with community consensus

Users are rewarded with "Discussion Tokens" (DISC) for creating quality content and participating in moderation activities. The platform operates on democratic principles where community members collectively decide which content should remain visible based on token-weighted voting.

## Project Vision

Our vision is to create a truly decentralized social platform where:

- **Community Ownership**: Users collectively own and govern the platform through token holdings
- **Democratic Moderation**: Content moderation decisions are made by the community, not centralized authorities
- **Incentivized Participation**: Quality contributors are rewarded with governance tokens that increase their influence
- **Transparent Governance**: All moderation actions and decisions are recorded on the blockchain for full transparency
- **Censorship Resistance**: No single entity can unilaterally remove content or ban users
- **Economic Sustainability**: Token rewards create a self-sustaining ecosystem that incentivizes positive behavior

The platform aims to solve the problems of centralized social media platforms including biased moderation, lack of user ownership, and opaque decision-making processes.

## Future Scope

### Phase 1 Enhancements
- **User Reputation System**: Implement reputation scores based on community feedback
- **Post Categories**: Add categorization and tagging system for better content organization
- **Advanced Voting Mechanisms**: Implement quadratic voting to prevent whale manipulation
- **Comment System**: Allow nested comments and replies with token rewards

### Phase 2 Features
- **NFT Integration**: Issue NFTs for high-quality posts and achievements
- **Staking Mechanism**: Allow users to stake tokens for enhanced voting power
- **Community Treasuries**: Enable communities to manage their own token pools
- **Cross-Chain Integration**: Expand to other blockchain networks

### Phase 3 Advanced Features
- **AI-Assisted Moderation**: Integrate AI tools to help identify potential issues before community voting
- **Governance Proposals**: Allow token holders to propose and vote on platform upgrades
- **Revenue Sharing**: Implement advertising revenue sharing with token holders
- **Mobile DApp**: Develop mobile applications for better user experience

### Long-term Vision
- **DAO Governance**: Transform into a fully decentralized autonomous organization
- **Plugin Architecture**: Allow third-party developers to create extensions
- **Inter-platform Communication**: Enable communication with other decentralized social platforms
- **Educational Integration**: Partner with educational institutions for academic discussions

## Technical Roadmap
- **Smart Contract Auditing**: Professional security audits before mainnet deployment
- **Layer 2 Integration**: Implement scaling solutions for reduced transaction costs
- **IPFS Integration**: Store post content on IPFS for decentralized storage
- **Oracle Integration**: Connect with external data sources for enhanced functionality

## Contract Address

**Testnet Deployment**: `ST28G9AV4ECEXEJX9WXXXYWT178WVTAFRTGD04FC1.Board`
<img width="932" height="766" alt="Screenshot 2025-07-27 221324" src="https://github.com/user-attachments/assets/dd09e1f2-c7fc-4089-87b9-e1d3e5602500" />


**Mainnet Deployment**: *Coming Soon*

### Contract Functions

#### Core Functions
- `create-post(content-hash)` - Create a new post and earn 10 DISC tokens
- `moderate-post(post-id, should-remove)` - Vote on post moderation (requires 100+ DISC tokens)
- <img width="907" height="811" alt="Screenshot 2025-07-27 222907" src="https://github.com/user-attachments/assets/5992a7e5-b005-4c9a-9c31-580cb8ef54d4" />


#### Read-Only Functions
- `get-post(post-id)` - Retrieve post details
- `get-user-tokens(user)` - Check user's token balance
- `get-total-posts()` - Get total number of posts created
- `get-moderation-requirement()` - Get minimum tokens needed for moderation
- `has-user-voted(post-id, user)` - Check if user has voted on a specific post

#### Admin Functions
- `initialize()` - Initialize contract with owner tokens (owner only)

### Token Economics
- **Token Symbol**: DISC (Discussion Token)
- **Initial Supply**: 1,000,000 tokens
- **Post Creation Reward**: 10 DISC tokens
- **Moderation Participation Reward**: 5 DISC tokens
- **Minimum Tokens for Moderation**: 100 DISC tokens
- **Moderation Threshold**: 5 votes to remove a post

### Getting Started

1. **Deploy Contract**: Deploy the smart contract to Stacks testnet
2. **Initialize**: Call the `initialize()` function (owner only)
3. **Create Posts**: Users can call `create-post()` with content hash
4. **Moderate Content**: Token holders can call `moderate-post()` to vote on content
5. **Track Progress**: Use read-only functions to monitor platform activity

### Integration Guide

```javascript
// Example integration with Stacks.js
import { makeContractCall, broadcastTransaction } from '@stacks/transactions';

// Create a new post
const createPost = async (contentHash, privateKey) => {
  const txOptions = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'discussion-board-v1',
    functionName: 'create-post',
    functionArgs: [stringAsciiCV(contentHash)],
    senderKey: privateKey,
    network: new StacksTestnet()
  };
  
  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, network);
};
```

### Community Participation

We encourage community involvement in:
- **Testing**: Help test the platform on testnet
- **Governance**: Participate in token-based decision making
- **Development**: Contribute to open-source development
- **Moderation**: Help maintain quality content through democratic voting

---

**Built for the community, governed by the community. Welcome to the future of decentralized social media.**
