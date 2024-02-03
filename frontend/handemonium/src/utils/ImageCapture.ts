// Capture and send image to backend
export const captureAndSendImage = async (backendIp: string): Promise<any[]> => {
  try {
    // Get media stream from user's camera
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Create video element and append it to the document body
    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);

    // Set the media stream as the source of the video element
    videoElement.srcObject = mediaStream;

    // Return a promise that resolves with the result of image capture
    return new Promise((resolve, reject) => {
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();

        // Create a canvas element with the same dimensions as the video
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Get the 2D rendering context of the canvas
        const context = canvas.getContext('2d');

        // Check if context was obtained
        if (!context) {
          reject(new Error('Unable to obtain 2D rendering context.'));
          return;
        }

        // Function to capture the image from the video
        const captureImage = () => {
          context.drawImage(videoElement, 0, 0);

          // Get the image data from the canvas as PNG
          const imageData = canvas.toDataURL('image/png');
          mediaStream.getTracks().forEach((track) => track.stop());

          // Send the captured image to the backend server
          sendImageToBackend(imageData, backendIp)
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

// Send the captured image to the backend server
const sendImageToBackend = async (imageData: string, backendIp: string): Promise<any> => {
  const response = await fetch(backendIp + '/scan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: btoa(imageData) }),
  });
  return await response.json();
};

