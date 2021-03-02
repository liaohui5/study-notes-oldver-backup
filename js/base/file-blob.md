> 如何获取到一个 File 对象

1. 文件上传

```html
<input type="file" id="file" />
<script>
  const handler = (e) => {
    console.log(e.target.files[0]);
  };
  document.querySelector("#file").addEventListener("change", handler, false);
</script>
```

2. 将 Blob 对象转 File 对象(实例化)

```js
// const file = new window.File(Blob对象, '文件名', {type: '文件类型'} )
const file = new File(blobObject, "filename", {
  type: "image/png",
});
```

> 如何将 File 对象转 Blob

- 利用 `FileReader` 对象

```js
// 将文件对象转换为指定数据
const transformFileTo = (file, target = "blob") => {
  if (!(file instanceof window.File)) {
    throw new TypeError("The paramter must be instance of File");
  }

  const allowTypeMap = {
    blob: "readAsBinaryString",
    base64: "readAsDataURL",
    ArrayBuffer: "readAsArrayBuffer",
  };

  if (!Object.keys(allowTypeMap).includes(target)) {
    throw new TypeError(
      "Only supports conversion to blob, base64 or ArrayBuffer"
    );
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader[allowTypeMap[target]](file);
    reader.onloadend = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
  });
};

// 将Blob对象转换为指定数据
const transformBlobTo = (blob, target = "file") => {
  if (!(blob instanceof window.Blob)) {
    throw new TypeError("The paramter must be instance of Blob");
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    if (target === "file") {
      const filename = Math.random().toString(36).substr(2);
      return resolve(new window.File([blob], filename, { type: blob.type }));
    }

    if (target === "base64") {
      reader.readAsDataURL(blob);
    } else if (target === "ArrayBuffer") {
      reader.readAsArrayBuffer(blob);
    } else {
      throw new Error(
        "Only supports conversion to file, base64 or ArrayBuffer"
      );
    }
    reader.onloadend = (e) => resolve(e.target.result);
  });
};
```
