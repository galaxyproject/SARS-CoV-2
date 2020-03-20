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
#### Deploy locally

```
yarn vuepress dev
```
#### Compile html

```
yarn vuepress build
```
Compiled files will be under ```.vuepress/dist/```

