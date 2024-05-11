<div style="display: flex; align-items: center; gap: 20px">
  <img src="logo.svg" alt="KodaRPC Logo" width="60" />
  <h1 style="font-size: 34px; margin: 0; padding: 0; border: 0">KodaRPC</h1>
</div>
Fast, Lightweight and Secure RPC Protocol

## Usage
Write Schema
```
svc PetService {
  getById(id: number): Pet;
}

contract Pet {
  number id;
  string name;
  boolean hello;
  Pet pet;
}

```

Install CLI
```bash
npm install -g @koda-rpc/cli
```

Install client
```bash

```
