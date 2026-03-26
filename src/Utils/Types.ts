import type { PageName } from './Constants';

export interface INavItem {
  title: string;
  link: string;
  icon: string;
  iconActive: string;
  pageName: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IFileUploadResponse {
  fileName: string;
  url: string;
  shortUrl: string;
  fileExtension: string;
  thumbnail: any;
}
