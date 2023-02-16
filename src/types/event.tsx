export interface Event {
  event_id: number;
  event_date: string;
  start_time: string;
  end_time?: any;
  description?: any;
  season: string;
  location: string;
  place: string;
  opponent: string;
  kind: string;
  team_id: number;
  url: string;
  short_name: string;
  results: Result[];
  cancellation_status: boolean;
  conference: boolean;
}

export interface Result {
  outcome: 'W' | 'L' | 'T';
  score: string;
  opponent_score: string;
  story: string;
  created_at: string;
}

export interface TeamEventHeader {
  team_id: number;
  name: string;
  type: 'header' | 'content';
}
