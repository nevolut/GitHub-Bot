# Github-Bot

A JS script written for tricking the github contribution chart, and make commits in the past as well as future dates in seconds.

## Clone the repo

```bash
git clone https://github.com/nevolut/github-bot.git
```

## Install dependencies

```bash
npm install
```

## Run

```bash
npm start
```

## Description

The application is written in JavaScript, and uses:

- simple-git to make commits and push to github
- txtgen to generate random sentences, paragraphs and article
- random to generate random numbers for day, month and year
- moment to create and format dates
- fs to write to the files

The application will run a function makeCommit(target, loop) where target is the number of commit to make before a push to github.
