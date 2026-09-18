# Form field wrapper

Source: https://italia.github.io/bootstrap-italia/docs/form/

Angular owns value, disabled state, touched/dirty state, synchronous/asynchronous validation, and business rules. Bootstrap Italia supplies the documented input/select/checkbox/radio markup and visual feedback classes.

For a reusable control, implement `ControlValueAccessor` and expose validation through Angular forms. Keep one validation source of truth. Verify exact field classes, label structure, feedback markup, and attributes from the installed Bootstrap Italia documentation; do not substitute generic Bootstrap form examples.

