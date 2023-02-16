import {Then, setDefaultTimeout} from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);

Then('I should see {int} items in {string}', async n => {});
