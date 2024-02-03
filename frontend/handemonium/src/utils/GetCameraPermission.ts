async function ensurePermission(): Promise<MediaStream> {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Check if permission was granted
        if (mediaStream) {
            // Your existing code for setting up the videoElement and capturing the image
            return mediaStream;
        } else {
            // Handle permission denied
            console.error('Camera permission denied');
            throw new Error('Camera permission denied');
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        throw error;
    }
}