
import { HTTP } from './constant.js';
import app from './index.js'
import request from 'supertest'

var constructRandomParentIndexTree = () => {
  let length = Math.floor(Math.random() * 10)+1;
  const firstNames = ['John', 'Andy', 'Joe', 'Michael', 'Chris', 'David', 'Daniel', 'Mark', 'Paul', 'Steven'];
  const lastNames = ['Johnson', 'Smith', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  const names = Array.from({ length: length }, () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`);

  const arr = new Array(length);
  arr[0] = -1;
  for(let index=1; index<arr.length; index++) {
    arr[index] = Math.floor(Math.random() * index);
  }
  return {
    arr, names
  };
};

describe('Tree API Tests', () => {

  test(`${HTTP.notFound} status should be returned in case of wrong request`, async () => {
    const response = await Promise.all(
      [
        request(app).post('/api').send({}),
        request(app).post('/api/tree2/').send({}),
        request(app).get('/api/tree2/'),
        request(app).get('/api/'),
        request(app).patch('/api/tree2/'),
        request(app).delete('/api/')
      ]
    )
    
    response.forEach((element) => {
      expect(element.statusCode).toBe(HTTP.notFound);
    })
    

  }),

  test(`DELETE /api/tree Deleting all nodes from Tree`, async () => {

    var getResponse = await request(app).get('/api/tree')
    expect(getResponse.statusCode).toBe(HTTP.ok);
    expect(getResponse.body).toBeInstanceOf(Array);
    const nodeIds = getResponse.body.map((element) => {
      const key = Object.keys(element);
      expect(key.length).toBe(1);
      const node = key[0];
      expect(node).toMatch(/\b\d+\b/);
      return parseInt(node);
    })
    while(nodeIds.length != 0) {
      const _id = nodeIds.pop();
      const deleteResponse = await request(app).delete('/api/tree').send({"_id": _id});
      expect(deleteResponse.statusCode).toBe(HTTP.noContent);
    }
  }),


  test(`POST /api/tree should return ${HTTP.badRequest} in case of wrong request body`, async () => {
    const response = await Promise.all(
      [
        request(app).post('/api/tree').send({}),
        request(app).post('/api/tree').send({parent: "string"}),
        request(app).post('/api/tree').send({parent: "string"}),
        request(app).post('/api/tree').send({label: 1})
      ]
    )
    
    response.forEach((element) => {
      expect(element.statusCode).toBe(HTTP.badRequest);
    })
    
  }),

  test(`POST | GET /api/tree Constructing a tree then Getting it; Correct tree should be returned on Get`, async () => {
    var {arr: parentIdx, names} = constructRandomParentIndexTree();
    var getNodeIdFromIndex = {};
    var getNodeIndexFromId = {};
    for(let idx=0; idx<parentIdx.length; idx++) {
      const node = parentIdx[idx];
      const label = names[idx];
      const parentNode = getNodeIdFromIndex[node];
      let postResponse;
      if(idx == 0) {
        postResponse = await request(app).post('/api/tree').send({label})
      } else {
        postResponse = await request(app).post('/api/tree').send({label, parent: parentNode})
      }
      expect(postResponse.statusCode).toBe(HTTP.ok);
      expect(typeof postResponse.body._id).toBe('number');
      getNodeIdFromIndex[idx] = postResponse.body._id;
      getNodeIndexFromId[`${postResponse.body._id}`] = idx;
    }

    var getResponse = await request(app).get('/api/tree')
    expect(getResponse.statusCode).toBe(HTTP.ok);
    expect(getResponse.body).toBeInstanceOf(Array);
    
    
    const dataQueue = getResponse.body.map((nodeObject) => {
      return {
        parent: null,
        nodeObject
      }
    })

    while(dataQueue.length != 0) {
      const {nodeObject, parent} = dataQueue.pop();
      expect(nodeObject).toBeInstanceOf(Object);
      const key = Object.keys(nodeObject);
      expect(key.length).toBe(1);


      const currentNodeId = key[0];
      const currentNodeIndex = getNodeIndexFromId[currentNodeId];
      if(parent) expect(`${getNodeIdFromIndex[parentIdx[currentNodeIndex]]}`).toBe(parent);
      const value = Object.values(nodeObject)[0];
      
      
      expect(value).toHaveProperty('label');
      expect(typeof value['label']).toBe('string');
      expect(value).toHaveProperty('children');
      expect(value['children']).toBeInstanceOf(Array);
      
      // Pushing children Nodes
      value['children'].map((childObject) => {
        dataQueue.push({
          parent: currentNodeId,
          nodeObject: childObject
        })
      })
    }


  })
  ,
  test(`DELETE /api/tree Deleting a node should delete it's child nodes also; ${HTTP.noContent} status should be returned on successful deletion`, async () => {

    var getResponse = await request(app).get('/api/tree')
    expect(getResponse.statusCode).toBe(HTTP.ok);
    expect(getResponse.body).toBeInstanceOf(Array);
    const nodeIds = getResponse.body.map((element) => {
      const key = Object.keys(element);
      expect(key.length).toBe(1);
      const node = key[0];
      expect(node).toMatch(/\b\d+\b/);
      return parseInt(node);
    })
    while(nodeIds.length != 0) {
      const _id = nodeIds.pop();
      const deleteResponse = await request(app).delete('/api/tree').send({"_id": _id});
      expect(deleteResponse.statusCode).toBe(HTTP.noContent);
    }
  }),

  test(`GET /api/tree Should Return ${HTTP.ok} status and an empty Array because no node is present`, async () => {

    var response = await request(app).get('/api/tree')
    expect(response.statusCode).toBe(HTTP.ok);
    expect(response.body).toEqual([])
    
  }),

  test(`DELETE /api/tree should return ${HTTP.notFound} in case node doesn't exist`, async () => {
    const response = await request(app).delete('/api/tree').send({_id: -1});
    expect(response.statusCode).toBe(HTTP.notFound);
  })
});
