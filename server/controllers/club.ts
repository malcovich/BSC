import Resurses from '../models/resurses';
import Club from '../models/clubs';
import BaseCtrl from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as wuzzy from 'wuzzy';
import * as async from 'async';

export default class ClubCtrl extends BaseCtrl {
  model = Resurses;
  getSameItems  = (req, res) => {
  }
}