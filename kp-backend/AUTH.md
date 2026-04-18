# Autentykacja i autoryzacja — Jak to działa

## Przegląd

Backend używa **JWT (JSON Web Tokens)** z **bezstanowym** modelem sesji. Są dwa tokeny:

| Token | Gdzie się znajduje | Czas życia | Cel |
|---|---|---|---|
| **Access Token** | Body odpowiedzi JSON | 1 godzina (3600s) | Autoryzacja żądań API |
| **Refresh Token** | Ciasteczko `HttpOnly` | 7 dni (604800s) | Pobranie nowego access tokena bez ponownego logowania |

---

## Endpointy

| Metoda | URL | Wymaga autoryzacji | Opis |
|---|---|---|---|
| `POST` | `/users` | Nie | Rejestracja nowego użytkownika |
| `POST` | `/auth/login` | Nie | Logowanie, pobranie access tokena |
| `POST` | `/auth/refresh` | Nie (ciasteczko) | Odświeżenie access tokena |
| `GET` | `/auth/me` | Tak | Pobranie danych aktualnego użytkownika |
| Wszystko inne | `/**` | Tak | Pozostałe endpointy wymagają autoryzacji |

---

## 1. Rejestracja — `POST /users`

**Żądanie:**
```json
{
  "username": "john",
  "password": "secret123",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "age": 25
}
```

**Odpowiedź `201 Created`:**
```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "age": 25,
  "createdDate": "2026-04-11"
}
```

**Błąd `409 Conflict`** — jeśli nazwa użytkownika jest zajęta:
```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Username already taken"
}
```

---

## 2. Logowanie — `POST /auth/login`

**Żądanie:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

**Odpowiedź `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Odpowiedź ustawia również nagłówek **`Set-Cookie`** z refresh tokenem:
```
Set-Cookie: refreshToken=eyJ...; Path=/auth/refresh; Max-Age=604800; HttpOnly; SameSite=Lax
```

**Dla frontendu:** Zapisz `token` z body odpowiedzi (np. w pamięci lub `localStorage`) i używaj go do wszystkich kolejnych żądań.

---

## 3. Używanie Access Tokena

Dodaj token do każdego żądania wymagającego autoryzacji:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

Jeśli token jest brakujący, nieprawidłowy lub wygasły, backend zwraca:
```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

---

## 4. Odświeżanie tokena — `POST /auth/refresh`

Kiedy access token wygaśnie (po 1 godzinie), **nie jest potrzebne żadne body żądania**. Przeglądarka automatycznie wysyła ciasteczko `refreshToken` (jest ograniczone do ścieżki `/auth/refresh`).

**Odpowiedź `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...(nowy access token)"
}
```

**Dla frontendu:** Wywołaj ten endpoint gdy dostaniesz `401`. Zamień zapisany access token na nowy i ponów oryginalne żądanie.

---

## 5. Pobranie aktualnego użytkownika — `GET /auth/me`

**Nagłówki:** `Authorization: Bearer <access_token>`

**Odpowiedź `200 OK`:**
```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "age": 25,
  "createdDate": "2026-04-11"
}
```

---

## Diagram przepływu tokenów

```
  Frontend                                Backend
  ───────                                 ───────
     │                                       │
     │  POST /users  (rejestracja)           │
     │ ────────────────────────────────────> │
     │ <──────────────── 201 + dane usera ─ │
     │                                       │
     │  POST /auth/login                     │
     │ ────────────────────────────────────> │
     │ <── 200 + { token } ──────────────── │
     │ <── Set-Cookie: refreshToken ──────── │
     │                                       │
     │  GET /auth/me                         │
     │  Authorization: Bearer <token>        │
     │ ────────────────────────────────────> │
     │ <──────────────── 200 + dane usera ─ │
     │                                       │
     │  ... token wygasa po 1h ...           │
     │                                       │
     │  POST /auth/refresh                   │
     │  Cookie: refreshToken=...  (auto)     │
     │ ────────────────────────────────────> │
     │ <── 200 + { nowy token } ──────────── │
     │                                       │
```
