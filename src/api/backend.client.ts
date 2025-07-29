import type { AxiosInstance } from 'axios'
import type { BoardAction } from '@/models/board.action.model'
import axios from 'axios'
import { SavedExample1, SavedExample2, SavedExample3 } from '@/models/board.example'
import { PageResponse } from '@/models/http.models'

export interface ApiClient {
  get: (page: number, size: number) => Promise<PageResponse<BoardAction>>
}

export function createApiClient (baseURL: string, isMock = false): ApiClient {
  return isMock ? new MockClient() : new HttpClient(baseURL)
}

export class HttpClient implements ApiClient {
  private client: AxiosInstance

  constructor (baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async get (page: number, size: number): Promise<PageResponse<BoardAction>> {
    const response = await this.client.get<PageResponse<BoardAction>>('actions', { params: { page, size } })
    return response.data
  }
}

export class MockClient implements ApiClient {
  private mockData: Array<BoardAction> = [
    SavedExample1, SavedExample2, SavedExample3, // TestingLimits,
  ]

  async get (page: number, size: number): Promise<PageResponse<BoardAction>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return new PageResponse(page, size, Math.ceil(this.mockData.length / size), this.mockData.length, this.mockData.slice(page * size, size * (1 + page)))
  }
}
