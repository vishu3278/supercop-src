const permFolder = '';
const permFile = '';

function getPermFolder () {
    let path = cordova.file.dataDirectory;
    //save the reference to the folder as a global app property
    resolveLocalFileSystemURL(
      path,
      dirEntry => {
        //create the permanent folder
        dirEntry.getDirectory(
          "images",
          { create: true },
          permDir => {
            permFolder = permDir;
            console.log("Created or opened", permDir.nativeURL);
          },
          err => {
            console.warn("failed to create or open permanent image dir");
          }
        );
      },
      err => {
        console.warn("We should not be getting an error yet");
      }
    );
  }

function copyFile (ev, url) {
    ev.preventDefault();
    ev.stopPropagation();
    //copy the temp image to a permanent location
    let fileName = Date.now().toString() + ".jpg";

    resolveLocalFileSystemURL(
      url,
      entry => {
        //we have a reference to the temp file now
        console.log(entry);
        console.log("copying", entry.name);
        console.log(
          "copy",
          entry.name,
          "to",
          permFolder.nativeURL + fileName
        );
        //copy the temp file to app.permFolder
        entry.copyTo(
          permFolder,
          fileName,
          permFile => {
            //the file has been copied
            //save file name in localstorage
            let path = permFile.nativeURL;
            localStorage.setItem(app.KEY, path);
            permFile = permFile;
            console.log(permFile);
            console.log("add", permFile.nativeURL, "to the 2nd image");
            document.getElementById("imgFile").src = permFile.nativeURL;
            //delete the old image file in the app.permFolder
            
          },
          fileErr => {
            console.warn("Copy error", fileErr);
          }
        );
      },
      err => {
        console.error(err);
      }
    );
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
 
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
 
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
 
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
 
            var byteArray = new Uint8Array(byteNumbers);
 
            byteArrays.push(byteArray);
        }
 
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
 
/**
 * Create a PDF file according to its database64 content only.
 * 
 * @param folderpath {String} The folder where the file will be created
 * @param filename {String} The name of the file that will be created
 * @param content {Base64 String} Important : The content can't contain the following string (data:application/pdf;base64). Only the base64 string is expected.
 */
function savebase64AsPDF(folderpath,filename,content,contentType){
    // Convert the base64 string in a Blob
    var DataBlob = b64toBlob(content,contentType);
    
    console.log("Starting to write the file :3");
    
    window.resolveLocalFileSystemURL(folderpath, function(dir) {
        console.log("Access to the directory granted succesfully");
        dir.getFile(filename, {create:true}, function(file) {
            console.log("File created succesfully.");
            file.createWriter(function(fileWriter) {
                console.log("Writing content to file");
                fileWriter.write(DataBlob);
            }, function(){
                alert('Unable to save file in path '+ folderpath);
            });
        });
    });
}

var fileName = "myPdfFile.pdf";
    
var options = {
    documentSize: 'A4',
    type: 'base64'                
};
 
var pdfhtml = '<html><body style="font-size:120%">This is the pdf content</body></html>';

function generatePdf() {
    pdf.fromData(pdfhtml , options)
        .then(function(base64){               
            // To define the type of the Blob
            var contentType = "application/pdf";
            
            console.warn(cordova.file);
            // if cordova.file is not available use instead :
            if (cordova.file) {
                var folderpath = cordova.file.externalDataDirectory + "Download/"; //you can select other folders
            } else {
                var folderpath = "file:///storage/emulated/0/Download/";
            }
            savebase64AsPDF(folderpath, fileName, base64, contentType);          
        })  
        .catch((err)=>console.err(err));
}