module.exports = {
  upyunConfig: {
    bucket: 'bucket', // 要使用的空间名
		operator: 'operator', // 拥有 bucket 授权的操作员
		password: 'password', // 拥有 bucket 授权的操作员的密码
		/*
		* API 接入点，可以刷是如下值:
		* v0.api.upyun.com : 自动选择合适的线路
		*	v1.api.upyun.com : 电信线路
		* v2.api.upyun.com : 联通（网通）线路
		* v3.api.upyun.com : 移动（铁通）线路
		*/
		endpoint: 'v0.api.upyun.com',
		options: {
			apiVersion: 'v2', // 如果不指定，则使用旧版 API，新版 API 可以指定为 v2:
			secret: 'yoursecret'
		}
  },
  fileConfig: {
		remotePath: 'remotePath/a', // 服务器存放的目录
		localFile: 'dist/static' // 需要上传的文件目录，是当前脚本目录的相对路径，为了兼容不写绝对路径
	},
	fileAbolish: ['$.DS_Store'] // 不需要上传的文件名（带上尾缀）的过滤，如果是文件夹直接过滤，注意加个$
}
