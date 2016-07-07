var UpYun = new require('upyun')
var fs = require('fs')
var path = require('path')

// 载入配置项
var config = require('./upyun-config')
var fileConfig = config.fileConfig
var upyunConfig = config.upyunConfig
var fileAbolish = config.fileAbolish
var dirType = {}
// 实例化upyun对象
var upyun = new UpYun(upyunConfig.bucket, upyunConfig.operator, upyunConfig.password, upyunConfig.endpoint, upyunConfig.options)

travel(fileConfig.localFile, (dir, file, pathname) => {
	// 读取文件名
	changeRemotePath(dir, pathname).then((remotePath) => {
		//  设置upyun 服务器里的目录结构
		fileDb(dir, file).then(() => {
			//  验证是文件是否要上传
			upyun.putFile(remotePath+'/'+file, pathname, null, false, null, (err, result) => {
				if(err){
					console.log(err)
				}
				if(result.data){
					console.log(result.data.msg, pathname, '请检查文件名是否是中文')
				}else{
					console.log(pathname,'-------------> ok')
				}
			})
		})
	})
})


function changeRemotePath(dir) { // 设置线上地址，默认是本地地址，要替换地址变成线上的目录结构
	var changeRemotePath = dir
	if(fileConfig.remotePath){
		var changeRemotePath = dir.replace(fileConfig.localFile, fileConfig.remotePath)
	}
	return new Promise((resolve) => {
		resolve(changeRemotePath)
	})
}

function fileDb(dir, file) { // 过滤文件夹和文件是否有不需要上传的文件类型
	var fileAbolishType = fileAbolish.join('')
	var file = '$'+file
	var dirNum = dir.split('/')
	return new Promise((resolve) => {
		//  文件是否进入不需要上传列表
		if(fileAbolishType.indexOf(file) >= 0){
			return
		}
		resolve()
	})
}

function travel(dir, callback) { // 读取文件名
	var dirNum = dir.split('/')
	var dirType = '$'+dirNum[dirNum.length-1]
	var fileAbolishType = fileAbolish.join('')
  fs.readdirSync(dir).forEach((file, type) => {
		var pathname = path.join(dir, file)
		if(fileAbolishType.indexOf(dirType) >= 0){
			//  判断这个文件夹是否需要上传，不需要直接不读取，为了性能放在这里
			console.log(dirNum[dirNum.length-1], '不需要上传')
			return
		}
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      callback(dir, file, pathname)
    }
  })
}
