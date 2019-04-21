# e-commerce

| Base Routes        | HTTP           | Description |
| ------------- |:-------------:| :---:| ---- | --- | --- | ---|
| /products | GET|Create new product, Login required |
| ^ | | |
| ^ |  | |
| ^ |  | |


| /users | GET | Get all product list , No Need login | 
| /transactions | PATCH | Get all product list <br> Authorization required |

## Products route
### Get Products List 
```sh
GET /products
```
* Headers : 
* Body    :
* Description: 
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}


Example
```

```

### Get Specific Product 
```sh
GET /products/:id
```
* Headers : 
* Body    : 
* Description: 
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


Example
```


```

### Create New Product 
```sh
POST /products
```
* Headers : 
* Body    :
* Description: 
* Success : status 201
* Error : status 500


Example
```

```

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

### Delete Existing Product Data
```sh
DELETE /products
```
* Headers : 
* Body    :
* Description: 
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

### Create New Product 
```sh
POST /users
```
* Headers : 
* Body    :
* Description: 
* Success :
* Error :


Example
```

```

### Login
```sh
POST /users/login
```
* Headers : 
* Body    :
* Description: 
* Success : Status 200
* Error : Status 401


Example
```

```

### Register
```sh
POST /users/register
```
* Headers : 
* Body    :
* Description: 
* Success : Status(201), dataTypes: {}
* Error : Status(500), dataTypes: {err}


Example
```

```


### Register
```sh
POST /users/register
```
* Headers : 
* Body    :
* Description: 
* Success : Status(201), dataTypes: {}
* Error : Status(500), dataTypes: {err}


Example
```

```

### Add Items Cart
```sh
PATCH /users/cart/:id
```
* Headers : 
* Body    :
* Description: 
* Success : Status(201), dataTypes: {}
* Error : Status(500), dataTypes: {err}


Example
```

```


