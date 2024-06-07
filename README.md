# Last Book

## Wprowadzenie

To jest przykładowy plik README dla mojego projektu, który jest aplikacją opartą na bibliotece React. Projekt wykorzystuje preprocesor SASS do stylizacji oraz API Google Books do wyszukiwania książek. Aplikacja pozwala na tworzenie listy przeczytanych książek oraz wyszukiwanie i dodawanie nowych książek do tej listy.

### Funkcje

- **Tworzenie listy przeczytanych książek**: Możliwość dodawania, edytowania i usuwania książek z listy.
- **Wyszukiwanie książek**: Integracja z API Google Books umożliwiająca wyszukiwanie książek i dodawanie ich do listy.
- **Zarządzanie użytkownikami**: Możliwość tworzenia użytkowników w aplikacji.
- **Oznaczanie książek**: Użytkownicy mogą oznaczać, czy posiadają książki oraz czy pożyczyli je komuś.
- **Stylizacja z użyciem SASS**: Użycie preprocesora SASS do zarządzania stylami aplikacji.
- **Symulowanie API REST z wykorzystaniem Server JSON**: Tworzenie, odczytywanie, aktualizowanie i usuwanie (CRUD) danych na serwerze.

### Instalacja

Aby zainstalować projekt, wykonaj poniższe kroki:

1. **Sklonuj repozytorium:**
    ```sh
    git clone https://github.com/twoja-nazwa-użytkownika/moj-projekt.git
    ```
2. **Przejdź do katalogu projektu:**
    ```sh
    cd moj-projekt
    ```
3. **Zainstaluj zależności:**
   Upewnij się, że masz zainstalowany Node.js i npm. Następnie uruchom poniższą komendę, aby zainstalować wszystkie zależności projektu.
    ```sh
    npm install
    ```
4. **Zainstaluj JSON Server:**
   JSON Server jest używany do symulacji API REST. Możesz go zainstalować globalnie lub lokalnie.
    ```sh
    npm install -g json-server
    ```
   Lub lokalnie w projekcie:
    ```sh
    npm install json-server --save-dev
    ```
### Konfiguracja

Dodaj plik `vite.config.js` w katalogu głównym projektu z następującą zawartością, aby Vite uruchamiał się na porcie 3001:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  }
});
```

### Uruchomienie

Aby uruchomić projekt, wykonaj poniższe kroki:

1. **Uruchom JSON Server:**
   JSON Server używa pliku `db.json` jako swojej bazy danych. Utwórz plik `db.json` w katalogu głównym projektu, jeśli jeszcze go nie masz.
    ```json
    {
   "users": [
    {
      "id": "1",
      "username": "Username 1"
    }
   ],
      "books": [
        {
      "id": "11",
      "bookData": {
        "title": "Book 1",
        "authors": "Author 1",
        "rating": "0",
        "have": true,
        "cover": "url"
      },
      "borrowed": {
        "borrowedStan": true,
        "name": "Name 1",
        "date": ""
      },
      "userId": "userId 1"
    }
      ]
    }
    ```
   Uruchom JSON Server:
    ```sh
    json-server --watch db.json
    ```
     Domyślnie serwer będzie działał na porcie 3000. Możesz teraz uzyskać dostęp do zasobów za pośrednictwem przeglądarki lub narzędzi takich jak Postman.
      
      ```
      http://localhost:3000/books
      http://localhost:3000/users
      ```

2. **Uruchom aplikację React za pomocą Vite:**
   Uruchom poniższą komendę, aby uruchomić aplikację React na porcie 3001:
    ```sh
    npm run dev
    ```
   Domyślnie aplikacja będzie działać na porcie 3001.

### Użycie

Aby użyć projektu, wykonaj poniższe kroki:

1. **Uzyskaj dostęp do aplikacji:**
   Otwórz przeglądarkę i przejdź do:
    ```
    http://localhost:3001
    ```

2. **Tworzenie użytkownika:**
   W aplikacji możesz utworzyć nowego użytkownika, aby móc zarządzać swoimi książkami.


3. **Wyszukiwanie książek:**
   Skorzystaj z interfejsu aplikacji, aby wyszukiwać książki za pomocą API Google Books. Wprowadź tytuł książki w polu wyszukiwania i kliknij przycisk "Szukaj".


4. **Dodawanie książek do listy:**
   Po znalezieniu książki, kliknij przycisk "Dodaj do listy", aby dodać ją do listy przeczytanych książek. Możesz również zaznaczyć, czy posiadasz książkę oraz czy pożyczyłeś ją komuś.

### Struktura katalogów