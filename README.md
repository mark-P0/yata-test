<!--  DESCRIPTION
  --  Yet another to-do application
  -->

<p align="center">
  <img src="./src/assets/icon.png" alt="Brand logo" height="128">
</p>

<h3 align="center">
  <a href="https://mark-p0.github.io/yata">
    YATA
  </a>
</h3>

<p align="center">
  Get your tasks done with this <strong>Yet Another Todo App</strong>!
  <br>
  <em>It runs offline too!</em>
</p>

## "YATA"?

"_YATA_" is a pun on the Japanese expression [_yatta_](https://en.wiktionary.org/wiki/yatta), expressing happiness or excitement after having done something.

That’s certainly what you feel when you strike one task off your list ;)

## Libraries & Frameworks

- [Webpack](https://webpack.js.org/) distills source files―mainly JS―into compact distributables
  - [`html-webpack-plugin`](https://webpack.js.org/plugins/html-webpack-plugin/) generates an entrypoint HTML file and injects relevant metadata
  - [`mini-css-extract-plugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/) creates external CSS files
  - [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) minifies generated CSS; uses [CSSNano](https://cssnano.co/) internally
  - [`workbox-webpack-plugin`](https://webpack.js.org/guides/progressive-web-application/) enables _Progressive Web Application (PWA)_ functionalities
  - [`favicons-webpack-plugin`](https://github.com/jantimon/favicons-webpack-plugin) generates favicons and PWA metadata, and injects them into HTML (_made by the author of, and used in conjunction with,_ `html-webpack-plugin`)
- [Bootstrap](https://getbootstrap.com/) provides styled components, utility rules, and CSS reset (_Reboot_)
  - [Bootstrap Icons](https://icons.getbootstrap.com/) for basic icons
  - [SASS](https://sass-lang.com/) for trivial selective import of Bootstrap components
- [NanoID](https://github.com/ai/nanoid) generates unique strings in a compact package
- [PurgeCSS](https://purgecss.com/) eliminates unused style rules to keep file sizes down

## Credits

- [_Letter y_](https://www.flaticon.com/free-icon/letter-y_5697590) icon, by [rizal2109](https://www.flaticon.com/authors/rizal2109) at [Flaticon](https://www.flaticon.com/)
