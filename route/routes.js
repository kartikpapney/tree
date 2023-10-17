import express from 'express';
import {addNode, deleteNode, getTree} from '../controller/controller.js';
import validate from '../joi/joi.middleware.js';
import schemas from '../joi/joi.schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await getTree();
    res
    .status(result.status)
    .json(result.message);
});

router.post('/', validate(schemas.addNode), async (req, res) => {
    const result = await addNode(req.body);
    res
    .status(result.status)
    .json(result.message);
});


router.delete('/', validate(schemas.removeNode), async (req, res) => {
    const result = await deleteNode(req.body);
    res
    .status(result.status)
    .json(result.message);
});

export default router;