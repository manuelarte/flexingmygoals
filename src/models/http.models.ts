import { ValidationException } from '@/models/validation.model'

export interface PageResponse<Type> {
  /** The response data */
  content: Array<Type>
  /** The page metadata */
  page: PageMetadata
}

export interface PageMetadata {
  /** The current page number */
  number: number
  /** The number of items per page */
  size: number
  /** The total number of items */
  totalElements: number
  /** The total number of pages */
  totalPages: number
}

export interface ErrorResponse {
  code: number
  message: string
}

export class PageRequest {
  private readonly _page: number
  private readonly _size: number

  constructor (page: number, size: number) {
    if (page < 0) {
      throw new ValidationException('Page must be greater than or equal to 0')
    }
    if (size < 0) {
      throw new ValidationException('Size must be greater than or equal to 0')
    }
    this._page = page
    this._size = size
  }

  get page (): number {
    return this._page
  }

  get size (): number {
    return this._size
  }
}
