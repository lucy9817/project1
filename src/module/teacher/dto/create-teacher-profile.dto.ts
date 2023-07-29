import { IsString, IsNumber, IsEnum } from 'class-validator';

// 성별 열거형
enum Gender {
  MALE = '남성',
  FEMALE = '여성',
}

export class CreateTeacherProfileDto {
  @IsString()
  childname: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  age: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  distance: number;

  @IsString()
  phonenumber: string;

  @IsString()
  place: string;
}
