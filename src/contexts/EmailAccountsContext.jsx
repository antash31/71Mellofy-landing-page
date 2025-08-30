"use client";
import React, { createContext, useContext, useState } from 'react';

const EmailAccountsContext = createContext();

export const useEmailAccounts = () => {
  const context = useContext(EmailAccountsContext);
  if (!context) {
    throw new Error('useEmailAccounts must be used within an EmailAccountsProvider');
  }
  return context;
};

export const EmailAccountsProvider = ({ children }) => {
  const [emailAccounts, setEmailAccounts] = useState([]);

  const addEmailAccount = (account) => {
    setEmailAccounts(prev => [...prev, account]);
  };

  const removeEmailAccount = (accountId) => {
    setEmailAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  const updateEmailAccount = (accountId, updatedAccount) => {
    setEmailAccounts(prev => 
      prev.map(account => 
        account.id === accountId ? { ...account, ...updatedAccount } : account
      )
    );
  };

  const hasEmailAccounts = emailAccounts.length > 0;

  const value = {
    emailAccounts,
    addEmailAccount,
    removeEmailAccount,
    updateEmailAccount,
    hasEmailAccounts,
  };

  return (
    <EmailAccountsContext.Provider value={value}>
      {children}
    </EmailAccountsContext.Provider>
  );
};
