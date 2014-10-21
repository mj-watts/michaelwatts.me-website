michaelwatts.me-website
=======================

Website of michaelwatts.me

---
## Saudi Fashion Magazine
url: http://www.saudifashionmagazine.com

Languages: 
- PHP
- ExpressionEngine
- Smarty Templates
- JavaScript
- SCSS

Breakdown of work:
- Designed and built 'magazine style' responsive front end using .
- Designed backend to be user friendly to the Saudi editorial team.
- Implemented caching to speed up the pages.
- Built in both English and Arabic language.
- Designed and built 'lookbook' gallery flip-book articles.  
- Designed and built 'fashion fixes'.
- Built using 'Smarty' type templates in ExpressionEngine.
- Custom built plugins, that interpret the content in various ways - such as languages functionality, imports members, exports data to API, etc.

---
## POS Store Incentive application
url: private Github repository, need to make clone public and remove any DB refs.

Languages:
- PHP
- Classes

Breakdown of work:
- Designed and wrote application to process data from Oracle POS.
- Data is exported every day from Oracle as CSV by Saudi team and uploaded to our server.
- A Cron job on our server checks every 12 hours for a newly uploaded file.
- Application reads the CSV file, error checks, validates, formats, logs and creates files as XML (for import to ExpressionEngine), JSON (for use in our report API) and CSV (for use in Excel),  syphoning good and bad data so Saudi can deal with problems or cheaters.
- Using Campaign Monitor's API it then creates custom fields and subscribers and imports into Campaign Monitor. We can segment the data into gender, store, brand, mall, location and staff id.
