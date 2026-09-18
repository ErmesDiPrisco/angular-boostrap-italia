# Anti-patterns

Do not:

- invent classes such as `badge bg-primary` without verifying Bootstrap Italia;
- import private Bootstrap Italia files or patch `node_modules`;
- install PrimeNG, Material, ng-bootstrap, or another UI library as a workaround;
- use `document.querySelector`, `classList.add`, or `classList.remove` for state Angular can express;
- initialize the same element through both data attributes and a manual API;
- force Carousel item widths while leaving the engine configured for another count;
- replace Bootstrap Italia behavior and still call the result a wrapper;
- silently proceed when the requirement needs an internal API.

When any of these is required, stop and use the technical-limit response defined in `references/customization-policy.md`.

