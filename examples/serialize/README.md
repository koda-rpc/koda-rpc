# Serialize binary from KodaRPC schema with call method
Serialize request
```bash
kodarpc serialize schema \
  --call-method PetService.createPet \
  --type request \
  --parameters '{"id": 12, "name": "john", "owner": { "id": 1, "name" : "beria" }}, 14' \
  --output request.bin
```

Serialize response
```bash
kodarpc serialize schema \
  --call-method PetService.createPet \
  --type response \
  --parameters '{"id": 12, "name": "john", "owner": { "id": 1, "name" : "beria" }}, 13' \
  --output response.bin
```

Deserialize
```bash
kodarpc deserialize schema \
  --input request.bin \
  --type request
```
