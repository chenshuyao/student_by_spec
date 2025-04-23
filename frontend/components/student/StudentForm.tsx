import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Student, MAJOR_OPTIONS } from '../../src/types/student';
import { createStudent, updateStudent } from '../../src/api/studentApi';

/**
 * Props for the StudentForm component.
 */
interface StudentFormProps {
  student?: Student;  // If provided, we're editing an existing student
  isEdit?: boolean;   // Flag to indicate if this is an edit operation
}

/**
 * Form component for creating or editing a student.
 */
const StudentForm: React.FC<StudentFormProps> = ({ student, isEdit = false }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize form with either provided student data or empty values
  const { register, handleSubmit, formState: { errors } } = useForm<Student>({
    defaultValues: student || {
      name: '',
      gender: '',
      phone: '',
      age: undefined,
      nativePlace: '',
      major: '',
      email: '',
      tag: '',
      remark: ''
    }
  });

  /**
   * Handle form submission.
   */
  const onSubmit = async (data: Student) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      if (isEdit && student?.id) {
        // Update existing student
        await updateStudent(student.id, data);
      } else {
        // Create new student
        await createStudent(data);
      }
      
      // Navigate back to student list
      router.push('/');
    } catch (err) {
      console.error('Error saving student:', err);
      setError('Failed to save student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {isEdit ? 'Edit Student' : 'Add New Student'}
      </h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { 
                required: 'Name is required',
                maxLength: { value: 64, message: 'Name must be less than 64 characters' }
              })}
              className={`input w-full ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          
          {/* Gender - Now Required */}
          <div>
            <label htmlFor="gender" className="label">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className={`input w-full ${errors.gender ? 'border-red-500' : ''}`}
            >
              <option value="">Select Gender</option>
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
          </div>
          
          {/* Phone - Now Required */}
          <div>
            <label htmlFor="phone" className="label">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="text"
              {...register('phone', {
                required: 'Phone is required',
                pattern: { value: /^[0-9]*$/, message: 'Phone must contain only digits' },
                maxLength: { value: 16, message: 'Phone must be less than 16 characters' }
              })}
              className={`input w-full ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          
          {/* Age - Now Required */}
          <div>
            <label htmlFor="age" className="label">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              id="age"
              type="number"
              min="0"
              max="150"
              {...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Age must be positive' },
                max: { value: 150, message: 'Age cannot exceed 150' }
              })}
              className={`input w-full ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
          </div>
          
          {/* Native Place */}
          <div>
            <label htmlFor="nativePlace" className="label">Native Place</label>
            <input
              id="nativePlace"
              type="text"
              {...register('nativePlace', {
                maxLength: { value: 64, message: 'Native place must be less than 64 characters' }
              })}
              className={`input w-full ${errors.nativePlace ? 'border-red-500' : ''}`}
            />
            {errors.nativePlace && <p className="mt-1 text-sm text-red-600">{errors.nativePlace.message}</p>}
          </div>
          
          {/* Major - Changed to Select and Required */}
          <div>
            <label htmlFor="major" className="label">
              Major <span className="text-red-500">*</span>
            </label>
            <select
              id="major"
              {...register('major', { required: 'Major is required' })}
              className={`input w-full ${errors.major ? 'border-red-500' : ''}`}
            >
              <option value="">Select Major</option>
              {MAJOR_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.major && <p className="mt-1 text-sm text-red-600">{errors.major.message}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' },
                maxLength: { value: 32, message: 'Email must be less than 32 characters' }
              })}
              className={`input w-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          
          {/* Tag */}
          <div>
            <label htmlFor="tag" className="label">Tags</label>
            <input
              id="tag"
              type="text"
              placeholder="Comma separated tags"
              {...register('tag', {
                maxLength: { value: 512, message: 'Tags must be less than 512 characters' }
              })}
              className={`input w-full ${errors.tag ? 'border-red-500' : ''}`}
            />
            {errors.tag && <p className="mt-1 text-sm text-red-600">{errors.tag.message}</p>}
          </div>
        </div>
        
        {/* Remark (full width) */}
        <div>
          <label htmlFor="remark" className="label">Remarks</label>
          <textarea
            id="remark"
            {...register('remark', {
              maxLength: { value: 512, message: 'Remarks must be less than 512 characters' }
            })}
            rows={4}
            className={`input w-full ${errors.remark ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.remark && <p className="mt-1 text-sm text-red-600">{errors.remark.message}</p>}
        </div>
        
        {/* Form actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Student' : 'Create Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm; 