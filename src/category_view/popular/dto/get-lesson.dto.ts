export class GetLessonsDto {
    readonly page?: number;
    readonly limit?: number;
    readonly search?: string;
    readonly sortBy?: string;
    readonly sortOrder?: 'asc' | 'desc';
  }
  