'use client';

import React from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import StudentForm from '../../../../components/student/StudentForm';

/**
 * Create student page component.
 * Provides a form to add a new student.
 */
export default function CreateStudent() {
  return (
    <MainLayout>
      <StudentForm />
    </MainLayout>
  );
} 