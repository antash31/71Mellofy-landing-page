"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { emailAccountsService } from '@/services/api';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch email accounts from API on component mount
  useEffect(() => {
    const fetchEmailAccounts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await emailAccountsService.listSmartleadAccounts();
        
        // Handle the API response structure: { success: true, data: {...} } or { success: true, data: [...] }
        let accounts = [];
        if (response.success && response.data) {
          // Check if data is an array or single object
          if (Array.isArray(response.data)) {
            accounts = response.data;
          } else {
            // Single email account object
            accounts = [response.data];
          }
        }
        
        // Transform the API response to match the expected format
        const transformedAccounts = accounts.map(account => ({
          id: account.id,
          email: account.from_email || account.email_address,
          fromName: account.from_name,
          provider: determineProvider(account.smtp_host),
          isVerified: account.is_smtp_success && account.is_imap_success,
          smtpHost: account.smtp_host,
          smtpPort: account.smtp_port,
          smtpPortType: account.smtp_security || account.smtp_port_type,
          imapHost: account.imap_host,
          imapPort: account.imap_port,
          imapPortType: account.imap_security || account.imap_port_type,
          messagePerDay: account.message_per_day,
          dailySentCount: account.daily_sent_count || 0,
          campaignCount: account.campaign_count || 0,
          createdAt: account.created_at,
          updatedAt: account.updated_at,
        }));
        
        setEmailAccounts(transformedAccounts);
      } catch (err) {
        console.error('Error fetching email accounts:', err);
        setError(err.message || 'Failed to fetch email accounts');
        // Keep existing accounts in case of error, don't clear them
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailAccounts();
  }, []);

  // Helper function to determine email provider
  const determineProvider = (smtpHostOrEmail) => {
    if (!smtpHostOrEmail) return 'Custom';
    
    const host = smtpHostOrEmail.toLowerCase();
    if (host.includes('gmail')) return 'Gmail';
    if (host.includes('outlook') || host.includes('hotmail')) return 'Outlook';
    if (host.includes('yahoo')) return 'Yahoo';
    return 'Custom';
  };

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

  // Refresh email accounts from API
  const refreshEmailAccounts = async () => {
    try {
      setError(null);
      const response = await emailAccountsService.listSmartleadAccounts();
      
      // Handle the API response structure: { success: true, data: {...} } or { success: true, data: [...] }
      let accounts = [];
      if (response.success && response.data) {
        // Check if data is an array or single object
        if (Array.isArray(response.data)) {
          accounts = response.data;
        } else {
          // Single email account object
          accounts = [response.data];
        }
      }
      
      const transformedAccounts = accounts.map(account => ({
        id: account.id,
        email: account.from_email || account.email_address,
        fromName: account.from_name,
        provider: determineProvider(account.smtp_host),
        isVerified: account.is_smtp_success && account.is_imap_success,
        smtpHost: account.smtp_host,
        smtpPort: account.smtp_port,
        smtpPortType: account.smtp_security || account.smtp_port_type,
        imapHost: account.imap_host,
        imapPort: account.imap_port,
        imapPortType: account.imap_security || account.imap_port_type,
        messagePerDay: account.message_per_day,
        dailySentCount: account.daily_sent_count || 0,
        campaignCount: account.campaign_count || 0,
        createdAt: account.created_at,
        updatedAt: account.updated_at,
      }));
      
      setEmailAccounts(transformedAccounts);
      return transformedAccounts;
    } catch (err) {
      console.error('Error refreshing email accounts:', err);
      setError(err.message || 'Failed to refresh email accounts');
      throw err;
    }
  };

  const hasEmailAccounts = emailAccounts.length > 0;

  const value = {
    emailAccounts,
    addEmailAccount,
    removeEmailAccount,
    updateEmailAccount,
    refreshEmailAccounts,
    hasEmailAccounts,
    isLoading,
    error,
  };

  return (
    <EmailAccountsContext.Provider value={value}>
      {children}
    </EmailAccountsContext.Provider>
  );
};
