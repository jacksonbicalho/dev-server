import fetchMock from 'jest-fetch-mock';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMock.enableMocks();
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();
