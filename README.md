# Time Tracker NM – Trello Power-Up

Zaawansowany (a jednocześnie lekki) time tracker dla kart Trello.  
Pozwala planować czas, rejestrować przepracowane minuty/godziny, uruchamiać i zatrzymywać timer, prowadzić historię wpisów (z komentarzami, edycją i usuwaniem), a także podglądać postęp zadania bezpośrednio na karcie.

## Funkcje

- **Planowanie czasu** (godziny/minuty) na kartę.
- **Rejestracja przepracowanego czasu** ręcznie oraz z automatycznym dodaniem po zatrzymaniu timera.
- **Timer na żywo** (popup + mini widok w sekcji karty, licznik na badge’u z odświeżaniem).
- **Historia wpisów** z możliwością:
    - dodania komentarza przy każdym wpisie,
    - edycji,
    - usuwania.
- **Pasek postępu** (ASCII badge + graficzny pasek w popupie).
- **Jedna grupa badge’y na karcie**: nagłówek „Time Tracker NM” + info, progress, live timer, Start/Stop, Otwórz tracker.
- **Heartbeat** (odświeżanie co ~5s, tylko gdy timer działa – bez nadmiernego zużycia limitów API Trello).

## Konfiguracja

- Nie wymaga zewnętrznego backendu – dane trzymane są w `shared` storage karty (Trello Power-Ups client storage).
- Jeśli chcesz zmienić kolory, wysokości iframe czy interwały heartbeat – edytuj odpowiednio:
    - `powerup.js` – logika UI badge’y,
    - `popup.html` – logika timera, historii,
    - `styles.css` – wygląd.
