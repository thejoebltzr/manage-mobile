import {AxiosResponse} from 'axios';

import {Meta} from './meta';

export interface Schools {
  objects?: School[] | null;
  meta: Meta;
}
export interface School {
  school_id: number;
  subdomain?: string;
  name: string;
  address?: string;
  city: string;
  state: string;
  zip?: string;
  phone?: string;
  fax?: string;
  latitude: number;
  longitude: number;
  mascot?: string;
  motto?: string;
  url: string;
  color1: string;
  color2: string;
  facebook_url?: string;
  twitter_url?: string;
  color_icon: string;
  color_primary_text: string;
  color_secondary_text: string;
  color_slide_menu: string;
  color_slide_menu_text: string;
  color_theme: string;
  ad_school: boolean;
  enrollment?: any;
  pricing_tier?: any;
  kind?: string;
  vnn: boolean;
}

export interface SchoolSection {
  [key: string]: School[];
}

export interface SectionHeader {
  type: 'header' | 'content';
  name: string;
}

export type SchoolsResponse = AxiosResponse<Schools>;
