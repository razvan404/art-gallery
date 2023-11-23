# Art Gallery

Application where users can upload pictures, my entity is Picture who have:

- image (image url)
- id (uuid)
- title (string)
- description (string)
- type (enum)

## Backend environment variables

The `.env` variable should be in the backend directory, and should look like this:

```
  DATABASE_URL="file:./dev.db"
  PORT=<DESIRED PORT>
  JWT_SECRET=<SOME JWT TOKEN>
```

## Ionic frontend environment variables

You should create a folder named `secrets` inside `ionic/src` that should contain an `index.ts` with the following:

```
  export const GOOGLE_MAPS_API_KEY = "<GOOGLE MAPS API KEY>";
```
