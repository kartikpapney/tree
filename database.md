# DATABASE

The TreeNode Table represents the hierarchical tree structure. Each row has a label, a unique identifier (_id), and an optional reference to its parent node in case the node is not the root of the tree.

Becase there's a relationship between parent and child not so choosing a relational database will keep the foreign key constraints and will give good transactional guarantess compared to a nosql database.

## Properties
```
label: 
    The label or name of the tree node.
    Type: STRING
    Constraints: Cannot be null.

_id: 
    The unique identifier of the tree node.
    Type: INTEGER
    Constraints: Primary key, auto-incremented, cannot be null.

parent: 
    The reference to the parent node.
    Type: INTEGER
    Constraints: Can be null, allowing for root nodes.

```

## Relationship

```
children: 
    One-to-Many relationship with TreeNode.
    Description: 
        A tree node can have multiple child nodes.
    On Delete: 
        Cascade (i.e., if a parent node is deleted, its children are also deleted).

parentNode: 
    Many-to-One relationship with TreeNode.
    Description: 
        A tree node belongs to a single parent node.
```

## Query
```js
// Queries are written using Sequelize ORM

// To create Root Node
const rootNode = await TreeNode.create({ label: 'Root Node' });

// To create children of Root Node
const childNode = await TreeNode.create({ label: 'Child Node', parent: rootNode._id });

// To delete a node Children will be automatically deleted
const rowDeleted = await TreeNode.destroy({
        where: {
            _id: _id
        }
    })

// To get all nodes. Tree will be constructed using constructTree function written in utils.js file 
const allNodes = await TreeNode.findAll({order: ['_id']});

```

