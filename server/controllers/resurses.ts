import Resurses from '../models/resurses';
import Club from '../models/clubs';
import BaseCtrl from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as wuzzy from 'wuzzy';
import * as async from 'async';

export default class ResursesCtrl extends BaseCtrl {
  model = Resurses;
  getSameItems  = (req, res) => {
    var simpleNames;
    var team1 = req.body.team1;
    var team2 = req.body.team2;
    var club = req.body.club;
    var matchId =  req.body.id;
    var simp = [];
    var propability = [];
    var forFront = [];
    Resurses.find({}).exec((err,resurses)=>{
      Resurses.findById(matchId).exec((err, match)=>{
        var sim = [];
        sim.push(match)
        resurses.forEach((item, number) =>{
          var copyTeam2;
          if (!item.isSeted && (match.matchTime == item.matchTime) && (match.resurse !== item.resurse) && (item.team2 !== undefined) && ((match.resurse !== 'over25tips')  && (match.prediction !== ''))) {
            copyTeam2 = this.removeStopW(item.team2);
            let a = this.getTanimoto(match.team1,item.team1); 
            let b = this.getTanimoto(match.team2,copyTeam2); 
            
            if (a >= 0.47 || b >= 0.47 ){
              resurses[number].isSeted = true;
              var arrResurses = sim.map(item => item.resurse);
              if (arrResurses.indexOf(item.resurse) == -1){
                sim.push(item);
              }
              else {
                var itemSameResurse = sim[arrResurses.indexOf(item.resurse)];
                var aa = this.getTanimoto(match.team1, itemSameResurse.team1);
                var bb = this.getTanimoto(match.team2, itemSameResurse.team2);
                if (a >= b) {
                  if (aa >= bb){
                    if (a > aa) {
                      sim[arrResurses.indexOf(item.resurse)] = item;
                    }
                  }
                }else{ 
                  if (bb > aa) {
                    if (b> bb) {
                      sim[arrResurses.indexOf(item.resurse)] = item;
                    }
                  }
                }
              }
            }
          } 
        });
        res.json({'same' : sim, 'prop': propability});
      });
    });
  }

  mapResurses = (req,res) =>{
    var simpleNames = [];
    Club.find({}).exec((err, clubs) => {
      clubs.forEach(clubItem => {
        simpleNames = clubItem.simpleNames || [];
        simpleNames.push(clubItem.name)
        Resurses.find({'team1': {$in: simpleNames}}).exec(function(err, listPredictions) {
          listPredictions.forEach(prediction =>{
            prediction.club = clubItem._id;
            prediction.save((err, item)=> {
              console.log('SAve', item)
            })
          });
        });
      });
    });
  }

  getAllWithSame = (req, res) => {
    var forFront = [];
    Resurses.find({}).exec((err,resurses)=>{
      resurses.forEach((r, index)=>{
        if(!r.isSeted && ((r.resurse !== 'over25tips')  && (r.prediction !== ''))){
          r.isSeted = true;
          var sim = [];
          resurses.forEach((item, number) =>{
            var copyTeam2;
            if (!item.isSeted && (r.matchTime == item.matchTime) && (r.resurse !== item.resurse) && (item.team2 !== undefined) && ((r.resurse !== 'over25tips')  && (r.prediction !== ''))) {
              copyTeam2 = this.removeStopW(item.team2);
              let a = this.getTanimoto(r.team1,item.team1); 
              let b = this.getTanimoto(r.team2,copyTeam2); 
              if (a >= 0.47 || b >= 0.47 ){
                resurses[number].isSeted = true;
                sim.push(item);
              }
            } 
          });
          if (sim.length > 2){
            forFront.push({'item': r, 'simples':  sim});
          }
          } 
        })
       res.json(forFront) 
    })
  }
  getTanimoto = (team1, team2) => {
    return wuzzy.tanimoto(
      team1.replace(/[0-9]/g, ''),
      team2.replace(/[0-9]/g, '')
    );
  }
  removeStopW = (team) => {
    var copyTeam2;
    var last3 = team.substring(team.length - 3, team.length);
    var last2 = team.substring(team.length - 2, team.length);
    var first2 = team.substring(0, 2);
    var stopWord = ['FC', 'AFC', 'SC', 'CD', 'US', 'PFC','FBC', 'SV', 'UC', 'CF'];
    if(stopWord.indexOf(last3) !== -1  && team[team.length - 4] == ' ') {
      copyTeam2 = team.substring(0,team.length - 3);
    }
    if(stopWord.indexOf(first2) !== -1  && team[2] == ' ') {
      copyTeam2 = team.substring(2, team.length - 1);
    }
    if(stopWord.indexOf(last2) !== -1 && team[team.length - 3] == ' ') {
      copyTeam2 = team.substring(0, team.length - 2);
    }else {
      copyTeam2 = team;
    }
    return copyTeam2;
  }
  
