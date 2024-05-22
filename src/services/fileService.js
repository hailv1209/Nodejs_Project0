const path = require('path');

const uploadSingleFile = async (fileObject) => {
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const filePath = path.join(__dirname, '../public/images/upload/');
    const timestamps = Date.now()
    const filename = fileObject.name.split('.')[0] + `-${timestamps}` +'.'+fileObject.name.split('.')[1]
    let uploadPath = filePath + filename;

  // Use the mv() method to place the file somewhere on your server
  try {
    await fileObject.mv(uploadPath);
    return {
        status: 'success',
        path : uploadPath,
        filename: filename,
        error: null
    };
} catch (err) {
    console.log(">>>>> check error : ", err);
    return {
        status: 'failed',
        path: null,
        filename: filename,
        error: JSON.stringify(err)
    };
}

}

const uploadMultipleFiles = async (fileObjectList) => {
 
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const filePath = path.join(__dirname, '../public/images/upload/');
    const timestamps = Date.now()
    const arrayResults = []
    for (const fileObject of fileObjectList) {
        if(Array.isArray(fileObject)) {
            for (file of fileObject) {
                const filename = file.name.split('.')[0] + `-${timestamps}` +'.'+file.name.split('.')[1]
        let uploadPath = filePath + filename;
    
      // Use the mv() method to place the file somewhere on your server
      try {
        await file.mv(uploadPath);
         arrayResults.push({
            status: 'success',
            path : uploadPath,
            filename: filename,
            error: null
        })
    } catch (err) {
        console.log(">>>>> check error : ", err);
         arrayResults.push({
            status: 'failed',
            path: null,
            filename: filename,
            error: JSON.stringify(err)
        })
    }
            }
        }else{
            let result = await uploadSingleFile(fileObject)
            arrayResults.push(result)
        }
        
    
    }
    return arrayResults
}


module.exports = {
    uploadSingleFile, 
    uploadMultipleFiles
}