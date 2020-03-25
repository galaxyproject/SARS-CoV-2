<template>
      <div v-html="getShieldSVG"></div>
</template>

<script>
import { getShield, makeBadge } from "../util/ghShield.js";

export default {
    props: {
        type: {
            type: String,
            default: "tip"
        },
        text: String,
        vertical: {
            type: String,
            default: "top"
        }
    },
    computed: {
      getShieldSVG: function() {
        return makeBadge({
        text: ['usegalaxy', 'eu'],
        format: 'svg',
        template: 'flat',
      });
      }
    }
};
</script>

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  background-color #42b983
  &.tip, &.green
    background-color $badgeTipColor
  &.error
    background-color $badgeErrorColor
  &.warning, &.warn, &.yellow
    background-color $badgeWarningColor
  & + &
    margin-left 5px
</style>
