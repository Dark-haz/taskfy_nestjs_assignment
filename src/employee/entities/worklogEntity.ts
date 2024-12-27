import {  Expose} from 'class-transformer'

export class WorkLogEntity {
    @Expose() id?: number;
    @Expose() employee_id: number;
    @Expose() project_id: number;
    @Expose() hours_logged: number;
    @Expose() log_date: Date;
  }
    