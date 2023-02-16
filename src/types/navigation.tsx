import type {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';

import {Event} from './event';
import {PostResultForm} from './postResult';

/**
 * List of screen names for navigation
 * to avoid typos in using string literals
 */
export const enum ScreenNames {
  Home = 'Home',
  Login = 'Login',
  AllSchools = 'All Schools',
  MySchools = 'My Schools',
  Teams = 'Teams',
  Events = 'Events',
  TeamEvents = 'Team Events',
  EventDetails = 'Event Details',
  EventStack = 'Event Stack',
  EventSchedule = 'Event Schedule',
  EventResults = 'Event Results',
  Roster = 'Team Roster',
  TeamNews = 'Team News',
  MyCalendar = 'My Calendar',
  Settings = 'Settings',
  SettingsStack = 'Settings Stack',
  Splash = 'Splash',
  PostResultStack = 'Post Result Stack',
  PostResults = 'Post Results',
  SchoolInfo = 'School Info',
  AnnouncementStack = 'Announcement Stack',
  Announcements = 'Announcements',
  AnnouncementDetails = 'Announcement Details',
  PostResultDetails = 'Post Result Details',
  SchoolStack = 'School Stack',
  PhotoGallery = 'Photo Gallery',
  PhotoStack = 'Photo Stack',
  PostResultDetailsConfirmation = 'Post Result Details Confirmation',
}

/**
 * Used for DrawerProps in listing possible screens
 * add more screens and props if necessary
 * undefined can be replaced by an object
 * representing route parameters
 */
export type ScreenParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.AllSchools]: undefined;
  [ScreenNames.MySchools]: undefined;
  [ScreenNames.Login]: undefined;
  [ScreenNames.Teams]: undefined;
  [ScreenNames.Events]: undefined;
  [ScreenNames.TeamEvents]?: {teamId?: number};
  [ScreenNames.EventDetails]: {event: Event};
  [ScreenNames.EventStack]: undefined;
  [ScreenNames.EventSchedule]: undefined;
  [ScreenNames.EventResults]: undefined;
  [ScreenNames.Roster]: undefined;
  [ScreenNames.TeamNews]: undefined;
  [ScreenNames.MyCalendar]: undefined;
  [ScreenNames.SchoolInfo]: undefined;
  [ScreenNames.Settings]: undefined;
  [ScreenNames.SettingsStack]: undefined;
  [ScreenNames.Splash]: undefined;
  [ScreenNames.PostResults]: undefined;
  [ScreenNames.Announcements]: undefined;
  [ScreenNames.AnnouncementStack]: undefined;
  [ScreenNames.AnnouncementDetails]: {url: string};
  [ScreenNames.PostResultDetails]: {event: Event};
  [ScreenNames.PostResultStack]: undefined;
  [ScreenNames.SchoolStack]: {screen?: ScreenNames};
  [ScreenNames.PhotoGallery]: {teamId?: number};
  [ScreenNames.PhotoStack]: undefined;
  [ScreenNames.PostResultDetailsConfirmation]: {postResult: PostResultForm};
};

/**
 * Used for SideBar type
 * can be combined using CompositeProp
 * https://reactnavigation.org/docs/typescript/#combining-navigation-props
 */
export type DrawerProps = DrawerNavigationProp<
  ScreenParamList,
  ScreenNames.Home
>;

export type RouteProps = RouteProp<ScreenParamList, ScreenNames.Home>;
