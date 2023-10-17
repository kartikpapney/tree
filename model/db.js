import { Sequelize, DataTypes } from 'sequelize';
import {ENV} from '../constant.js' 

export const db = new Sequelize(ENV.db, ENV.dbUser, ENV.dbPassword, {
    host: ENV.dbHost,
    dialect: ENV.dbDialect
});

const TreeNode = db.define('TreeNode', {
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

TreeNode.hasMany(TreeNode, {
    foreignKey: 'parent',
    as: 'children',
    onDelete: 'CASCADE'
});

TreeNode.belongsTo(TreeNode, {
    foreignKey: 'parent',
    as: 'parentNode'
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error({error});
    });

db.sync().then(() => {
    console.log('Models synchronized with the database.');
});
  
export default TreeNode;
