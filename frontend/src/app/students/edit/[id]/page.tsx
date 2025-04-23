'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../../../components/layout/MainLayout';
import StudentForm from '../../../../../components/student/StudentForm';
import { Student } from '../../../../types/student';
import { getStudentById } from '../../../../api/studentApi';

/**
 * Edit student page component.
 * Provides a form to edit an existing student.
 */
export default function EditStudent() {
  const params = useParams();
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : 0;
  
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError('Failed to load student details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-500">Loading student details...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : student ? (
        <StudentForm student={student} isEdit={true} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Student not found.</p>
        </div>
      )}
    </MainLayout>
  );
} 