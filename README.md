# Prisma Movie Application

This Movie Application, built with **Next.js** and **Prisma**, offers full **CRUD** functionality, allowing users to add, view, edit, and delete movies. It uses Prisma as the **ORM** for database interactions and Next.js for server-side rendering and API routes, ensuring a smooth and efficient user experience.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Project](#running-the-project)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

## Features
- **Add Movies**: Create new entries with movie details such as title, genre, and release date.
- **Edit Movies**: Update existing movie information.
- **Delete Movies**: Remove movies from the catalog.
- **View Movies**: View detailed information for each movie in the database.
- **Add Review** : You can add review and also perform CRUD over there.
  
## Sample Image: 

<div style="display: flex; justify-content: space-between;">

![image](https://github.com/user-attachments/assets/bbdf9ba0-ddae-4465-9eca-890f4918ee9a)
![image](https://github.com/user-attachments/assets/dbcf811c-dc44-4bf8-8013-d85674a1561d)
![image](https://github.com/user-attachments/assets/6f8c8be2-20eb-4ebc-9fb3-711fbb56cd9b)
![image](https://github.com/user-attachments/assets/2519fb75-7a8c-485c-bd9e-36dcf0555f9c)
![image](https://github.com/user-attachments/assets/887af63a-e82f-4da5-a904-55dba958fb1f)
</div>

## Tech Stack

- **Next.js**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **Tailwind CSS**
- **ShadCN**

## Getting Started

Follow the instructions below to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v16 or later): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **PostgreSQL**: [Install PostgreSQL](https://www.postgresql.org/download/) (Not Necessary)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/centauricoder01/movie-giggle.git
   
2. **Navigate to the project directory:**
   ```bash
   cd movie-giggle

3. **Install dependencies:**
   ```bash
   npm install


### Configuration

Create a `.env` file in the root directory of your project and add the following environment variables:

  ```bash
 DATABASE_URL=postgresql://user:password@localhost:5432/moviedb

```

### Running Migrations

  ```bash
   npx prisma migrate dev
  ```

### Running the Project

  ```bash
    npm run dev
  ```

### Build for production:
  ```bash
    npm run build
  ```
### Folder Structure

  ```ruby
ai-plagiarism-detector/
├── public/         # Static assets
├── src/            # Source files
│   ├── app/
        ├── api/     #All APIs
        ├── other_page/     #Other Pages
│   ├── components/  # Reusable components
│   ├── hooks/      # custom hooks
│   └── libs/      # Utility functions
├── .env.local      # Environment variables
├── next.config.js  # Next.js configuration
├── package.json    # Dependencies and scripts
├── README.md       # Project documentation
└── tsconfig.json   # TypeScript configuration
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

1. **Fork the repository**:

   Go to the repository on GitHub and click the "Fork" button at the top right corner.

2. **Create a feature branch**:

   ```bash
   git checkout -b feature-name

3. ***Commit your changes**:
     ```bash
     git commit -m 'Add some feature'
     
4. **Push to the branch**:
     ```bash
     git push origin feature-name
     ```

## Thank you for your contribution! If you found this project helpful, please consider giving it a star ⭐.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
