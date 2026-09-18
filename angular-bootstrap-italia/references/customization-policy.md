# Customization policy

## Allowed

- documented Bootstrap Italia classes and utilities;
- wrapper-local CSS/SCSS and `:host`;
- application classes composed with documented classes;
- documented CSS custom properties or Sass variables;
- responsive overrides that do not change component semantics;
- compatible additional markup;
- documented public configuration.

## Forbidden

- edits to `node_modules/bootstrap-italia` or copied framework source;
- patch-package, monkey patches, private methods, or internal APIs;
- overrides based on undocumented generated selectors;
- CSS that only makes a component look correct while its behavior remains wrong;
- installing another UI library to work around Bootstrap Italia limitations.

## STOP condition

Stop and ask the user if the requirement cannot be met with documented markup, public APIs, supported configuration, or external styling. Report the requirement, component, public APIs/configuration checked, safe CSS checked, technical limit, risk of the apparent workaround, and viable alternatives. Never silently change architecture.

