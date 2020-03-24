<template>
	<div className="App">
		<div id="value"></div>
	</div>
</template>

<script>

import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@stevenweaver/case-vs-sequence-count";

export default {
  mounted () {
    this.loadObservable();
  },
  methods: {
    loadObservable () {
      new Runtime().module(notebook, Inspector.into(document.getElementById("value")));
    }
  }
}

</script>
