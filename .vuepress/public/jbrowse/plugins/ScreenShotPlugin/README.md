# Screen Shot Plugin

This is a JBrowse plugin
 
This plugin allows the user to take a high quality screenshot of the browser.
This plugin leverages the power of PhantomJS to create an image of the browser. Unfortunately, images are created using only the backend track settings so changes made within the browser interface will not included in the screenshot.

**Note**: This plugin does not work for JBrowse v1.13.x at the moment. 

## Special Thanks
This plugin would not be possible without [phantomJS](http://phantomjs.org/), specifically [PhantomJS Cloud](https://phantomjscloud.com/), which provides phantomJS as a headless software-as-a-service. 


## Install

For JBrowse 1.11.6+ in the _JBrowse/plugins_ folder, type:  
`git clone https://github.com/bhofmei/jbplugin-screenshot.git ScreenShotPlugin`

**or**

downloaded the latest release version at [releases](https://github.com/bhofmei/jbplugin-screenshot/releases).  
Unzip the downloaded folder, place in _JBrowse/plugins_, and rename the folder _ScreenShotPlugin_

## Activate

Add this to _jbrowse.conf_ under `[GENERAL]`:
```
    [plugins.ScreenShotPlugin]
    location = plugins/ScreenShotPlugin
```

If that doesn't work, add this to _jbrowse_conf.json_:
```
    "plugins" : {
        "ScreenShotPlugin" : { "location" : "plugins/ScreenShotPlugin" }
}
```

## PhantomJS Cloud

### Fine print
Using this plugin means you agree to PhantomJS Cloud's [Terms of Service](https://phantomjscloud.com/tos.html).
The important points
1. Only have one PhantomJS Clound account.
2. PhantomJS cloud is provided 'as-is' and does not guarantee service at all times.

### Accounts
This plugin will work directly out of the box with PhantomJS Cloud. PhantomJS Clous offers a "demo" version of its services where each IP address is limited to 100 requests per day.
If this is insufficient, you can create a free account with PhantomJS Cloud which allows 500 requests per day to that account. See [PhantomJS Cloud](https://phantomjscloud.com/pricing.html) for more information.

If you do have your own account with PhantomJS, include your user API key when activating the plugin.

For _jbrowse.conf_
```
    [plugins.ScreenShotPlugin]
    location = plugins/ScreenShotPlugin
    apiKey = <insert_api_key>
```
For _jbrowse_conf.json_
```
    "plugins" : {
        "ScreenShotPlugin" : { "location" : "plugins/ScreenShotPlugin",
                            "apiKey": "<insert_api_key>" }
    }
```

You can also use your own API key by inputting it in the dialog pane with the "Use Custom ApiKey" parameter.

## Password Protection
Currently only works for HTTP Basic Authentication

Assumes that the base JBrowse folder is protected with a `.htaccess` file and subfolders do not have additional protections. This [article](https://www.gaslampmedia.com/generate-htaccess-password-htpasswd-from-the-command-line/) offers basic instructions for setting this up. Both files should have `644` permissions

This solution is not ideal as the username and password get passed as text to PhantomJS Cloud and become part of the source URL for the resulting image. However, it works and is mainly a problem when sharing downloaded images directly.

I will be working on a better solution taking advantage of JBrowse's use of Node.js in the future.

### Username and password
I recommend having separate username/password that is only for screenshots so it can be updated regularly without affecting the other users.

#### Adding to htaccess
Assuming the `.htaccess` and `.htpasswd` files are already created, add a new user with
```
htpasswd <path to .htpasswd file> <new username>
```
and enter the new password at the prompt.

#### Save for plugin access
For this plugin, create a separate file, i.e. `sc-usr.json`, in the main JBrowse folder. Paste the following into the file, using your username/password created above.
```
{
    "username": "new_user",
    "password": "new_password"
}
```

Set the file permissions by `chmod 600 sc-usr.json`.

#### Updating username/password
Update the username and/or password regularly. You need to update both the `.htpasswd` and `sc-usr.json` files.

### Plugin configuration
In the plugin configuration, add the following line to point to this file so the username/password is included when requesting the screenshot.

In _jbrowse.conf_,

```
[plugins.ScreenShotPlugin]
location = ...
pwdFile = sc-usr.json
```
    
## Use
Click the "Screen shot" button in the browser. A dialog box will open with options for the screenshot. You can also press the `s` key as a shortcut to open the dialog box.

When increasing the zoom factor, you will likely need to increase the height and width to ensure a full image.

When selecting the PDF output, you must choose a page size (A3, A4, A5, letter, legal, or tabloid) and orientation (landscape or portrait). 
The height and width parameters do not specify output page size. Now they specificy the "viewport" (portion of screen to be printed) of the image to be placed on the output page. This may require some trial and error to get the best view.  
Also, the tracklist does not always display well when using PDF output. When selecting the PDF output option, it will automatically uncheck "Show tracklist".

Hiding track labels only works for JBrowse v1.12.3 when HideTracksButton plugin is activated. If browser is an earlier version and/or the plugin is not activates, track labels will always be shown.

**Note:** Due to the nature of URL-encoded screenshots, default track configurations will be used unless overriden by settings selected in this dialog box. Locally added tracks, such as combination tracks, will not be included.

### HTML and SVG Exporting
Canvas Feature tracks are great when browsing but don't show up as well in screenshots. 
If you'd like to convert a canvas feature track to HTML feature track when taking the screenshot, click the "HTML feature" checkbox on that track's configuration.
The style/look of the features is controlled by the track "style.className" configuration.

HTML/SVG track exports are available for Canvas Feature tracks and Alignment2 tracks by default.
Additional support for XYPlots and Density plots are available with an [additional plugin](#wiggle-svg-plot-plugin).

The default configuration is to leave each as-is and the HTML/SVG-style option must be selected for each support track.
To change this default behavior (i.e. all tracks that can be converted to HTML/SVG are converted unless the option is deselected for each track), change the configuration when activating the plugin.

In _jbrowse.conf_,

```
[plugins.ScreenShotPlugin]
location = ...
htmlFeatures = true
```


## Support for Additional Plugins
### Methylation Plugin
This plugin includes support for the [MethylationPlugin](https://github.com/bhofmei/jbplugin-methylation).  
Make sure the plugin ID<sup>1</sup>  is `MethylationPlugin` and the plugin is activated.

For MethylationPlugin v3.1.0+, using HTML-based methylation track in the screenshot is supported

### Small RNA Plugin
This plugin includes support for the [SmallRNAPlugin](https://github.com/bhofmei/jbplugin-smallrna).  
Make sure the plugin ID<sup>1</sup> is `SmallRNAPlugin` and the plugin is activate. 

For SmallRNAPlugin v1.4.0+, using HTML-based small rna track in the screenshot is supported.

### Stranded XYPlot Plugin
This plugin includes support for the [StrandedPlotPlugin](https://github.com/bhofmei/jbplugin-strandedplot).  
Make sure the plugin ID<sup>1</sup> is `StrandedPlotPlugin`and the plugin is activated. 

For StrandedPlotPlugin v1.1.0+, using SVG-based tracks in the screenshot is supported.

### Nucleotide Density Plugin
Nucleotide Density Plugin was rebranded to [MotifDensityPlugin](https://github.com/bhofmei/jbplugin-motifdens). Download and use MotifDensityPlugin instead.

Nucleotide Density tracks are still available for screenshots as a normal density track, however SVG-based screenshot tracks are no longer supported.

### Motif Density Plugin
This plugin includes support for the [MotifDensityPlugin](https://github.com/bhofmei/jbplugin-motifdens).  
Make sure the plugin ID<sup>1</sup> is `MotifDensityPlugin`and the plugin is activated. 

For MotifDensityPlugin v2.0.0+, using SVG-based tracks in the screenshot is supported.

### Wiggle SVG Plot Plugin
For XYPlot and Density plots to be exported as SVG-based tracks, download and activate the [Wiggle SVG Plot Plugin](https://github.com/bhofmei/jbplugin-wigglesvg).
Make sure the plugin ID<sup>1</sup> is `WiggleSVGPlotPlugin` and the plugin is activated.


### SeqViewsPlugin
This plugin only needs to know if the [SeqViewsPlugin](https://github.com/bhofmei/jbplugin-seqview) is activated.

It will automatically look for a plugin with the plugin ID `SeqViewsPlugin`. If the SeqViews Plugin has been activate but with a different plugin ID, indicate that `seqViewsPlugin = true`.

In _jbrowse.conf_,
```
    [plugins.ScreenShotPlugin]
    ...
    seqViewsPlugin = true
```

Optionally, you can specify `seqViewsPlugin = false` if you do not want to include support for it.

<sup>1</sup>For jbrowse.conf, the plugin ID is found as `[plugins.ID]` for each plugin.  
In jbrowse_conf.json, the plugin ID is found as `"plugins":{"ID":{"location":"..."}}`

### Other plugins
Support for other plugins can be added based on demand. To request support for other plugins, either

a. Create an [issue](https://github.com/bhofmei/jbplugin-screenshot/issues) in GitHub. Include the plugin name and URL as well as what configuration options should be supported

or

b. Fork this plugin, add the support, then submit a pull request.

## Issues/Bugs
This plugin is difficult to test and debug because it relies on PhantomJS Cloud.

### Testing
This plugin comes with several types of tests to handle potential issues. Read the [testing documenation](test/TEST.md) carefully to **correctly** and **appropriately** test this plugin on your instance of JBrowse.

### General Troubleshooting
1. **If account login information is required to access the browser, it will not work.** There are ways around this, although they are not currently implemented because I haven't figured out a good way to do it securely and lack of demand.
2. **If the PhantomJS window is blank**
  * In the full request URL, change the render type to "json" and resubmit. Look for error messages.
  * Check is the request URL. In the full URL sent to PhantomJS cloud, extract the portion at `.../?request:{url:"get_this_url",...}`. Replace `%26` with `&` and `%3A` with `:` and open this updated link. Look for any error messages in the console.
3. If the PhantomJS window gives an error message about being out of credits, create a PhantomJS account.

### Extra help
For additional debugging help, submit an [issue](https://github.com/bhofmei/jbplugin-screenshot/issues). Include the URL when submitting an issue.

## Future Improvements
- Show/hide clip marker
- Remember configuration settings after closing the dialog
