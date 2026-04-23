# playwright-cucumber

playwright + cucumber + js for: e-commerce-website

## how to install all it needs?

```bash
npm i
```

## notes

- Sometimes playwright requires to install extra browsers, if needed that's notified in the terminal
- `npx playwright install --with-deps`

## how to run it?

### default chromium

```bash
npx cucumber-js
```

### run in firefox

```bash
BROWSER=firefox npx cucumber-js
```

### run in safari

```bash
BROWSER=webkit npx cucumber-js
```

### run in staging and on firefox

```bash
NODE_ENV=staging BROWSER=firefox npx cucumber-js
or
npm run test:staging:firefox
```

### run it in staging + firefox + headed

```bash
NODE_ENV=staging BROWSER=firefox HEADED=true npx cucumber-js
```

### run it in different page sizes

```bash
WIDTH=1920 HEIGHT=1080 npx cucumber-js
WIDTH=1334 HEIGHT=750 npx cucumber-js
```

### run by tag

``` bash
npx cucumber-js --tags "@smoke"
```

### run by feature

```bash
npm run test:staging:firefox -- e2e/features/signin.feature
```

### run multiple features

```bash
npx cucumber-js e2e/features/signin.feature e2e/features/dashboard.feature
```

## how to run prettier?

```bash
npx prettier --write .
```
