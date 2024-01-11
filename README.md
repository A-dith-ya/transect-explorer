# Transect Explorer

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:A-dith-ya/transect-explorer.git
   ```

2. Install the dependencies for the app:

   ```bash
   cd api/
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. Run the server on port 8080:

   ```bash
   docker build -t transect-explorer-server .
   docker run -p 8080:8080 transect-explorer-server
   ```
