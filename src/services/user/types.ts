export type UserDateTime = string;

export interface UserResponse {
  additional_iterations_left: number;
  current_instance_id: string;
  current_interval: number;
  current_questionnaire_id: string;
  due_date: UserDateTime;
  firstTime: boolean;
  pushAppGUID: string;
  pushClientSecret: string;
  recipient_certificate_pem_string: string;
  start_date: UserDateTime;
  subjectId: string;
}

export interface IUserService {
  fetch(id: string): Promise<UserResponse>;
  populateStore(refresh?: boolean): Promise<void>;
  refresh(): Promise<void>;
}
