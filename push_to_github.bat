@echo off
echo Initializing Git...
git init
if %errorlevel% neq 0 exit /b %errorlevel%

echo Adding Remote...
git remote add origin https://github.com/he-zhii/nighty-night.git
:: Ignore error if remote already exists
if %errorlevel% neq 0 echo Remote might already exist, continuing...

echo Adding Files...
git add .
if %errorlevel% neq 0 exit /b %errorlevel%

echo Committing...
git commit -m "feat: complete city match game implementation"
:: Ignore error if nothing to commit
if %errorlevel% neq 0 echo Nothing to commit or error, continuing...

echo Renaming Branch...
git branch -M main

echo Pushing...
git push -u origin main
if %errorlevel% neq 0 exit /b %errorlevel%

echo Done.
