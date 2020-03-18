

```sh
galaxy_instance='<link to galaxy_instance>'
api_key='<API key>'
path_to_toolsyaml='All_covid_tools.yaml'
path_to_workflow-'workflow/'


shed-tools install -t $path_to_toolsyaml -g $galaxy_instance -a $api_key
workflow-install --publish_workflows --workflow_path $path_to_workflow -g $galaxy_instance -a $api_key
```
