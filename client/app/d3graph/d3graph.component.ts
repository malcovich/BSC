import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';


@Component({
  selector: 'app-d3graph',
  template: '<div></div>',
  styleUrls: ['./d3graph.component.css']
})
export class D3graphComponent implements OnInit {
    private d3: D3;
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    @Input() data;
    @Input() width;


    constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnInit() {
        let self = this;
        let d3 = this.d3;
        let d3ParentElement: any;
        let svg: any;
        let name: string;
        let yVal: number;
        let colors: any = [];
        let data: {team: string, scored: number, date: string}[] = [];
        let padding: number = 25;
        let width: number;
        let height: number = 500;
        let xScale: any;
        let yScale: any;
        let xColor: any;
        let xAxis: any;
        let yAxis: any;
        width = this.width;

        data = this.data;
        console.log(this.data)
    if (this.parentNativeElement !== null) {
        svg = d3.select(this.parentNativeElement)
          .append('svg')        // create an <svg> element
          .attr('width', width) // set its dimensions
          .attr('height', height);
    
              console.log(svg.node().getBBox());

      colors = ['red', 'yellow', 'green', 'blue'];

      var parseDate = d3.timeFormat('%m-%d');
      data.forEach((item) =>{
        item.date = parseDate(new Date(item.date));
      })

      xScale = d3.scaleBand()
          .domain(data.map(function(d){ return d.date; }))
          .range([0, width]);

      yScale = d3.scaleLinear()
          .domain([0,d3.max(data, function(d) {return d.scored+1})])
          .range([height-50, 0]);

      xAxis = d3.axisBottom(xScale) // d3.js v.4
          .ticks(this.data.length)
          .scale(xScale);
         
         

      yAxis = d3.axisLeft(xScale) // d3.js v.4
          .scale(yScale)
          .ticks(7);

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + "," + padding + ")")
        .call(yAxis);

	       svg.append('g')            // create a <g> element
         .attr('class', 'axis')   // specify classes
	       .attr("transform", "translate(" + 10 + "," + (height - padding) + ")")
         .call(xAxis);            // let the axis do its thing

      var rects = svg.selectAll('rect')
          .data(data);
          rects.size();

      var newRects = rects.enter();
     

      newRects.append('rect')
          .attr('x', function(d,i) {
            return xScale(d.date);
          })
          .attr('y', function(d) {
              return yScale(d.scored);
            })
	        .attr("transform","translate(" + (5  + 25) + "," + (padding - 5) + ")")
          .attr('height', function(d) {
              return height - yScale(d.scored) - (2*padding) + 5})
          .attr('width', 40)
          .attr('fill', 'orange');
     }
   }
 }