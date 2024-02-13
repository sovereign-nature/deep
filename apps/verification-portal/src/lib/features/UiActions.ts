export const shareFile = async (
  fileUrl: string,
  name: string,
  message: string
) => {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fileData = await response.blob();
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (
      isMobile &&
      navigator.share &&
      navigator.canShare({ files: [new File([], 'test')] })
    ) {
      const fileWithProperties = new File([fileData], `${name}.png`, {
        lastModified: Date.now(),
        type: fileData.type,
      });
      try {
        await navigator.share({
          files: [fileWithProperties],
          text: message,
          title: name,
        });
      } catch (err) {
        console.error('Error sharing the file:', err);
        downloadFile(fileData, name);
      }
    } else {
      downloadFile(fileData, name);
    }
  } catch (err) {
    console.error('Error fetching the file:', err); //TODO: Add callback for retry and UX error handling
  }
};

export const downloadFile = async (fileData: Blob, name: string) => {
  const url = URL.createObjectURL(fileData);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.png`;
  link.click();
  URL.revokeObjectURL(url);
};
