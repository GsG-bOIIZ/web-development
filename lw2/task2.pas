PROGRAM SarahRevere(INPUT, OUTPUT);
USES DOS;
VAR
  W1, W2, W3, W4, Looking: CHAR;
  QUERY_STR: STRING;
  I: INTEGER;
BEGIN {SarahRevere}
  // http://localhost:4001/cgi-bin/sarahrevere.cgi/?lanterns=%
  // % - конец строки
  QUERY_STR := GetEnv('QUERY_STRING');
  I := 1;
  WRITELN('Content-Type: text/plain');
  WRITELN;
  {инициализация W1,W2,W3,W4,Looking}
  W1 := ' ';
  W2 := ' ';
  W3 := ' ';
  W4 := ' ';
  Looking := 'Y';
  WHILE Looking = 'Y'
  DO
    BEGIN
      { Двигать окно,проверять конец данных}
      W1 := W2;
      W2 := W3;
      W3 := W4;
      W4 := QUERY_STR[I];
      IF W4 = '%'
      THEN {Конец данных}
        Looking := 'N';
      { Проверка окна для  'land'}
      IF (W1 = 'l') AND (W2 = 'a') AND (W3 = 'n') AND (W4 = 'd')
      THEN{'land' найдено}
        Looking := 'L';
      { Проверка окна для 'sea'}
      IF (W2 = 's') AND (W3 = 'e') AND (W4 = 'a')
      THEN{'sea' найдено}
        Looking := 'S';
      INC(I)
    END;
  {создать сообщение Sarah}
  IF Looking = 'L'
  THEN
    WRITELN('The British are coming by land.')
  ELSE
    IF Looking = 'S'
    THEN
      WRITELN('The British coming by sea.')
    ELSE
      WRITELN('Sarah didn''t say')
END. {Sarah revere}
