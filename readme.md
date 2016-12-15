Ein minimales Angular2 Mars Rover Client Projekt.

Die Entwicklung beginnt damit dass man in einer Kommandozeilenumgebung in der der nodejs und
npm Pfad bereits korrekt gesetzt ist folgende Befehle ausf�hrt:

npm install
npm start

Der erste Befehl installiert die notwendigen dependencies. Der zweite Befehl f�hrt einen build
aus und startet einen minimalen server um die Website in einem Browser anzusehen.
Beginnt man nun die Entwicklung wird bei jeder �nderung ein rebuild ausgef�hrt und der Browser
refreshed.

Um die Tests auszuf�hren muss folgender Befehl verwendet werden:

npm run test

Wenn das Projekt gestartet ist, kann man �ber server:<port> die Webanwendung �ffnen. Voraussetzung f�r
korrekte Funktion ist das zudem der Server gestartet wurde:
https://github.com/davidibl/MarsRoverCamundaKata

Danach kann man �ber die Weboberfl�che den Mars Rover in einem zwei dimensionalen Koordinaten System
mit Befehelen der Form "ffrrblbb" steuern.
Der String entspricht hierbei einer Reihe von Befehlen.

f: move forward
b: move backward
r: turn right
l: turn left

Das System ist 10x10 Felder gro�.

Die Status Updates werden nach eienr Neuberechnung des Status per Push an den Client gesendet.

Viel Spass
David Ibl