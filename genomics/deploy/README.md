---
title: Deploy
---
# Deploying the tools and workflows on a Galaxy instance

Given [Ephemeris](https://ephemeris.readthedocs.io/en/latest/) and the following files you can install all needed tools into any given Galaxy instance which you have admin access to.

## Install Ephemeris 
Install Ephemeris using following command:

```
pip install ephemeris
```

## Download the necessary files

The workflows can be found in the [galaxyproject/SARS-CoV-2](https://github.com/galaxyproject/SARS-CoV-2) GitHub repository. 
```
git clone https://github.com/galaxyproject/SARS-CoV-2.git
```

## Get the API key of an admin user on the galaxy instance of choice

Galaxy admin accounts are specified as a comma-separated email list in the `admin_users` directive of `galaxy.yml`. 

1. In your browser, open your Galaxy homepage
2. Log in using the admin email, or register a new account with it if it is the first time you use it
3. Go to User -> Preferences in the top menu bar, then click on Manage API key
4. If there is no current API key available, click on `Create a new key` to generate it
5. Copy your API key and keep it for later in this tutorial.

## Installing the tools and workflows

Go to the deploy directory of the recently cloned SARS-CoV-2 repository.

```
cd SARS-CoV-2/genomics/deploy
```

Declare following variables:

```sh
galaxy_instance='<link to galaxy_instance>'
api_key='<API key>'
```

Replace `<link to galaxy_instance>` with the link of the Galaxy instance the tools and workflows should be installed. `<API key>` need to be replaced by an Admin API key (see above).

Now it is time to install the tools and workflows using `shed-tools install` and `workflow-install`
of the Ephemeris package.

```sh
shed-tools install -t all_covid_tools.yaml -g $galaxy_instance -a $api_key

workflow-install --publish_workflows --workflow_path workflows/ -g $galaxy_instance -a $api_key
```

---

## Docker

If you don't have access to any existing Galaxy instance, you can also use our preconfigured Docker image.

```
docker run --privileged -p 8080:80 quay.io/galaxy/covid-19-training
```

It will launch a flavored Galaxy instance available on http://localhost:8080. This instance will contain all the tools and workflows to execute the COVID-19 analyses described on this page. The `--privileged` parameter is used to enable CVMFS, which makes the human reference genome hg38 available for the use of Minimap2. Login as admin using `admin` as username and `password` as password to access everything.

More information on the use of Galaxy Docker containers can be found [here](https://github.com/bgruening/docker-galaxy-stable).
