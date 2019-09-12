# Configuration

## Database

You will need access to a postgresql database. For simple setup with a local postgresql server, you may use the defaults. To configure your local postgresql server, first launch `psql`:

```
$ psql -U postgres
```

You may be prompted for your postgresql server's administrator account's password. You may have set this password to be the same as the account. Once in, create the user and database:

```
postgresql=# CREATE USER clickchamp PASSWORD 'clickchamp';
postgresql=# CREATE DATABASE clickchamp OWNER clickchamp;
```

### Nondefault Configuration

To override the default configuration, create a file called `.env.local`. Set the variable `CLICKCHAMP_TYPEORM_URL`:

```
CLICKCHAMP_TYPEORM_URL=postgres://clickchamp:secret@localhost/clickchamp2
```
