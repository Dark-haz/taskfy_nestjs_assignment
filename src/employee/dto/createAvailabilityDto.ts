import { Type } from 'class-transformer';
import { IsInt, IsDate, IsNotEmpty, Matches } from 'class-validator';

export class CreateAvailabilityDto {
  //! get from JWT instead
  // @IsInt()
  // @IsNotEmpty()
  // employee_id: number;

  // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) 
  date: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) 
  // @Matches(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'Time must be in HH:mm or HH:mm:ss format' })
  start_time: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) 
  // @Matches(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'Time must be in HH:mm or HH:mm:ss format' })
  end_time: Date;

}
