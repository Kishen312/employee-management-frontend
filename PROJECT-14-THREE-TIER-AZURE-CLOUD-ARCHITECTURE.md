
# Project 14 – Three-Tier Azure Cloud Architecture
## Employee Management System

**Project Number:** 14 of 17  
**Category:** Microsoft Azure | Cloud Engineering | Web Application Deployment  
**Implementation Period:** November 2026  
**Architecture:** Three-Tier Architecture  
**Deployment Model:** Platform as a Service (PaaS)

---

## 1. Project Overview

Designed and deployed a three-tier Employee Management System using Microsoft Azure.

The application separates the frontend, backend, and database into independent layers:

- **Presentation Tier:** Azure Static Web Apps
- **Application Tier:** Azure App Service hosting a Node.js REST API
- **Database Tier:** Azure SQL Database

The frontend communicates with the backend through REST API requests, while the backend performs database operations using SQL connectivity.

GitHub integration and GitHub Actions were used to automate frontend deployment.

## 2. Project Objectives

- Understand and implement three-tier cloud architecture.
- Deploy a frontend application using Azure Static Web Apps.
- Host a Node.js backend using Azure App Service.
- Configure Azure SQL Database for persistent storage.
- Establish application-to-database connectivity.
- Implement Create, Read, Update, and Delete (CRUD) operations.
- Configure GitHub Actions for automated deployment.
- Understand Azure networking, security, and application configuration.
- Test communication between all three application tiers.

## 3. Architecture

```text
                       USERS
                         |
                         v
              PRESENTATION TIER
             +---------------------+
             | Azure Static Web    |
             | Apps (Free Plan)    |
             |                     |
             | HTML, CSS, JavaScript|
             +---------------------+
                         |
                         | HTTP REST API
                         v
               APPLICATION TIER
             +---------------------+
             | Azure App Service   |
             | Linux F1 Free       |
             |                     |
             | Node.js REST API    |
             |                     |
             | Employee CRUD       |
             +---------------------+
                         |
                         | SQL Connection
                         v
                 DATABASE TIER
             +---------------------+
             | Azure SQL Database  |
             |                     |
             | EmployeeManagementDB|
             |                     |
             | dbo.Employees       |
             +---------------------+
```

### Tier 1 – Presentation Layer

**Azure Service:** Azure Static Web Apps

- Hosted the Employee Management frontend.
- Developed using HTML, CSS, and JavaScript.
- Provides the user interface for employee management.
- Sends HTTP requests to the backend REST API.
- Connected to a GitHub repository.
- Uses GitHub Actions for automated deployment.

### Tier 2 – Application Layer

**Azure Service:** Azure App Service

- Hosted a Node.js backend application.
- Implemented REST API endpoints.
- Processes employee management requests.
- Handles application logic and input validation.
- Connects to Azure SQL Database using the `mssql` Node.js package.
- Uses App Service application settings for database configuration.

**Hosting Plan:** Linux F1 Free

### Tier 3 – Database Layer

**Azure Service:** Azure SQL Database

**Database:** EmployeeManagementDB  
**Table:** dbo.Employees

Stores employee information:

| Column | Description |
|---|---|
| Id | Unique employee identifier |
| Name | Employee name |
| Email | Employee email address |
| Department | Employee department |
| CreatedAt | Record creation timestamp |

## 4. Azure Resources and Configuration

| Azure Resource | Configuration |
|---|---|
| Resource Group | rg-appservice-project2 |
| Static Web App | employee-management-frontend |
| Static Web App Plan | Free |
| App Service | webapp-project2-20261111 |
| App Service Plan | Linux F1 Free |
| Runtime | Node.js 26 |
| SQL Server | sql-employee-project14-2026 |
| SQL Database | EmployeeManagementDB |
| Database Offer | General Purpose – Serverless Free Offer |
| GitHub Repository | employee-management-frontend |

### Frontend Configuration