  getResurse  = (req, res) => {
    let url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';
    let url1 = 'https://www.bettingtips1x2.com/tips/2018-02-06.html';
    let url2 = 'https://www.over25tips.com/free-football-betting-tips/';
    let url3 = 'http://www.zulubet.com/';
    let url4 = 'http://www.betstudy.com/predictions/';
    let url5 = 'http://www.iambettor.com/football-predictions-2018-02-06';
    let url6 = 'http://www.vitibet.com/?clanek=quicktips&sekce=fotbal';
    let url7 = 'http://www.bet-portal.net/en#axzz55OuMTyKO';
    let url8 = 'http://www.statarea.com/predictions';

    let url9 = 'http://www.statarea.com/predictions/date/2018-02-05/competition';

    // request(url, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);

    //     let resurse = 'Forebet'
    //     $('.schema').filter(function(){
    //       var data = $(this);
    //       var trs = data.children().children();
            
    //       trs.each(function(i, elem){
    //         if (trs.eq(i).children().first().hasClass('tnms')){
    //             if(trs.eq(i).children().eq(4).hasClass('predict') ){
    //               var teams = trs.eq(i).children().first().find('a').html().split('<br> ');
    //                 var propability1 = trs.eq(i).children().eq(1).text();
    //                 var propabilityX = trs.eq(i).children().eq(2).text();
    //                 var propability2 = trs.eq(i).children().eq(3).text();
    //                 var prediction = trs.eq(i).children().eq(4).text();
    //                 var correctScore = trs.eq(i).children().eq(5).text();
    //                 var avarageGoal = trs.eq(i).children().eq(6).text();
    //                 var matchTime = trs.eq(i).children().first().find('.date_bah').html().split(" ");
    //                 var hours = matchTime[1].split(":");
    //                 hours[0] = 2 + parseInt(hours[0])
    //                 matchTime = hours.join(":");
    //                 if ((teams[0] !== '') && (teams[1] !== '')){
    //                   const obj = new Resurses({
    //                     'team1': teams[0],
    //                     'team2': teams[1],
    //                     'addedDate': new Date(),
    //                     'propability1' : propability1,
    //                     'propabilityX' : propabilityX,
    //                     'propability2': propability2,
    //                     'prediction': prediction,
    //                     'matchTime' : matchTime,
    //                     'correctScore': correctScore,
    //                     'avarageGoal': avarageGoal,
    //                     'resurse': resurse
    //                   });
    //                   obj.save((err, item) => {});
    //             }
             
    //           }
    //         }
    //       })
    //     })
    //   }
    // })
    // request(url1, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'bettingtips1x2'
    //     $('.inner .results').filter(function(){
    //       var data = $(this);
    //       var trs = data.children().children();
            
    //       trs.each(function(i, elem){
    //         if (trs.eq(i).find('td').length){
    //           var teams = trs.eq(i).find('td').eq(3).find('a').text().split(' - ');
    //           var matchTime = trs.eq(i).find('td').eq(2).text()
    //           var correctScore = trs.eq(i).find('td').eq(7).text();
    //           var timeArray = matchTime.split(':');
    //           timeArray[0] = 2 + parseInt(timeArray[0]);
    //           matchTime = timeArray.join(':');
    //           if (teams[0] !== " "){
    //             const obj = new Resurses({
    //               'team1': teams[0],
    //               'team2': teams[1],
    //               'addedDate': new Date(),
    //               'matchTime' : matchTime,
    //               'correctScore': correctScore,
    //               'tournament' : trs.eq(i).find('td').eq(1).text(),
    //               'resurse': resurse,
    //             });
    //             obj.save((err, item) => {});
    //           }
    //         }
    //       })
    //     })
    //   }
    // })

    // request(url2, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'over25tips'
    //     $('.class').filter(function(){
    //       var data = $(this);
    //       if (data.find('h1')){
    //         var trs = data.find('.predictionsTable .main-row');
    //         trs.each(function(i, elem){
    //           if (trs.eq(i).find('td').length){
    //             var correctScore = trs.eq(i).find('td').eq(7).text();
    //             var matchTime = trs.eq(i).find('td').eq(0).text();
    //             var timeArray = matchTime.split(':');
    //             timeArray[0] = 2 + parseInt(timeArray[0]);
    //             matchTime = timeArray.join(':');
    //             const obj = new Resurses({
    //               'team1': trs.eq(i).find('td').eq(2).text().replace(/^\s*/,'').replace(/\s*$/,''),
    //               'team2': trs.eq(i).find('td').eq(4).text().replace(/^\s*/,'').replace(/\s*$/,''),
    //               'addedDate': new Date(),
    //               'matchTime' : matchTime,
    //               'prediction': trs.eq(i).find('td').eq(15).text(),
    //               'resurse': resurse,
    //             });
    //             obj.save((err, item) => {});
    //           }
    //         })
    //       };
    //     })
    //   }
    // })

    // request(url3, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'zulubet'
    //     $('.content_table').filter(function(){
    //       var data = $(this);
    //       var trs = data.find('tr');
            
    //       trs.each(function(i, elem){
    //         if (!trs.eq(i).find('td').first().hasClass('Caption')){
    //           var teams = trs.eq(i).find('td').eq(1).find('span > a ').text().split(' - ');
    //              if (!trs.eq(i).children('td').first().hasClass('prob2')){
    //               var matchTime = trs.eq(i).children('td').first().text().split(', '); 
    //               if (matchTime.length == 2){
    //                 var timeArray = matchTime[1].split(':');
    //                 timeArray[0] = 2 + parseInt(timeArray[0]);
    //                 var matchTime2 = timeArray.join(':');
    //               }
    //              }
    //           var propability1 = trs.eq(i).find('td.prob2').eq(0).text();
    //                     var propabilityX = trs.eq(i).find('td.prob2').eq(1).text();
    //                     var propability2 = trs.eq(i).find('td.prob2').eq(2).text();
    //           var prediction = trs.eq(i).find('td').eq(9).text();
    //           if (teams.length == 2){
    //             var obj = new Resurses({
    //               'team1': teams[0],
    //               'team2': teams[1],
    //               'addedDate': new Date(),
    //               'prediction': prediction,
    //               'propability1' :propability1,
    //               'propabilityX':propabilityX,
    //               'propability2': propability2,
    //               'matchTime' : matchTime2,
    //               'resurse': resurse
    //             });
    //             obj.save((err, item) => {});
    //           }
    //         }
    //       })
    //     })
    //   }
    // })

    // request(url5, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'iambettor'
    //     $('.tabulkaquick').filter(function(){
    //       var data = $(this);
    //       var trs = data.find('tr');
    //       trs.each(function(i, elem){
    //         if (trs.eq(i).find('td').first().hasClass('standardbunka')){
    //           if (!trs.eq(i).children('td').first().hasClass('prob2')){
    //             var matchTime = trs.eq(i).children('td').first().text().split(', '); 
    //             if (matchTime.length == 2){
    //               var timeArray = matchTime[1].split(':');
    //               timeArray[0] = 2 + parseInt(timeArray[0]);
    //               var matchTime2 = timeArray.join(':');
    //             }
    //            }
    //           var cop = {
    //             'team1': trs.eq(i).find('td.standardbunka').eq(0).text(),
    //             'team2': trs.eq(i).find('td.standardbunka').eq(1).text(),
    //             'addedDate': new Date(),
    //             'prediction': '',
    //             'propability1': trs.eq(i).find('td.standardbunka').eq(3).text(),
    //             'propabilityX': trs.eq(i).find('td.standardbunka').eq(4).text(),
    //             'propability2':trs.eq(i).find('td.standardbunka').eq(5).text(),
    //             'propabilityUnder' :'',
    //             'propabilityOver':'',
    //             'matchTime' : matchTime2,
    //             'correctScore':  trs.eq(i).find('td.vetsipismo').eq(0).text()+'-'+ trs.eq(i).find('td.vetsipismo').eq(1).text(),
    //             'resurse': resurse,
    //           }
    //             var obj = new Resurses(cop);
    //             obj.save((err, item) => {});
    //         }
    //       })
    //     })
    //   }
    // })


    // request(url4, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'betstudy'
    //     $('.soccer-table').filter(function(){
    //       var data = $(this);
    //       var trs = data.find('tr');
            
    //       trs.each(function(i, elem){
    //         if (trs.eq(i).find('td').length){
    //           var matchTime = trs.eq(i).find('td').eq(0).find('span').text().split(' '); 
    //           var timeArray = matchTime[1].split(':');
    //           timeArray[0] = 2 + parseInt(timeArray[0]);
    //           var matchTime2 = timeArray.join(':');
    //           var teams = trs.eq(i).find('td').eq(1).find('a').eq(1).text().split(' - ');
    //           var propability1 = trs.eq(i).find('td').eq(2).text();
    //           var propabilityX = trs.eq(i).find('td').eq(3).text();
    //           var propability2 = trs.eq(i).find('td').eq(4).text();
    //           var prediction = trs.eq(i).find('td').eq(7).text();
    //           var propabilityOver = trs.eq(i).find('td').eq(4).text();
    //           var propabilityUnder = trs.eq(i).find('td').eq(5).text();
    //           var cop = {
    //             'team1': teams[0],
    //             'team2': teams[1],
    //             'addedDate': new Date(),
    //             'prediction': prediction,
    //             'propability1': propability1,
    //             'propabilityX': propabilityX,
    //             'propability2': propability2,
    //             'propabilityUnder' :propabilityUnder,
    //             'propabilityOver': propabilityOver,
    //             'matchTime' : matchTime2,
    //             'resurse': resurse,
    //           }
    //             var obj = new Resurses(cop);
    //             obj.save((err, item) => {});
    //         }
    //       })
    //     })
    //   }
    // })

    // request(url6, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'vitibet'
    //     $('.tabulkaquick').filter(function(){
    //       var data = $(this);
    //       var trs = data.find('tr');
            
    //       trs.each(function(i, elem){
    //         if (trs.eq(i).find('td').eq(0).hasClass('standardbunka')){
    //           var date = trs.eq(i).find('td').eq(0).text();
    //           console.log(date)
    //           var arrDate = date.split('.');
    //           var a = new Date(2018, arrDate[1]-1, arrDate[0]);
    //           var b = new Date(2018, new Date().getMonth(), new Date().getDate());
    //           console.log(a.getTime() - b.getTime() === 0)
    //           if (a.getTime() - b.getTime() === 0){
    //             var team1 = trs.eq(i).find('td').eq(1).find('a').text();
    //             var team2 = trs.eq(i).find('td').eq(2).find('a').text();
    //             var propability1 = trs.eq(i).find('td').eq(6).text();
    //             var propabilityX = trs.eq(i).find('td').eq(7).text();
    //             var propability2 = trs.eq(i).find('td').eq(8).text();
    //             var prediction = trs.eq(i).find('td').eq(9).text();
    //             var cop = {
    //               'team1': team1,
    //               'team2': team2,
    //               'addedDate': new Date(),
    //               'prediction': prediction,
    //               'propability1': propability1,
    //               'propabilityX': propabilityX,
    //               'propability2': propability2,
    //               'correctScore':  trs.eq(i).find('td.vetsipismo').eq(0).text()+'-'+ trs.eq(i).find('td.vetsipismo').eq(1).text(),
    //               'resurse': resurse,
    //             }
    //               var obj = new Resurses(cop);
    //               obj.save((err, item) => {});
    //             }
    //         }
    //       })
    //     })
    //   }
    // })
    // request(url7, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse ='bet-portal';
    //     $('#predictions-1').filter(function(){
    //       var data = $(this);
    //        var trs = data.find('tr');
    //         trs.each(function(i, elem){
    //           if (trs.eq(i).hasClass('match')){
    //             var team1 = trs.eq(i).find('td').eq(0).text();
    //             var t = trs.eq(i).find('td').eq(1).find('a').text().split(':')
    //             t[0] = 1 + parseInt(t[0]);
    //             var matchTime2 = t.join(':');
    //             var team2 = trs.eq(i).find('td').eq(2).text();
    //             var prediction = trs.eq(i).find('td').eq(3).find('div').text();
    //             var cop = {
    //               'team1': team1,
    //               'team2': team2,
    //               'addedDate': new Date(),
    //               'prediction': prediction,
    //               'matchTime' : matchTime2,
    //               'resurse': resurse,
    //             }
    //               var obj = new Resurses(cop);
    //               obj.save((err, item) => {});
    //           }
    //         })
    //     })
    //   }
    // })
    // request(url8, function(error, response, html){
    //   if(!error){
    //     var $ = cheerio.load(html);
    //     let resurse = 'statarea';
    //     $('.datacotainer').filter(function(){
    //       var data = $(this);
    //        var trs = data.find('.match');
    //         trs.each(function(i, elem){
    //             var team1 = trs.eq(i).find('td').eq(0).text();
    //             var team2 = trs.eq(i).find('td').eq(2).text();
    //             var prediction = trs.eq(i).find('td').eq(3).find('div').text();
    //             var cop = {
    //               'team1': trs.eq(i).find('.teams').find('.hostteam > .name').text(),
    //               'team2': trs.eq(i).find('.teams').find('.guestteam > .name').text(),
    //               'matchTime': trs.eq(i).find('.date').text(),
    //               'addedDate': new Date(),
    //               'prediction': trs.eq(i).find('.matchrow').find('.tip > .value > div').text(),
    //               'propability1': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(0).find('.value').text(),
    //               'propabilityX': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(1).find('.value').text(),
    //               'propability2': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(2).find('.value').text(),
    //               'propabilityOver': trs.eq(i).find('.inforow > .coefrow >.coefbox').eq(6).find('.value').text(),
    //               'resurse': resurse,
    //             }
    //               var obj = new Resurses(cop);
    //               obj.save((err, item) => {});
    //         })
   
    //     })
    //   }
    // })
    request(url9, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        let resurse = 'statarea';
        $('.datacotainer').filter(function(){
          var data = $(this);
           var trs = data.find('.match');
            trs.each(function(i, elem){
              var prediction = trs.eq(i).find('td').eq(3).find('div').text();
              var cop = {
                'team1': trs.eq(i).find('.teams').find('.hostteam > .goals').text(),
                'team2': trs.eq(i).find('.teams').find('.guestteam > .goals').text(),
                'name1': trs.eq(i).find('.teams').find('.hostteam > .name').text(),
              }
              console.log(cop)
              Resurses.find({ $and : [{'resurse':'statarea'}, {'team1': cop.name1}]}).exec(function(err, resut){
              if (resut.length) {
                resut[0].resmatch = cop.team1 + '-' + cop.team2;
                resut[0].save(function(err,item) {
                  console.log('save', item)
                });
              } 
             })
            })
        })
      }
    })
  }

  addClubs = (req, res, next) => {
    var team1 = req.body.team1;
    var team2 = req.body.team2;
    var teams = [];
    Club.find({'name' : team1}).exec((err, teamHome) => {
      Club.find({'name' : team2}).exec((err, teamAway) => {
        if (teamHome.length == 0){
          var team11 = new Club({name: req.body.team1});
          teams.push (team11.save());
        }
        if (teamAway.length == 0){
          var team21 = new Club({name: req.body.team2});
          teams.push (team21.save());
        }
        Promise.all(teams).then(values => { 
          res.json({'team1' : teamHome[0] ? teamHome[0]: values[0], 'team2' : teamAway[0]?teamAway[0]:values[1]});
        });
      })
    });
  }
 
  getClubsInfo = (req, res) => {
    var team1 = req.body.team1;
    var team2 = req.body.team2;

    Club.find({'name' : team1}).exec((err, teamHome) => {
      Club.find({'name' : team2}).exec((err, teamAway) => {
        res.json({'team1' : teamHome, 'team2': teamAway});
      })
    });
  }

  saveResult = (req, res) =>{
    var arrayOFResults = []
    var arr = ['1', '2','X','1X','X2','12'];
   
    Resurses.findById(req.body.id).exec((err, resurse) => {
      if (req.body.result){
        resurse.resmatch = req.body.result;
      }
      var arrayOfGoals = resurse.resmatch.split('-');
      if (arrayOfGoals[0] > arrayOfGoals[1]){
        arrayOFResults.push('1');
        arrayOFResults.push('1X');
        arrayOFResults.push('12');
      }else if  (arrayOfGoals[0] < arrayOfGoals[1]){
        arrayOFResults.push('2');
        arrayOFResults.push('12');
        arrayOFResults.push('X2');
      }else {
        arrayOFResults.push('X');
        arrayOFResults.push('1X');
        arrayOFResults.push('X2');
      }
    
      if(arr.indexOf(req.body.prediction) !== -1){
        if (arrayOFResults.indexOf(req.body.prediction) != -1){
          resurse.individualPredition = true;
        } else {
          resurse.individualPredition = false;
        }
      }
      resurse.save((err, savedItem) => {
        res.json(savedItem);
      })
    })
  }

  addSimpleNames = (req, res) => {
    var team1 = req.body.simpleName1;
    var team2 = req.body.simpleName2;
    var id1 = req.body.idTeam1;
    var id2 = req.body.idTeam2;
    Club.findById(id1).exec((err, teamHome) => {
        if (teamHome.name !== team1) {
          teamHome.simpleNames.push(team1)
        }
        teamHome.save((err, item) => {
          Club.findById(id2).exec((err, teamAway) => {
            if (teamAway.name !== team2) {
              teamAway.simpleNames.push(team2)
            }
            teamAway.save((err, item2) => {
              res.json({'team1': item, 'team2' : item2});
            })
          })
        })
    });
  }
}
