curl -X PUT http://localhost:8080/children/edit \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODlmMWMwZDUwOGFiYzRmZjJhZGM4MGQiLCJyb2xlIjoiZG9jdG9yIiwiaWF0IjoxNzU1NDc1MDA3fQ.AriiJ2KwX_BWd4u_xTqMebhL4ZZpq21BdCeR546ci4k' \
-H 'Content-Type: application/json' \
-d '{
  "section": "doctor",
  "field": "controlledPregnancy",
  "value": "calle sevilla"
}' -v