# e-commerce

<!--
| Base Routes   | HTTP          | 
| ------------- |:-------------:|  
| /products     |GET,POST,DELETE|
| /cart         |GET| |
| ^ |  | |
| ^ |  | |
| /users | GET | Get all product list , No Need login | 
| /transactions | PATCH | Get all product list <br> Authorization required | -->

## Products route
### Get Products List 
```sh
GET /products
```
* Headers : none
* Body    : none
* Description: Get all products list
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


Example
```
Response:
    [{
        "_id": "5cbc9e6fd033ae2f095ad910",
        "name": "corgi",
        "price": 1xxxxxxxx,
        "stock": 1,
        "seller": "5cbc7e98a793a11ef83eaf8b",
        "imageUrl": "https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg",
        "__v": 0
    }]
```

### Get Specific Product 
```sh
GET /products/:id
```
* Headers : none
* Body    : none
* Description: Get a product information based on objectId
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```
Response:
    {
        "_id": "5cbc9e6fd033ae2f095ad910",
        "name": "corgi",
        "price": 1xxxxxxxx,
        "stock": 1,
        "seller": "5cbc7e98a793a11ef83eaf8b",
        "imageUrl": "https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg",
        "__v": 0
    }

```

### Get Specific Product 
```sh
GET /products/seller
```
* Headers : {token}
* Body    : none
* Description: Get all products by specific user/seller
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


Example
```
Response:
    [{
        "_id": "5cbc9e6fd033ae2f095ad910",
        "name": "corgi",
        "price": 1xxxxxxxx,
        "stock": 1,
        "seller": "5cbc7e98a793a11ef83eaf8b",
        "imageUrl": "https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg",
        "__v": 0
    },
    {
        "_id": "5cbc9e6fd033ae2f095ad910",
        "name": "corgi",
        "price": 1xxxxxxxx,
        "stock": 1,
        "seller": "5cbc7e98a793a11ef83eaf8b",
        "imageUrl": "https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg",
        "__v": 0
    }]
```


### Register New Product 
```sh
POST /products
```
* Headers : {token}
* Body    : {data, picture}
* Description: Register a product to database, also upload picture, get imageUrl from server.
* Success : status 201, {created}
* Error : status 500, {error, message}

```
Response: 
{
        "_id": "5cbc9e6fd033ae2f095ad910",
        "name": "corgi",
        "price": 1xxxxxxxx,
        "stock": 1,
        "seller": "5cbc7e98a793a11ef83eaf8b",
        "imageUrl": "https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg",
        "__v": 0
    }
```
<!--
### Edit Product Data 
```sh
PATCH /products
```
* Headers : 
* Body    :
* Description: 
* Success :
* Error :


Example
```

```
-->

### Delete Existing Product Data Based on Id
```sh
DELETE /products/:id
```
* Headers : {token}
* Body    : none
* Description: Need authorization
* Success : status 204
* Error : status 500


Example
```
{
    "message": "successfully delete product
}

```

## User Route
### Register New User

### Create New Account 
```sh
POST /users/register
```
* Headers : none
* Body    : {}
* Description: Sign up, save data to database if successfull.
* Success : status(201), return {created_object}
* Error : status(500), {error, message}


Example
```

```

### Login
```sh
POST /users/login
```
* Headers : none 
* Body    : {email, password}
* Description: Login user
* Success : Status 200
* Error : Status 401


Example
```
Response: {token}
```

## Cart Routes
### Add item to cart
```sh
POST /cart
```
* Headers : {token}
* Body    : {data}
* Description: Add item to cart
* Success : Status(201), dataTypes: {}
* Error : Status(500), dataTypes: {err}


### Get all user's cart data from server
```sh
GET /cart
```
* Headers : {token}
* Body    : none
* Description: returns an array of cart data
* Success : Status(200), dataTypes: {}
* Error : Status(500), dataTypes: {err}

Example
```
 [{ _id: 5cbcc549ba41024e0b54ddff,
    product:
     { _id: 5cbc9e6fd033ae2f095ad910,
       name: 'corgi',
       price: 135123,
       stock: 1,
       seller: 5cbc7e98a793a11ef83eaf8b,
       imageUrl:
        'https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555865191515corgi.jpeg',
       __v: 0 },
    quantity: 1,
    user: 5cbc7e98a793a11ef83eaf8b,
    __v: 0 },
  { _id: 5cbcca00ba41024e0b54de00,
    product:
     { _id: 5cbca1da96ce05319af495dd,
       name: 'barang bagus',
       stock: 123,
       price: 123566,
       seller: 5cbc7e98a793a11ef83eaf8b,
       imageUrl:
        'https://storage.googleapis.com/ecommerce-data-kcx9c9vasdfj/1555866071002corgi.jpeg',
       __v: 0 },
    quantity: 2,
    user: 5cbc7e98a793a11ef83eaf8b,
    __v: 0 } ]
```

### Delete Item from Cart
```sh
DELETE /cart/:id
```
* Headers : {token}
* Body    : {data}
* Description: delete cart item by Id
* Success : Status(201), {created}
* Error : Status(500), {err, message}


