import Resurses from '../models/resurses';
import BaseCtrl from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';

export default class ResursesCtrl extends BaseCtrl {
  model = Resurses;
  getSameItems  = (req, res) => {
    console.log(req.body)
    Resurses.find({$and: [{team1 : req.body.team1} ,{team2 : req.body.team2}]}).exec(function (err, result) { 
      console.log(result)
    	res.json(result);
	});
  }
  
  getResurse  = (req, res) => {
    let url = 'https://www.forebet.com/en/football-tips-and-predictions-for-today';
    let url1 = 'http://bettingtips1x2.com/tips/2018-01-25.html';
    let url2 = 'https://www.over25tips.com/free-football-betting-tips/';
    let url3 = 'http://www.zulubet.com/';
    let url4 = 'http://www.betstudy.com/predictions/';
    let url5 = 'http://www.iambettor.com/football-predictions-2018-01-25';
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
                'team1': trs.eq(i).find('td').eq(2).text(),
                'team2': trs.eq(i).find('td').eq(4).text(),
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
  }
}
