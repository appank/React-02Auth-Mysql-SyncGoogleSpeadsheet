
# React Authentication - 02AUTH(Google) - MySQL && Sync otomatis dari Google Spreadsheet

A basic login page made with react which supports Authentication

Kalau kamu mau migrasi penuh ke MySQL, maka limit Google ini bisa kamu abaikan sepenuhnya. Tapi kalau kamu tetap harus sync dari Sheet secara berkala, bisa kombinasikan:
- cron scheduler
- caching
- limit pengambilan data (misalnya hanya ambil yang berubah)
  
Ambil data dari Sheet 1x, simpan ke Redis/MySQL, lalu frontend baca dari cache.

Instal Cache

```bash
 npm install node-cache
```

Instyal Node Cron

```bash
 npm install node-cron
```


## Features

- Login witH MYSQL
- Login with Google account



## Run Locally

Clone the project

```bash
 https://github.com/appank/React-02Auth-mysql.git
```

Install dependencies

```bash
  npm install
```

Start the Frontend

```bash
  npm run start
```
Start the Backend

```bash
  npm indext.js
```
#----------------------------------------------------------------------------------

env Server

```bash
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=Gxxxxxxxxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callxxxxx
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=rahasiaxx

MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=xxxxxxxxxxxxxxxxxxxx
SPREADSHEET_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```




## Tech Stack

**Client:** React, JavaScript, Chakra UI

**Authentication** 02Auth, MySQL

