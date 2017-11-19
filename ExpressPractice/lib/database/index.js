'use strict';

const Promise = require('bluebird');

const loki = require('lokijs');
const db = new loki('beers.db');

const getOrAddCollection = (collectionName) => {
  return db.getCollection(collectionName) === null
    ? db.addCollection(collectionName) : db.getCollection(collectionName);
};

const insert = (obj, collectionName) => {
  let result;

  const collection = getOrAddCollection(collectionName);

  try {
    result = collection.insert(obj);
  } catch (err) {
    return Promise.reject(new Error(`Error inserting to ${collectionName}`, err));
  }

  if(result !== null) {
    return Promise.resolve(result);
  } else {
    return Promise.reject(new Error(`Insert to ${collectionName} failed with unknown error`));
  }
};

const findOne = (criteria, collectionName) => {
  let result;

  const collection = getOrAddCollection(collectionName);

  try {
    result = collection.findOne(criteria);
  } catch (err) {
    return Promise.reject(new Error(`Error findOne from ${collectionName}`, err));
  }

  if(result !== null) {
    return Promise.resolve(result);
  } else {
    return Promise.reject(new Error(`FindOne from ${collectionName} failed with unknown error`));
  }
};

const update = (criteria, obj, collectionName) => {
  let result;

  const collection = getOrAddCollection(collectionName);

  try {
    collection.findAndUpdate(criteria, (data) => {
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
          data[key] = obj[key];
        }
      }
    });
    result = collection.findOne(criteria);
  } catch (err) {
    return Promise.reject(new Error(`Error updating to ${collectionName}`, err));
  }

  if(result !== null) {
    return Promise.resolve(result);
  } else {
    return Promise.reject(new Error(`Update to ${collectionName} failed with unknown error`));
  }
};

const remove = (criteria, collectionName) => {
  const collection = getOrAddCollection(collectionName);

  try {
    collection.findAndRemove(criteria);
  } catch (err) {
    return Promise.reject(new Error(`Error removing from ${collectionName}`, err));
  }

  let remaining = collection.find(criteria);

  if(remaining.length > 0) {
    return Promise.reject(new Error(`Remove from ${collectionName} failed with unknown error`));
  } else {
    return Promise.resolve();
  }
};

module.exports = {
  insert,
  findOne,
  update,
  remove,
};