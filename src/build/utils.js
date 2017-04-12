/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   16/12/16
 *
 * ---------------------------------------------------
 */
let glob = require ("glob");
let path = require ("path");
let fs = require ("fs");
let _ = require('lodash');
let HtmlWebpackPlugin = require ("html-webpack-plugin");

module.exports = {
  getSource: function (sourcePath) {
    let files = getFiles (path.resolve (process.cwd (), sourcePath)),
      dirs = "",
      dirname = "",
      entry = {},
      htmlPlugins = [];
    
    files.forEach (function (file) {
      if (fs.statSync (file).isFile ()) {
        
        dirs = path.dirname (file).split ('/');
        dirname = dirs[dirs.length - 1];

        let fileRelativePath = file;
        // 处理入口文件
        if (path.basename (file, ".js") === dirname) {
          entry[dirname] = fileRelativePath
        }
        
        // 处理html 文件
        if (path.basename (file, ".html") === dirname) {
          htmlPlugins.push (new HtmlWebpackPlugin ({
            template: fileRelativePath,
            filename: 'views/' + dirname + '.html',
            chunks: ['base', dirname],
            minify: false,
            chunksSortMode: function(chunk1, chunk2) {
              let chunkSortArray = ['base', dirname];
              let aIndex = chunkSortArray.indexOf(chunk1);
              let bIndex = chunkSortArray.indexOf(chunk2);

              // 按照索引值大小排序
              if (aIndex > bIndex) {
                return 1;
              }

              if (aIndex < bIndex) {
                return -1;
              }

              return 0;
            }
          }))
        }
      }
      
    });
    
    return {
      entry: entry,
      htmlPlugins: htmlPlugins
    }
  },
  parseParams: function (obj) {
    let prefix = '?';
    let queryArr = [];
    let queryStr = prefix + '';
    
    if (_.isEmpty(obj)) return prefix;
    
    for (let key in obj) {
      let temp = [key, obj[key]];
      queryArr.push(temp);
    }
    
    for (let len = queryArr.length, i=0; i < len; i++) {
      if (i !== len -1) {
        queryStr += queryArr[i][0] + '=' + queryArr[i][1] + '&'
      } else {
        queryStr += queryArr[i][0] + '=' + queryArr[i][1]
      }
    }
    
    return queryStr;
  }
};

function getFiles (resolvePath) {
  let files = [];
  
  if (glob.sync (resolvePath).length <= 0) {
    return [];
  } else {
    +(function (filePath) {
      let arg = arguments;
      glob.sync (filePath).forEach (function (file) {
        if (fs.statSync (file).isFile ()) {
          files.push (file);
        } else {
          arg.callee (file + '/*');
        }
      });
      
    }) (resolvePath + '/*');
  }
  
  return files;
}