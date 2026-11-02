"use client";

import { useEffect } from "react";

export const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = `BookNook | ${title}`;
  }, [title]);

  return null;
};