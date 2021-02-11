<template>
	<div class="layout-footer">
		<span class="footer-text" style="margin-right: 5px">{{year}}</span>
		<img src="/assets/images/logo.svg" alt="sigma" width="80"/>
		<span class="footer-text" style="margin-left: 5px">Theme and Layout</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",

		data(){
			return{
					year: new Date().getFullYear()
			}
		}
	}
</script>

<style scoped>

</style>