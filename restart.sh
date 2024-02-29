#!/bin/bash


servizio="app"
directory_repo="/home/jarvis/FantaRinuncia"

systemctl restart $servizio

if [ $? -eq 0 ]; then
    echo "Il servizio $servizio è stato riavviato correttamente."
else
    echo "Si è verificato un errore durante il riavvio del servizio $servizio."
    exit 1
fi

if [ ! -d $directory_repo ]; then
    echo "La directory del repository $directory_repo non esiste."
    exit 1
fi

git pull origin main

if [ $? -eq 0 ]; then
    echo "Pull dalla repository eseguito correttamente."
else
    echo "Si è verificato un errore durante il pull dalla repository."
    exit 1
fi
echo "Operazioni completate con successo."
