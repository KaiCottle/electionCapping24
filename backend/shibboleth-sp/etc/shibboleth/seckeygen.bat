@echo off
setlocal ENABLEDELAYEDEXPANSION

set /A HISTORY=14
set /A BYTES=16
set FILENAME=sealer.keys
set OUT=%~dp0

:opt_start
set PARAM=%1

if not defined PARAM goto opt_end
if %1==-o goto opt_out
if %1==-h goto opt_history
if %1==-b goto opt_bits
if %1==-f goto opt_filename
goto usage
:opt_end

set PATH=%PATH%;%ProgramFiles%\Shibboleth\SP\lib\
if exist %OUT%\%FILENAME%.tmp del /Q %OUT%\%FILENAME%.tmp

set /A LINECOUNT=0
if exist %OUT%\%FILENAME% goto getlinecount

:compute
set /A CHOP=LINECOUNT + 1
if %CHOP% LEQ %HISTORY% (set /A CHOP=0) else (set /A CHOP=CHOP - HISTORY)
echo Removing %CHOP% old key(s)...

if exist %OUT%\%FILENAME% (goto :regurgitate) else (set /A KEYVER=1)

:addkey
for /F %%a in ('openssl.exe rand -base64 %BYTES%') do set KEYVAL=%%a
echo %KEYVER%:%KEYVAL% >> %OUT%\%FILENAME%.tmp
move /Y %OUT%\%FILENAME%.tmp %OUT%\%FILENAME%
echo Added key version: %KEYVER%
exit /b

:getlinecount
for /F %%a in ('type %OUT%\%FILENAME% ^| find /V /C ""') do set LINECOUNT=%%a
goto compute

:regurgitate
for /F "delims=: tokens=1,2" %%i in (%OUT%\%FILENAME%) do (
    if !CHOP! GTR 0 (set /A CHOP=!CHOP! - 1) else (echo %%i:%%j >> %OUT%\%FILENAME%.tmp)
	set KEYVER=%%i
)
set /A KEYVER=KEYVER + 1
goto addkey

:opt_out
set OUT=%2
shift
shift
goto opt_start

:opt_filename
set FILENAME=%2
shift
shift
goto opt_start

:opt_history
set /A HISTORY=%2
shift
shift
goto opt_start

:opt_bits
set /A BYTES=%2 / 8
shift
shift
goto opt_start

:usage
echo usage: seckeygen [-h key history to maintain] [-b key bits] [-f filename] [-o output dir]
exit /b
