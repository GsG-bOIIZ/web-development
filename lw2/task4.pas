PROGRAM HelloDear(INPUT, OUTPUT);
USES DOS;

FUNCTION GetQueryStringParameter(Key: STRING): STRING;
VAR
  QUERY_STR: STRING;
BEGIN
  QUERY_STR := GetEnv('QUERY_STRING');
  QUERY_STR := COPY(QUERY_STR, POS(Key, QUERY_STR) + Length(Key) + 1, LENGTH(QUERY_STR));
  GetQueryStringParameter := COPY(QUERY_STR, 1, POS('%', QUERY_STR) - 1)
END;

BEGIN {WorkWithQueryString}
  WRITELN('Content-Type: text/plain');
  WRITELN;
  WRITELN('First Name: ', GetQueryStringParameter('first_name'));
  WRITELN('Last Name: ', GetQueryStringParameter('last_name'));
  WRITELN('Age: ', GetQueryStringParameter('age'))
END. {WorkWithQueryString}
