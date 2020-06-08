(async () => {
    // Load model
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');
    await faceapi.loadFaceRecognitionModel('/models');

    console.log(faceapi);

    // await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    // await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    // await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

    // Detect Face
    const input = document.getElementById("myImg");

    let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
    fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions);

    const canvas = document.getElementById("myCanvas");
    faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
    faceapi.draw.drawLandmarks(canvas, fullFaceDescriptions);


    // const result = await faceapi
    //     .detectSingleFace(input, new faceapi.SsdMobilenetv1Options())
    //     .withFaceLandmarks()
    //     .withFaceDescriptor();
    // const displaySize = {
    //     width: input.width,
    //     height: input.height
    // };
    // // resize the overlay canvas to the input dimensions
    // const canvas = document.getElementById("myCanvas");
    // faceapi.matchDimensions(canvas, displaySize);
    // const resizedDetections = faceapi.resizeResults(result, displaySize);
    // console.log(resizedDetections);
})();

// async function detectNancyFace() {
//     const label = "Nancy";
//     const numberImage = 5;
//     const descriptions = [];
//     for (let i = 1; i <= numberImage; i++) {
//         const img = await faceapi.fetchImage(
//             `http://localhost:5500/data/Nancy/${i}.jpg`
//         );
//         const detection = await faceapi
//             .detectSingleFace(img).withFaceLandmarks()
//             .withFaceDescriptor();
//         descriptions.push(detection.descriptor);
//     }
//     return new faceapi.LabeledFaceDescriptors(label, descriptions);
// }

// (async () => {
//     // Load model
//     await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
//     await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
//     await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//     // Detect Face
//     const input = document.getElementById("myImg");
//     const result = await faceapi
//         .detectSingleFace(input, new faceapi.SsdMobilenetv1Options())
//         .withFaceLandmarks()
//         .withFaceDescriptor();
//     const displaySize = {
//         width: input.width,
//         height: input.height
//     };
//     // resize the overlay canvas to the input dimensionsconst
//     canvas = document.getElementById("myCanvas");
//     faceapi.matchDimensions(canvas, displaySize);
//     const resizedDetections = faceapi.resizeResults(result, displaySize);
//     console.log(resizedDetections);
//     // Recognize Face
//     const labeledFaceDescriptors = await detectNancyFace();
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);
//     if (result) {
//         const bestMatch = faceMatcher.findBestMatch(result.descriptor);
//         const box = resizedDetections.detection.box;
//         const drawBox = new faceapi.draw.DrawBox(box, {
//             label: bestMatch.label
//         });
//         drawBox.draw(canvas);
//     }
// })();