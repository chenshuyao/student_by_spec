'use client';

import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import StudentList from '../../components/student/StudentList';

/**
 * Home page component.
 * Displays the list of students.
 */
export default function Home() {
  return (
    <MainLayout>
      <StudentList />
    </MainLayout>
  );
} 