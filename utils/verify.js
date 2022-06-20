function isImage(url) {
  if (typeof url !== "string") {
    return false;
  }
  return (
    url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null
  );
}

  export  {isImage}