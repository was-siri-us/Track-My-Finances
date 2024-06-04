# Track My Finances

Track My Finances is a finance management SaaS platform built with Next.js, designed to help individuals and businesses manage their finances efficiently. This platform offers a range of features like visualization tools to track income, expenses, and overall financial health, providing users with comprehensive tools for financial planning and analysis.

![image](https://github.com/was-siri-us/Track-My-Finances/assets/116163817/5e591217-d8ae-4911-83f4-fef0f8eb1060)


## Features

- ### User Authentication
  - Secure login and signup functionality  using Clerk to ensure data privacy and protection.
    
- ### Accounts Management
  - Create and manage accounts to organize transactions based on different financial sources or purposes.
    
- ### Categories Management*
  - Define custom categories to classify your transactions, making it easier to track and analyze spending patterns.

- ### Transactions Management
  - Add and manage transactions with detailed information such as Date, Category, Payee, Amount, Account
    
  ![image](https://github.com/was-siri-us/Track-My-Finances/assets/116163817/7dbeeb01-78da-4bad-a2f8-548492031dea)


- ### Overview Dashboard
  - The home page provides a consolidated view of your financial status, displaying key metrics such as total income, expenses, and remaining funds.  
  - Advanced filtering options by accounts and customizable time ranges allow for a tailored view of your financial data.

- ### Data Visualization  
  Utilize various charts and graphs to gain insightful visual representations of your financial data:
  - AreaCharts, LineCharts, and BarCharts to visualize income and expenses over time.
  - PieCharts, RadialCharts, and RadarCharts to visualize expenditure by categories.
    
  ![image](https://github.com/was-siri-us/Track-My-Finances/assets/116163817/b272c279-2271-486a-8097-dfbbda5eedc6)

  ![image](https://github.com/was-siri-us/Track-My-Finances/assets/116163817/a5ff8e95-49ba-4ce2-9fe7-12b5b2960ac4)
  
  ![image](https://github.com/was-siri-us/Track-My-Finances/assets/116163817/ebf6a49d-621e-4ec8-a5a3-785474d148bd)




## Technologies Used

- **Next.js**: A powerful React framework that ensures fast and efficient web application performance.  
- **NeonDB**: A cloud-native database that provides robust and scalable data management solutions.  
- **HonoJS**: A modern, minimalistic web framework that offers high-performance routing.  
- **Drizzle**: A lightweight, flexible ORM that simplifies database interactions and enhances data handling.  
- **Clerk**: An authentication and user management service that ensures secure and seamless user access.
- **PostgreSQL **: A robust and reliable relational database used for storing data.

##Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (latest version)
- Bun (latest version)
- PostgreSQL

Additionally, you need to create accounts and obtain credentials for the following services:

- Clerk: For authentication
- NeonDB: For the database


### Installation

1. Clone the Repository
2. Install Dependencies using `bun install`
3. Set Up Accounts and Obtain API Keys for Clerk and NeonDB and set up env variables as required
4. Run migrations `bun run db:migrate`
5. Start the development server using Bun: `bun run dev`
6. Open your browser and navigate to `http://localhost:3000` to access Track My Finances.

