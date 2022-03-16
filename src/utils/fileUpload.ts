export const soundFileTypes = ["audio/mpeg", "audio/wav"];

export function validFileType(file: File, fileTypes: string[]) {
  return fileTypes.includes(file.type)
}

export function returnFileSize(number: number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
