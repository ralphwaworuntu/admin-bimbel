# WaaS Builder - Admin Setup

This project has been migrated to MySQL with Drizzle ORM.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Initialize Database**
    If you haven't already, the database `waas_builder` should be created. The migration tool handles the schema.
    ```bash
    npm run db:push
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```

## Creating a Super Admin

To access the Admin Dashboard (`/admin`), you need an account with the `admin` role.

1.  **Register a User**:
    Open [http://localhost:3000](http://localhost:3000) and sign up with any email/password (or OAuth if configured).

2.  **Promote to Admin**:
    Visit the seed route in your browser:
    [http://localhost:3000/api/dev/seed](http://localhost:3000/api/dev/seed)

    This will extract the first registered user and update their role to `admin`.

3.  **Access Admin Panel**:
    You can now access [http://localhost:3000/admin](http://localhost:3000/admin).

## Deployment

To deploy to Vercel/Netlify, ensure you set the Environment Variables:
- `DATABASE_URL` / `MYSQL_*`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

## Database Management

- **Push Schema Changes**: `npm run db:push`
- **Studio (GUI)**: `npx drizzle-kit studio`