- Connected Azure Static Web Apps to the GitHub repository.
- Selected `main` as the deployment branch.
- Configured application location as `src`.
- Configured output location as `.`.
- Left API location blank because the backend is hosted separately in Azure App Service.
- Verified the GitHub Actions deployment workflow.

### Backend Configuration

- Deployed the Node.js application to Azure App Service.
- Integrated the `mssql` package.
- Configured database connection settings through App Service Configuration.
- Implemented REST API endpoints.
- Configured CORS to allow frontend API communication.

### Database Configuration

- Created Azure SQL Database.
- Created the `dbo.Employees` table.
- Configured SQL authentication for the application.
- Created a dedicated application database user.
- Granted database read and write permissions.
- Configured SQL Server firewall access.

**Security:** Database credentials are stored in Azure App Service application settings and must not be committed to GitHub.

## 5. Backend REST API Implementation

The Node.js application provides the following endpoints:

| HTTP Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/employees` | Retrieve all employees |
| GET | `/api/employees/:id` | Retrieve an employee by ID |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update employee information |
| DELETE | `/api/employees/:id` | Delete an employee |

### CRUD Operations

- **Create:** Adds a new employee record to Azure SQL Database.
- **Read:** Retrieves employee records from the database.
- **Update:** Modifies existing employee information.
- **Delete:** Removes an employee record from the database.

### API Validation

The application handles invalid requests and duplicate employee email addresses.

Verified HTTP responses:

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Employee created successfully |
| 400 | Invalid request data |
| 409 | Duplicate email address |

## 6. GitHub Integration and CI/CD

**Platform:** GitHub  
**Automation:** GitHub Actions

The frontend repository was connected to Azure Static Web Apps.

### Deployment Workflow

1. Created and maintained the frontend source code in GitHub.
2. Connected the GitHub repository to Azure Static Web Apps.
3. Selected the `main` branch.
4. Configured application and output locations.
5. Azure generated the GitHub Actions workflow file.
6. GitHub Actions executed the deployment workflow.
7. Verified that the workflow completed successfully.
8. Opened the deployed application and verified the frontend.

**Result:** Automated frontend deployment through GitHub Actions was successfully verified.

## 7. Testing and Verification

The application was tested end-to-end to verify communication between the frontend, backend, and database.

| Test Scenario | Expected Result | Status |
|---|---|---|
| Open frontend application | Application loads successfully | Passed |
| Retrieve employees | Employee records displayed | Passed |
| Add employee | New employee created | Passed |
| Retrieve employee by ID | Correct employee returned | Passed |
| Update employee | Employee information updated | Passed |
| Delete employee | Employee record deleted | Passed |
| Duplicate email validation | HTTP 409 response | Passed |
| Missing required field | HTTP 400 response | Passed |
| Frontend-to-backend connectivity | API communication successful | Passed |
| Backend-to-database connectivity | SQL connection successful | Passed |
| GitHub Actions deployment | Workflow completed successfully | Passed |

### Database Verification

Verified employee records directly using Azure SQL Query Editor.

```sql
SELECT Id, Name, Email, Department
FROM dbo.Employees
ORDER BY Id;
```

The database returned the expected employee records, confirming successful data storage and retrieval.

## 8. Important Azure and Cloud Engineering Concepts Learned

### Cloud Architecture
- Three-tier architecture
- Separation of presentation, application, and database layers
- Platform as a Service (PaaS)
- Cloud-hosted application architecture
- Independent application layers

### Azure Compute and Hosting
- Azure App Service
- App Service Plans
- Linux-based application hosting
- Runtime configuration
- Azure Static Web Apps
- Application deployment

### Azure Database
- Azure SQL Database
- SQL Server connectivity
- Database authentication
- Database users and permissions
- Tables, primary keys, and unique constraints
- CRUD operations

### Azure Networking and Security
- Public network access
- SQL Server firewall rules
- Application-to-database connectivity
- HTTPS and encrypted SQL connections
- Cross-Origin Resource Sharing (CORS)
- Application settings and secret management

### DevOps and Automation
- GitHub repository integration
- GitHub Actions
- CI/CD fundamentals
- Automated deployment workflows
- Deployment verification

### Application Development
- Node.js
- REST API architecture
- HTTP methods and status codes
- JavaScript Fetch API
- JSON data exchange
- SQL database integration
- Input validation and error handling

## 9. Challenges and Solutions

| Challenge | Solution |
|---|---|
| Connecting backend to Azure SQL | Configured SQL connection settings in App Service |
| Database firewall restrictions | Configured required SQL firewall access |
| Frontend-to-backend communication | Configured API requests and CORS |
| Database authentication | Created a dedicated SQL application user with appropriate permissions |
| Automated frontend deployment | Integrated GitHub Actions with Azure Static Web Apps |
| Verifying data persistence | Executed SQL queries in Azure SQL Query Editor |

## 10. Limitations and Future Improvements

The project uses free-tier and promotional Azure resources for learning purposes.

Potential improvements:

- Implement Azure Entra ID authentication.
- Restrict CORS to trusted frontend origins.
- Use Azure Key Vault for centralized secret management.
- Implement private networking where supported by the hosting plans.
- Add structured application monitoring and logging.
- Add automated backend deployment through CI/CD.
- Implement role-based access control.
- Add API authentication and authorization.

## 11. Cost and Resource Considerations

The project was implemented using:

- Azure Static Web Apps Free plan.
- Azure App Service Linux F1 Free plan.
- Azure SQL Database Free Offer.

The SQL Free Offer was configured with its included usage limits and overage billing disabled.

The November 2026 subscription Cost Analysis showed:

- Actual cost: ₹19.83
- Forecast cost: ₹32.03
- Azure Monitor: ₹19.83

These are subscription-wide figures and are not confirmed as Project 14-only costs.

The project was designed to avoid personal out-of-pocket spending and did not require a Pay-As-You-Go upgrade.

## 12. Project Outcome

Successfully designed and implemented a three-tier Employee Management System using Microsoft Azure.

The project demonstrated practical experience in:

- Deploying a frontend application using Azure Static Web Apps.
- Hosting a backend REST API using Azure App Service.
- Integrating Azure SQL Database.
- Configuring application and database connectivity.
- Implementing all four CRUD operations.
- Automating frontend deployment using GitHub Actions.
- Testing end-to-end application functionality.

All four CRUD operations and the end-to-end application flow were successfully tested.

## 13. Resume-Ready Project Description

**Three-Tier Azure Cloud Architecture – Employee Management System**

Designed and deployed a three-tier web application using Azure Static Web Apps, Azure App Service, and Azure SQL Database. Developed a Node.js REST API supporting CRUD operations, integrated the backend with Azure SQL Database, configured application connectivity and database permissions, and implemented automated frontend deployment using GitHub Actions. Verified end-to-end application functionality and database persistence.

## 14. Screenshots and Evidence

Add screenshots to the repository to demonstrate the actual implementation.

Recommended screenshots:

1. Azure Resource Group overview.
2. Azure Static Web App overview.
3. Deployed Employee Management frontend.
4. GitHub repository structure.
5. Successful GitHub Actions deployment.
6. Azure App Service overview.
7. App Service Configuration (hide all secret values).
8. Azure SQL Database overview.
9. Employees table structure.
10. SQL Query Editor showing employee records.
11. Employee creation through the frontend.
12. Employee update through the frontend.
13. Employee deletion through the frontend.
14. Browser Network tab showing successful API responses.

**Important:** Never include passwords, connection strings, GitHub deployment tokens, or other secrets in screenshots or documentation.

---

**Technologies Used:** Microsoft Azure, Azure Static Web Apps, Azure App Service, Azure SQL Database, Node.js, JavaScript, HTML, CSS, SQL, GitHub, GitHub Actions, REST API.
