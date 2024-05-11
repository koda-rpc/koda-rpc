# Compile binary from KodaRPC schema with call signature
```bash
kodarpc compile schema \
  --call-method PetService.createPet \
  --type request \
  --parameters '{"id": 12, "name": "john", "owner": { "id": 1, "name" : "beria" }}, 14' \
  --output request.bin
```
