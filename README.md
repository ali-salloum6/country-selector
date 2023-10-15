# iYield Frontend Coding Challenge

This coding challenge is for the iYield Frontend Developer position. If you have not
applied for this job you can do so at https://iyield.bamboohr.com/careers.

To submit your solution to this challenge:
1. Download the code in this repo and make any changes needed to complete the task below.
2. Push your code to a **private** GitHub repository.
3. Add the user `iYieldCrypto` as a collaborator to your repo.
4. Reply to the email you received inviting you to take this challenge and include a link
   to your repository.

**Warning:** Do not fork this repository because GitHub does not allow forks to be made private.

## Task

Create a reusable React component that allows the user to search for and select a country.
The user should be able to search by the country name or by the
[two-letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). The search
should behave as follows:
- If the user enters their search term in lower case it should perform a case-insensitive
  search.
- If the search term includes a capital letter it should be a case-sensitive search.

For example:
- If the user enters "sw" the search should return:
  - Botswana
  - Eswatini
  - Sweden
  - Switzerland
- If the user enters "Sw" the search should return:
  - Sweden
  - Switzerland
- If the user enters "SE" the search should return:
  - Sweden (since this country's 2-letter code is "SE")

If you are familiar with GraphQL you should use this API:
- https://countries.trevorblades.com/
- https://github.com/trevorblades/countries

If you prefer REST you can use:
- https://restcountries.com/v3.1/independent
- https://restcountries.com/

This repo should be used as a starting point but you can make any changes you like to the
structure and included configuration files. You can use any 3rd party libraries you think
are appropriate. The repo is already configured to use
[MUI](https://mui.com/material-ui/getting-started/) and you are encouraged to build your
component using MUI components. The appearance of the component is left up to you.

The code you write should be production quality and therefore have an appropriate level
of type safety, tests and documentation about how to use your component.

## Running the app

Requirements:
- node v18 or later
- npm v10 or later

```bash
npm install
npm run dev
# access the app at http://127.0.0.1:3000/
```

## Testing
```bash
npm run test
```