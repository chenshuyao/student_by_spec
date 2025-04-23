import axios from 'axios';
import { Student, ApiResponse, PaginatedResponse, PageParams } from '../types/student';

// API base URL
const API_URL = '/api/students';

/**
 * Get all students.
 */
export const getAllStudents = async (): Promise<Student[]> => {
  const response = await axios.get<ApiResponse<Student[]>>(API_URL);
  return response.data.data;
};

/**
 * Get all students with pagination.
 * 
 * @param params Pagination parameters
 */
export const getAllStudentsPaged = async (params: PageParams): Promise<PaginatedResponse<Student>> => {
  const { page, size, sort, direction } = params;
  const response = await axios.get<ApiResponse<PaginatedResponse<Student>>>
    (`${API_URL}/page?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return response.data.data;
};

/**
 * Get a student by ID.
 * 
 * @param id Student ID
 */
export const getStudentById = async (id: number): Promise<Student> => {
  const response = await axios.get<ApiResponse<Student>>(`${API_URL}/${id}`);
  return response.data.data;
};

/**
 * Create a new student.
 * 
 * @param student Student data to create
 */
export const createStudent = async (student: Student): Promise<Student> => {
  const response = await axios.post<ApiResponse<Student>>(API_URL, student);
  return response.data.data;
};

/**
 * Update an existing student.
 * 
 * @param id Student ID to update
 * @param student Updated student data
 */
export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const response = await axios.put<ApiResponse<Student>>(`${API_URL}/${id}`, student);
  return response.data.data;
};

/**
 * Delete a student.
 * 
 * @param id Student ID to delete
 */
export const deleteStudent = async (id: number): Promise<boolean> => {
  const response = await axios.delete<ApiResponse<null>>(`${API_URL}/${id}`);
  return response.data.success;
};

/**
 * Search students by term.
 * 
 * @param term Search term
 */
export const searchStudents = async (term: string): Promise<Student[]> => {
  const response = await axios.get<ApiResponse<Student[]>>(`${API_URL}/search?term=${term}`);
  return response.data.data;
};

/**
 * Search students by term with pagination.
 * 
 * @param term Search term
 * @param params Pagination parameters
 */
export const searchStudentsPaged = async (term: string, params: PageParams): Promise<PaginatedResponse<Student>> => {
  const { page, size, sort, direction } = params;
  const response = await axios.get<ApiResponse<PaginatedResponse<Student>>>
    (`${API_URL}/search/page?term=${term}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return response.data.data;
};

/**
 * Find students by name.
 * 
 * @param name Name to search for
 */
export const findStudentsByName = async (name: string): Promise<Student[]> => {
  const response = await axios.get<ApiResponse<Student[]>>(`${API_URL}/by-name?name=${name}`);
  return response.data.data;
};

/**
 * Find students by name with pagination.
 * 
 * @param name Name to search for
 * @param params Pagination parameters
 */
export const findStudentsByNamePaged = async (name: string, params: PageParams): Promise<PaginatedResponse<Student>> => {
  const { page, size, sort, direction } = params;
  const response = await axios.get<ApiResponse<PaginatedResponse<Student>>>
    (`${API_URL}/by-name/page?name=${name}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return response.data.data;
};

/**
 * Find students by phone.
 * 
 * @param phone Phone number to search for
 */
export const findStudentsByPhone = async (phone: string): Promise<Student[]> => {
  const response = await axios.get<ApiResponse<Student[]>>(`${API_URL}/by-phone?phone=${phone}`);
  return response.data.data;
};

/**
 * Find students by phone with pagination.
 * 
 * @param phone Phone number to search for
 * @param params Pagination parameters
 */
export const findStudentsByPhonePaged = async (phone: string, params: PageParams): Promise<PaginatedResponse<Student>> => {
  const { page, size, sort, direction } = params;
  const response = await axios.get<ApiResponse<PaginatedResponse<Student>>>
    (`${API_URL}/by-phone/page?phone=${phone}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return response.data.data;
}; 