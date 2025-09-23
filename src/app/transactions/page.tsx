"use client";

import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import TransactionHistory from '@/components/TransactionHistory';

export default function TransactionsPage() {
  return (
    <ContentLayout>
      <TransactionHistory isPreview={false} />
    </ContentLayout>
  );
}