import {  Expose} from 'class-transformer'

export class AvailabilityEntity {
  @Expose() id?: number;  
  @Expose() employee_id: number;
  @Expose() date: Date;
  @Expose() start_time: Date;
  @Expose() end_time: Date;
}