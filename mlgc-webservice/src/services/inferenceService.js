const tf = require('@tensorflow/tfjs-node');

async function modelPredict(model, image) {
    const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Cancer', 'Non-cancer'];
    let label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';
    if(confidenceScore == 0){
      label = "failed"
      suggestion = "failed"
    }

  let suggestion;
  if (label == 'Cancer') {
    suggestion = "Segera periksa ke dokter!";
  } else if (label == 'Non-cancer'){
    suggestion = "Anda sehat!";
  }

  return { confidenceScore, label, suggestion };


}

module.exports = modelPredict;
