# Tree Structure
The Tree Structure API can be used to manage hierarchical data efficiently, providing endpoints for creating, retrieving, and deleting nodes in a tree structure. You can maintain multiple trees.

The POST /api/tree endpoint allows you to add nodes to the tree, while GET /api/tree retrieves the entire tree in a structured format. Additionally, the DELETE /api/tree endpoint facilitates the removal of nodes and all of it's children recursively. 
## Tech Stack
```js
Node.js
Postgres
```

## API Structure
### 1. `POST /api/tree` return the entire tree - in the following format;

```json
// For Root Node

{
    "label": "Daniel Johnson"
}

// For Childrens
{
    "parent": 1794,
    "label": "David Moore"
}

```

### 2. `GET /api/tree` return the entire tree - in the following format;

```json
[
    {
        "1794": {
            "label": "David Moore",
            "children": [
                {
                    "1795": {
                        "label": "Daniel Johnson",
                        "children": []
                    }
                },
                {
                    "1796": {
                        "label": "Joe Smith",
                        "children": [
                            {
                                "1797": {
                                    "label": "Daniel Miller",
                                    "children": [
                                        {
                                            "1798": {
                                                "label": "John Johnson",
                                                "children": []
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "1799": {
                                    "label": "Joe Davis",
                                    "children": []
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
]
```


### 3. `DELETE /api/tree` delete the tree with given node all childrens of the given node will be deleted;

```json
{
    "_id": 556
}
```

## How to run the application

### Prerequisite
```
Node.js
npm
Postgres (Configuration should be given in env file)
```

### Steps
```
Step 1: Clone the repo & move to /javascript directory 
Step 2: npm i 
Step 3: Start postgres into your machine
Step 4: Copy sample.env into .env in same directory and provide configuration in the .env file 
Step 5: npm start (To run server)
Step 6: npm test (To run test cases)
```
