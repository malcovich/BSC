import Resurses from '../models/resurses';
import Club from '../models/clubs';
import BaseCtrl from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as wuzzy from 'wuzzy';

export default class ResursesCtrl extends BaseCtrl {
  model = Resurses;
  getSameItems  = (req, res) => {
    var team1 = req.body.team1
  	team1 = team1.replace(/^\s*/,'').replace(/\s*$/,'');
    var simpleNamesQuery = { $or : [{'name1': team1},{'name2': team1},{'name3': team1},{'name4': team1},{'name5': team1}]};
    var simpleNamesQuery2 = { $or : [{'name1': req.body.team2},{'name2': req.body.team2},{'name3': req.body.team2},{'name4': req.body.team2},{'name5': req.body.team2}]};
    var Ro;
    Resurses.find().exec(function(err,result) {
      Ro = result;
      var sim = [];
      result.forEach(function(item){
        if (item.team2 !== undefined){
          let a = wuzzy.tanimoto(
            team1,
            item.team1
          );
          let b = wuzzy.tanimoto(
            req.body.team2,
            item.team2
          );
          if (a >= 0.39  && b >= 0.39 ){
            sim.push(item);
            console.log(item, a, b)
          }
        }
      })
      if (sim.length == 0 ){
        Ro.forEach(function(item){
        if (item.team2 !== undefined){
          let a = wuzzy.tanimoto(
            team1,
            item.team1
          );
          let b = wuzzy.tanimoto(
            req.body.team2,
            item.team2
          );
          if (a >= 0.55  || b >= 0.55 ){
            sim.push(item);
            console.log(0,item)
          }
        }
       })
       }
       res.json(sim);
    })
   
    // Club.find(simpleNamesQuery).exec(function (err, steam1) { 
    //   var sTeam1 = steam1;
    //   if (steam1.length == 0){
    //     sTeam1 =[{'name1': team1}];
    //   }
    //   Club.find(simpleNamesQuery2).exec(function (err, steam2) { 
    //     var sTeam2 = steam2;
    //     if (steam2.length == 0){
    //       sTeam2 = [{'name1': req.body.team2}];
    //     }
    //     console.log(sTeam2, sTeam1)
    //     Resurses.find({$and: [ {$or :[{team1 : sTeam1[0].name1},{team1 : sTeam1[0].name2}, {team1 : sTeam1[0].name3},{team1 : sTeam1[0].name4},{team1 : sTeam1[0].name5}]} ,{$or :[{team2 : sTeam2[0].name1},{team2 : sTeam2[0].name2},{team2 : sTeam2[0].name3},{team2 : sTeam2[0].name4}, {team2 : sTeam2[0].name5}]}]}).exec(function (err, result) { 
    //       Resurses.findById(req.body.id, function(err, p) {
    //           p.simpleRecords = result.length;
    //           p.save(function(err) {
    //             if (err)
    //               console.log('error')
    //             else
    //               console.log('success')
    //           });
    //       });
    //       res.json(result);
    //     });
    //   });
    // });
   
  }

  getAllWithSame = (req, res) => {
    Resurses.find({}).exec( (err,resurses)=>{
      var forFront = [];
      resurses.forEach((item) => {
        if (!item.isSeted) {
          if (!item.simpleRecords) {
            item.simpleRecordsArr = [];
          };
           var cop = [];
          resurses.forEach(function(result){
            
            if (result.team2 !== undefined){
              let a = wuzzy.tanimoto(
                item.team1,
                result.team1
              );
              let b = wuzzy.tanimoto(
                item.team2,
                result.team2
              );
              if (a >= 0.39  && b >= 0.39 ){
                cop.push(result);
                result.isSeted = true;
              }
            };

          });
          forFront.push({'item': item, 'simples': cop});
        }
      })
      res.json(forFront);
    })
  } 
  
