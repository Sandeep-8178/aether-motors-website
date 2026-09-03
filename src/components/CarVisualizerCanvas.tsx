import React, { useEffect, useRef, useState } from 'react';
import { ViewAngle, PaintColor, WheelOption, InteriorOption, CarModel } from '../types';
import { RotateCw, Sun, Wind, Eye } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CarVisualizerCanvasProps {
  model: CarModel;
  color: PaintColor;
  wheel: WheelOption;
  interior: InteriorOption;
  ambientHex: string;
  viewAngle: ViewAngle;
  activePackages: string[];
}

export const CarVisualizerCanvas: React.FC<CarVisualizerCanvasProps> = ({
  model,
  color,
  wheel,
  ambientHex,
  viewAngle,
  activePackages,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [aeroStreamOn, setAeroStreamOn] = useState(false);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  // Toggle headlights
  const toggleHeadlights = () => {
    soundEngine.playClick();
    setHeadlightsOn(!headlightsOn);
  };

  // Toggle wind tunnel CFD stream
  const toggleAero = () => {
    soundEngine.playChange();
    setAeroStreamOn(!aeroStreamOn);
  };

  // Toggle wheel spin
  const toggleWheelSpin = () => {
    soundEngine.playClick();
    setWheelSpinning(!wheelSpinning);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleArray: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particleArray.push({
        x: Math.random() * 800,
        y: Math.random() * 450,
        speed: 4 + Math.random() * 8,
        length: 20 + Math.random() * 40,
        opacity: 0.2 + Math.random() * 0.6
      });
    }

    const render = () => {
      if (wheelSpinning || aeroStreamOn) {
        angleRef.current += 0.08;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw futuristic studio floor reflection & grid
      const floorGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
      floorGrad.addColorStop(0, '#040711');
      floorGrad.addColorStop(0.7, '#070D1B');
      floorGrad.addColorStop(1, '#0B132B');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, height * 0.45, width, height * 0.55);

      // Studio spotlight floor circle
      const spotGrad = ctx.createRadialGradient(width / 2, height * 0.75, 40, width / 2, height * 0.75, 340);
      spotGrad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
      spotGrad.addColorStop(0.5, 'rgba(0, 102, 255, 0.04)');
      spotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.ellipse(width / 2, height * 0.78, 360, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Floor Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 60; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.6);
        ctx.lineTo(x + (x - width / 2) * 0.8, height);
        ctx.stroke();
      }

      // Render based on selected View Angle
      if (viewAngle === 'front34') {
        drawFrontThreeQuarter(ctx, width, height, color, headlightsOn, wheel, activePackages);
      } else if (viewAngle === 'side') {
        drawSideProfile(ctx, width, height, color, wheel, wheelSpinning, angleRef.current, activePackages);
      } else if (viewAngle === 'rear') {
        drawRearDiffuser(ctx, width, height, color, headlightsOn, activePackages);
      } else if (viewAngle === 'interior') {
        drawInteriorCockpit(ctx, width, height, ambientHex);
      } else if (viewAngle === 'aerodynamics') {
        drawAeroCFD(ctx, width, height, color, particleArray);
      }

      // Wind stream overlay if aeroStreamOn is active
      if (aeroStreamOn && viewAngle !== 'aerodynamics') {
        drawAirStreams(ctx, width, height, particleArray);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [viewAngle, color, wheel, ambientHex, headlightsOn, aeroStreamOn, wheelSpinning, activePackages, model]);

  // View 1: 3/4 Front Isometric Perspective
  const drawFrontThreeQuarter = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    col: PaintColor,
    lights: boolean,
    wh: WheelOption,
    pkgs: string[]
  ) => {
    const cx = w / 2;
    const cy = h * 0.58;

    // Shadow underneath
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 85, 310, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body Main Shell Gradient
    const bodyGrad = ctx.createLinearGradient(cx - 260, cy - 90, cx + 260, cy + 70);
    bodyGrad.addColorStop(0, col.secondaryHex || col.hex);
    bodyGrad.addColorStop(0.4, col.hex);
    bodyGrad.addColorStop(0.8, '#0B0F19');
    bodyGrad.addColorStop(1, '#05070D');

    // Roof & Greenhouse
    ctx.fillStyle = '#060913';
    ctx.beginPath();
    ctx.moveTo(cx - 100, cy - 65);
    ctx.quadraticCurveTo(cx - 20, cy - 110, cx + 110, cy - 70);
    ctx.lineTo(cx + 170, cy - 15);
    ctx.lineTo(cx - 170, cy - 10);
    ctx.closePath();
    ctx.fill();

    // Windshield reflection
    const glassGrad = ctx.createLinearGradient(cx - 60, cy - 95, cx + 80, cy - 25);
    glassGrad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
    glassGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.9)');
    glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy - 62);
    ctx.quadraticCurveTo(cx - 15, cy - 98, cx + 95, cy - 66);
    ctx.lineTo(cx + 120, cy - 20);
    ctx.lineTo(cx - 110, cy - 18);
    ctx.closePath();
    ctx.fill();

    // Main Car Body
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 260, cy + 25); // Front nose
    ctx.quadraticCurveTo(cx - 240, cy - 20, cx - 140, cy - 35); // Hood curve
    ctx.lineTo(cx - 90, cy - 40);
    ctx.lineTo(cx + 140, cy - 35); // Roofline / shoulder
    ctx.quadraticCurveTo(cx + 240, cy - 15, cx + 270, cy + 35); // Rear quarter
    ctx.lineTo(cx + 250, cy + 70); // Rear skirt
    ctx.lineTo(cx + 160, cy + 72); // Rear wheel arch
    ctx.quadraticCurveTo(cx + 110, cy + 20, cx + 60, cy + 72);
    ctx.lineTo(cx - 110, cy + 72); // Side skirt
    ctx.quadraticCurveTo(cx - 160, cy + 15, cx - 210, cy + 72); // Front wheel arch
    ctx.lineTo(cx - 260, cy + 60); // Front splitter
    ctx.closePath();
    ctx.fill();

    // Specular Highlight Stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 240, cy - 5);
    ctx.quadraticCurveTo(cx - 120, cy - 30, cx + 180, cy - 20);
    ctx.stroke();

    // Carbon fiber track wing if track pkg active
    if (pkgs.includes('track-aero')) {
      ctx.fillStyle = '#111827';
      ctx.fillRect(cx + 210, cy - 60, 60, 8);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx + 210, cy - 60, 60, 8);
      // Wing struts
      ctx.fillStyle = '#374151';
      ctx.fillRect(cx + 225, cy - 52, 6, 40);
      ctx.fillRect(cx + 255, cy - 52, 6, 40);
    }

    // Front Wheel
    drawWheelRim(ctx, cx - 160, cy + 65, 36, wh);

    // Rear Wheel
    drawWheelRim(ctx, cx + 110, cy + 65, 34, wh);

    // Front Grille & Carbon Splitter
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.moveTo(cx - 260, cy + 30);
    ctx.lineTo(cx - 200, cy + 40);
    ctx.lineTo(cx - 200, cy + 68);
    ctx.lineTo(cx - 260, cy + 58);
    ctx.closePath();
    ctx.fill();

    // Headlights (Laser Matrix)
    if (lights) {
      // Glow beam
      const beamGrad = ctx.createRadialGradient(cx - 230, cy + 15, 5, cx - 350, cy + 40, 160);
      beamGrad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      beamGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.3)');
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 230, cy + 15);
      ctx.lineTo(cx - 400, cy - 20);
      ctx.lineTo(cx - 380, cy + 90);
      ctx.closePath();
      ctx.fill();

      // Sharp Headlight Strip
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(cx - 245, cy + 12);
      ctx.lineTo(cx - 195, cy + 10);
      ctx.lineTo(cx - 175, cy + 18);
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 245, cy + 12);
      ctx.lineTo(cx - 195, cy + 10);
      ctx.lineTo(cx - 175, cy + 18);
      ctx.stroke();
    }
  };

  // View 2: Aerodynamic Side Profile
  const drawSideProfile = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    col: PaintColor,
    wh: WheelOption,
    _spinning: boolean,
    angle: number,
    pkgs: string[]
  ) => {
    const cx = w / 2;
    const cy = h * 0.58;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 75, 330, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body Shape
    const sideGrad = ctx.createLinearGradient(cx - 280, cy - 60, cx + 280, cy + 50);
    sideGrad.addColorStop(0, col.secondaryHex || col.hex);
    sideGrad.addColorStop(0.5, col.hex);
    sideGrad.addColorStop(1, '#0B0F19');

    ctx.fillStyle = sideGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 290, cy + 40); // Front tip
    ctx.quadraticCurveTo(cx - 220, cy + 10, cx - 140, cy - 15); // Hood
    ctx.quadraticCurveTo(cx - 60, cy - 80, cx + 40, cy - 80); // Roof
    ctx.quadraticCurveTo(cx + 170, cy - 60, cx + 280, cy + 25); // Fastback rear
    ctx.lineTo(cx + 285, cy + 55);
    ctx.lineTo(cx + 190, cy + 55); // Rear arch
    ctx.arc(cx + 140, cy + 55, 48, 0, Math.PI, true);
    ctx.lineTo(cx - 90, cy + 55); // Rocker panel
    ctx.arc(cx - 140, cy + 55, 48, 0, Math.PI, true);
    ctx.lineTo(cx - 290, cy + 55);
    ctx.closePath();
    ctx.fill();

    // Cabin Glass
    const glass = ctx.createLinearGradient(cx - 100, cy - 70, cx + 120, cy - 10);
    glass.addColorStop(0, 'rgba(0, 240, 255, 0.5)');
    glass.addColorStop(0.6, 'rgba(15, 23, 42, 0.95)');
    glass.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
    ctx.fillStyle = glass;
    ctx.beginPath();
    ctx.moveTo(cx - 115, cy - 10);
    ctx.quadraticCurveTo(cx - 50, cy - 68, cx + 30, cy - 68);
    ctx.quadraticCurveTo(cx + 120, cy - 50, cx + 170, cy - 10);
    ctx.closePath();
    ctx.fill();

    // Door cutlines & aerodynamic side vent
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy - 50);
    ctx.lineTo(cx - 60, cy + 48);
    ctx.moveTo(cx + 70, cy - 50);
    ctx.lineTo(cx + 60, cy + 48);
    ctx.stroke();

    // Flush door handle
    ctx.fillStyle = '#00F0FF';
    ctx.fillRect(cx - 20, cy - 5, 25, 4);

    // Track wing
    if (pkgs.includes('track-aero')) {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(cx + 240, cy - 50, 45, 6);
      ctx.strokeStyle = '#00F0FF';
      ctx.strokeRect(cx + 240, cy - 50, 45, 6);
      ctx.fillStyle = '#475569';
      ctx.fillRect(cx + 255, cy - 44, 4, 30);
    }

    // Wheels
    drawWheelWithRotation(ctx, cx - 140, cy + 55, 42, wh, angle);
    drawWheelWithRotation(ctx, cx + 140, cy + 55, 42, wh, angle);
  };

  // View 3: Aggressive Rear Diffuser & Lightbar
  const drawRearDiffuser = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    col: PaintColor,
    lights: boolean,
    pkgs: string[]
  ) => {
    const cx = w / 2;
    const cy = h * 0.55;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 90, 260, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rear Body Shell
    const rearGrad = ctx.createLinearGradient(cx - 200, cy - 60, cx + 200, cy + 80);
    rearGrad.addColorStop(0, col.secondaryHex || col.hex);
    rearGrad.addColorStop(0.5, col.hex);
    rearGrad.addColorStop(1, '#080C16');

    ctx.fillStyle = rearGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 200, cy + 70);
    ctx.lineTo(cx - 210, cy + 10);
    ctx.quadraticCurveTo(cx - 150, cy - 60, cx, cy - 70);
    ctx.quadraticCurveTo(cx + 150, cy - 60, cx + 210, cy + 10);
    ctx.lineTo(cx + 200, cy + 70);
    ctx.closePath();
    ctx.fill();

    // Rear Carbon Diffuser
    ctx.fillStyle = '#0A0F1D';
    ctx.fillRect(cx - 180, cy + 45, 360, 40);
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1.5;
    // Diffuser vertical aero fins
    for (let f = -120; f <= 120; f += 40) {
      ctx.beginPath();
      ctx.moveTo(cx + f, cy + 45);
      ctx.lineTo(cx + f, cy + 85);
      ctx.stroke();
    }

    // Active Aero Wing on top
    if (pkgs.includes('track-aero')) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(cx - 180, cy - 85, 360, 10);
      ctx.strokeStyle = '#00F0FF';
      ctx.strokeRect(cx - 180, cy - 85, 360, 10);
      ctx.fillStyle = '#334155';
      ctx.fillRect(cx - 90, cy - 75, 8, 30);
      ctx.fillRect(cx + 82, cy - 75, 8, 30);
    }

    // Rear Cyber Lightbar
    if (lights) {
      ctx.strokeStyle = '#FF2E63';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#FF2E63';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(cx - 190, cy + 10);
      ctx.lineTo(cx, cy + 5);
      ctx.lineTo(cx + 190, cy + 10);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Center glowing AETHER illuminated emblem
      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('A E T H E R', cx, cy + 28);
    } else {
      ctx.strokeStyle = '#4B0014';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 190, cy + 10);
      ctx.lineTo(cx + 190, cy + 10);
      ctx.stroke();
    }
  };

  // View 4: Interior Luxury Cockpit & Ambient RGB
  const drawInteriorCockpit = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    ambient: string
  ) => {
    const cx = w / 2;
    const cy = h * 0.5;

    // Windshield view with night horizon
    const skyGrad = ctx.createLinearGradient(0, 0, 0, cy);
    skyGrad.addColorStop(0, '#02040A');
    skyGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, cy + 20);

    // Distant cyber city neon horizon
    ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
    for (let b = 50; b < w - 50; b += 35) {
      const bh = 20 + Math.sin(b * 12) * 25;
      ctx.fillRect(b, cy - bh, 20, bh);
    }

    // Dashboard Frame
    ctx.fillStyle = '#0B0F19';
    ctx.beginPath();
    ctx.moveTo(0, cy + 30);
    ctx.quadraticCurveTo(cx, cy - 10, w, cy + 30);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // RGB Ambient Strip (Configurable Neon Color!)
    ctx.strokeStyle = ambient;
    ctx.lineWidth = 4;
    ctx.shadowColor = ambient;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(40, cy + 25);
    ctx.quadraticCurveTo(cx, cy - 15, w - 40, cy + 25);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Curved Dual 4K OLED Displays
    ctx.fillStyle = '#020617';
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2;
    // Driver Cluster Display
    ctx.beginPath();
    ctx.roundRect(cx - 260, cy - 20, 220, 90, 8);
    ctx.fill();
    ctx.stroke();

    // Driver Cluster UI Graphics
    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 24px Outfit';
    ctx.fillText('0', cx - 180, cy + 30);
    ctx.font = '10px "JetBrains Mono"';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('MPH  •  TRACK MODE', cx - 180, cy + 48);
    ctx.fillStyle = '#10B981';
    ctx.fillText('BATTERY: 98%  |  620 MI', cx - 240, cy + 62);

    // Center Infotainment 18" Cinematic Screen
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.roundRect(cx - 20, cy - 35, 270, 120, 10);
    ctx.fill();
    ctx.stroke();

    // Center Infotainment UI (Navigation Map simulation)
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(cx - 10, cy - 25, 250, 100);
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + 20, cy + 50);
    ctx.lineTo(cx + 90, cy + 10);
    ctx.lineTo(cx + 170, cy - 10);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px "JetBrains Mono"';
    ctx.fillText('AETHER OS 4.2', cx + 10, cy - 10);

    // Futuristic Steering Yoke
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.roundRect(cx - 200, cy + 85, 120, 65, 12);
    ctx.fill();
    ctx.strokeStyle = ambient;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center Logo on Yoke
    ctx.fillStyle = '#00F0FF';
    ctx.beginPath();
    ctx.arc(cx - 140, cy + 115, 12, 0, Math.PI * 2);
    ctx.fill();
  };

  // View 5: Aerodynamics Wind Tunnel (CFD)
  const drawAeroCFD = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    col: PaintColor,
    particles: { x: number; y: number; speed: number; length: number; opacity: number }[]
  ) => {
    // Render side car base silhouette
    drawSideProfile(ctx, w, h, col, wheel, true, angleRef.current, activePackages);

    // Wind Stream Laser Particles
    drawAirStreams(ctx, w, h, particles);

    // HUD CFD overlay metrics
    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 14px "JetBrains Mono"';
    ctx.fillText('DRAG COEFF: 0.19 Cd (RECORD LOW)', 40, 60);
    ctx.fillStyle = '#34D399';
    ctx.fillText('DOWNFORCE: 1,200 KG @ 180 MPH', 40, 85);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px "JetBrains Mono"';
    ctx.fillText('ACTIVE VENTURI CHANNELS: 100% DEPLOYED', 40, 110);
  };

  // Helper: Draw animated air particles
  const drawAirStreams = (
    ctx: CanvasRenderingContext2D,
    w: number,
    _h: number,
    particles: { x: number; y: number; speed: number; length: number; opacity: number }[]
  ) => {
    particles.forEach((p) => {
      p.x += p.speed;
      if (p.x > w + 50) {
        p.x = -50;
        p.y = 120 + Math.random() * 260;
      }

      // Air flow deflection curve around car
      let curveY = p.y;
      if (p.x > 200 && p.x < 600) {
        if (p.y > 180 && p.y < 320) {
          curveY -= Math.sin(((p.x - 200) / 400) * Math.PI) * 45;
        }
      }

      ctx.strokeStyle = `rgba(0, 240, 255, ${p.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, curveY);
      ctx.lineTo(p.x + p.length, curveY);
      ctx.stroke();
    });
  };

  // Helper: Wheel rim render
  const drawWheelRim = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    wh: WheelOption
  ) => {
    // Outer Tire
    ctx.fillStyle = '#090D16';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Rim Outer Ring
    ctx.strokeStyle = wh.id === 'v-spoke-21' ? '#D97706' : '#94A3B8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Brake Disc & Red/Cyan Brembo Caliper
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(x, y, radius - 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00F0FF';
    ctx.fillRect(x - 8, y - radius + 8, 16, 8);

    // Spokes
    ctx.strokeStyle = wh.id === 'stealth-20' ? '#1E293B' : '#E2E8F0';
    ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * (radius - 8), y + Math.sin(a) * (radius - 8));
      ctx.stroke();
    }
  };

  // Helper: Wheel rim with rotation
  const drawWheelWithRotation = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    wh: WheelOption,
    angle: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    // Outer Tire
    ctx.fillStyle = '#090D16';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Rim Outer Lip
    ctx.strokeStyle = wh.id === 'v-spoke-21' ? '#D97706' : '#94A3B8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Caliper fixed in place
    ctx.fillStyle = '#00F0FF';
    ctx.fillRect(-8, -radius + 8, 16, 8);

    // Rotate Spokes
    ctx.rotate(angle);
    ctx.strokeStyle = wh.id === 'stealth-20' ? '#1E293B' : '#E2E8F0';
    ctx.lineWidth = 2.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * (radius - 8), Math.sin(a) * (radius - 8));
      ctx.stroke();
    }

    ctx.restore();
  };

  return (
    <div className="relative w-full aspect-[16/9] max-h-[540px] rounded-2xl overflow-hidden bg-[#030610] border border-cyan-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        className="w-full h-full object-contain"
      />

      {/* Floating Canvas Controls */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-20">
        <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1.5 shadow-lg">
          <Eye className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">
            {viewAngle === 'front34' ? 'Front 3/4 Studio' : viewAngle === 'side' ? 'Aero Profile' : viewAngle === 'rear' ? 'Rear Diffuser' : viewAngle === 'interior' ? 'Cockpit OS' : 'CFD Wind Tunnel'}
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        
        {/* Headlights Toggle */}
        <button
          onClick={toggleHeadlights}
          title="Toggle Laser Headlights"
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            headlightsOn
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Wheel Rotation Toggle */}
        <button
          onClick={toggleWheelSpin}
          title="Toggle Wheel Rotation"
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            wheelSpinning
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <RotateCw className={`w-4 h-4 ${wheelSpinning ? 'animate-spin' : ''}`} />
        </button>

        {/* Wind Tunnel Stream Toggle */}
        <button
          onClick={toggleAero}
          title="Toggle Aerodynamic Wind Tunnel Simulation"
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            aeroStreamOn
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Wind className="w-4 h-4" />
        </button>
      </div>

      {/* Model Name Watermark */}
      <div className="absolute bottom-4 left-6 pointer-events-none z-10 hidden sm:block">
        <div className="text-3xl font-display font-black tracking-widest text-slate-700/40 uppercase">
          {model.name}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/50 -mt-1">
          {model.specs.power}  •  {model.specs.acceleration} 0-60
        </div>
      </div>
    </div>
  );
};
