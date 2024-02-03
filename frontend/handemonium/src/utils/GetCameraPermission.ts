// Test that browser allows camera permission
export async function ensurePermission(): Promise<MediaStream> {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Check if permission was granted
        if (mediaStream) {
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