export class PageResponse<Type> {
  private readonly _page: number
  private readonly _size: number
  private readonly _totalPages: number
  private readonly _totalElements: number
  private readonly _data: Array<Type>

  constructor (page: number, size: number, totalPages: number, totalElements: number, data: Array<Type>) {
    this._page = page
    this._size = size
    this._totalPages = totalPages
    this._totalElements = totalElements
    this._data = [...data]
  }

  get page (): number {
    return this._page
  }

  get size (): number {
    return this._size
  }

  get totalPages (): number {
    return this._totalPages
  }

  get totalElements (): number {
    return this._totalElements
  }

  get data (): Array<Type> {
    return this._data
  }
}

export class ErrorResponse {
  private readonly _code: number
  private readonly _message: string

  constructor (code: number, message: string) {
    this._code = code
    this._message = message
  }

  get code (): number {
    return this._code
  }

  get message (): string {
    return this._message
  }
}
