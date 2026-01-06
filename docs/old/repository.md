| Aspect        | `AccountRepository` (domain)                 | `AccountQuery` (application)                    |
| ------------- | -------------------------------------------- | ----------------------------------------------- |
| Layer         | **Domain** (interface), infra (impl)         | **Application** (interface), infra (impl)       |
| Used for      | Commands, domain services, invariants        | Queries, API read endpoints                     |
| Returns       | `Account` aggregate (rich model)             | DTOs / projections (`AccountListItemDto`, etc.) |
| Shape of data | Domain-centric                               | UI/API-centric, optimized for read              |
| Connection    | Usually **write** (and sometimes read in tx) | Usually **read** connection                     |
| Changes when… | Business rules change                        | UI/API or reporting needs change                |
