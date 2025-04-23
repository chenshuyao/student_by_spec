import React from 'react';
import Link from 'next/link';
import { Student, getMajorLabel } from '../../src/types/student';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

/**
 * Props for the StudentDetail component.
 */
interface StudentDetailProps {
  student: Student;
}

/**
 * Component to display detailed information about a student.
 */
const StudentDetail: React.FC<StudentDetailProps> = ({ student }) => {
  if (!student) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Details</h1>
        
        <div className="flex space-x-4">
          <Link href="/" className="btn btn-outline">
            <FaArrowLeft className="mr-2" /> Back to List
          </Link>
          <Link href={`/students/edit/${student.id}`} className="btn btn-primary">
            <FaEdit className="mr-2" /> Edit
          </Link>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Basic Information</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.gender || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.age || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Native Place</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.nativePlace || '-'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Information</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.phone || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-base text-gray-900 dark:text-white">{student.email || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Major</p>
                  <p className="text-base text-gray-900 dark:text-white">{getMajorLabel(student.major) || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {student.tag ? (
                      <span className="flex flex-wrap gap-2">
                        {student.tag.split(',').map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </span>
                    ) : (
                      '-'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {student.remark && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Remark</h2>
              <p className="text-base text-gray-900 dark:text-white whitespace-pre-line">{student.remark}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail; 