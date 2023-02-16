export interface Bulletin {
  bulletin_id: number;
  school_id: number;
  sport_gender_level: string;
  title: string;
  body: string;
  url: string;
  front_page: boolean;
  urgent: boolean;
  urgent_until: string;
  created_at: string;
}
