# webpack-module-replace-loader
Replace file *[name].[ext]* with *[name].[xxx].[ext]*;

# Installation
***
```sh
$ npm install webpack-module-replace-loader --save-dev
```
# Usage
***

#### Config jsons
- src/config.json     
- src/config.test.json    
- src/config.prod.json  

#### Config in webapck.config.js
    
    module: {
        loaders: [{
            test: [/config\.json$/],   
            loader: 'webpack-replace-module-loader', 
            include: [path.join(__dirname, 'src')], 
            options: {
                replacements: [
                    ['test', process.env.NODE_ENV === 'development'],
                    ['prod', process.env.NODE_ENV === 'production'],
                ],
                separator: '.',
            }
        }]
    }

#### Build with webpack
```js
$ BUILD_ENV=production webpack
```
##### This will replace src/config.json with src/config.prod.json

# Options
***

- replacements
  - type: [string, boolean][]
- separator
  - type：string
