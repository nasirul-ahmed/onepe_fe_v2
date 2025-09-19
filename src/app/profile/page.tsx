"use client";

import ContentLayout from "@/components/ContentLayout";
import { useAppStore } from "@/store/app-store";
import React from "react";

const Profile = () => {
  const { setLoading } = useAppStore();
  React.useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 1000);

    return () => timer && clearTimeout(timer);
  }, []);
  return (
    <ContentLayout>
      <h1>Profile</h1>
    </ContentLayout>
  );
};

export default Profile;
