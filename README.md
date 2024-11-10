# rest-API-Assignment


## Runing the code

1. Clone the repository 
2. Create a .env file in the root directory with the template given in the .env-template file. The values should specify the host, database, and user and password to connect to your database.
3. npm install
4. npm start


## REST Endpoints


| Method        | Endpoint           | Parameters  | Description  |
| ------------- |:-------------:| -----:| -----:|
| GET  | api/resources |  | Find the list of all records in the endpoint.|
| GET    | `/`                    |                              | Basic route to check if the server is running. Responds with a simple message.                   |
| GET    | `/api/items`           | `item_name` (query)         | Fetches all items or filters by `item_name` if provided.                                        |
| GET    | `/api/items/:id`       | `id` (path)                 | Retrieves details of a specific item by its `id`.                                               |
| POST   | `/api/items`           | `item_name`, `quantity`, `price`, `supplier_id`, `supplier_price` (body) | Adds a new item to the database. Returns the added item details, including the generated `id`.  |
| PUT    | `/api/items`           | `id` (query), `quantity` (body) | Updates the `quantity` of a specific item based on the provided `id`. Returns a success message or error if not found. |
| DELETE | `/api/items`           | `id` (query)                | Deletes a specific item based on the provided `id`. Returns a success message or error if not found. |
| GET    | `/api/suppliers`       | `supplier_name` (query)     | Fetches all suppliers or filters by `supplier_name` if provided.                                |
| GET    | `/api/suppliers/:id`   | `id` (path)                 | Retrieves details of a specific supplier by their `id`.                                         |
| POST   | `/api/suppliers`       | `supplier_name`, `address`, `owner_name` (body) | Adds a new supplier to the database. Returns the added supplier details, including the generated `id`. |
| PUT    | `/api/suppliers`       | `id` (query), `supplier_name`, `address`, `owner_name` (body) | Updates an existing supplier’s details based on the provided `id`. Returns a success message or error if not found. |
| DELETE | `/api/suppliers`       | `id` (query)                | Deletes a specific supplier based on the provided `id`. Returns a success message or error if not found. |
