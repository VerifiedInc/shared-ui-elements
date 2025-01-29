import { ChangeEvent } from 'react';

// This function receives a file input, it will compress and generate a base64 of image.
export function handleLoadImageToBase64FromFile(
  event: ChangeEvent<HTMLInputElement>,
  sizeLimit?: number,
): Promise<string | null> {
  return new Promise((resolve) => {
    if (!event.target.files) return resolve(null);

    const file = event.target.files[0];

    // Check if a file was selected.
    if (!file) return resolve(null);

    // Check if the selected file is an image.
    if (!file.type.startsWith('image/')) return resolve(null);

    // If size limit set, handle validation here.
    if (sizeLimit && file.size > sizeLimit) return resolve(null);

    const reader = new FileReader();

    // Read the selected file as a data URL
    reader.onload = function (progressEvent) {
      const img = new Image();

      // When the image is loaded, compress it to 80% and convert it back to base64.
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas dimensions.
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image to be compressed on the canvas.
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get the base64 representation of the compressed image.
        const base64 = canvas.toDataURL('image/jpeg', 0.8);

        return resolve(base64);
      };

      // Load base64 image.
      img.src = String(progressEvent.target?.result);
    };

    // Handle cases where there are errors or is aborted.
    reader.onerror = () => resolve(null);
    reader.onabort = () => resolve(null);

    // Load file.
    reader.readAsDataURL(file);
  });
}
