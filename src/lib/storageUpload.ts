export async function uploadFileViaServer(file: File, storagePath: string): Promise<string> {
  const response = await fetch('/api/storage/upload', {
    method: 'POST',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'x-upload-path': storagePath,
      'x-file-name': file.name,
    },
    body: await file.arrayBuffer(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data?.url) {
    throw new Error('Upload succeeded but no file URL was returned.');
  }

  return data.url as string;
}