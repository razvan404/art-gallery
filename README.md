# Art Gallery

Application where users can upload pictures, my entity is Picture who have:

- image (image url)
- id (uuid)
- title (string)
- description (string)
- type (enum)

## Backend environment variables

The .env variable should be in the backend directory, and should look like this:

```
  DATABASE_URL="file:./dev.db"
  PORT=<DESIRED_PORT>
  JWT_SECRET=<SOME_JWT_TOKEN>
```
