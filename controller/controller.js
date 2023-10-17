import { HTTP } from "../constant.js";
import TreeNode from "../model/db.js";
import { constructTree } from "../utils.js";

export const addNode = async (data) => {
    try {
        const { parent, label } = data;
        const result = await TreeNode.create({
            parent,
            label,
        })
        return {
            status: HTTP.ok,
            message: result
        }
    } catch (e) {
        return {
            status: HTTP.badRequest,
            message: 'Bad Request'
        }
    }
}

export const getTree = async () => {
    const result = await TreeNode.findAll({order: ['_id']});
    const nodes = result.map(node => node.get({ plain: true }));
    const data = constructTree(nodes);
    return {
        status: HTTP.ok,
        message: data
    };
};


export const deleteNode = async(data) => {
    try {
        const {_id} = data;
        const rowDeleted = await TreeNode.destroy({
            where: {
                _id: _id
            }
        })
        if(rowDeleted == 1) {
            return {
                status: HTTP.noContent
            }
        } else {
            return {
                status: HTTP.notFound,
                message: `No node present with _id=${_id}`
            }
        }
    } catch (e) {
        return {
            status: HTTP.notAvailable,
            message: "Service Not Avalaible"
        }
    }
}