import {AxiosResponse} from 'axios';

export interface PostResult {
  date: string;
  time: string;
  status: string;
  title: string;
  school: string;
}

export interface PostResultEventDetails {
  outcome: string;
  score: string;
  opponent_score: string;
  story: string;
  created_at: string;
}

export interface PostResultForm {
  event_id: number;
  subdomain?: string;
  score: string;
  opponent_score: string;
  title: string;
  outcome: string;
  show_front_page: boolean;
  story: string;
  created_by: number;
}

export interface PostResultEvent {
  event_details: PostResultEventDetails;
}

export type PostResultResponse = AxiosResponse<PostResultEvent>;
