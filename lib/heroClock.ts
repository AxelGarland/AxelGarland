/** The portrait animation's clock, shared so other hero pieces can change style on the same beat.
 *  The p5 sketch writes `t` (seconds into the loop) every frame it draws; readers treat the clock
 *  as live only while `stamp` is recent, and otherwise show their resting state. */
export const heroClock = {
  /** Seconds into the loop. */
  t: 0,
  /** `performance.now()` at the last update. */
  stamp: 0,
};

export const heroClockIsLive = () => typeof performance !== "undefined" && performance.now() - heroClock.stamp < 500;
