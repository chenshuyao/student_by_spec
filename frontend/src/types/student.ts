/**
 * Interface representing a student in the system.
 */
export interface Student {
  id?: number;
  userId?: number;
  name: string;
  gender?: string;
  phone?: string;
  age?: number;
  nativePlace?: string;
  major?: string;
  email?: string;
  tag?: string;
  remark?: string;
  creator?: number;
}

/**
 * 专业选项类型定义
 */
export interface MajorOption {
  value: string;
  label: string;
}

/**
 * 专业选项列表
 */
export const MAJOR_OPTIONS: MajorOption[] = [
  { value: '1', label: '计算机' },
  { value: '2', label: '土木工程' },
  { value: '3', label: '理学院' },
  { value: '4', label: '工商管理' },
  { value: '5', label: '电子信息' },
  { value: '6', label: '自动化' },
];

/**
 * 根据专业value值获取对应的中文名称
 * @param value 专业的数字值
 * @returns 对应的专业中文名称，如果未找到则返回原始值
 */
export const getMajorLabel = (value?: string): string => {
  if (!value) return '';
  const option = MAJOR_OPTIONS.find(opt => opt.value === value);
  return option ? option.label : value;
};

/**
 * Interface for API responses containing student data.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Interface for pagination parameters.
 */
export interface PageParams {
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}

/**
 * Interface for paginated response data.
 */
export interface PaginatedResponse<T> {
  content: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
} 