import { IUserService } from './types';

export default class MockUser implements IUserService {
  async fetch(id: string) {
    return {
      additional_iterations_left: 0,
      current_instance_id: 'instance-foo-bar',
      current_interval: 1,
      current_questionnaire_id: 'questionnaire-foo-bar',
      due_date: '2099-01-01T16:00:00.000Z',
      firstTime: false,
      pushAppGUID: '',
      pushClientSecret: '',
      recipient_certificate_pem_string: 'false',
      start_date: '2099-01-01T04:00:00.000Z',
      subjectId: id,
    };
  }

  async populateStore() {}
  async refresh() {}
}
