/**
 * @fileoverview Sakura Script
 * @description A beautiful online falling sakura effects
 * @version 1.0.0 - 2019-09-08
 * @license MIT
 * @author vinxit
 * {@link https://github.com/vinxit-hub}
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Sakura = factory());
}(this, (function () { 'use strict';

    function raf() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }
    function Sakura() {
        this.init.apply(this, arguments);
    }
    Sakura.prototype = {
        init: function init(canvas, option) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
            this.maxRadius = Math.sqrt(this.width * this.width + this.height * this.height) + 100;
            this.opts = {
                num: 10,
                maxR: 5,
                color: 'rgba(255, 183, 197, 0.8)',
                zIndex: 2
            };
            Object.assign(this.opts, option);
            this.render();
        },
        render: function render() {
            this.points = [];
            for (var i = 0; i < this.opts.num; i++) {
                var x = Math.random() * this.width;
                var y = Math.random() * this.height;
                var r = Math.random() * this.opts.maxR + 2;
                var alpha = Math.random() * (Math.PI * 2);
                var point = {
                    x: x,
                    y: y,
                    r: r,
                    alpha: alpha,
                    phase: Math.random() * 100
                };
                this.points.push(point);
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.zIndex = this.opts.zIndex;
            this.ctx.fillStyle = this.opts.color;
            this.ctx.beginPath();
            for (var _i = 0; _i < this.points.length; _i++) {
                var pt = this.points[_i];
                pt.alpha += 0.03;
                pt.alpha %= Math.PI * 2;
                var diffPhase = Math.sin(pt.alpha);
                pt.y += diffPhase + pt.r / 2 / 5;
                pt.x += Math.cos(pt.alpha) / 2;
                if (pt.x < -50) pt.x = this.width + 50;
                if (pt.y < -50) pt.y = this.height + 50;
                if (pt.x > this.width + 50) pt.x = -50;
                if (pt.y > this.height + 50) pt.y = -50;
                this.ctx.moveTo(pt.x, pt.y);
                this.ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            }
            this.ctx.closePath();
            this.ctx.fill();
            this.raf = raf();
            this.raf(this.render.bind(this));
        },
        destroy: function destroy() {
            this.raf && this.raf.cancelAnimationFrame && this.raf.cancelAnimationFrame(this.timer);
        }
    };

    return Sakura;

})));
