# CWTest
This application runs a CRUD application build on .NET 6 + MSSQL + React + MobX. It let's you add add product to table. It also let's you update and delete and view
products. Products can also be sorted alphabetically or numerically by clicking on the column heading. Up to 5 products are displayed per page. Pagination buttons can
be used to to navigate through the pages.

The application uses the **CQRS CLEAN ARCHITECTURE PATTERN** on the server side. The server side is split into 5 parts:

1. API: contains the API endpoints and startup middleware setup files of the solution. It's also the starting point of the app
2. Application: contains the business logic of the app. Contains all the Command and Query Logic for all the CRUD operations for the app.
3. Domain: stores all models and schemas representing our DB tables.
4. Persistence: this layer is used to communicate with the DB. Stored all the migrations and DBContext
5. Infrastructure: not used here but it can be used in the future to add service logic for User Identity if required.

# Instructions to run
1. Clone Repository
2. Install .NET 6 SDK: https://dotnet.microsoft.com/en-us/download/dotnet/6.0
3. Install NodeJS 18 or above: https://nodejs.org/en/
4. Install MS SQL Server: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
5. Install SSMS: https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16
6. Instal Visual Studio 2022: https://visualstudio.microsoft.com/downloads/
7. Install VS Code: https://code.visualstudio.com/
8. Open 'client-app' in VS Code.
9. Open CWTest.sln using Visual Studio 2022.
10. In the Visual Studio 2022 window, open solutions explorer. Right click API project and click 'Set up as start up project'. Right click Solution and 'clean' and
'build' solution. 
11. No manual migrations need to be make. Launching the app will create migrations automatically. Just make sure there is a connectionString in 
'appsettings.json'
12. Then click on the play button to start the .NET application. Make sure **API is set to start up project** as this is where the app starts. Once app launches a 
a swagger API admin page launches which on all the endpoints.
13. In the VS Code window. Open terminal and make sure you are in client-app directory. Type 'npm install' wait for node modules to install.
14. Then type 'npm start' to start application. The front end application will launch.
15. Enjoy!!


