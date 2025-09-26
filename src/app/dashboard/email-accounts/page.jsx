"use client";
import React, { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import AddEmailModal from "@/components/email-accounts/AddEmailModal";
import { campaignService } from "@/services/api";
import { useEmailAccounts } from '@/hooks/useEmailAccounts';
import { useSelector } from 'react-redux';
import PageHeader from '@/components/email-accounts/PageHeader';
import LoadingState from '@/components/email-accounts/LoadingState';
import ErrorState from '@/components/email-accounts/ErrorState';
import EmptyState from '@/components/email-accounts/EmptyState';
import EmailAccountCard from '@/components/email-accounts/EmailAccountCard';
import { toast } from 'sonner';

const EmailAccountsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mailboxStats, setMailboxStats] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const { addEmailAccount, removeEmailAccount, refreshEmailAccounts } = useEmailAccounts();
  const emailAccounts = useSelector((state) => state.auth.emailAccounts);
  const isLoading = useSelector((state) => state.auth.isLoadingEmailAccounts);
  const error = useSelector((state) => state.auth.errorEmailAccounts);
  const isCampaignPresent = useSelector((state) => state.auth.doesCampaignExist);
  const handleAddEmail = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleEmailAdded = (newEmail) => addEmailAccount(newEmail);
  const handleDeleteEmail = (emailId) => {
    if (confirm("Are you sure you want to delete this email account?")) removeEmailAccount(emailId);
  };

  const fetchMailboxStats = async () => {
    try {
      setIsLoadingStats(true);
      setStatsError(null);
      const response = await campaignService.getCampaignMailboxStatistics();
      setMailboxStats(response.mailbox_statistics.data || []);
    } catch (err) {
      setStatsError(err.message || 'Failed to fetch mailbox statistics');
      toast.error(err.message || 'Failed to fetch mailbox statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!isLoading && emailAccounts.length > 0 && isCampaignPresent) fetchMailboxStats();
  }, [isLoading, emailAccounts.length]);

  const handleRefreshAccounts = async () => {
    try {
      setIsRefreshing(true);
      await refreshEmailAccounts();
      if (emailAccounts.length > 0) await fetchMailboxStats();
    } catch (err) {
      toast.error(err.message || 'Failed to refresh email accounts');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getAccountStats = (accountEmail) => mailboxStats.find(stat => stat.from_email === accountEmail);

  return (
    <div className="space-y-6">
      <PageHeader 
        onAddEmail={handleAddEmail} 
        onRefresh={handleRefreshAccounts} 
        isRefreshing={isRefreshing} 
        isLoading={isLoading} 
      />
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRefresh={handleRefreshAccounts} isRefreshing={isRefreshing} />
      ) : emailAccounts.length === 0 ? (
        <EmptyState onAddEmail={handleAddEmail} />
      ) : (
        <div className="grid gap-6">
          {emailAccounts.map((account) => (
            <EmailAccountCard 
              key={account.id} 
              account={account} 
              stats={getAccountStats(account.email_address)} 
              isLoadingStats={isLoadingStats} 
              statsError={statsError} 
              onDelete={handleDeleteEmail} 
            />
          ))}
        </div>
      )}
      <AddEmailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onEmailAdded={handleEmailAdded}
      />
    </div>
  );
};

export default EmailAccountsPage;
