# Testing ScreenShotPlugin

Because this plugin relies on an external software (PhantomJS cloud) with limited error reporting, this plugin is difficult to test and debug in general.
Each JBrowse instance will be unqiue with any number of additional plugins installed, so exhaustive testing is not feasible.
We feel that the provided testing suite covers the major, testable issues and can help uncover errors which arise.

We have split testing into three components:
1. [Program logic] (#program-logic)
2. [PhantomJS Cloud] (#phantomjs-cloud)
3. [Local installation] (#local-installation)

## General testing information
**Read carefully**

### Dependencies

To run these test via command line, PhantomJS should be installed globally. See the [phantomjs website](http://phantomjs.org/download.html) for download. Add the executable to your [path](http://phantomjs.org/quick-start.html).

Additionally, `Python` and `Pip` must be installed so you can install and run `RangeHTTPServer`.

Finally, `npm` or `yarn` must be installed to download additional dependencies.

Assuming `Python`/`pip` and `npm`/`yarn` are installed, run the following to install dependencies

```
pip install --user RangeHTTPServer

# replace yarn with npm if yarn is not installed
yarn install
```

### Test Suites
There are three testing components, as described below.

To turn on/off which tests are run, comment/uncomment lines 59-61 of [test/index.html](/test/index.html). Use `<!-- ... -->` to comment the line.

Some of the testing components require additional test setup using an additional script to be run beforehand. See each component for additional details.

### Running the tests

1. Run any applicable prep scripts as described for each component and comment/uncomment [test/index.html](/test/index.html) to include components to be tested.
2. Start the python server from the plugin directory
  - To be able to easily close the open server when finished, open a new command line window, navigate to the ScreenShotPlugin directory, and run
  ```
    python -m RangeHTTPServer
  ```
  - To maintain a single command line window and/or run the server in the background, nativate to the ScreenShotPlugin directory, and run
  ```
    python -m RangeHTTPServer &
  ```
  
  3. Assuming the python server is running correctly and phantomjs is installed globally, run
  ```
  phantomjs test/run-jasmine.js http://localhost:8000/test/
  ```
  
  *If phantomjs is not installed globally, specify the full path.*
  
## Program Logic

This component has three test areas:
1. General, output, and track parameter initalization for the dialog box
2. Encode screenshot parameters to be sent with the PhantomJS cloud request
3. Decode URL screenshot parameters to apply to the general JBrowse view and individual track configurations

These are standard unit tests to test the underlying logic. It does not require additional testing setup.

### Include in test suite
As mentioned above, we use [test/index.html](/test/index.html) to indicate which components of the test suite to include in our testing run. This compontent is tested by [spec/ScreenShotPlugin-util.spec.js](/test/spec/ScreenShotPlugin-util.sh) (line 59). Uncomment this line to include it when testing.

## PhantomJS Cloud

This component aims to test the interface between JBrowse, this plugin, and PhantomJS Cloud using a [stable JBrowse](https://bhofmei.github.io/bhofmei-jbplugins/) instance with tested/supported plugins.

It also aims that supported plugins function properly with this plugin and paramters for each of the plugins/tracks function as expected

We generate several screenshots, save the results to files, and test that the screenshot/file has the expected content.

### Set-up

#### Edit the prep script
If you run out of credits with PhantomJS Cloud, you'll need to specify your own API Key (instead of the default demo key). This requires creating an account with PhantomJS Cloud. In [test/prep_test_stable.sh](/test/prep_test_stable.sh), update `apiKey` to your own key.

#### Run the prep script
This require running a test set-up script.

```
cd test/
./prep_test_stable.sh
cd ../
```

This should generate 5 files: `file1.json`, `file2.json`, `file3.json`, `file4.json`, `file5.json`.

Note: the script uses `wget`; if `wget` in not installed on your computer, use `curl` or for each test, open the URL in a browser then save the output to the corresponding file.

### Include in test suite
As mentioned above, we use [test/index.html](/test/index.html) to indicate which components of the test suite to include in our testing run. This compontent is tested by [spec/ScreenShotPlugin-phantomjs.spec.js](/test/spec/ScreenShotPlugin-phantomjs.sh) (line 60). Uncomment this line to include it when testing.

## Local instance

This component aims to test the interaction of this plugin with the JBrowse instance it is installed on, i.e. your own JBrowse. For this to work properly, there are several requirements of the JBrowse.

1. The JBrowse instance must be externally accessible by the internet--It cannot be run locally using `localhost`. If PhantomJSCloud can't access the website, it can't capture any data.
2. The screenshot plugin must be up-to-date and activated by JBrowse
  - For all dataset activation, add to `jbrowse.conf` as described in the [README](/README.md).
  - For plugins activated in a dataset-specific manner, uncomment the lines in `test/data/tracks.conf` and if necessary, update the plugin path relative to the root JBrowse directory.

### Set-up
#### Plugins

By default, this component only tests the included JBrowse type tracks. But if any of the supported plugins are activated, they should be tested as well.

To specify which plugins to include tests for, update [test/plugins.json](/test/plugins.json). Change `false` to `true` for activated plugins.

#### Edit the prep script

In [test/prep_test_local.sh](/test/prep_test_local.sh), set the `baseURL` to the URL for this JBrowse instance. 
At the moment, this JBrowse instnace to be tested must be publically available via the internet and not require a login (HTTP access login is possible but not assumed by default because it requires username/password in plain text).

If the plugin is not installed at `plugins/ScreenShotPlugin`, update the `pluginLoc` to be the correct path (relative to the JBrowse root directory).

Finally, if you end up running out of credits for PhantomJS Cloud using the demo API key, specify your own at `apiKey`. This requires creating an account with PhantomJS Cloud.

#### Run the prep script

```
cd test/
./prep_test_local.sh
cd ../
```

This will always generate `fileA.json` and `fileB.json`. Additional JSON files will be generated depending on which plugins specified.

Note: the script uses `wget`; if `wget` in not installed on your computer, use `curl` or for each test, open the URL in a browser then save the output to the corresponding file.

### Include in test suite
As mentioned above, we use [test/index.html](/test/index.html) to indicate which components of the test suite to include in our testing run. This compontent is tested by [spec/ScreenShotPlugin-local.spec.js](/test/spec/ScreenShotPlugin-local.sh) (line 61). Uncomment this line to include it when testing.

## Errors

The *Program Logic* and *PhantomJS Cloud* test components should not have errors often.

The *Local* test is **much** more likely to have problems as that JBrowse instance could have any number of additionald plugins and be one of several versions of JBrowse.

If errors arise during this testing, it could be caused by several issues
1. If all the files are blank, it's likely an internet access issue
2. Too many tests run for the day--this error will be indicated directly in the testing output
3. PhantomJS Cloud is not working
4. One of the plugins is not working
  1. If all tracks fail, this is likely a syntax or javascript compatability issue
  2. If it's only one track type, there is something with that plugin

I've done the best I can at the moment to catch and report errors as they arise.