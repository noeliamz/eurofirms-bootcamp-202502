curl -X PUT http://localhost:8080/children/edit \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODlmMWMwMmU3MDE5Zjg0NWY3ZTNhNzIiLCJyb2xlIjoicGFjaWVudCIsImlhdCI6MTc1NTI1Nzk0M30.wbbv25gV7fSCeeVBcJu5jY0VvcsoqymrilmEaBFctuM' \
-H 'Content-Type: application/json' \
-d '{
  "section": "doctor",
  "field": "controlledPregnancy",
  "value": "calle sevilla"
}'