const fs = require('fs');

/**
 * show which .vue files have test coverage and which not (on console)
 */

/**
 * 1.   find all .vue docs recoursively
 * 2.   check them for test coverage
 */

/**
 * 1.1  list all files in src directory
 * 1.2  collect all .vue file paths and directory paths separately
 * 1.3  repeat for every directory
 */


/**
 * 
 * @param {String} path directory to search in
 * @param {String} fileEnding file endings to search for
 * @param {String[]} fileArr Array to add files to
 * @param {String[]} dirArr Array to add directory to
 */
function getFilesandDirs(path, fileEnding, fileArr, dirArr) {
    let projectDir = fs.readdirSync(path);
    projectDir.forEach(file => {
        let filePath = `${path}/${file}`;
        if (fs.statSync(filePath).isDirectory()) dirArr.push(filePath);
        else if (file.endsWith(fileEnding)) fileArr.push(filePath);
    })
}

function getFilesandDirsRec(path, fileEnding, fileArr) {
    let dirArr = [path];
    while (dirArr.length > 0) {
        let dirPath = dirArr.pop();
        getFilesandDirs(dirPath, fileEnding, fileArr, dirArr);
    }
}


let path = __dirname + '/src';
let vueArr = [];
let specArr = [];

getFilesandDirsRec(path, '.vue', vueArr);
getFilesandDirsRec(path, '.spec.js', specArr);

let missingTests = vueArr.filter(vueFile => {
    let fSplit = vueFile.split('/');
    let fName = fSplit[fSplit.length - 1].replace('.vue', '.spec.js');
    fSplit.pop();
    let specPath = fSplit.join('/') + '/tests/unit/' + fName;
    return !specArr.includes(specPath);
});
console.log("Missing tests for: ", missingTests);
console.log("Tested: ", vueArr.length - missingTests.length);
console.log("NOT tested: ", missingTests.length);
console.log("Total: ", vueArr.length);

