# Generational Impact Explorer

A web application that allows users to explore and compare generational trends in society, including income, education levels, technology adoption, social media usage, and environmental awareness.

## Features

- **Interactive Navigation**: Browse through different sections with a responsive navigation menu
- **Generational Data Display**: View detailed information about different generations
- **Comparison Tool**: Compare specific metrics between different generations
- **Data Visualization**: Charts and graphs to visualize generational differences
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Charts**: Chart.js
- **Styling**: Custom CSS with responsive design

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MySQL](https://www.mysql.com/) database server
- npm (comes with Node.js)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/generational-impact-explorer.git
   cd generational-impact-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database named `generations_db`
   - Create the necessary tables and insert sample data (SQL file to be provided)
   - Update the database connection settings in `server.js`:
     ```javascript
     const db = mysql.createConnection({
       host: "localhost",
       user: "your_mysql_username",
       password: "your_mysql_password",
       database: "generations_database",
     });
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

```
generational-impact-explorer/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Node.js dependencies and scripts
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Usage

1. **Home**: Overview of the application
2. **Generations**: View detailed data about different generations
3. **Compare**: Select two generations and a metric to compare them
4. **About**: Learn more about the project





## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, please feel free to reach out!

## Future Enhancements

- Add more visualization types (pie charts, line graphs)
- Implement user authentication
- Add data export functionality
- Include more generational metrics
- Add real-time data updates
