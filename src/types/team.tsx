import {AxiosResponse} from 'axios';

import {Meta} from './meta';
import {RosterMember} from './roster';

export interface Teams {
  objects?: Team[] | null;
  meta: Meta;
}

export interface Team {
  team_id: number;
  year: string;
  sport: string;
  gender: string;
  level: string;
  sport_gender_level: string;
  roster: RosterMember[];
}

export interface SelectedTeam extends Team {
  school_id?: number;
}

export interface TeamSection {
  [key: string]: Team[];
}

export type TeamsResponse = AxiosResponse<Teams>;
