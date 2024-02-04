// Capture and send image to backend
export const captureAndSendImage = async (
  backendIp: string
): Promise<any[]> => {
  try {
    // Get media stream from user's camera
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    // Create video element and append it to the document body
    const videoElement = document.createElement("video");
    document.body.appendChild(videoElement);

    // Set the media stream as the source of the video element
    videoElement.srcObject = mediaStream;

    // Return a promise that resolves with the result of image capture
    return new Promise((resolve, reject) => {
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play();

        // Create a canvas element with the same dimensions as the video
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Get the 2D rendering context of the canvas
        const context = canvas.getContext("2d");

        // Check if context was obtained
        if (!context) {
          reject(new Error("Unable to obtain 2D rendering context."));
          return;
        }

        // Function to capture the image from the video
        const captureImage = () => {
          context.drawImage(videoElement, 0, 0);

          // Get the image data from the canvas as PNG
          const url = canvas.toDataURL();
          const file = dataURItoBlob(url);
          mediaStream.getTracks().forEach((track) => track.stop());

          // Send the captured image to the backend server
          sendImageToBackend(file, backendIp)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        };

        // Delay the image capture by 1 second to allow video to stabilize
        setTimeout(captureImage, 1000);
      });
    });
  } catch (error) {
    throw error;
  }
};

const dataURItoBlob = function (dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString: string;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

// Send the captured image to the backend server
const sendImageToBackend = async (imageFile: Blob, backendIp: string) => {
  try {
    const form = new FormData();
    form.append("file", imageFile);

    // Make the fetch request with FormData
    const response = await fetch(backendIp + "/scan", {
      method: "POST",
      body: form,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    throw error;
  }
};
