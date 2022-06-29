# Description
This is expense tracker app that enables user to enter incomes and expenses and to get statistical overview of his or her expenditures. Also user is able to get complete overview of expenses and incomes on the dashboard.

Data for dashboard can be disaggregated by day, week, month and year. Furthermore user can select in which currency he or she would like to display data (available options are BAM, USD, and EUR). Default option is BAM.

Data on the tab Statistics can be disaggregated by week, month and year. Statistical overview includes graphs. Default chart is pie chart but user can also display data on line chart or bar chart. For charts plotly libary is utilized, while for aggregation of data lodash package is mainyly used as it has similar functionalities as tidyverse from R.

## Important notes
In order to use the app you shound change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

DATABASE=base-login (I will delete this after grading is done) PASSWORD=cdsAEE2FyMt75tur (I will delete this after grading is done)

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is
http://localhost:5000. In case you are using Mac change default port to 3001 as 5000 is not allowed on Mac. Also don't forget to change on proxy last part of the string (5000 to 3001)
## Components
App is divided in separate components and coresponding folders:

1. Dashboard (default page) in folder src/components/dashboard
2. Transactions - used for adding, editing, and deleting transactions in folder src/components/transactions
3. Statistics - used for statistical overview of data in folder 
src/components/statistics
4. user - for editing user profile, changing password, etc  in folder src/components/user

Signin and signup logic is in folder src/Signin.js and src/Signup.js
## Redux toolkit

For state management Redux toolkit is used. For fetching API data redux thunk middleware is used.
## Server and database

For server express is used and all server logic is stored in server folder. 

## UI

For UI Material UI (MUI) library is used. 