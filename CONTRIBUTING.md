# How to deploy this site

#### Install dependencies

Please [install yarn](https://classic.yarnpkg.com/en/docs/install/). You can also use conda for this by running

```bash
conda create c conda-froge -n yarn yarn
conda activate yarn
```

Once you have done this please run the following commands.

```
yarn install
```
#### Start a local server suitable for interactive development of the website.  By default this runs at 0.0.0.0:8080.

```
yarn develop
```
#### Compile to a static site for for publishing

```
yarn build
```
Compiled files will be under ```.vuepress/dist/```

