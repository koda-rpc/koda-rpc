# serialize binary from KodaRPC schema with call method
Serialize
```bash
kodarpc serialize schema \
  --call-method PetService.createPet \
  --type request \
  --parameters '{"id": 12, "name": "john", "owner": { "id": 1, "name" : "beria" }}, 14' \
  --output request.bin
```

Deserialize
```bash
kodarpc serialize schema \
  --call-method PetService.createPet \
  --type response \
  --parameters '{"id": 12, "name": "john", "owner": { "id": 1, "name" : "beria" }}' \
  --output response.bin
```
