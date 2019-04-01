import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import * as SimplexNoise from 'simplex-noise';
import { UtilService } from './services/util.service';
import { MatDialog } from '@angular/material';
import { ProjectDialogueComponent } from './components/project-dialogue/project-dialogue.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = n => n | 0;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const randRange = n => n - rand(2 * n);
const fadeIn = (t, m) => t / m;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
  const hm = 0.5 * m;
  return abs((t + hm) % m - hm) / (hm);
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
const circleCount = 150;
const circlePropCount = 8;
const circlePropsLength = circleCount * circlePropCount;
const baseSpeed = 0.1;
const rangeSpeed = 1;
const baseTTL = 150;
const rangeTTL = 200;
const baseRadius = 100;
const rangeRadius = 200;
const rangeHue = 60;
const xOff = 0.0015;
const yOff = 0.0015;
const zOff = 0.0015;
const backgroundColor = 'hsla(0,0%,5%,1)';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])

  container;
  canvas;
  ctx;
  circles;
  circleProps;
  simplex;
  baseHue;

  projects = [
    {
      title: 'EDM Flare',
      subtitle: 'Angular Material + Node',
      thumbnail: 'assets/images/thumb-1.jpg'
    },
    {
      title: 'Pack On My Back',
      subtitle: 'Ionic Angular + Node',
      thumbnail: 'assets/images/thumb-1.jpg'
    },
    {
      title: 'imSMART Web Client',
      subtitle: 'Ionic Angular',
      thumbnail: 'assets/images/thumb-1.jpg'
    }
  ];

  contactForm: FormGroup = this.fb.group({
    topic: ['', Validators.required],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    ],
    name: ['', Validators.required],
    message: ['', Validators.required],
  });

  formValidationMessages = {
    'topic': [
      { type: 'required', message: 'A topic is required' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'name': [
      { type: 'required', message: 'Name is required' },
    ],
    'message': [
      { type: 'required', message: 'A message is required' },
    ],
  };

  topics = ['I need help figuring out how something works', 'I found a bug', 'Other'];

  constructor(
    public ngZone: NgZone,
    private utilService: UtilService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.setup();
  }

  scrollTo(option: string): void {
    document.getElementById(option).scrollIntoView({behavior: 'smooth'});
  }

  openProject(project) {
    const dialogRef = this.dialog.open(ProjectDialogueComponent, {
      panelClass: 'projectdialog-panel',
      data: { project }
    });
  }

  setup() {
    this.createCanvas();
    this.resize();
    this.initCircles();
    this.draw();
  }

  initCircles() {
    this.circleProps = new Float32Array(circlePropsLength);
    this.simplex = new SimplexNoise();
    this.baseHue = 220;

    let i;

    for (i = 0; i < circlePropsLength; i += circlePropCount) {
      this.initCircle(i);
    }
  }

  initCircle(i) {
    let x, y, n, t, speed, vx, vy, life, ttl, radius, hue;

    x = rand(this.canvas.a.width);
    y = rand(this.canvas.a.height);
    n = this.simplex.noise3D(x * xOff, y * yOff, this.baseHue * zOff);
    t = rand(TAU);
    speed = baseSpeed + rand(rangeSpeed);
    vx = speed * cos(t);
    vy = speed * sin(t);
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    radius = baseRadius + rand(rangeRadius);
    hue = this.baseHue + n * rangeHue;

    this.circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
  }

  updateCircles() {
    let i;

    this.baseHue++;

    for (i = 0; i < circlePropsLength; i += circlePropCount) {
      this.updateCircle(i);
    }
  }

  updateCircle(i) {
    let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i;
    let x, y, vx, vy, life, ttl, radius, hue;

    x = this.circleProps[i];
    y = this.circleProps[i2];
    vx = this.circleProps[i3];
    vy = this.circleProps[i4];
    life = this.circleProps[i5];
    ttl = this.circleProps[i6];
    radius = this.circleProps[i7];
    hue = this.circleProps[i8];

    this.drawCircle(x, y, life, ttl, radius, hue);

    life++;

    this.circleProps[i] = x + vx;
    this.circleProps[i2] = y + vy;
    this.circleProps[i5] = life;

    (this.checkBounds(x, y, radius) || life > ttl) && this.initCircle(i);
  }

  drawCircle(x, y, life, ttl, radius, hue) {
    this.ctx.a.save();
    this.ctx.a.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life, ttl)})`;
    this.ctx.a.beginPath();
    this.ctx.a.arc(x, y, radius, 0, TAU);
    this.ctx.a.fill();
    this.ctx.a.closePath();
    this.ctx.a.restore();
  }

  checkBounds(x, y, radius) {
    return (
      x < -radius ||
      x > this.canvas.a.width + radius ||
      y < -radius ||
      y > this.canvas.a.height + radius
    );
  }

  createCanvas() {
    this.container = document.querySelector('.content--canvas');
    this.canvas = {
      a: document.createElement('canvas'),
      b: document.createElement('canvas')
    };
    this.canvas.b.style = `
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;
    this.container.appendChild(this.canvas.b);
    this.ctx = {
      a: this.canvas.a.getContext('2d'),
      b: this.canvas.b.getContext('2d')
    };
  }

  resize() {
    const { innerWidth, innerHeight } = window;

    this.canvas.a.width = innerWidth;
    this.canvas.a.height = innerHeight;

    this.ctx.a.drawImage(this.canvas.b, 0, 0);

    this.canvas.b.width = innerWidth;
    this.canvas.b.height = innerHeight;

    this.ctx.b.drawImage(this.canvas.a, 0, 0);
  }

  render() {
    this.ctx.b.save();
    this.ctx.b.filter = 'blur(50px)';
    this.ctx.b.drawImage(this.canvas.a, 0, 0);
    this.ctx.b.restore();
  }

  draw() {
    this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height);
    this.ctx.b.fillStyle = backgroundColor;
    this.ctx.b.fillRect(0, 0, this.canvas.b.width, this.canvas.b.height);
    this.updateCircles();
    this.render();
    this.ngZone.runOutsideAngular(() => {

      requestAnimationFrame(() => {
        this.draw();
      });

    });
  }

  onResize(event) {
    this.resize();
  }
}
