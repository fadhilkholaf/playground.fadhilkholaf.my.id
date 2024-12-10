"use client";

import { useEffect, useRef } from "react";

import MATTER from "matter-js";

const Matter = () => {
  const canvas = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Mouse, Composite, Events } = MATTER;

    const engine = Engine.create();

    const render = Render.create({
      engine,
      canvas: canvas.current,
      options: { width: innerWidth, height: innerHeight },
    });

    const { roof, rightWall, floor, leftWall } = {
      roof: Bodies.rectangle(innerWidth / 2, -50, innerWidth, 100, {
        isStatic: true,
        friction: 1,
        render: { visible: false },
      }),
      rightWall: Bodies.rectangle(
        innerWidth + 50,
        innerHeight / 2,
        100,
        innerHeight,
        {
          isStatic: true,
          friction: 1,
          render: { visible: false },
        },
      ),
      floor: Bodies.rectangle(
        innerWidth / 2,
        innerHeight + 50,
        innerWidth,
        100,
        {
          isStatic: true,
          friction: 1,
          render: { visible: false },
        },
      ),
      leftWall: Bodies.rectangle(-50, innerHeight / 2, 100, innerHeight, {
        isStatic: true,
        friction: 1,
        render: { visible: false },
      }),
    };

    const mouse = Mouse.create(render.canvas);

    const staticBall = Bodies.circle(100, 100, 50, {
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
          restitution: 0.5,
        },
      );
    };

    const balls: MATTER.Body[] = [];

    for (let i = 0; i < 750; i++) {
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

    const interactionRadius = 100;
    const maxForce = 0.000005;
    let lastMousePosition = { x: 0, y: 0 };

    const mouseEffect = () => {
      MATTER.Body.setPosition(staticBall, mouse.position);

      const mouseSpeed = MATTER.Vector.magnitude(
        MATTER.Vector.sub(mouse.position, lastMousePosition),
      );
      lastMousePosition = { ...mouse.position };

      balls.forEach((ball) => {
        const distance = MATTER.Vector.magnitude(
          MATTER.Vector.sub(ball.position, staticBall.position),
        );
        if (distance < interactionRadius) {
          const forceMagnitude = Math.min(
            (interactionRadius - distance) * maxForce * mouseSpeed,
            0.1,
          );
          const direction = MATTER.Vector.normalise(
            MATTER.Vector.sub(ball.position, staticBall.position),
          );
          MATTER.Body.applyForce(
            ball,
            ball.position,
            MATTER.Vector.mult(direction, forceMagnitude),
          );
        }
      });

      balls.forEach((ball) => {
        const distance = MATTER.Vector.magnitude(
          MATTER.Vector.sub(ball.position, staticBall.position),
        );
        if (distance < interactionRadius) {
          const forceMagnitude = (interactionRadius - distance) * maxForce;
          const direction = MATTER.Vector.normalise(
            MATTER.Vector.sub(ball.position, staticBall.position),
          );
          MATTER.Body.applyForce(
            ball,
            ball.position,
            MATTER.Vector.mult(direction, forceMagnitude),
          );
        }
      });
    };

    Events.on(engine, "beforeUpdate", mouseEffect);

    return () => {
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);

      Events.off(engine, "beforeUpdate", mouseEffect);
    };
  }, [canvas]);

  return <canvas ref={canvas} className="block"></canvas>;
};

export default Matter;
