/* eslint-disable no-undef */
import {Given, setDefaultTimeout} from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);

Given('I am a parent', async () => {
  await element(by.id('parent-button')).tap();
});
