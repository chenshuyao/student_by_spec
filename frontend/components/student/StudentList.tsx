import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Student, PageParams, PaginatedResponse, getMajorLabel } from '../../src/types/student';
import { searchStudentsPaged, deleteStudent } from '../../src/api/studentApi';
import { FaEdit, FaTrash, FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Component to display a list of students with search functionality.
 */
const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Pagination state
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    size: number;
  }>({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    size: 10
  });

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, [pagination.currentPage]); // Refetch when page changes

  /**
   * Fetch students from the API, optionally filtered by search term.
   */
  const fetchStudents = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const pageParams: PageParams = {
        page: pagination.currentPage,
        size: pagination.size,
        sort: 'name',
        direction: 'ASC'
      };
      
      const data = await searchStudentsPaged(searchTerm, pageParams);
      setStudents(data.content);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        size: data.size
      });
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle search form submission.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to first page when searching
    setPagination(prev => ({ ...prev, currentPage: 0 }));
    fetchStudents();
  };

  /**
   * Handle page change
   */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  /**
   * Handle student deletion.
   */
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }
    
    try {
      await deleteStudent(id);
      // Update the student list after deletion
      fetchStudents(); // Refetch to get updated pagination
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student. Please try again later.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student List</h1>
        
        <Link href="/students/create" className="btn btn-primary">
          Add New Student
        </Link>
      </div>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary whitespace-nowrap">
          Search
        </button>
      </form>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-500">Loading students...</p>
        </div>
      )}
      
      {/* Student list */}
      {!isLoading && students.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No students found. Try adjusting your search or add a new student.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Major
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {getMajorLabel(student.major)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/students/${student.id}`} className="text-primary-600 hover:text-primary-800">
                          <FaEye size={18} />
                        </Link>
                        <Link href={`/students/edit/${student.id}`} className="text-yellow-600 hover:text-yellow-800">
                          <FaEdit size={18} />
                        </Link>
                        <button onClick={() => student.id && handleDelete(student.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination controls */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{pagination.currentPage * pagination.size + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min((pagination.currentPage + 1) * pagination.size, pagination.totalItems)}
                </span>{" "}
                of <span className="font-medium">{pagination.totalItems}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 0}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>
                {/* Page numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    // For simplicity, show at most 5 pages
                    // Create a window of pages around the current page
                    let pageToShow = i;
                    if (pagination.currentPage > 2) {
                      pageToShow = pagination.currentPage - 2 + i;
                    }
                    if (pageToShow >= pagination.totalPages) return null;
                    
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => handlePageChange(pageToShow)}
                        className={`px-3 py-1 rounded-md font-medium ${
                          pageToShow === pagination.currentPage
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageToShow + 1}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages - 1}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentList; 