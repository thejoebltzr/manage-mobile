import {AxiosResponse} from 'axios';

export type LoginResponse = AxiosResponse<{
  user_id: number;
  school: string;
  level: string;
  team_ids: number[];
}>;
