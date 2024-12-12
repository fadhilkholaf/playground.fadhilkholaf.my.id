"use client";

import { useEffect, useRef, useState } from "react";

import * as MATTER from "matter-js";

const Matter = () => {
  const canvas = useRef<HTMLCanvasElement>(null!);
  const [numberOfBalls, setNumberOfBalls] = useState<number>(0);

  useEffect(() => {
    const setBalls = () => {
      if (innerWidth > 768) {
        setNumberOfBalls(1000);
      } else {
        setNumberOfBalls(500);
      }
    };

    setBalls();

    window.addEventListener("resize", () => {
      setBalls();
    });

    const { Engine, Render, Runner, Bodies, Mouse, Composite, Events } = MATTER;

    const engine = Engine.create();

    const render = Render.create({
      engine,
      canvas: canvas.current,
      options: { width: innerWidth, height: innerHeight },
    });

    const { roof, rightWall, floor, leftWall } = {
      roof: Bodies.rectangle(
        innerWidth,
        -innerHeight / 2,
        innerWidth * 2,
        innerHeight,
        {
          isStatic: true,
          render: { visible: false },
        },
      ),
      rightWall: Bodies.rectangle(
        innerWidth * 1.5,
        innerHeight,
        innerWidth,
        innerHeight * 2,
        {
          isStatic: true,
          render: { visible: false },
        },
      ),
      floor: Bodies.rectangle(
        innerWidth,
        innerHeight * 1.5,
        innerWidth * 2,
        innerHeight,
        {
          isStatic: true,
          render: { visible: false },
        },
      ),
      leftWall: Bodies.rectangle(
        -innerWidth,
        innerHeight / 2,
        innerWidth * 2,
        innerHeight,
        {
          isStatic: true,
          render: { visible: false },
        },
      ),
    };

    const mouse = Mouse.create(render.canvas);

    const staticBall = Bodies.circle(0, 0, 50, {
      isStatic: true,
      friction: 1,
      render: { visible: false },
    });

    const ball = () => {
      return Bodies.circle(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        10,
        {
          friction: 1,
          frictionAir: 0.001,
          restitution: 0.25,
        },
      );
    };

    const balls: MATTER.Body[] = [];

    for (let i = 0; i < numberOfBalls; i++) {
      balls.push(ball());
    }

    Composite.add(engine.world, [
      roof,
      rightWall,
      floor,
      leftWall,
      staticBall,
      ...balls,
    ]);

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);

    const mouseEffect = () => {
      MATTER.Body.setPosition(staticBall, mouse.position);

      balls.forEach((particleA) => {
        const distance = MATTER.Vector.magnitude(
          MATTER.Vector.sub(staticBall.position, particleA.position),
        );
        if (distance < 100) {
          const force = MATTER.Vector.mult(
            MATTER.Vector.normalise(
              MATTER.Vector.sub(particleA.position, staticBall.position),
            ),
            0.00025 * (100 - distance),
          );
          MATTER.Body.applyForce(particleA, particleA.position, force);
        }
      });
    };

    Events.on(engine, "beforeUpdate", mouseEffect);

    return () => {
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);

      Events.off(engine, "beforeUpdate", mouseEffect);

      window.removeEventListener("resize", () => {
        setBalls();
      });
    };
  }, [canvas, numberOfBalls]);

  return <canvas ref={canvas} className="block"></canvas>;
};

export default Matter;
