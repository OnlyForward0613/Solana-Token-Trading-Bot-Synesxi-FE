import { gql } from '@apollo/client';

export const GET_INITIAL_TOKENS = gql`
  query GetInitialTokens {
    tokens(mode: INITIAL_LOAD) {
      address
      name
      symbol
      price
      priceChange24h
      liquidity
    }
  }
`;

export const SEARCH_TOKENS = gql`
  query SearchTokens($search: String!) {
    tokens(search: $search, mode: SEARCH) {
      address
      name
      symbol
      price
      priceChange24h
      liquidity
    }
  }
`;

export const GET_TOKENS = gql`
  query GetTokens($search: String, $limit: Int, $offset: Int) {
    tokens(search: $search, limit: $limit, offset: $offset) {
      address
      name
      symbol
      price
      priceChange24h
      liquidity
    }
  }
`;

export const GET_TOKEN = gql`
  query GetToken($address: String!) {
    token(address: $address) {
      id
      name
      symbol
      price
      priceChange24h
      minBuyAmount
      maxSellAmount
      balance
      priceImpact
    }
  }
`;

export const SIMULATE_TRADE = gql`
  mutation SimulateTrade(
    $tokenAddress: String!
    $amount: Float!
    $isBuy: Boolean!
    $slippage: Float!
  ) {
    simulateTrade(
      tokenAddress: $tokenAddress
      amount: $amount
      isBuy: $isBuy
      slippage: $slippage
    )
  }
`;

export const EXECUTE_TRADE = gql`
  mutation ExecuteTrade(
    $tokenAddress: String!
    $amount: Float!
    $isBuy: Boolean!
    $slippage: Float!
  ) {
    executeTrade(
      tokenAddress: $tokenAddress
      amount: $amount
      isBuy: $isBuy
      slippage: $slippage
    ) {
      success
      hash
      amountReceived
      gasUsed
    }
  }
`;