  getResurse  = (req, res) => {
    let url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';
    let url1 = 'http://bettingtips1x2.com/tips/2018-01-29.html';
    let url2 = 'https://www.over25tips.com/free-football-betting-tips/';
    let url3 = 'http://www.zulubet.com/';
    let url4 = 'http://www.betstudy.com/predictions/';
    let url5 = 'http://www.iambettor.com/football-predictions-2018-01-29';
    let url6 = 'http://www.vitibet.com/?clanek=quicktips&sekce=fotbal';
    let url7 = 'http://www.bet-portal.net/en#axzz55OuMTyKO';
    let url8 = 'http://www.statarea.com/predictions';


    let url9 = 'http://www.statarea.com/predictions/date/2018-01-27/competition';
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        let resurse = 'Forebet'
        $('.schema').filter(function(){
          var data = $(this);
          var trs = data.children().children();
            
          trs.each(function(i, elem){
            if (trs.eq(i).children().first().hasClass('tnms')){
              var teams = trs.eq(i).children().first().find('a').html().split('<br> ');
              var propability1 = trs.eq(i).children().eq(1).text();
              var propabilityX = trs.eq(i).children().eq(2).text();
              var propability2 = trs.eq(i).children().eq(3).text();
              var prediction = trs.eq(i).children().eq(4).text();
              var correctScore = trs.eq(i).children().eq(5).text();
              var avarageGoal = trs.eq(i).children().eq(6).text();
              if ((teams[0] !== '') && (teams[1] !== '')){
                const obj = new Resurses({
                  'team1': teams[0],
                  'team2': teams[1],
                  'addedDate': new Date(),
                  'propability1' : propability1,
                  'propabilityX' : propabilityX,
                  'propability2': propability2,
                  'prediction': prediction,
                  'correctScore': correctScore,
                  'avarageGoal': avarageGoal,
                  'resurse': resurse
                });
                obj.save((err, item) => {});
              }
            }
          })
        })
      }
    })
    request(url1, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'bettingtips1x2'
        $('.results').filter(function(){
          var data = $(this);
          var trs = data.children().children();
            
          trs.each(function(i, elem){
            if (trs.eq(i).find('td').length){
              var teams = trs.eq(i).find('td').eq(3).find('a').text().split(' - ');
              var correctScore = trs.eq(i).find('td').eq(7).text();
              const obj = new Resurses({
                'team1': teams[0],
                'team2': teams[1],
                'addedDate': new Date(),
                'correctScore': correctScore,
                'resurse': resurse,
              });
              obj.save((err, item) => {});
            }
          })
        })
      }
    })

    request(url2, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'over25tips'
        $('.predictionsTable').filter(function(){
          var data = $(this);
          var trs = data.find('.main-row');
          trs.each(function(i, elem){
            if (trs.eq(i).find('td').length){
              var correctScore = trs.eq(i).find('td').eq(7).text();
              const obj = new Resurses({
                'team1': trs.eq(i).find('td').eq(2).text().replace(/^\s*/,'').replace(/\s*$/,''),
                'team2': trs.eq(i).find('td').eq(4).text().replace(/^\s*/,'').replace(/\s*$/,''),
                'addedDate': new Date(),
                'prediction': trs.eq(i).find('td').eq(15).text(),
                'resurse': resurse,
              });
              obj.save((err, item) => {});
            }
          })
        })
      }
    })

    request(url3, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'zulubet'
        $('.content_table').filter(function(){
          var data = $(this);
          var trs = data.find('tr');
            
          trs.each(function(i, elem){
            if (!trs.eq(i).find('td').first().hasClass('Caption')){
              var teams = trs.eq(i).find('td').eq(1).find('span > a ').text().split(' - ');
              var propability1 = trs.eq(i).find('td.prob2').eq(0).text();
                        var propabilityX = trs.eq(i).find('td.prob2').eq(1).text();
                        var propability2 = trs.eq(i).find('td.prob2').eq(2).text();
              var prediction = trs.eq(i).find('td').eq(9).text();
              if (teams.length == 2){
                var obj = new Resurses({
                  'team1': teams[0],
                  'team2': teams[1],
                  'addedDate': new Date(),
                  'prediction': prediction,
                  'propability1' :propability1,
                  'propabilityX':propabilityX,
                  'propability2': propability2,
                  'resurse': resurse
                });
                obj.save((err, item) => {});
              }
            }
          })
        })
      }
    })

    request(url5, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'iambettor'
        $('.tabulkaquick').filter(function(){
          var data = $(this);
          var trs = data.find('tr');
            console.log()
          trs.each(function(i, elem){
            if (trs.eq(i).find('td').first().hasClass('standardbunka')){
              var cop = {
                'team1': trs.eq(i).find('td.standardbunka').eq(0).text(),
                'team2': trs.eq(i).find('td.standardbunka').eq(1).text(),
                'addedDate': new Date(),
                'prediction': '',
                'propability1': trs.eq(i).find('td.standardbunka').eq(3).text(),
                'propabilityX': trs.eq(i).find('td.standardbunka').eq(4).text(),
                'propability2':trs.eq(i).find('td.standardbunka').eq(5).text(),
                'propabilityUnder' :'',
                'propabilityOver':'',
                'correctScore':  trs.eq(i).find('td.vetsipismo').eq(0).text()+'-'+ trs.eq(i).find('td.vetsipismo').eq(1).text(),
                'resurse': resurse,
              }
                var obj = new Resurses(cop);
                obj.save((err, item) => {});
            }
          })
        })
      }
    })


    request(url4, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'betstudy'
        $('.soccer-table').filter(function(){
          var data = $(this);
          var trs = data.find('tr');
            
          trs.each(function(i, elem){
            if (trs.eq(i).find('td').length){
              var teams = trs.eq(i).find('td').eq(1).find('a').eq(1).text().split(' - ');
              var propability1 = trs.eq(i).find('td').eq(2).text();
              var propabilityX = trs.eq(i).find('td').eq(3).text();
              var propability2 = trs.eq(i).find('td').eq(4).text();
              var prediction = trs.eq(i).find('td').eq(7).text();
              var propabilityOver = trs.eq(i).find('td').eq(4).text();
              var propabilityUnder = trs.eq(i).find('td').eq(5).text();
              var cop = {
                'team1': teams[0],
                'team2': teams[1],
                'addedDate': new Date(),
                'prediction': prediction,
                'propability1': propability1,
                'propabilityX': propabilityX,
                'propability2': propability2,
                'propabilityUnder' :propabilityUnder,
                'propabilityOver': propabilityOver,
                'resurse': resurse,
              }
              console.log(cop)
                var obj = new Resurses(cop);
                obj.save((err, item) => {});
            }
          })
        })
      }
    })

    request(url6, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'vitibet'
        $('.tabulkaquick').filter(function(){
          var data = $(this);
          var trs = data.find('tr');
            
          trs.each(function(i, elem){
            if (trs.eq(i).find('td').eq(0).hasClass('standardbunka')){
              var team1 = trs.eq(i).find('td').eq(1).find('a').text();
              var team2 = trs.eq(i).find('td').eq(2).find('a').text();
              var propability1 = trs.eq(i).find('td').eq(6).text();
              var propabilityX = trs.eq(i).find('td').eq(7).text();
              var propability2 = trs.eq(i).find('td').eq(8).text();
              var prediction = trs.eq(i).find('td').eq(9).text();
              var cop = {
                'team1': team1,
                'team2': team2,
                'addedDate': new Date(),
                'prediction': prediction,
                'propability1': propability1,
                'propabilityX': propabilityX,
                'propability2': propability2,
                'correctScore':  trs.eq(i).find('td.vetsipismo').eq(0).text()+'-'+ trs.eq(i).find('td.vetsipismo').eq(1).text(),
                'resurse': resurse,
              }
                var obj = new Resurses(cop);
                obj.save((err, item) => {});
            }
          })
        })
      }
    })
    request(url7, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse ='bet-portal';
        $('#predictions-1').filter(function(){
          var data = $(this);
           var trs = data.find('tr');
            trs.each(function(i, elem){
              if (trs.eq(i).hasClass('match')){
                var team1 = trs.eq(i).find('td').eq(0).text();
                var team2 = trs.eq(i).find('td').eq(2).text();
                var prediction = trs.eq(i).find('td').eq(3).find('div').text();
                var cop = {
                  'team1': team1,
                  'team2': team2,
                  'addedDate': new Date(),
                  'prediction': prediction,
                  'resurse': resurse,
                }
                  var obj = new Resurses(cop);
                  obj.save((err, item) => {});
              }
            })
   
        })
      }
    })
    request(url8, function(error, response, html){
      console.log('sdfsdf')
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'statarea';
        $('.datacotainer').filter(function(){
          var data = $(this);
           var trs = data.find('.match');
            trs.each(function(i, elem){
                var team1 = trs.eq(i).find('td').eq(0).text();
                var team2 = trs.eq(i).find('td').eq(2).text();
                var prediction = trs.eq(i).find('td').eq(3).find('div').text();
                var cop = {
                  'team1': trs.eq(i).find('.teams').find('.hostteam > .name').text(),
                  'team2': trs.eq(i).find('.teams').find('.guestteam > .name').text(),
                  'addedDate': new Date(),
                  'prediction': trs.eq(i).find('.matchrow').find('.tip > .value > div').text(),
                  'propability1': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(0).find('.value').text(),
                  'propabilityX': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(1).find('.value').text(),
                  'propability2': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(2).find('.value').text(),
                  'propabilityOver': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(6).find('.value').text(),
                  'resurse': resurse,
                }
                  var obj = new Resurses(cop);
                  obj.save((err, item) => {});
            })
   
        })
      }
    })
    // request(url9, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'statarea';
    //     $('.datacotainer').filter(function(){
    //       var data = $(this);
    //        var trs = data.find('.match');
    //         trs.each(function(i, elem){
    //             var prediction = trs.eq(i).find('td').eq(3).find('div').text();
    //             var cop = {
    //               'team1': trs.eq(i).find('.teams').find('.hostteam > .goals').text(),
    //               'team2': trs.eq(i).find('.teams').find('.guestteam > .goals').text(),
    //             }
    //              Resurses.find({ $and : [{'resurse':'statarea'}, {'team1': trs.eq(i).find('.teams').find('.hostteam > .name').text()}]}).exec(function(err, resut){
    //                resut[0].resmatch = cop.team1 + '-' + cop.team2;
    //                console.log(1, resut[0], resut[0].resmatch )
    //                 resut[0].save(function(err,item) {
    //                   if (err)
    //                     console.log('error')
    //                     // console.log('success', item)
    //                 });
    //              })
    //         })
    //     })
    //   }
    // })
  }

}
