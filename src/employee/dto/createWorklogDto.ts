import { IsInt, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkLogDto {
  @IsInt()
  @IsNotEmpty()
  employee_id: number;

  @IsInt()
  @IsNotEmpty()
  project_id: number;

  @IsNumber()
  @IsNotEmpty()
  hours_logged: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  log_date: Date;
}
