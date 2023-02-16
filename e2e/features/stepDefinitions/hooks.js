/* eslint-disable no-undef */
import {Before, AfterAll, BeforeAll} from '@cucumber/cucumber';
import {init, cleanup} from 'detox';

BeforeAll({timeout: 60 * 1000}, async () => {
  await init('ios');
  await device.launchApp({newInstance: true});
});
Before(async () => {
  await device.reloadReactNative();
});
AfterAll(async () => {
  await cleanup();
});
