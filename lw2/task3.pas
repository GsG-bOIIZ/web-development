PROGRAM HelloDear(INPUT, OUTPUT);
USES DOS;
VAR
  QUERY_STR: STRING;
BEGIN
  WRITELN('Content-Type: text/plain');
  WRITELN;
  QUERY_STR := GetEnv('QUERY_STRING');
  QUERY_STR := COPY(QUERY_STR, POS('name=', QUERY_STR) + 5, LENGTH(QUERY_STR) - POS('name=', QUERY_STR) + 5);
  IF LENGTH(QUERY_STR) <> 0
  THEN
    WRITELN('Hello dear, ', QUERY_STR, '!')
  ELSE
    WRITELN('Hello Anonymous!')
END.
