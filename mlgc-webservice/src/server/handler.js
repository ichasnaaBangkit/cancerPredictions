const modelPredict = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

const predictionHistories = [];

async function postPredict(req, h) {
  const { image } = req.payload;

  const { model } = req.server.app;
  const { confidenceScore, label, suggestion } = await modelPredict(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };

  predictionHistories.push(data);

  // await storeData(id, data);
  // console.log("masuk1");

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully',
    data,
  });
  response.code(201);
  return response;
}

async function getHistories(req, h) {
  try {
    const data = predictionHistories.map((history) => ({
      id: history.id,
      history: {
        result: history.result,
        createdAt: history.createdAt,
        suggestion: history.suggestion,
        id: history.id,
      },
    }));

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  } catch (error) {
    return h.response({message: error.message});
  }
}

module.exports = {
  getHistories,
  postPredict,
};