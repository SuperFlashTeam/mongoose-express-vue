'use strict'
const devMsgModel = require('../modules/urlapi')
const opUrlMsgModel = require('../modules/opurlapi')

const routes = (app) => {
  // 统一入口api
  // 查询所有
  app.get('/getUrlMsg', (req, res, next) => {
    let response = res
    devMsgModel.find({}, (err, result, res) => {
    if(err) return response.json({
        code: 10000, 
        error: err
    })
    response.json(result)
    })
  })
  // 新增
  app.post('/postUrlMsg', (req, res, next) => {
      let newMsg = [{
          projectName: req.body.projectName,
          url: req.body.url,
          name: req.body.name
      }]
      let response = res
      devMsgModel.create(newMsg, (err, result, res) => {
          if(err) return response.json({
              code: 10000, 
              error: err
          })
          response.json({
              code: 200,
              data: result
          })
      })
  })
  // 修改
  app.put('/putUrlMsg', (req, res, next) => {
      console.log(req.body)
      let _id = req.body._id,
          condiction = {_id: req.body._id},
          query = {
              $set: {
                projectName: req.body.projectName,
                url: req.body.url,
                name: req.body.name
              }
          }
      let response = res
      devMsgModel.update(condiction, query, (err, result) => {
          if(err) return response.json({
              code: 10000, 
              error: err
          })
          response.json({
              code: 200,
              data: result
          })
      })
  })
  // 删除
  app.delete('/delUrlMsg', (req, res, next) => {
      let response = res
      devMsgModel.remove({_id: req.body._id}, (err, result) => {
      if(err) return response.json({
          code: 10000,
          error: err
      })
      response.json({
          code: 200,
          data: result
      })
    })
  })
  // 运营网址api==============================
  // 查询所有
  app.get('/getOpUrlMsg', (req, res, next) => {
    let response = res
    opUrlMsgModel.find({}, (err, result, res) => {
    if(err) return response.json({
        code: 10000, 
        error: err
    })
    response.json(result)
    })
  })
  // 新增
  app.post('/postOpUrlMsg', (req, res, next) => {
    let newMsg = [{
        projectName: req.body.projectName,
        devurl: req.body.devurl,
        masterurl: req.body.masterurl,
        flexurlgroup: req.body.flexurlgroup
    }]
    console.log(req.body.flexurlgroup, 'req.body.flexurlgroup')
    let response = res
    opUrlMsgModel.create(newMsg, (err, result, res) => {
        if(err) return response.json({
            code: 10000, 
            error: err
        })
        response.json({
            code: 200,
            data: result
        })
    })
  })
  // 修改
  app.put('/putOpUrlMsg', (req, res, next) => {
    console.log(req.body)
    let _id = req.body._id,
        condiction = {_id: req.body._id},
        query = {
            $set: {
              projectName: req.body.projectName,
              devurl: req.body.devurl,
              masterurl: req.body.masterurl,
              flexurlgroup: req.body.flexurlgroup
            }
        }
    let response = res
    opUrlMsgModel.update(condiction, query, (err, result) => {
      if(err) return response.json({
          code: 10000, 
          error: err
      })
      response.json({
          code: 200,
          data: result
      })
    })
  })
  // 删除
  app.delete('/delOpUrlMsg', (req, res, next) => {
    let response = res
      opUrlMsgModel.remove({_id: req.body._id}, (err, result) => {
      if(err) return response.json({
          code: 10000,
          error: err
      })
      response.json({
          code: 200,
          data: result
      })
    })
  })
}
module.exports = routes